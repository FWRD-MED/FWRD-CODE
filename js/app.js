/* ============================================================
   FWRD app — routing and the main views:
   Home dashboard · Scenario Lab · CRM Toolkit · Rehearsal · About
   ============================================================ */
window.FWRD = window.FWRD || {};

(function () {

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function domainName(key) {
    const d = FWRD.DOMAINS.find(function (x) { return x.key === key; });
    return d ? d.name : key;
  }

  function timeAgo(iso) {
    const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return mins + " min ago";
    const hrs = Math.round(mins / 60);
    if (hrs < 24) return hrs + " hr ago";
    const days = Math.round(hrs / 24);
    return days === 1 ? "yesterday" : days + " days ago";
  }

  /* ============================================================
     HOME / DASHBOARD
     ============================================================ */
  function renderHome() {
    const el = document.getElementById("view-home");
    const s = FWRD.state;
    const results = s.get().results;
    const avgs = s.domainAverages();
    const overall = s.overallAverage();
    const streak = s.streak();
    const hour = new Date().getHours();
    const greeting = hour < 5 ? "Night shift?" : hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

    // Guide progress (for the hero bar and the "up next" suggestion)
    const gTotal = FWRD.guide ? FWRD.guide.total() : 0;
    const gDone = FWRD.guide ? FWRD.guide.doneCount() : 0;
    const gNext = FWRD.guide ? FWRD.guide.nextLesson() : null;
    const gPct = gTotal ? Math.round((gDone / gTotal) * 100) : 0;

    // Suggest the next session: the guide first (it's the front door),
    // then the weakest domain → a scenario that trains it.
    let suggestion;
    const unlocked = s.maxUnlockedLevel();
    const all = FWRD.scenarios.slice().sort(function (a, b) { return a.level - b.level; });
    if (gNext) {
      suggestion = {
        title: "Lesson " + gNext.num + " — " + gNext.title,
        href: "#guide/" + gNext.id,
        btn: gDone === 0 ? "Start the guide" : "Continue the guide",
        why: gDone === 0
          ? "New here? The Beginner's Guide is the front door: six short lessons that change how you'll read every scenario."
          : "Pick the guide back up — " + gDone + " of " + gTotal + " lessons done, ~" + gNext.minutes + " min for the next one."
      };
    } else if (!results.length) {
      const first = all[0];
      suggestion = {
        title: first.title, href: "#play/" + first.id, btn: "Start scenario",
        why: "Guide complete — now the practice. Your first scenario calibrates your skill profile."
      };
    } else {
      const scoredDomains = FWRD.DOMAINS.filter(function (d) { return avgs[d.key] != null; })
        .sort(function (a, b) { return avgs[a.key] - avgs[b.key]; });
      const weakest = scoredDomains[0];
      let pick = null;
      if (weakest) {
        pick = all.find(function (sc) { return sc.level <= unlocked && sc.focus.indexOf(weakest.key) !== -1 && s.bestFor(sc.id) === null; }) ||
               all.find(function (sc) { return sc.level <= unlocked && sc.focus.indexOf(weakest.key) !== -1; });
      }
      if (!pick) pick = all.find(function (sc) { return sc.level <= unlocked && s.bestFor(sc.id) === null; }) || all[0];
      suggestion = {
        title: pick.title, href: "#play/" + pick.id, btn: "Start scenario",
        why: weakest ? "Your current focus area is " + weakest.name.toLowerCase() + " (" + avgs[weakest.key] + "%) — this scenario trains it." :
                       "Keep building your profile."
      };
    }

    // Domain bars
    let domainRows = "";
    FWRD.DOMAINS.forEach(function (d) {
      const v = avgs[d.key];
      const m = FWRD.masteryLabel(v);
      domainRows += '<div class="domain-row"><div class="name">' + esc(d.name) + "</div>" +
        '<div class="bar"><span style="width:' + (v || 0) + '%"></span></div>' +
        '<div class="val">' + (v == null ? "—" : v + "% · " + m.label) + "</div></div>";
    });

    // Recent sessions
    const sessions = [];
    s.get().results.forEach(function (r) { sessions.push({ date: r.date, html: "<b>" + esc(r.title) + "</b> — " + r.overall + "%" + (r.reflection ? " · reflected ✎" : "") }); });
    s.get().rehearsals.forEach(function (r) {
      const script = (FWRD.rehearsals || []).find(function (x) { return x.id === r.scriptId; });
      sessions.push({ date: r.date, html: "<b>" + esc(script ? script.title : "Rehearsal") + "</b> — mental rehearsal" });
    });
    sessions.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
    const sessionHtml = sessions.slice(0, 6).map(function (x) {
      return '<div class="session-item"><span>' + x.html + '</span><span class="when">' + timeAgo(x.date) + "</span></div>";
    }).join("") || '<p class="small muted">No sessions yet. Your history will appear here.</p>';

    el.innerHTML =
      '<div class="stack">' +
      '<div class="hero"><h1>' + greeting + ", doctor.</h1>" +
      '<p class="muted">Train the skills that deploy your knowledge: situational awareness, communication, decision-making, resource management and error management.</p>' +
      '<div class="stat-row">' +
      '<div class="stat"><b>' + results.length + "</b><span>scenarios completed</span></div>" +
      '<div class="stat"><b>' + streak + (streak === 1 ? " day" : " days") + "</b><span>training streak</span></div>" +
      '<div class="stat"><b>' + (overall == null ? "—" : overall + "%") + "</b><span>recent overall CRM score</span></div>" +
      "</div>" +
      '<a class="hero-progress" href="#guide" title="Open the Beginner\'s Guide">' +
      '<span class="hp-label">Beginner\'s Guide to CRM</span>' +
      '<span class="bar"><span style="width:' + gPct + '%"></span></span>' +
      '<span class="hp-val">' + gDone + "/" + gTotal + " lessons" + (gTotal && gDone === gTotal ? " ✓" : "") + "</span>" +
      "</a>" +
      "</div>" +

      '<div class="card spread"><div><h3 style="margin-bottom:.2rem">Up next: ' + esc(suggestion.title) + "</h3>" +
      '<p class="small muted" style="margin:0">' + esc(suggestion.why) + "</p></div>" +
      '<a class="btn" href="' + esc(suggestion.href) + '">' + esc(suggestion.btn) + "</a></div>" +

      '<div class="grid-2">' +
      '<div class="card"><h3>Your CRM profile</h3><div class="radar-wrap"><canvas id="radar"></canvas></div>' +
      '<p class="small muted" style="margin:0">Rolling average of your last five scenarios.</p></div>' +
      '<div class="card"><h3>Skill domains</h3>' + domainRows +
      '<hr class="soft"><h3>Recent sessions</h3>' + sessionHtml + "</div>" +
      "</div>" +

      '<div class="grid-4">' +
      '<div class="card"><h3>CRM Guide</h3><p class="small muted">The Beginner\'s Guide — six short lessons, real cases, the pre-reading for everything else.</p><a class="btn subtle" href="#guide">Open</a></div>' +
      '<div class="card"><h3>Scenario Lab</h3><p class="small muted">Branching clinical crises scored across the five domains.</p><a class="btn subtle" href="#scenarios">Open</a></div>' +
      '<div class="card"><h3>CRM Toolkit</h3><p class="small muted">The frameworks — SBAR, PACE, OODA, 10-for-10 — in 60-second cards.</p><a class="btn subtle" href="#toolkit">Open</a></div>' +
      '<div class="card"><h3>Mental Rehearsal</h3><p class="small muted">Guided visualisation: pre-load the crisis before it finds you.</p><a class="btn subtle" href="#rehearsal">Open</a></div>' +
      "</div></div>";

    FWRD.drawRadar(document.getElementById("radar"), avgs);
  }

  /* ============================================================
     SCENARIO LAB
     ============================================================ */
  function renderScenarios() {
    const el = document.getElementById("view-scenarios");
    const s = FWRD.state;
    const unlocked = s.maxUnlockedLevel();
    const sorted = FWRD.scenarios.slice().sort(function (a, b) { return a.level - b.level; });

    const cards = sorted.map(function (sc) {
      const locked = sc.level > unlocked;
      const best = s.bestFor(sc.id);
      const focus = sc.focus.map(function (k) { return '<span class="skill-chip">' + esc(domainName(k)) + "</span>"; }).join(" ");
      return '<div class="card scenario-card' + (locked ? " locked" : "") + '">' +
        '<div class="scenario-meta"><span class="badge navy">Level ' + sc.level + "</span>" +
        '<span class="badge">~' + sc.estMinutes + " min</span>" +
        (best != null ? '<span class="badge good">Best: ' + best + "%</span>" : "") + "</div>" +
        "<h3>" + esc(sc.title) + "</h3>" +
        '<div class="small muted">' + esc(sc.setting) + "</div>" +
        '<div class="row">' + focus + "</div>" +
        '<div class="desc">' + esc(sc.desc) + "</div>" +
        (locked
          ? '<div class="lock-note">🔒 ' + esc(s.unlockHint(sc.level)) + "</div>"
          : '<div><a class="btn" href="#play/' + esc(sc.id) + '">' + (best != null ? "Run again" : "Start") + "</a></div>") +
        "</div>";
    }).join("");

    el.innerHTML =
      "<h1>Scenario Lab</h1>" +
      '<p class="muted">Each scenario is a branching crisis. You\'ll be scored on how you run the situation — not on clinical trivia. Expect traps: they are the curriculum.</p>' +
      '<div class="grid-2">' + cards + "</div>";
  }

  /* ============================================================
     TOOLKIT
     ============================================================ */
  let toolkitFilter = "All";

  function renderToolkit(focusId) {
    const el = document.getElementById("view-toolkit");
    const categories = ["All"];
    FWRD.toolkit.forEach(function (t) {
      if (categories.indexOf(t.category) === -1) categories.push(t.category);
    });

    if (focusId) {
      const ft = FWRD.toolkit.find(function (t) { return t.id === focusId; });
      if (ft) toolkitFilter = "All";
    }

    const chips = categories.map(function (c) {
      return '<button class="chip-btn' + (toolkitFilter === c ? " active" : "") + '" data-cat="' + esc(c) + '">' + esc(c) + "</button>";
    }).join("");

    const tools = FWRD.toolkit.filter(function (t) {
      return toolkitFilter === "All" || t.category === toolkitFilter;
    });

    const cards = tools.map(function (t) {
      const open = focusId === t.id;
      return '<div class="card tool-card" data-tool="' + esc(t.id) + '" id="tool-' + esc(t.id) + '">' +
        '<div class="spread"><h3 style="margin:0">' + esc(t.name) + '</h3><span class="badge navy">' + esc(t.category) + "</span></div>" +
        '<div class="one-liner">' + esc(t.oneLiner) + "</div>" +
        '<div class="tool-detail"' + (open ? "" : " hidden") + ">" +
        "<h4>What it is</h4><p>" + esc(t.what) + "</p>" +
        "<h4>When to reach for it</h4><p>" + esc(t.when) + "</p>" +
        "<h4>What it sounds like</h4><pre>" + esc(t.example) + "</pre>" +
        '<h4>60-second practice</h4><div class="practice">' + esc(t.practice) + "</div>" +
        "</div></div>";
    }).join("");

    el.innerHTML =
      "<h1>CRM Toolkit</h1>" +
      '<p class="muted">The frameworks behind safe practice, each in a 60-second card. Click a card to open it. These are the same tools the scenarios score you on.</p>' +
      '<div class="toolkit-filters">' + chips + "</div>" +
      '<div class="stack">' + cards + "</div>";

    el.querySelectorAll(".chip-btn").forEach(function (b) {
      b.onclick = function () {
        toolkitFilter = b.getAttribute("data-cat");
        renderToolkit();
      };
    });
    el.querySelectorAll(".tool-card").forEach(function (card) {
      card.onclick = function (e) {
        if (e.target.closest("a")) return;
        const d = card.querySelector(".tool-detail");
        d.hidden = !d.hidden;
      };
    });

    if (focusId) {
      const target = document.getElementById("tool-" + focusId);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  /* ============================================================
     REHEARSAL
     ============================================================ */
  const rehearsal = { script: null, step: 0, timer: null, paused: false };

  function rehearsalCleanup() {
    if (rehearsal.timer) { clearTimeout(rehearsal.timer); rehearsal.timer = null; }
    rehearsal.script = null;
  }

  function renderRehearsalList() {
    rehearsalCleanup();
    const el = document.getElementById("view-rehearsal");
    const done = {};
    FWRD.state.get().rehearsals.forEach(function (r) { done[r.scriptId] = (done[r.scriptId] || 0) + 1; });

    const cards = FWRD.rehearsals.map(function (r) {
      return '<div class="card scenario-card">' +
        '<div class="scenario-meta"><span class="badge">~' + r.minutes + " min</span>" +
        r.focus.map(function (f) { return '<span class="skill-chip">' + esc(f) + "</span>"; }).join(" ") +
        (done[r.id] ? '<span class="badge good">Practised ×' + done[r.id] + "</span>" : "") + "</div>" +
        "<h3>" + esc(r.title) + "</h3>" +
        '<div class="desc">' + esc(r.blurb) + "</div>" +
        '<div><button class="btn" data-rehearse="' + esc(r.id) + '">Begin</button></div>' +
        "</div>";
    }).join("");

    el.innerHTML =
      "<h1>Mental Rehearsal Studio</h1>" +
      '<p class="muted">Elite teams visualise before they perform. Find somewhere quiet, read each prompt slowly, and actually build the pictures — the realism of the imagery is what trains the response. Steps advance automatically; pause any time.</p>' +
      '<div class="grid-2">' + cards + "</div>";

    el.querySelectorAll("[data-rehearse]").forEach(function (b) {
      b.onclick = function () { startRehearsal(b.getAttribute("data-rehearse")); };
    });
  }

  function startRehearsal(id) {
    rehearsal.script = FWRD.rehearsals.find(function (r) { return r.id === id; });
    rehearsal.step = 0;
    rehearsal.paused = false;
    renderRehearsalStep();
  }

  function renderRehearsalStep() {
    const el = document.getElementById("view-rehearsal");
    const r = rehearsal.script;
    if (!r) return;
    if (rehearsal.step >= r.steps.length) { renderRehearsalEnd(); return; }
    const step = r.steps[rehearsal.step];

    el.innerHTML =
      '<div class="player-head"><div class="title"><h2>' + esc(r.title) + "</h2></div>" +
      '<button class="btn secondary" id="reh-exit">Exit</button></div>' +
      '<div class="rehearsal-stage">' +
      '<div class="step-count">Step ' + (rehearsal.step + 1) + " of " + r.steps.length + "</div>" +
      '<div class="step-text">' + esc(step.text) + "</div>" +
      "</div>" +
      '<div class="rehearsal-controls">' +
      '<button class="btn secondary" id="reh-back"' + (rehearsal.step === 0 ? " disabled" : "") + ">‹ Back</button>" +
      '<button class="btn secondary" id="reh-pause">' + (rehearsal.paused ? "Resume" : "Pause") + "</button>" +
      '<button class="btn" id="reh-next">Next ›</button>' +
      "</div>";

    document.getElementById("reh-exit").onclick = renderRehearsalList;
    document.getElementById("reh-back").onclick = function () {
      if (rehearsal.step > 0) { rehearsal.step--; renderRehearsalStep(); }
    };
    document.getElementById("reh-next").onclick = function () {
      rehearsal.step++; renderRehearsalStep();
    };
    document.getElementById("reh-pause").onclick = function () {
      rehearsal.paused = !rehearsal.paused;
      if (rehearsal.paused && rehearsal.timer) { clearTimeout(rehearsal.timer); rehearsal.timer = null; }
      if (!rehearsal.paused) armRehearsalTimer(step.sec);
      document.getElementById("reh-pause").textContent = rehearsal.paused ? "Resume" : "Pause";
    };

    if (rehearsal.timer) clearTimeout(rehearsal.timer);
    if (!rehearsal.paused) armRehearsalTimer(step.sec);
    window.scrollTo(0, 0);
  }

  function armRehearsalTimer(sec) {
    rehearsal.timer = setTimeout(function () {
      rehearsal.step++;
      renderRehearsalStep();
    }, sec * 1000);
  }

  function renderRehearsalEnd() {
    if (rehearsal.timer) { clearTimeout(rehearsal.timer); rehearsal.timer = null; }
    const el = document.getElementById("view-rehearsal");
    const r = rehearsal.script;
    el.innerHTML =
      '<div class="player-head"><div class="title"><h2>' + esc(r.title) + " — complete</h2></div></div>" +
      '<div class="card stack" style="text-align:center">' +
      "<p><strong>How vividly could you picture it?</strong><br><span class='small muted'>Honest answer — vividness grows with reps, and the rating tracks it.</span></p>" +
      '<div class="rate-row">' +
      [1, 2, 3, 4, 5].map(function (n) { return '<button class="rate-btn" data-rate="' + n + '">' + n + "</button>"; }).join("") +
      "</div></div>";
    el.querySelectorAll(".rate-btn").forEach(function (b) {
      b.onclick = function () {
        FWRD.state.addRehearsal({
          scriptId: r.id,
          date: new Date().toISOString(),
          focusRating: Number(b.getAttribute("data-rate"))
        });
        renderRehearsalList();
      };
    });
  }

  /* ============================================================
     ABOUT
     ============================================================ */
  function renderAbout() {
    const el = document.getElementById("view-about");
    el.innerHTML =
      "<h1>About FWRD</h1>" +
      '<div class="stack">' +
      '<div class="card"><h3>Why this exists</h3>' +
      "<p>Analysis of patient safety incidents in healthcare and across aviation, nuclear and other high-reliability industries keeps reaching the same conclusion: most error is human-factors error, not knowledge error. Yet medical training spends almost all of its time on knowledge, and almost none on the non-technical skills that determine whether knowledge gets deployed when it matters.</p>" +
      "<p>FWRD, from <a href='https://forwardmedicine.co.uk' target='_blank' rel='noopener'>Forward Medicine</a>, exists to liberalise access to that training: the mental models and frameworks of Crisis Resource Management (CRM), practised through scenarios, available to any clinician with a browser, not just those lucky enough to get regular simulation slots.</p></div>" +

      '<div class="card"><h3>The five domains</h3>' +
      "<p><strong>Situational awareness</strong> — perceiving the cues, understanding what they mean, projecting what happens next (Endsley's model).</p>" +
      "<p><strong>Communication</strong> — closed loops, SBAR, graded assertiveness: moving information so it arrives and acts.</p>" +
      "<p><strong>Decision-making</strong> — recognition-primed patterns, structured tools (OODA, T-DODAR), and knowing when to slow down.</p>" +
      "<p><strong>Resource management</strong> — people, time, equipment, help: deployed deliberately rather than by default.</p>" +
      "<p><strong>Error management</strong> — anticipating traps, recovering fast when caught, and debriefing so the lesson outlives the shift.</p></div>" +

      '<div class="card"><h3>How scoring works</h3>' +
      "<p>Every decision in a scenario carries weightings across the five domains. Your score per domain is what you chose as a percentage of the best available path. The overall score weights SA, communication and decision-making at 25% each, resource management 15%, error management 10%. Levels unlock as scores rise — and the dashboard tracks a rolling average, because CRM skills decay without reps.</p>" +
      "<p>Scores are stored only in your browser (localStorage). Nothing leaves your device.</p></div>" +

      '<div class="card"><h3>Standing on giants</h3>' +
      "<p>The frameworks here are drawn from the CRM and human-factors canon: Gaba's Crisis Resource Management in healthcare, Endsley on situational awareness, Klein on naturalistic decision-making, Kahneman on cognitive bias, Reason on error, aviation CRM and TeamSTEPPS. The scenarios are fictional; the failure patterns in them are not.</p></div>" +

      '<div class="card"><h3>Disclaimer</h3>' +
      "<p class='small muted'>FWRD is an educational tool for practising non-technical skills. Clinical details within scenarios are illustrative and simplified, and are not clinical guidance. Always follow your local protocols, current guidelines (e.g. Resuscitation Council UK) and senior advice in real clinical practice.</p></div>" +
      "</div>";
  }

  /* ============================================================
     FEEDBACK
     ============================================================ */
  function renderFeedback() {
    const el = document.getElementById("view-feedback");
    const cfg = FWRD.feedbackConfig || {};
    const hasForm = !!(cfg.formUrl && cfg.formUrl.trim());

    let surveyHtml;
    if (hasForm) {
      const embedSrc = cfg.formUrl + (cfg.formUrl.indexOf("?") === -1 ? "?embedded=true" : "&embedded=true");
      surveyHtml =
        '<div class="card" style="padding:.5rem">' +
        '<iframe class="feedback-frame" src="' + esc(embedSrc) + '" height="' + (cfg.formHeight || 2400) + '" ' +
        'title="FWRD feedback survey" loading="lazy">Loading…</iframe></div>' +
        '<p class="small muted">Form not loading? <a href="' + esc(cfg.formUrl) + '" target="_blank" rel="noopener">Open the survey in its own tab</a>.</p>';
    } else {
      surveyHtml =
        '<div class="card"><h3>The survey opens shortly</h3>' +
        "<p>We're finalising the questionnaire. In the meantime, we'd still love to hear from you — " +
        'email <a href="mailto:' + esc(cfg.email || "fwrdmed@gmail.com") + '?subject=FWRD%20CRM%20Trainer%20feedback">' + esc(cfg.email || "fwrdmed@gmail.com") + "</a> " +
        "with anything: what worked, what didn't, what you'd want next.</p></div>";
    }

    el.innerHTML =
      "<h1>Feedback</h1>" +
      '<p class="muted">FWRD is free, built by clinicians, and shaped entirely by what you tell us. ' +
      "This anonymous survey takes about " + (cfg.minutes || 3) + " minutes: it measures whether training like this " +
      "is genuinely needed, and whether it is changing how you think and practise — which decides what we build next.</p>" +
      '<div class="stack">' + surveyHtml +
      '<p class="small muted">No patient data, no login, no tracking — responses go only to the Forward Medicine team' +
      (hasForm ? "" : " at " + esc(cfg.email || "fwrdmed@gmail.com")) + ".</p></div>";
  }

  /* ============================================================
     ROUTER
     ============================================================ */
  const views = ["home", "guide", "scenarios", "player", "toolkit", "rehearsal", "about", "feedback"];

  function show(view) {
    views.forEach(function (v) {
      document.getElementById("view-" + v).hidden = (v !== view);
    });
    document.querySelectorAll("#main-nav a").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-view") === (view === "player" ? "scenarios" : view));
    });
  }

  function route() {
    FWRD.player.cleanup();
    rehearsalCleanup();
    const hash = location.hash || "#home";
    const parts = hash.replace(/^#/, "").split("/");

    if (parts[0] === "play" && parts[1]) {
      show("player");
      FWRD.player.start(parts[1]);
    } else if (parts[0] === "guide") {
      show("guide");
      if (parts[1]) FWRD.guide.renderLesson(parts[1]); else FWRD.guide.renderList();
    } else if (parts[0] === "scenarios") {
      show("scenarios"); renderScenarios();
    } else if (parts[0] === "toolkit") {
      show("toolkit"); renderToolkit(parts[1] || null);
    } else if (parts[0] === "rehearsal") {
      show("rehearsal"); renderRehearsalList();
    } else if (parts[0] === "about") {
      show("about"); renderAbout();
    } else if (parts[0] === "feedback") {
      show("feedback"); renderFeedback();
      // Once they've seen the live survey, stop the post-scenario prompts.
      // (A visit to the placeholder page, before the form exists, doesn't count.)
      if (FWRD.feedbackConfig && FWRD.feedbackConfig.formUrl) FWRD.state.feedbackOpened();
    } else {
      show("home"); renderHome();
    }
    window.scrollTo(0, 0);
  }

  /* ============================================================
     SETTINGS + INIT
     ============================================================ */
  function initSettings() {
    const timed = document.getElementById("setting-timed");
    const unlock = document.getElementById("setting-unlock");
    timed.checked = FWRD.state.setting("timed");
    unlock.checked = FWRD.state.setting("unlockAll");
    timed.onchange = function () { FWRD.state.setSetting("timed", timed.checked); };
    unlock.onchange = function () {
      FWRD.state.setSetting("unlockAll", unlock.checked);
      if (!document.getElementById("view-scenarios").hidden) renderScenarios();
    };
  }

  window.addEventListener("hashchange", route);
  document.addEventListener("DOMContentLoaded", function () {
    initSettings();
    route();
  });
})();
