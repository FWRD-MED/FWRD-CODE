/* ============================================================
   FWRD guide engine — the Beginner's Guide to CRM.

   Lessons live in js/data/guide-*.js as a list of BLOCKS that
   reveal one at a time (read → interact → continue), so a lesson
   reads like an article but behaves like a conversation.

   Block types:
   - { type:'text', text }                          prose (\n\n = paragraph, **bold**)
   - { type:'case', title, text, link?, linkLabel? } real-case callout
   - { type:'quiz', question, options:[{text, correct?, explain}] }
       → if any option has correct:true it's a quiz; if none, it's a
         prediction/poll — every answer just reveals its explanation.
   - { type:'keypoints', title?, items:[] }         summary box
   - { type:'try', text }                           "try this on shift" callout
   - { type:'tools', intro?, ids:[] }               chips linking into the CRM Toolkit
   - { type:'action', label, href, text? }          call-to-action button
   ============================================================ */
window.FWRD = window.FWRD || {};

FWRD.guide = (function () {
  let current = null; // { lesson, pos } while a lesson is open

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function fmt(s) {
    return esc(s)
      .split(/\n\n+/)
      .map(function (p) { return "<p>" + p.replace(/\n/g, "<br>") + "</p>"; })
      .join("")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  }
  function smoothScroll(el) {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  function lessons() {
    return (FWRD.guideLessons || []).slice().sort(function (a, b) { return a.num - b.num; });
  }
  function byId(id) { return lessons().find(function (l) { return l.id === id; }); }
  function total() { return lessons().length; }
  function doneCount() { return FWRD.state.guideDoneCount(); }
  function nextLesson() {
    return lessons().find(function (l) { return !FWRD.state.guideProgress(l.id).done; }) || null;
  }

  /* ============================================================
     Lesson list (#guide)
     ============================================================ */
  function renderList() {
    const el = document.getElementById("view-guide");
    const done = doneCount(), n = total();
    const pct = n ? Math.round((done / n) * 100) : 0;

    const cards = lessons().map(function (l) {
      const prog = FWRD.state.guideProgress(l.id);
      const started = prog.block > 0 && !prog.done;
      const status = prog.done
        ? '<span class="badge good">✓ Completed</span>'
        : started
          ? '<span class="badge warn">In progress</span>'
          : "";
      const btn = prog.done ? "Review" : started ? "Continue" : "Start lesson";
      return '<div class="card scenario-card">' +
        '<div class="scenario-meta"><span class="badge navy">Lesson ' + l.num + "</span>" +
        '<span class="badge">~' + l.minutes + " min</span>" + status + "</div>" +
        "<h3>" + esc(l.title) + "</h3>" +
        '<div class="small muted">' + esc(l.subtitle) + "</div>" +
        '<div class="desc">' + esc(l.goal) + "</div>" +
        '<div><a class="btn' + (prog.done ? " secondary" : "") + '" href="#guide/' + esc(l.id) + '">' + btn + "</a></div>" +
        "</div>";
    }).join("");

    el.innerHTML =
      "<h1>The Beginner's Guide to CRM</h1>" +
      '<p class="muted">Six short lessons — the pre-reading for everything else in FWRD. ' +
      "They won't test your memory or make you click through slides; they'll walk you through real cases, " +
      "ask what you'd have done, and start re-wiring how you see a crisis before you ever run one. " +
      "Do them in order, one coffee at a time.</p>" +
      '<div class="card spread" style="align-items:center">' +
      '<div style="flex:1;min-width:200px"><div class="small" style="font-weight:600;margin-bottom:.35rem">Your progress</div>' +
      '<div class="bar' + (pct === 100 ? " good" : "") + '"><span style="width:' + pct + '%"></span></div></div>' +
      '<div class="small muted">' + done + " of " + n + " lessons complete</div></div>" +
      '<div class="grid-2" style="margin-top:1rem">' + cards + "</div>";
  }

  /* ============================================================
     Lesson player (#guide/<id>)
     ============================================================ */
  function renderLesson(id) {
    const lesson = byId(id);
    if (!lesson) { location.hash = "#guide"; return; }
    const prog = FWRD.state.guideProgress(id);
    const pos = prog.done ? lesson.blocks.length : Math.min(prog.block, lesson.blocks.length);
    current = { lesson: lesson, pos: pos };

    const el = document.getElementById("view-guide");
    el.innerHTML =
      '<div class="player-head"><div class="title"><h2>Lesson ' + lesson.num + " — " + esc(lesson.title) + "</h2>" +
      '<div class="small muted">' + esc(lesson.subtitle) + " · ~" + lesson.minutes + ' min</div></div>' +
      '<a class="btn secondary" href="#guide">All lessons</a></div>' +
      '<div class="guide-progress"><div class="bar"><span id="lesson-bar"></span></div>' +
      '<div class="small muted" id="lesson-counter"></div></div>' +
      '<div id="guide-flow"></div>' +
      '<div class="guide-controls" id="guide-controls">' +
      '<button class="btn" id="guide-continue">Continue</button></div>';

    document.getElementById("guide-continue").onclick = advance;

    // Re-reveal everything already read, then arm the current block.
    for (let i = 0; i < current.pos; i++) appendBlock(lesson.blocks[i], "done");
    if (current.pos < lesson.blocks.length) {
      appendBlock(lesson.blocks[current.pos], "live");
    } else {
      showCompletion(true);
    }
    updateBar();
    window.scrollTo(0, 0);
  }

  function updateBar() {
    const lesson = current.lesson;
    const pct = Math.round((Math.min(current.pos + 1, lesson.blocks.length) / lesson.blocks.length) * 100);
    const bar = document.getElementById("lesson-bar");
    const counter = document.getElementById("lesson-counter");
    if (bar) bar.style.width = (current.pos >= lesson.blocks.length ? 100 : pct) + "%";
    if (counter) counter.textContent = Math.min(current.pos + 1, lesson.blocks.length) + " / " + lesson.blocks.length;
  }

  function advance() {
    const lesson = current.lesson;
    current.pos++;
    FWRD.state.guideSetBlock(lesson.id, current.pos);
    if (current.pos >= lesson.blocks.length) {
      FWRD.state.guideComplete(lesson.id);
      showCompletion(false);
    } else {
      const block = appendBlock(lesson.blocks[current.pos], "live");
      smoothScroll(block);
    }
    updateBar();
  }

  function setContinueEnabled(on) {
    const b = document.getElementById("guide-continue");
    if (b) b.disabled = !on;
  }

  /* ---------- block rendering ---------- */

  function appendBlock(block, mode) {
    const flow = document.getElementById("guide-flow");
    const div = document.createElement("div");
    div.className = "lesson-block";
    div.innerHTML = blockHtml(block, mode);
    flow.appendChild(div);

    if (block.type === "quiz" && mode === "live") {
      setContinueEnabled(false);
      armQuiz(div, block);
    } else if (mode === "live") {
      setContinueEnabled(true);
    }
    return div;
  }

  function blockHtml(block, mode) {
    switch (block.type) {

      case "text":
        return '<div class="guide-text">' + fmt(block.text) + "</div>";

      case "case":
        return '<div class="case-box"><div class="case-tag">⚠ Real case</div>' +
          "<h4>" + esc(block.title) + "</h4>" + fmt(block.text) +
          (block.link ? '<p class="small"><a href="' + esc(block.link) + '" target="_blank" rel="noopener">' +
            esc(block.linkLabel || "Read the full case analysis") + " ↗</a></p>" : "") +
          "</div>";

      case "quiz": {
        const isPoll = !block.options.some(function (o) { return o.correct; });
        const opts = block.options.map(function (o, i) {
          if (mode === "done") {
            const cls = o.correct ? " correct" : "";
            const explain = o.correct ? '<div class="opt-explain">' + esc(o.explain) + "</div>" : "";
            return '<div class="option-btn quiz-opt done' + cls + '">' + esc(o.text) + explain + "</div>";
          }
          return '<button class="option-btn quiz-opt" data-i="' + i + '">' + esc(o.text) + "</button>";
        }).join("");
        return '<div class="quiz-box' + (mode === "done" ? " answered" : "") + '">' +
          '<div class="quiz-tag">' + (isPoll ? "◆ What do you think?" : "◆ Check yourself") + "</div>" +
          '<div class="quiz-q">' + fmt(block.question) + "</div>" +
          '<div class="options">' + opts + "</div></div>";
      }

      case "keypoints":
        return '<div class="keypoints"><h4>' + esc(block.title || "Key points") + "</h4><ul>" +
          block.items.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul></div>";

      case "try":
        return '<div class="try-box"><h4>⚑ Try this on shift</h4>' + fmt(block.text) + "</div>";

      case "tools": {
        const chips = block.ids.map(function (tid) {
          const t = (FWRD.toolkit || []).find(function (x) { return x.id === tid; });
          return t ? '<a class="badge" href="#toolkit/' + esc(tid) + '">' + esc(t.name) + "</a>" : "";
        }).join(" ");
        return '<div class="tools-row">' +
          (block.intro ? '<div class="small muted" style="margin-bottom:.4rem">' + esc(block.intro) + "</div>" : "") +
          '<div class="row">' + chips + "</div></div>";
      }

      case "action":
        return '<div class="action-row">' +
          (block.text ? '<div class="small muted" style="margin-bottom:.5rem">' + esc(block.text) + "</div>" : "") +
          '<a class="btn subtle" href="' + esc(block.href) + '">' + esc(block.label) + "</a></div>";

      default:
        return "";
    }
  }

  function armQuiz(container, block) {
    const box = container.querySelector(".quiz-box");
    const isPoll = !block.options.some(function (o) { return o.correct; });
    container.querySelectorAll("button.quiz-opt").forEach(function (btn) {
      btn.onclick = function () {
        if (box.classList.contains("answered")) return;
        box.classList.add("answered");
        const opt = block.options[Number(btn.getAttribute("data-i"))];

        function explainUnder(el, o) {
          const d = document.createElement("div");
          d.className = "opt-explain";
          d.textContent = o.explain;
          el.appendChild(d);
        }

        if (isPoll) {
          btn.classList.add("picked");
          explainUnder(btn, opt);
        } else if (opt.correct) {
          btn.classList.add("correct");
          explainUnder(btn, opt);
        } else {
          btn.classList.add("wrong");
          explainUnder(btn, opt);
          // also resolve the right answer so one click always teaches
          container.querySelectorAll("button.quiz-opt").forEach(function (b2) {
            const o2 = block.options[Number(b2.getAttribute("data-i"))];
            if (o2.correct) { b2.classList.add("correct"); explainUnder(b2, o2); }
          });
        }
        container.querySelectorAll("button.quiz-opt").forEach(function (b) { b.disabled = true; });
        setContinueEnabled(true);
      };
    });
  }

  /* ---------- completion ---------- */

  function showCompletion(reviewMode) {
    const lesson = current.lesson;
    const controls = document.getElementById("guide-controls");
    const next = lessons().find(function (l) { return l.num === lesson.num + 1; });
    const allDone = doneCount() >= total();

    let banner, actions;
    if (allDone && !next) {
      banner = "<h2>Guide complete — all " + total() + " lessons ✓</h2>" +
        "<p>You now hold more structured human-factors knowledge than most clinicians ever get taught. " +
        "Knowledge decays; behaviour is trained. The Scenario Lab is where these ideas become reflexes — go pressure-test yourself.</p>";
      actions = '<a class="btn" href="#scenarios">Open the Scenario Lab</a>' +
        '<a class="btn secondary" href="#guide">Back to the guide</a>';
    } else {
      banner = "<h2>Lesson " + lesson.num + " complete ✓</h2>" +
        "<p>" + esc(lesson.closing || "Let it settle — then keep going while the momentum is there.") + "</p>";
      actions = (next ? '<a class="btn" href="#guide/' + esc(next.id) + '">Next: Lesson ' + next.num + " — " + esc(next.title) + "</a>" : "") +
        '<a class="btn secondary" href="#guide">All lessons</a>' +
        '<a class="btn secondary" href="#home">Dashboard</a>';
    }

    controls.innerHTML =
      '<div class="outcome-banner good" style="margin-bottom:1rem">' + banner + "</div>" +
      '<div class="row">' + actions + "</div>";
    if (!reviewMode) smoothScroll(controls);
  }

  return {
    renderList: renderList,
    renderLesson: renderLesson,
    total: total,
    doneCount: doneCount,
    nextLesson: nextLesson
  };
})();
