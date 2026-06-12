/* ============================================================
   FWRD scenario player — runs a scenario from briefing to
   debrief: branching decisions, optional time pressure,
   per-domain skill scoring, immediate feedback, AAR debrief.
   ============================================================ */
window.FWRD = window.FWRD || {};

FWRD.player = (function () {
  let run = null;        // current run state
  let timerId = null;    // countdown interval
  let promptTimer = null; // delayed feedback-prompt timeout

  function view() { return document.getElementById("view-player"); }

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function para(s) { return esc(s).replace(/\n/g, "<br>"); }

  function stopTimer() {
    if (timerId) { clearInterval(timerId); timerId = null; }
  }

  function shuffled(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* ---------- run lifecycle ---------- */

  function start(id) {
    const sc = (FWRD.scenarios || []).find(function (s) { return s.id === id; });
    if (!sc) { location.hash = "#scenarios"; return; }
    run = {
      sc: sc,
      decisions: [],
      earned: {}, max: {},
      vitals: null,
      started: Date.now(),
      pendingTimeout: false
    };
    FWRD.DOMAINS.forEach(function (d) { run.earned[d.key] = 0; run.max[d.key] = 0; });
    renderBriefing();
  }

  function cleanup() {
    stopTimer();
    if (promptTimer) { clearTimeout(promptTimer); promptTimer = null; }
    const modal = document.getElementById("feedback-modal");
    if (modal) modal.remove();
  }

  function exit() {
    if (run && run.decisions.length > 0) {
      if (!confirm("Leave this scenario? This run won't be saved.")) return;
    }
    cleanup();
    run = null;
    location.hash = "#scenarios";
  }

  /* ---------- rendering ---------- */

  function headerHtml() {
    return '<div class="player-head">' +
      '<div class="title"><h2>' + esc(run.sc.title) + "</h2>" +
      '<div class="small muted">' + esc(run.sc.setting) + "</div></div>" +
      '<button class="btn secondary" id="btn-exit">Exit scenario</button></div>';
  }

  function vitalsHtml() {
    if (!run.vitals) return "";
    return '<div class="vitals">' + run.vitals.map(function (v) {
      return '<div class="vital ' + (v.state === "ok" ? "" : esc(v.state)) + '">' +
        '<div class="label">' + esc(v.label) + '</div>' +
        '<div class="value">' + esc(v.value) + "</div></div>";
    }).join("") + "</div>";
  }

  function cuesHtml(node) {
    if (!node.cues || !node.cues.length) return "";
    return '<div class="cue-box"><h4>What you notice</h4><ul>' +
      node.cues.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") +
      "</ul></div>";
  }

  function renderBriefing() {
    const sc = run.sc;
    const focus = sc.focus.map(function (k) {
      const d = FWRD.DOMAINS.find(function (x) { return x.key === k; });
      return '<span class="skill-chip">' + esc(d ? d.name : k) + "</span>";
    }).join(" ");
    view().innerHTML =
      headerHtml() +
      '<div class="card stack">' +
      '<div class="row"><span class="badge navy">Level ' + sc.level + "</span>" +
      '<span class="badge">~' + sc.estMinutes + " min</span>" + focus + "</div>" +
      "<p><strong>Your role:</strong> " + esc(sc.role) + "</p>" +
      "<p>" + para(sc.briefing) + "</p>" +
      '<p class="small muted">Choices are scored across the five CRM domains. Some decisions are timed' +
      (FWRD.state.setting("timed") ? "" : " (currently switched off in settings)") +
      ". There are no points for clinical trivia — this is about how you run the situation.</p>" +
      '<div class="row"><button class="btn" id="btn-begin">Begin scenario</button></div>' +
      "</div>";
    document.getElementById("btn-exit").onclick = exit;
    document.getElementById("btn-begin").onclick = function () { goto(sc.start); };
    window.scrollTo(0, 0);
  }

  function goto(nodeId) {
    stopTimer();
    const node = run.sc.nodes[nodeId];
    if (!node) {
      view().innerHTML = headerHtml() + '<div class="card">Scenario error: missing node "' + esc(nodeId) + '". </div>';
      document.getElementById("btn-exit").onclick = exit;
      return;
    }
    if (node.vitals) run.vitals = node.vitals;
    if (node.type === "end") { finish(node); return; }
    renderNode(node);
  }

  function renderNode(node) {
    let html = headerHtml() + '<div class="card">' +
      '<div class="scene-text">' + para(node.text) + "</div>" +
      vitalsHtml() + cuesHtml(node);

    if (node.type === "info") {
      html += '<div class="options"><button class="btn" id="btn-continue">Continue</button></div>';
    } else {
      html += '<div class="options" id="options"></div>';
      const timed = FWRD.state.setting("timed") && node.timeLimit;
      if (timed) {
        html += '<div class="timer" id="timer"><div class="bar"><span id="timer-fill" style="width:100%"></span></div>' +
          '<div class="secs" id="timer-secs">' + node.timeLimit + "s</div></div>" +
          '<div class="timeout-note" id="timeout-note" hidden>The moment has passed — in a real crisis this decision wouldn\'t wait. Choose now.</div>';
      }
    }
    html += "</div>";
    view().innerHTML = html;
    document.getElementById("btn-exit").onclick = exit;

    if (node.type === "info") {
      document.getElementById("btn-continue").onclick = function () { goto(node.next); };
    } else {
      const box = document.getElementById("options");
      shuffled(node.options).forEach(function (opt) {
        const b = document.createElement("button");
        b.className = "option-btn";
        b.textContent = opt.text;
        b.onclick = function () { choose(node, opt); };
        box.appendChild(b);
      });
      run.pendingTimeout = false;
      if (FWRD.state.setting("timed") && node.timeLimit) startTimer(node.timeLimit);
    }
    window.scrollTo(0, 0);
  }

  function startTimer(seconds) {
    const t0 = Date.now();
    timerId = setInterval(function () {
      const remain = seconds - (Date.now() - t0) / 1000;
      const fill = document.getElementById("timer-fill");
      const secs = document.getElementById("timer-secs");
      if (!fill || !secs) { stopTimer(); return; }
      if (remain <= 0) {
        stopTimer();
        fill.style.width = "0%";
        secs.textContent = "0s";
        document.getElementById("timer").classList.add("expired");
        const note = document.getElementById("timeout-note");
        if (note) note.hidden = false;
        run.pendingTimeout = true;
      } else {
        fill.style.width = (remain / seconds) * 100 + "%";
        secs.textContent = Math.ceil(remain) + "s";
      }
    }, 100);
  }

  /* ---------- choosing & scoring ---------- */

  function choose(node, opt) {
    stopTimer();

    // Tally: earned what you chose; max is the best available at this node.
    FWRD.DOMAINS.forEach(function (d) {
      let best = 0;
      node.options.forEach(function (o) {
        const v = (o.scores && o.scores[d.key]) || 0;
        if (v > best) best = v;
      });
      run.max[d.key] += best;
      run.earned[d.key] += (opt.scores && opt.scores[d.key]) || 0;
    });
    if (run.pendingTimeout) run.earned.dm -= 1; // hesitation cost

    run.decisions.push({
      q: node.text,
      a: opt.text,
      quality: opt.quality,
      feedback: opt.feedback,
      principles: opt.principles || [],
      trap: opt.trap || null,
      timedOut: run.pendingTimeout
    });

    renderFeedback(node, opt);
  }

  function renderFeedback(node, opt) {
    const titles = { good: "Strong choice", ok: "Workable — but look closer", poor: "A trap worth knowing" };
    let html = headerHtml() + '<div class="card">' +
      '<div class="scene-text muted small">' + para(node.text) + "</div>" +
      '<div class="options"><div class="option-btn" style="border-color:var(--brand);background:var(--brand-soft)">' + esc(opt.text) + "</div></div>" +
      '<div class="flash ' + esc(opt.quality) + '"><strong>' + titles[opt.quality] +
      (opt.trap ? ' · <span class="badge bad">Trap: ' + esc(opt.trap) + "</span>" : "") +
      (run.pendingTimeout ? ' · <span class="badge warn">Decision delayed</span>' : "") +
      "</strong><br>" + esc(opt.feedback) + "</div>" +
      '<div class="options"><button class="btn" id="btn-continue">Continue</button></div>' +
      "</div>";
    view().innerHTML = html;
    document.getElementById("btn-exit").onclick = exit;
    document.getElementById("btn-continue").onclick = function () { goto(opt.next); };
    window.scrollTo(0, 0);
  }

  /* ---------- finishing & debrief ---------- */

  function computeResult(endNode) {
    const domains = {};
    FWRD.DOMAINS.forEach(function (d) {
      if (run.max[d.key] > 0) {
        const pct = Math.round((run.earned[d.key] / run.max[d.key]) * 100);
        domains[d.key] = Math.max(0, Math.min(100, pct));
      } else {
        domains[d.key] = null;
      }
    });
    let weightSum = 0, total = 0;
    FWRD.DOMAINS.forEach(function (d) {
      if (domains[d.key] != null) { weightSum += d.weight; total += domains[d.key] * d.weight; }
    });
    const overall = weightSum > 0 ? Math.round(total / weightSum) : 0;
    return {
      scenarioId: run.sc.id,
      title: run.sc.title,
      date: new Date().toISOString(),
      durationSec: Math.round((Date.now() - run.started) / 1000),
      outcome: endNode.outcome,
      domains: domains,
      overall: overall,
      decisions: run.decisions,
      reflection: ""
    };
  }

  function finish(endNode) {
    const result = computeResult(endNode);
    FWRD.state.addResult(result);
    renderDebrief(endNode, result);
  }

  function barClass(pct) {
    if (pct >= 80) return "good";
    if (pct >= 60) return "";
    if (pct >= 40) return "warn";
    return "bad";
  }

  function principleLinks(ids) {
    return ids.map(function (pid) {
      const tool = (FWRD.toolkit || []).find(function (t) { return t.id === pid; });
      if (!tool) return "";
      return '<a class="badge" href="#toolkit/' + esc(pid) + '">' + esc(tool.name) + "</a>";
    }).join(" ");
  }

  function renderDebrief(endNode, result) {
    const outcomeTitles = {
      good: "Strong performance",
      mixed: "The patient made it — the lessons are free",
      poor: "A hard run — and the most valuable kind"
    };

    // Skill bars
    let bars = "";
    FWRD.DOMAINS.forEach(function (d) {
      const v = result.domains[d.key];
      if (v == null) return;
      const m = FWRD.masteryLabel(v);
      bars += '<div class="domain-row"><div class="name">' + esc(d.name) + '</div>' +
        '<div class="bar ' + barClass(v) + '"><span style="width:' + v + '%"></span></div>' +
        '<div class="val">' + v + "% · " + m.label + "</div></div>";
    });

    // Decision timeline
    const qualityBadge = { good: '<span class="badge good">Good</span>', ok: '<span class="badge warn">OK</span>', poor: '<span class="badge bad">Poor</span>' };
    let timeline = "";
    result.decisions.forEach(function (dec, i) {
      const allPrinciples = principleLinks(dec.principles);
      timeline += '<div class="debrief-decision">' +
        '<div class="q">Decision ' + (i + 1) + " · " + esc(dec.q) + "</div>" +
        '<div class="a">' + qualityBadge[dec.quality] + " " +
        (dec.trap ? '<span class="badge bad">Trap: ' + esc(dec.trap) + "</span> " : "") +
        (dec.timedOut ? '<span class="badge warn">Delayed</span> ' : "") +
        esc(dec.a) + "</div>" +
        '<div class="fb muted">' + esc(dec.feedback) + "</div>" +
        (allPrinciples ? '<div class="links">' + allPrinciples + "</div>" : "") +
        "</div>";
    });

    // Strengths / focus areas
    const scored = FWRD.DOMAINS
      .filter(function (d) { return result.domains[d.key] != null; })
      .sort(function (a, b) { return result.domains[b.key] - result.domains[a.key]; });
    const strengths = scored.slice(0, 2).map(function (d) { return d.name + " (" + result.domains[d.key] + "%)"; }).join(", ");
    const weak = scored.filter(function (d) { return result.domains[d.key] < 80; });
    const focuses = weak.slice(-2).reverse().map(function (d) { return d.name + " (" + result.domains[d.key] + "%)"; }).join(", ") ||
      "Nothing glaring this run — try a higher level, or switch on timed pressure.";

    const learning = (run.sc.learningPoints || []).map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("");

    view().innerHTML =
      '<div class="player-head"><div class="title"><h2>Debrief — ' + esc(run.sc.title) + "</h2>" +
      '<div class="small muted">Completed in ' + Math.round(result.durationSec / 60) + " min · Overall " + result.overall + "%</div></div></div>" +

      '<div class="stack">' +
      '<div class="outcome-banner ' + esc(endNode.outcome) + '"><h2>' + outcomeTitles[endNode.outcome] + "</h2><p>" + esc(endNode.summary) + "</p></div>" +

      '<div class="card"><h3>Skill breakdown</h3>' + bars +
      '<hr class="soft"><p class="small"><strong>Strengths this run:</strong> ' + esc(strengths || "—") + "</p>" +
      '<p class="small"><strong>Focus next:</strong> ' + esc(focuses || "—") + "</p></div>" +

      '<div class="card"><h3>Your decisions, replayed</h3><p class="small muted">This is the timeline view an incident review would build — read it the way you used to read them as lessons-learnt lead.</p>' + timeline + "</div>" +

      (learning ? '<div class="card"><h3>Learning points</h3><ul>' + learning + "</ul></div>" : "") +

      '<div class="card reflect"><h3>Reflection (your AAR)</h3>' +
      '<p class="small muted">What went well? What didn\'t? Why? What will you do differently — in the simulator and on shift?</p>' +
      '<textarea id="reflection" placeholder="Two honest sentences beat two perfect paragraphs…"></textarea>' +
      '<div class="row" style="margin-top:.7rem">' +
      '<button class="btn" id="btn-save-reflect">Save reflection</button>' +
      '<button class="btn secondary" id="btn-again">Run again</button>' +
      '<a class="btn secondary" href="#scenarios">Scenario Lab</a>' +
      '<a class="btn secondary" href="#home">Dashboard</a>' +
      '<a class="btn secondary" href="#feedback">Give feedback</a>' +
      "</div></div></div>";

    const sc = run.sc;
    document.getElementById("btn-save-reflect").onclick = function () {
      FWRD.state.setLastReflection(document.getElementById("reflection").value.trim());
      this.textContent = "Saved ✓";
    };
    document.getElementById("btn-again").onclick = function () { start(sc.id); };
    run = { sc: sc, decisions: [], earned: {}, max: {}, vitals: null, started: Date.now(), pendingTimeout: false }; // keep header working post-run
    FWRD.DOMAINS.forEach(function (d) { run.earned[d.key] = 0; run.max[d.key] = 0; });
    window.scrollTo(0, 0);

    if (FWRD.state.shouldPromptFeedback()) {
      promptTimer = setTimeout(showFeedbackPrompt, 1500);
    }
  }

  /* A kind, dismissible ask for survey feedback after a completed scenario. */
  function showFeedbackPrompt() {
    promptTimer = null;
    if (document.getElementById("feedback-modal")) return;
    const minutes = (FWRD.feedbackConfig && FWRD.feedbackConfig.minutes) || 3;
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    backdrop.id = "feedback-modal";
    backdrop.innerHTML =
      '<div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="fb-title">' +
      '<h3 id="fb-title">Before you go — has FWRD helped?</h3>' +
      "<p>You've just debriefed a scenario, which makes you exactly the person we need to hear from. " +
      "Our anonymous " + minutes + "-minute survey measures whether this training is working and decides what we build next.</p>" +
      '<div class="row" style="justify-content:flex-end">' +
      '<button class="btn secondary small-btn" id="fb-never">Don\'t ask again</button>' +
      '<button class="btn secondary small-btn" id="fb-later">Maybe later</button>' +
      '<button class="btn" id="fb-go">Share feedback (' + minutes + ' min)</button>' +
      "</div></div>";
    document.body.appendChild(backdrop);

    function close() { backdrop.remove(); }
    document.getElementById("fb-go").onclick = function () { close(); location.hash = "#feedback"; };
    document.getElementById("fb-later").onclick = function () { FWRD.state.feedbackSnooze(); close(); };
    document.getElementById("fb-never").onclick = function () { FWRD.state.feedbackNever(); close(); };
    backdrop.addEventListener("click", function (e) {
      if (e.target === backdrop) { FWRD.state.feedbackSnooze(); close(); } // clicking outside = maybe later
    });
  }

  return { start: start, cleanup: cleanup };
})();
