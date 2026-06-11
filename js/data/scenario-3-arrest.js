/* ============================================================
   Scenario 3 — "Cardiac Arrest at 03:14" (Level 2)
   Focus: team & resource management, communication, leadership.
   Traps: the hands-on leader, instructions aimed at nobody,
          the silent rhythm check, the vanishing handover.
   ============================================================ */
window.FWRD = window.FWRD || {};
FWRD.scenarios = FWRD.scenarios || [];

FWRD.scenarios.push({
  id: "arrest-0314",
  title: "Cardiac Arrest at 03:14",
  level: 2,
  setting: "Medical ward · 03:14 · night shift",
  role: "You are the FY2 covering the medical wards. The crash team exists — but for the first few minutes of any arrest, the team is whoever is standing in the bay. Tonight that's you, two nurses (Maria and Priya) and a healthcare assistant (Tom).",
  estMinutes: 10,
  focus: ["rm", "comm", "em"],
  desc: "You are first doctor on scene at a cardiac arrest. The algorithm is the easy part — this scenario is about the first four minutes of leadership before the cavalry arrives.",
  briefing: "Resuscitation outcomes track with team behaviours: time to compressions, time to defibrillation, hands-off time, and the clarity of the leader's communication. Every one of those is a non-technical skill. You know the ALS algorithm; tonight tests whether you can run the ROOM.",
  learningPoints: [
    "Declare the emergency in words. 'This is a cardiac arrest — I'm leading' converts bystanders into a team.",
    "Tasks go to named people and come back as read-backs. 'Someone call 2222' reliably means nobody calls 2222.",
    "The leader's hands stay free. On the chest you can see one task; one step back, you can see the whole arrest.",
    "Handover to the crash team is a skill: ten seconds, structured, then take an assigned role — don't evaporate.",
    "The arrest isn't over at ROSC: a two-minute hot debrief is where the team (and you) bank the learning."
  ],
  start: "intro",
  nodes: {

    intro: {
      type: "info",
      text: "03:14. You're reviewing a drug chart when the emergency buzzer sounds from Bay 2 — then Maria's voice, sharp: \"Doctor! In here!\"\n\nMr Osei, 68, admitted with chest pain awaiting morning angiography, is grey and motionless. Maria is at the bedside. Priya and Tom are arriving behind you. No crash team — yet. Just you and the room.",
      cues: [
        "A known cardiac patient, suddenly unresponsive",
        "Three pairs of trained hands present — currently unstructured",
        "Everything in the next 60 seconds is time-critical"
      ],
      next: "d-confirm"
    },

    "d-confirm": {
      type: "decision",
      timeLimit: 15,
      text: "Your first ten seconds?",
      options: [
        {
          text: "Shake and shout, open the airway, look–listen–feel for up to 10 seconds — then say it loudly: \"This is a cardiac arrest.\"",
          next: "declared",
          quality: "good",
          scores: { dm: 2, sa: 2, comm: 2, rm: 1, em: 0 },
          feedback: "Confirmation done properly and FAST — then the declaration. Saying the words out loud is not theatre: it starts the clock in everyone's head, licenses the 2222 call, and tells the room the normal rules are suspended. Ambiguity is the enemy of the first minute.",
          principles: ["declare-emergency"]
        },
        {
          text: "He's clearly down — start compressions immediately yourself, hard and fast.",
          next: "hands-on-start",
          quality: "ok",
          scores: { dm: 1, sa: 0, comm: -1, rm: -1, em: 0 },
          trap: "The hands-on leader",
          feedback: "Compressions within seconds — genuinely good. But nobody confirmed the arrest, nobody has declared it, nobody is calling 2222, and the only doctor in the room now has their hands locked to the sternum and their field of view locked to one task. You've become the team's strongest pair of hands and removed its only available leader.",
          principles: ["declare-emergency"]
        },
        {
          text: "Sprint for the crash trolley in the corridor — you'll need the defib before anything matters.",
          next: "trolley-run",
          quality: "poor",
          scores: { dm: -1, sa: -1, comm: -1, rm: -2, em: 0 },
          feedback: "The defib matters — and three other people could have fetched it. The one resource only YOU can provide in this room is assessment and coordination; you've just removed it at the most information-dense moment of the arrest. Delegate objects; keep judgement.",
          principles: ["declare-emergency", "call-for-help"]
        }
      ]
    },

    "hands-on-start": {
      type: "info",
      text: "You're five compressions in when you realise the room behind you is frozen — Maria looking at Priya, Tom in the doorway. Nobody has called 2222. Nobody is getting the trolley. Your compressions are excellent and the arrest is leaderless.\n\nMaria breaks the spell: \"I'll put out the call—?\" You nod mid-compression. Seconds are leaking.",
      cues: [
        "A working team needs a coordinating voice more than it needs your hands",
        "Every unallocated task is currently waiting on improvisation"
      ],
      next: "d-roles"
    },

    "trolley-run": {
      type: "info",
      text: "You return 40 seconds later, dragging the trolley — to find Maria has started compressions and Priya is on the phone to switchboard. The team self-organised around your absence, which is to their credit and not your plan.\n\nYou're back in the room now. It still needs a leader.",
      next: "d-roles"
    },

    declared: {
      type: "info",
      text: "\"This is a cardiac arrest.\"\n\nThe words land. Three faces turn to you — and wait. This is the leadership moment: whatever happens in the next 30 seconds gets done because YOU say it, to a named person, out loud.",
      next: "d-roles"
    },

    "d-roles": {
      type: "decision",
      timeLimit: 20,
      text: "Three capable people are looking at you. Organise the first cycle.",
      options: [
        {
          text: "\"I'm leading. Maria — compressions now. Tom — crash trolley, then pads on the chest. Priya — 2222: cardiac arrest, Ward 9, Bay 2 — tell me when it's confirmed.\"",
          next: "cpr-running",
          quality: "good",
          scores: { rm: 3, comm: 3, dm: 1, sa: 1, em: 0 },
          feedback: "Four sentences, four owned tasks, and a read-back requested on the most critical one. You claimed leadership explicitly — so nobody wastes attention wondering who decides — and kept your own hands free for thinking. This is the whole of resource management in miniature.",
          principles: ["declare-emergency", "closed-loop"]
        },
        {
          text: "\"Right — someone call 2222, someone grab the trolley, let's get compressions going!\" — and you drop to the chest yourself to lead by example.",
          next: "vague-commands",
          quality: "poor",
          scores: { rm: -2, comm: -2, dm: 0, sa: -1, em: 0 },
          trap: "Tasks aimed at nobody",
          feedback: "Three correct tasks, zero owners. 'Someone' is the most dangerous word in resuscitation: each person assumes another is acting, and the diffusion of responsibility is invisible until you ask 'is the call out?' and meet silence. And once you're on the chest, there's no one watching the whole board.",
          principles: ["closed-loop", "declare-emergency"]
        },
        {
          text: "Start allocating, but take the 2222 call yourself — switchboard will take it more seriously from a doctor.",
          next: "phone-distraction",
          quality: "ok",
          scores: { rm: 0, comm: 0, dm: 0, sa: 0, em: 0 },
          feedback: "Switchboard takes 2222 calls equally seriously from anyone — that's the point of the number. While you dictated the ward name, you were unavailable to the patient and the team. Delegate everything that doesn't need your licence or your judgement; a phone call needs neither.",
          principles: ["closed-loop"]
        }
      ]
    },

    "vague-commands": {
      type: "info",
      text: "Forty seconds later, mid-compression, you look up: Tom went for the trolley AND Priya went for the trolley; they're untangling in the doorway. Nobody called 2222 — Maria thought Priya had, Priya thought Tom had.\n\n\"PRIYA — 2222, cardiac arrest, Ward 9 Bay 2 — tell me when it's done.\" \"Calling now.\" That's what it should have sounded like the first time. The pads finally come toward the chest.",
      next: "cpr-running"
    },

    "phone-distraction": {
      type: "info",
      text: "You're mid-sentence with switchboard when Maria calls across: \"Pads are on — do we shock?\" You cover the mouthpiece, half-answer, lose your place with switchboard, repeat the ward name twice.\n\nThe call goes out 30 seconds slower than it needed to, and the rhythm check waited on a leader who was on hold. You hand the phone off and step back in.",
      next: "cpr-running"
    },

    "cpr-running": {
      type: "info",
      text: "Compressions are running. Pads on. The 2222 call is confirmed out — crash team is 2–3 minutes away.\n\nThe defib announces: \"Analysing rhythm — stand clear.\" The screen shows coarse VF.\n\nThe room looks at you again.",
      vitals: [
        { label: "Rhythm", value: "VF", state: "bad" },
        { label: "CPR", value: "ongoing", state: "warn" },
        { label: "Pads", value: "attached", state: "ok" },
        { label: "Crash team", value: "2–3 min", state: "warn" }
      ],
      next: "d-shock"
    },

    "d-shock": {
      type: "decision",
      timeLimit: 20,
      text: "VF on the screen. Run the shock.",
      options: [
        {
          text: "\"VF — shockable. Charging to 150. Compressions continue while charging… Everybody clear — oxygen away — top, middle, bottom clear. Shocking.\" … \"Shock delivered — back on the chest.\"",
          next: "cycle-two",
          quality: "good",
          scores: { dm: 2, comm: 2, sa: 1, em: 1, rm: 0 },
          feedback: "A verbalised, choreographed shock: the rhythm named aloud (shared mental model), charging during compressions (minimal hands-off time), a visual sweep with the safety calls, and compressions back instantly. The words ARE the safety system.",
          principles: ["closed-loop", "checklists"]
        },
        {
          text: "Deliver the shock with a quick \"clear!\", eyes on the buttons.",
          next: "unsafe-shock",
          quality: "poor",
          scores: { dm: 0, comm: -1, sa: -2, em: -1, rm: 0 },
          trap: "Procedure without verification",
          feedback: "\"Clear\" is a question wearing the costume of a statement — it only works if you LOOK for the answer. Tom's hand was still steadying the oxygen tubing on the pillow. A safety call without a visual sweep is noise, not safety.",
          principles: ["closed-loop"]
        },
        {
          text: "Hesitate — \"Is that VF or is it artefact? Can someone else look?\" — and wait for consensus while compressions pause.",
          next: "hesitation",
          quality: "ok",
          scores: { dm: -1, comm: 0, sa: 0, em: 0, rm: 0 },
          feedback: "Asking for a second opinion isn't wrong — but pausing compressions while the committee deliberates is. The default under rhythm uncertainty is: compressions back ON while you decide. Hands-off seconds are the currency of arrest outcomes; spend them only on shocks.",
          principles: ["t-dodar"]
        }
      ]
    },

    "unsafe-shock": {
      type: "info",
      text: "The shock fires. Tom snatches his hand back from the pillow — he was a centimetre from the patient, steadying the oxygen tubing. Nothing happened. This time.\n\nMaria's eyes meet yours for half a second. Then: \"Back on the chest,\" you say, and the cycle resumes. The near-miss goes on the list for later — because there must be a later where it's spoken about.",
      next: "cycle-two"
    },

    hesitation: {
      type: "info",
      text: "Eight seconds of still chest while three of you squint at the screen. It's VF — it was always VF. \"Charging — everybody clear—\" The shock goes in late but clean, and compressions resume.\n\nNote for the debrief: uncertainty is fine; idle hands during uncertainty are not.",
      next: "cycle-two"
    },

    "cycle-two": {
      type: "info",
      text: "Two minutes of CPR underway. Maria's compressions are strong; Tom is ready to swap. Priya has the drugs box open.\n\nYou have ninety seconds of relative calm before the next rhythm check — the moment most teams either get organised or stay chaotic.",
      next: "d-ten"
    },

    "d-ten": {
      type: "decision",
      text: "Ninety seconds until the rhythm check. How do you use the leader's quiet moment?",
      options: [
        {
          text: "A 10-second recap to the room: \"Team — 68-year-old, awaiting angio, VF arrest, one shock given. Likely cardiac cause. Next rhythm check in 90 seconds; Tom takes over compressions then. Priya — adrenaline ready per algorithm. Anything I'm missing — anyone?\"",
          next: "team-arrives",
          quality: "good",
          scores: { sa: 3, comm: 2, rm: 2, em: 1, dm: 1 },
          feedback: "The '10 seconds for 10 minutes' pause, used exactly where it belongs: everyone now holds the same story, the next two tasks are pre-allocated, and you've explicitly invited challenge. Teams that synchronise in the quiet moments don't fall apart in the loud ones.",
          principles: ["ten-for-ten", "declare-emergency"]
        },
        {
          text: "Use the time to get IV access yourself — it needs doing and you're the best cannulator here.",
          next: "task-tunnel",
          quality: "ok",
          scores: { sa: -1, comm: 0, rm: -1, em: 0, dm: 0 },
          trap: "Task tunnelling",
          feedback: "Access does need doing — and the moment your eyes are on a vein, nobody is watching the clock, the compression quality, or the door. If a task can't be delegated, fine — but say so, and name who watches the room while you're inside the task: \"Maria, you're my eyes — call the two-minute mark.\"",
          principles: ["ten-for-ten", "declare-emergency"]
        },
        {
          text: "Stand quietly and watch the compressions — no need to fill silence with talking.",
          next: "team-arrives-quiet",
          quality: "ok",
          scores: { sa: 1, comm: -1, rm: 0, em: 0, dm: 0 },
          feedback: "Watching is half the job — but a silent leader is a single point of failure. Everything you've noticed and planned currently exists in exactly one head. If the crash team walked in now, or you had to step out, the team's shared picture would be one shrug deep.",
          principles: ["ten-for-ten"]
        }
      ]
    },

    "task-tunnel": {
      type: "info",
      text: "You're flushing the cannula — a good line, nicely done — when you register that the compressions stopped four seconds ago. Tom and Maria mid-swap, both looking at you: \"Rhythm check, doctor?\" The two-minute mark came and went while you were in a vein.\n\nYou re-surface and pick the room back up. The line will be useful. The lost seconds won't come back.",
      next: "team-arrives"
    },

    "team-arrives-quiet": {
      type: "info",
      text: "The crash team arrives ninety seconds later — and the registrar's first three questions (\"Down time? Shocks? Access?\") are all answered by you alone, while Maria and Priya, who did the work, stand silent. They knew the answers; they'd just never heard the story assembled out loud.\n\nIt cost nothing tonight. In a longer arrest, a one-headed picture is a fragile one.",
      next: "d-handover"
    },

    "team-arrives": {
      type: "info",
      text: "The doors swing: crash team — med reg, anaesthetist, ICU nurse, porter with the airway kit. The registrar scans the scene: organised CPR, pads on, drugs drawn, a team that knows its roles.\n\n\"Who's leading?\" she asks.",
      next: "d-handover"
    },

    "d-handover": {
      type: "decision",
      timeLimit: 25,
      text: "\"Who's leading?\" — Hand over the arrest.",
      options: [
        {
          text: "\"I am — handing over: Mr Osei, 68, in with chest pain awaiting angio. Arrested 03:14, VF, one shock at 03:17, CPR ongoing, adrenaline not yet given, IV access in the right arm. Happy to hand you the lead — I can scribe or run drugs.\"",
          next: "rosc",
          quality: "good",
          scores: { comm: 3, rm: 2, sa: 1, dm: 1, em: 0 },
          feedback: "A ten-second structured handover with times, rhythm, and interventions — then an explicit transfer of leadership AND an offer to stay in a named role. The information moved cleanly, the team gained a member instead of losing one, and there is still exactly one leader.",
          principles: ["sbar", "declare-emergency"]
        },
        {
          text: "Step back with relief: \"All yours\" — and drift toward the corridor. The experts have it now.",
          next: "vanish",
          quality: "poor",
          scores: { comm: -2, rm: -2, sa: 0, dm: 0, em: -1 },
          trap: "The vanishing handover",
          feedback: "Everything you know — down time, shock time, the near-miss with the oxygen, what's been given — just walked toward the corridor inside your head. 'All yours' transfers authority but not information. The crash team will now spend their first two minutes re-discovering your first four.",
          principles: ["sbar"]
        },
        {
          text: "\"I've got it, thanks — Maria, continue compressions—\" and carry on leading. You know this patient; a mid-arrest leadership swap is a risk.",
          next: "territorial",
          quality: "ok",
          scores: { comm: 0, rm: -1, sa: 0, dm: 0, em: 0 },
          feedback: "Continuity has real value, and saying so is legitimate — but the med reg leads hospital arrests for a living and carries decision rights you don't (when to stop, ICU disposition, advanced interventions). The skilled move is the brief negotiation: hand over the lead, state what you offer, take a role. Team hierarchy is a resource; use it.",
          principles: ["declare-emergency", "pace"]
        }
      ]
    },

    vanish: {
      type: "info",
      text: "From the doorway you watch the registrar ask the room: \"Down time? … Anyone? How many shocks?\" Maria answers what she can. The team rebuilds the timeline from the defib's memory.\n\nThe registrar catches your eye before you're gone: \"You were first on scene? Stay — scribe for me, and talk me through it.\" You come back. The information comes with you.",
      next: "rosc"
    },

    territorial: {
      type: "info",
      text: "There's a two-second standoff. The registrar, evenly: \"You've run a good arrest, doctor. I have the team lead now — I'd like you on drugs, and your story in thirty seconds.\"\n\nShe's right, and the graceful version of this exchange was available to you for free. You hand over, take the drugs role, and the rhythm of the room recovers.",
      next: "rosc"
    },

    rosc: {
      type: "info",
      text: "Third rhythm check: organised rhythm — pulse check — \"We have a pulse.\" ROSC at 03:26.\n\nMr Osei, ventilated and supported, leaves for the cath lab and then ICU. The corridor clock says barely twelve minutes since the buzzer. The bay looks like a storm went through it. Tom is very quiet. Priya is already restocking the trolley as if nothing happened.",
      vitals: [
        { label: "Rhythm", value: "sinus", state: "ok" },
        { label: "HR", value: "92", state: "ok" },
        { label: "BP", value: "104/68", state: "warn" },
        { label: "SpO₂", value: "97% (vent)", state: "ok" },
        { label: "ROSC", value: "03:26", state: "ok" }
      ],
      next: "d-debrief"
    },

    "d-debrief": {
      type: "decision",
      text: "The patient is away. The team is dispersing toward their interrupted work. Last call of the night:",
      options: [
        {
          text: "\"Before we scatter — two minutes, everyone. What went well, what was hard, what do we change next time? … And honestly — is everyone okay? Tom?\"",
          next: "end-good",
          quality: "good",
          scores: { em: 3, comm: 1, rm: 1, sa: 0, dm: 0 },
          feedback: "The hot debrief: four questions, two minutes, run while the event is still warm. It catches the fixable (the 2222 confusion, the oxygen near-miss) before memory smooths it over, and it checks the humans — Tom has never seen an arrest before tonight. Teams that debrief turn every arrest into training; teams that don't just have the arrest.",
          principles: ["aar"]
        },
        {
          text: "Everyone's exhausted and the job list has been growing for twenty minutes — thank them warmly and get back to work. The morning team can reflect.",
          next: "end-mixed-nodebrief",
          quality: "poor",
          scores: { em: -2, comm: 0, rm: 0, sa: 0, dm: 0 },
          feedback: "Understandable — and it's how the oxygen near-miss becomes nobody's memory by Thursday, how Tom drives home at 8am replaying it alone, and how the 2222 confusion happens identically next month. The debrief costs two minutes. Its absence costs the learning, every time.",
          principles: ["aar"]
        }
      ]
    },

    "end-good": {
      type: "end",
      outcome: "good",
      summary: "ROSC in twelve minutes, and — just as importantly — a team that finished the night more capable than it started: roles were named, loops were closed, the handover carried the information, and the debrief banked the lessons. Notice how little of tonight was medical knowledge: the algorithm decided perhaps three of your choices. The rest was the room, and you ran the room."
    },

    "end-mixed-nodebrief": {
      type: "end",
      outcome: "mixed",
      summary: "The resuscitation succeeded — and the learning evaporated down the corridor with the team. The near-misses of this arrest (and every arrest has them) will be back. Two extra minutes would have made them everyone's property instead of nobody's. The patient survived tonight; the debrief is how the NEXT patient benefits."
    }
  }
});
