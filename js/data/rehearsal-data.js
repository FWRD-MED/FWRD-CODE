/* ============================================================
   FWRD Mental Rehearsal scripts.
   Guided visualisation: the app shows each step for `sec` seconds
   (auto-advance), or the user steps through manually.
   Keep steps short — one mental image or action per step.
   ============================================================ */
window.FWRD = window.FWRD || {};

FWRD.rehearsals = [

  {
    id: "arrest-first-2-min",
    title: "Cardiac arrest — the first two minutes",
    minutes: 3,
    focus: ["Team & resources", "Communication"],
    blurb: "Walk through finding an unresponsive patient and running the scene until the crash team arrives. Rehearsing this sequence makes it available under real adrenaline.",
    steps: [
      { sec: 12, text: "Close your eyes if it helps. Take one slow breath out. You are on a night shift, walking onto a quiet ward." },
      { sec: 14, text: "A nurse calls out from a side room — urgent voice. Picture the corridor, the lighting, the sound. Feel your heart rate rise. That's normal. Let it happen." },
      { sec: 14, text: "You enter. A patient is grey and motionless in the bed. See yourself moving to them — controlled, not frantic. Shake and shout: no response." },
      { sec: 14, text: "Head tilt, look, listen, feel… nothing. Hear yourself say it out loud, clearly: \"This is a cardiac arrest.\" Naming it changes everything." },
      { sec: 16, text: "Now your first three commands, each to a named person: \"Put out the 2222 call — cardiac arrest, Ward 7 — and tell me when it's done.\" … \"Start compressions.\" … \"Bring the crash trolley.\"" },
      { sec: 14, text: "Picture compressions starting. Hear the nurse confirm: \"2222 call is out.\" Feel the scene click into structure because you gave it structure." },
      { sec: 14, text: "Pads going on. You step back — half a metre. Hands off. From here you can see the whole bed, the clock, the team. This is the leader's position." },
      { sec: 16, text: "Rhythm check. Say the words: \"Stop compressions… VF. Charging. Everybody clear — oxygen away.\" Scan the bed. \"Shocking.\" … \"Back on the chest.\"" },
      { sec: 14, text: "The crash team arrives. You don't melt away — you hand over: \"68-year-old, found unresponsive at 03:10, VF, one shock delivered, CPR ongoing.\" Ten seconds, then offer to keep your role or pass it." },
      { sec: 12, text: "Take one more slow breath out. Notice: at no point did you need to be the fastest person in the room — only the clearest." },
      { sec: 10, text: "Open your eyes. You've now run this arrest once today. The next one will feel familiar." }
    ]
  },

  {
    id: "sbar-escalation",
    title: "The 3am escalation call",
    minutes: 2,
    focus: ["Communication"],
    blurb: "Rehearse phoning a senior about a deteriorating patient — including the moment of self-doubt before you dial.",
    steps: [
      { sec: 12, text: "Picture yourself at the nurses' station, 3am. Obs chart in front of you. NEWS2 is 7 and climbing. You know you should call the registrar." },
      { sec: 14, text: "Notice the hesitation — \"is this worth waking them for?\" Observe that thought, then override it with your rule: NEWS2 ≥ 7 means I call. No negotiation." },
      { sec: 12, text: "Before dialling, take 20 seconds to set up: obs trend, drug chart, latest bloods in front of you. Picture laying them out." },
      { sec: 14, text: "Compose your opening sentence — situation plus your headline concern: \"I'm calling about a patient I think is septic and deteriorating.\" Hear yourself say it." },
      { sec: 16, text: "Now the structure. S: who and what. B: one line of context — \"74, day 2 post lap chole.\" A: the numbers that matter — \"NEWS2 8, BP 84 after a bolus.\" R: the ask — \"I need you to review her in the next 15 minutes.\"" },
      { sec: 14, text: "The registrar sounds tired and asks, \"Can it wait until the morning?\" Feel the pull to say yes. Instead, hear yourself: \"I'm not comfortable waiting — she's worse since I started the call.\"" },
      { sec: 12, text: "They agree to come. Before hanging up, close the loop: \"So you'll be here within 15 minutes — I'll get the next set of obs and a lactate ready.\"" },
      { sec: 10, text: "Notice how the structure carried you through the hardest part — being assertive — because the words were already decided." }
    ]
  },

  {
    id: "pre-shift-priming",
    title: "Pre-shift priming",
    minutes: 2,
    focus: ["Situational awareness", "Decision-making"],
    blurb: "A two-minute routine before any shift: set your intention, pre-load your tripwires, and decide in advance how you'll behave under pressure.",
    steps: [
      { sec: 12, text: "Stand still for a moment before you walk in. One slow breath out. You are about to take responsibility for sick people — that deserves 90 seconds of preparation." },
      { sec: 14, text: "Set one CRM intention for this shift. Just one. For example: \"Every instruction I give tonight gets a name attached.\" Choose yours now." },
      { sec: 14, text: "Pre-load your tripwires — the thresholds where you stop negotiating with yourself: NEWS2 ≥ 7, any falling GCS, any gut feeling of 'something is off' = I escalate." },
      { sec: 14, text: "Visualise the worst call of the shift arriving: the bleep, the unwell patient. Watch yourself walk, not run. Watch yourself start with A, B, C — not with the last diagnosis someone handed you." },
      { sec: 14, text: "Decide now what you'll do when task-saturated: pause, list the jobs, rank by 'who dies first without me', and hand off or defer the rest. Saying no to a low-priority task is patient safety." },
      { sec: 12, text: "Finally — picture yourself at the end of the shift, handing over calmly. That clinician made dozens of small CRM choices. You've just pre-made the important ones." },
      { sec: 8, text: "Walk in." }
    ]
  }
];
