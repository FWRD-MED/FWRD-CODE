/* ============================================================
   FWRD state — progress storage (browser localStorage),
   skill averages, streaks, level unlocking, settings.
   ============================================================ */
window.FWRD = window.FWRD || {};

/* The five CRM skill domains. Weights follow the design spec:
   SA 25%, Communication 25%, Decision-making 25%, Resource 15%, Error 10%. */
FWRD.DOMAINS = [
  { key: "sa",   name: "Situational awareness", weight: 0.25 },
  { key: "comm", name: "Communication",         weight: 0.25 },
  { key: "dm",   name: "Decision-making",       weight: 0.25 },
  { key: "rm",   name: "Resource management",   weight: 0.15 },
  { key: "em",   name: "Error management",      weight: 0.10 }
];

FWRD.masteryLabel = function (pct) {
  if (pct == null) return { label: "Not yet assessed", cls: "" };
  if (pct >= 80) return { label: "Proficient", cls: "good" };
  if (pct >= 60) return { label: "Competent", cls: "" };
  if (pct >= 40) return { label: "Developing", cls: "warn" };
  return { label: "Novice", cls: "bad" };
};

FWRD.state = (function () {
  const KEY = "fwrd-crm-v1";

  function defaults() {
    return {
      results: [],     // completed scenario runs
      rehearsals: [],  // completed rehearsal sessions
      settings: { timed: true, unlockAll: false },
      // Post-scenario survey prompt: status 'none' (keep asking politely),
      // 'opened' (they visited the survey — stop), 'never' (they opted out).
      // snoozeUntil = completed-scenario count at which we may ask again.
      feedback: { status: "none", snoozeUntil: 0 },
      // Beginner's Guide progress: lessonId -> { block: <next unread block>, done: bool }
      guide: {}
    };
  }

  let memoryFallback = null;

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaults();
      const parsed = JSON.parse(raw);
      return Object.assign(defaults(), parsed, {
        settings: Object.assign(defaults().settings, parsed.settings || {}),
        feedback: Object.assign(defaults().feedback, parsed.feedback || {}),
        guide: parsed.guide || {}
      });
    } catch (e) {
      return memoryFallback || defaults();
    }
  }

  function persist() {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) {
      memoryFallback = data; // private browsing etc. — keep session-only
    }
  }

  let data = load();

  function localDay(iso) {
    const d = iso ? new Date(iso) : new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  return {
    get: function () { return data; },

    setting: function (k) { return data.settings[k]; },
    setSetting: function (k, v) { data.settings[k] = v; persist(); },

    addResult: function (r) { data.results.push(r); persist(); },
    setLastReflection: function (text) {
      if (data.results.length) {
        data.results[data.results.length - 1].reflection = text;
        persist();
      }
    },
    addRehearsal: function (r) { data.rehearsals.push(r); persist(); },

    /* Best overall score achieved on a given scenario, or null. */
    bestFor: function (scenarioId) {
      let best = null;
      data.results.forEach(function (r) {
        if (r.scenarioId === scenarioId && (best === null || r.overall > best)) best = r.overall;
      });
      return best;
    },

    /* Rolling average per domain over the last 5 scenario runs. */
    domainAverages: function () {
      const recent = data.results.slice(-5);
      const out = {};
      FWRD.DOMAINS.forEach(function (d) {
        const vals = recent.map(function (r) { return r.domains[d.key]; })
                           .filter(function (v) { return v != null; });
        out[d.key] = vals.length
          ? Math.round(vals.reduce(function (a, b) { return a + b; }, 0) / vals.length)
          : null;
      });
      return out;
    },

    overallAverage: function () {
      const recent = data.results.slice(-5);
      if (!recent.length) return null;
      return Math.round(recent.reduce(function (a, r) { return a + r.overall; }, 0) / recent.length);
    },

    /* Consecutive days (ending today or yesterday) with any training activity. */
    streak: function () {
      const days = {};
      data.results.forEach(function (r) { days[localDay(r.date)] = true; });
      data.rehearsals.forEach(function (r) { days[localDay(r.date)] = true; });

      let count = 0;
      const cursor = new Date();
      if (!days[localDay(cursor.toISOString())]) cursor.setDate(cursor.getDate() - 1); // streak survives until end of today
      while (days[cursor.getFullYear() + "-" + String(cursor.getMonth() + 1).padStart(2, "0") + "-" + String(cursor.getDate()).padStart(2, "0")]) {
        count++;
        cursor.setDate(cursor.getDate() - 1);
      }
      return count;
    },

    /* Progression: Level 1 open; Level 2 needs one run ≥ 60;
       Level 3 needs two runs ≥ 65. 'Unlock all' bypasses. */
    maxUnlockedLevel: function () {
      if (data.settings.unlockAll) return 3;
      let level = 1;
      if (data.results.some(function (r) { return r.overall >= 60; })) level = 2;
      if (data.results.filter(function (r) { return r.overall >= 65; }).length >= 2) level = 3;
      return level;
    },

    /* ---- Beginner's Guide progress ---- */
    guideProgress: function (lessonId) {
      return data.guide[lessonId] || { block: 0, done: false };
    },
    guideSetBlock: function (lessonId, blockIndex) {
      const g = data.guide[lessonId] || { block: 0, done: false };
      if (blockIndex > g.block) { g.block = blockIndex; data.guide[lessonId] = g; persist(); }
    },
    guideComplete: function (lessonId) {
      if (!data.guide[lessonId] || !data.guide[lessonId].done) {
        data.guide[lessonId] = { block: 9999, done: true, completedAt: new Date().toISOString() };
        persist();
      }
    },
    guideDoneCount: function () {
      return Object.keys(data.guide).filter(function (k) { return data.guide[k].done; }).length;
    },

    /* ---- feedback survey prompting ---- */
    shouldPromptFeedback: function () {
      return data.feedback.status === "none" &&
             data.results.length >= 1 &&
             data.results.length >= data.feedback.snoozeUntil;
    },
    feedbackOpened: function () {
      if (data.feedback.status === "none") { data.feedback.status = "opened"; persist(); }
    },
    feedbackNever: function () {
      data.feedback.status = "never"; persist();
    },
    feedbackSnooze: function () {
      // ask again two completed scenarios from now
      data.feedback.snoozeUntil = data.results.length + 2; persist();
    },

    unlockHint: function (level) {
      if (level === 2) return "Unlocks after any scenario completed with an overall score of 60%+.";
      if (level === 3) return "Unlocks after two scenarios completed with overall scores of 65%+.";
      return "";
    }
  };
})();
