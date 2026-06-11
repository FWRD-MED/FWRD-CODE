/* ============================================================
   Scenario 4 — "Just Drunk?" (Level 3)
   Focus: situational awareness, error management,
          graded assertiveness up the hierarchy.
   Traps: the inherited label, double premature closure
          (the glucose 'explains it'), the authority gradient.
   ============================================================ */
window.FWRD = window.FWRD || {};
FWRD.scenarios = FWRD.scenarios || [];

FWRD.scenarios.push({
  id: "drowsy-amu",
  title: "Just Drunk?",
  level: 3,
  setting: "Acute Medical Unit · 23:30 · night shift",
  role: "You are the FY2 holding the AMU overnight. The medical registrar covers AMU, the wards and referrals — stretched thin and guarding the CT list like a dragon.",
  estMinutes: 12,
  focus: ["sa", "em", "comm"],
  desc: "A patient arrives with a diagnosis already attached: 'drunk again, sleeping it off'. Labels are sticky, seniors are busy, and the truth is on a CT scanner nobody wants to use tonight.",
  briefing: "The hardest cognitive work in medicine isn't making a diagnosis — it's UN-making one that arrived with the patient. This scenario layers three classic incident-report ingredients: an inherited label, a finding that conveniently 'explains everything', and a senior who isn't listening. Your tools: relentless re-assessment, and rehearsed assertive language.",
  learningPoints: [
    "Treat every inherited diagnosis as a hypothesis, especially for patients 'well known to the department'.",
    "Anticoagulation + any possible head trauma + reduced GCS = intracranial bleed until proven otherwise.",
    "Beware the finding that explains everything: a real abnormality (like mild hypoglycaemia) can shelter a deadlier one.",
    "Trends beat snapshots: a GCS of 13 means little; 14 → 13 → 11 means everything.",
    "Graded assertiveness (PACE) exists for exactly one moment: when you're right, junior, and being dismissed."
  ],
  start: "intro",
  nodes: {

    intro: {
      type: "info",
      text: "23:30. Evening FY2, coat already on, hands you the AMU list:\n\n\"…and bed 14, Mr Kowalski, 58. Found sitting on the pavement outside the Red Lion, ambulance brought him in. He's one of our regulars — drunk again. Obs fine, GCS 14 on arrival, nothing to do, just letting him sleep it off. Right, I'm off — good luck!\"\n\nThe label is attached. The handover is already walking away.",
      cues: [
        "'One of our regulars' — the phrase that switches off assessment",
        "GCS 14 is NOT normal, however familiar the patient",
        "'Found on the pavement' — found how? Fell? Collapsed? Assaulted?"
      ],
      next: "d-handover"
    },

    "d-handover": {
      type: "decision",
      text: "The evening FY2 has one foot out of the door. Do you let them go?",
      options: [
        {
          text: "\"Thirty seconds before you go — Kowalski: what's he on? Any sign of injury? What was his glucose? And 14 on arrival — what is it now?\"",
          next: "handover-details",
          quality: "good",
          scores: { sa: 3, em: 2, comm: 1, dm: 1, rm: 0 },
          feedback: "Four questions, thirty seconds, and the label is back under examination. The highest-yield moment to catch an inherited error is at the handover that transmits it — after this, the assumptions become YOUR assumptions and much harder to see.",
          principles: ["fixation", "sa-levels"]
        },
        {
          text: "\"No worries — get home safe.\" A regular sleeping it off needs no interrogation, and you have a full unit to cover.",
          next: "night-call",
          quality: "poor",
          scores: { sa: -2, em: -2, comm: 0, dm: -1, rm: 0 },
          trap: "The inherited label",
          feedback: "The diagnosis just passed between two doctors without either of them examining it. 'Well known to the department' is epidemiology, not assessment — frequent attenders with alcohol dependence are at HIGHER risk of head injury, hypoglycaemia and sepsis, not lower. The label travels; the risk stays.",
          principles: ["fixation"]
        },
        {
          text: "Say nothing, but put him first on your round — you'll assess from scratch and trust nothing.",
          next: "bedside-cold",
          quality: "ok",
          scores: { sa: 1, em: 1, comm: -1, dm: 0, rm: 0 },
          feedback: "Healthy scepticism — but you let the one person who saw him at arrival leave unquestioned. 'Trust nothing' still needs the baseline: without knowing he was GCS 14 at 21:00, tonight's GCS 13 looks static instead of falling. You'll be reconstructing what one question would have handed you.",
          principles: ["sa-levels"]
        }
      ]
    },

    "handover-details": {
      type: "info",
      text: "The evening FY2 pauses, scrolls back through the clerking:\n\n\"On apixaban — AF. Er… there's a graze on his left temple, presumed from sitting down hard on the pavement. Glucose… doesn't look like anyone did one. And the GCS — that was triage, nobody's repeated it.\"\n\nA beat of silence. You both hear it now: an anticoagulated man with a head mark and a reduced conscious level, filed under 'drunk'.",
      cues: [
        "Apixaban: any head knock can become an intracranial bleed",
        "Graze on the temple: there WAS an impact",
        "No glucose, no repeat GCS: the 'obs fine' was a snapshot, hours old"
      ],
      next: "d-priority"
    },

    "d-priority": {
      type: "decision",
      text: "You have six new patients to clerk, two cannulas down, and bed 14. Where does Mr Kowalski go on your list?",
      options: [
        {
          text: "Top. Anticoagulant + head injury + reduced GCS outranks everything routine — you go now, asking the nurse to bring a glucose meter and start formal neuro obs.",
          next: "bedside",
          quality: "good",
          scores: { dm: 3, rm: 2, sa: 1, em: 1, comm: 1 },
          feedback: "Correct triage: nothing else on the list can kill anyone in the next hour; this can. And you mobilised the nurse in parallel — glucose and neuro obs running while you walk. Prioritisation isn't about working faster; it's about being unapologetic that the queue has an order.",
          principles: ["call-for-help", "t-dodar"]
        },
        {
          text: "Ask the nurse to do a glucose and half-hourly neuro obs on bed 14, and call you if GCS drops — you'll come after the two cannulas.",
          next: "bedside-delayed",
          quality: "ok",
          scores: { dm: 1, rm: 1, sa: 0, em: 0, comm: 1 },
          feedback: "Good delegation, wrong order. Neuro obs detect deterioration; they don't prevent it — and the assessment that changes management (your own eyes, the pupils, the history of the fall) is still unstarted. The cannulas have no deadline. He might.",
          principles: ["t-dodar"]
        },
        {
          text: "He's been stable since 21:00 — slot him into the normal round order and clear the backlog first.",
          next: "night-call",
          quality: "poor",
          scores: { dm: -2, rm: -1, sa: -1, em: -1, comm: 0 },
          trap: "Normalcy bias",
          feedback: "'Stable since 21:00' means 'unobserved since 21:00' — nobody has measured anything in hours. You've converted an absence of data into reassurance. That's normalcy bias, and on an anticoagulated head it has a body count.",
          principles: ["fixation", "sa-levels"]
        }
      ]
    },

    "night-call": {
      type: "info",
      text: "01:40. You're three clerkings deep when Nurse Adeyemi finds you, not bothering with the bleep:\n\n\"Bed 14 — I can't wake him properly. He was talking nonsense an hour ago, now he's just groaning. And he's vomited.\"\n\nYou pull the clerking en route: apixaban for AF. Graze, left temple. No glucose ever recorded. The label said sleeping it off. The label has been wrong for hours.",
      next: "bedside-late"
    },

    "bedside-cold": {
      type: "info",
      text: "You take bed 14 first, knowing only the corridor version of the story. The clerking fills in the gaps as you walk: apixaban for AF, graze on the left temple, no glucose recorded, GCS not repeated since triage.\n\nEverything you'd have asked at handover, recovered the slow way.",
      next: "bedside"
    },

    bedside: {
      type: "info",
      text: "Bed 14. Mr Kowalski is snoring, smells strongly of alcohol, and rouses to voice — opens eyes, mumbles, localises. GCS 13 (E3 V4 M6); triage had him at 14. The graze sits over his left temple, a little swollen underneath. Pupils equal and reactive. Glucose: 3.4.\n\nNurse Adeyemi raises an eyebrow: \"Sugar's low. That'll be it, then?\"",
      vitals: [
        { label: "GCS", value: "13 (↓ from 14)", state: "warn" },
        { label: "Glucose", value: "3.4", state: "warn" },
        { label: "HR", value: "88", state: "ok" },
        { label: "BP", value: "142/84", state: "ok" },
        { label: "SpO₂", value: "96%", state: "ok" },
        { label: "Pupils", value: "equal, reactive", state: "ok" }
      ],
      cues: [
        "GCS has FALLEN by a point since triage — the trend is the headline",
        "Hypoglycaemia found: real, treatable… and capable of explaining everything",
        "Swelling under the graze: that impact had force behind it"
      ],
      next: "d-glucose"
    },

    "bedside-delayed": {
      type: "info",
      text: "00:50. Second cannula done. Nurse Adeyemi's neuro obs land as you finish: GCS 13, glucose 3.4. He was 14 at triage.\n\nYou head to bed 14, forty minutes later than the version of you that went straight there. He's snoring, alcohol on his breath, rouses to voice. The graze on his left temple is swollen underneath. Pupils equal, reactive — for now.",
      vitals: [
        { label: "GCS", value: "13 (↓ from 14)", state: "warn" },
        { label: "Glucose", value: "3.4", state: "warn" },
        { label: "HR", value: "88", state: "ok" },
        { label: "BP", value: "142/84", state: "ok" },
        { label: "SpO₂", value: "96%", state: "ok" },
        { label: "Pupils", value: "equal, reactive", state: "ok" }
      ],
      next: "d-glucose"
    },

    "bedside-late": {
      type: "info",
      text: "Bed 14, 01:45. He groans to pain, doesn't open his eyes, flexes — GCS 8 (E2 V2 M4). Vomit on the pillow. His left pupil is larger than the right and sluggish. Glucose, checked now for the first time: 3.4.\n\nFour hours under a label. Adeyemi is already pulling the obs trolley round.",
      vitals: [
        { label: "GCS", value: "8", state: "bad" },
        { label: "Glucose", value: "3.4", state: "warn" },
        { label: "Pupils", value: "L > R, sluggish", state: "bad" },
        { label: "HR", value: "62", state: "warn" },
        { label: "BP", value: "168/90", state: "bad" },
        { label: "SpO₂", value: "94%", state: "warn" }
      ],
      next: "d-late-response"
    },

    "d-glucose": {
      type: "decision",
      text: "\"Sugar's low. That'll be it, then?\" — Adeyemi is half-asking, half-hoping. Your call.",
      options: [
        {
          text: "\"It's one of it — treat the glucose now. But he's anticoagulated with a head injury and a falling GCS, so this is TWO problems until proven one. After the glucose: repeat GCS, half-hourly neuro obs, and if he isn't back to 15 I'm requesting a CT head.\"",
          next: "recheck",
          quality: "good",
          scores: { dm: 3, sa: 2, em: 2, comm: 2, rm: 1 },
          feedback: "The expert move: treat the treatable WITHOUT letting it absorb the whole differential. 'Two problems until proven one' keeps the bleed on the table while the glucose gets fixed — and you've pre-committed to an action threshold ('not back to 15 → CT'), which protects future-you from renegotiating with fatigue at 2am.",
          principles: ["fixation", "t-dodar", "rpd"]
        },
        {
          text: "\"Low sugar on a skinful of alcohol — yes, that explains the drowsiness. Treat it and he'll perk up. Recheck in an hour.\"",
          next: "recheck-closed",
          quality: "poor",
          scores: { dm: -2, sa: -1, em: -2, comm: 0, rm: 0 },
          trap: "Premature closure (the convenient finding)",
          feedback: "The most dangerous abnormal result is the one that explains everything — it ends the search. Mild hypoglycaemia genuinely causes drowsiness; it does NOT cause a swelling temple on an anticoagulated man. You've treated the finding that was easy to find.",
          principles: ["fixation"]
        },
        {
          text: "Skip the sugar — the head is the worry. Straight to arranging a CT before anything else.",
          next: "recheck-untreated",
          quality: "ok",
          scores: { dm: 0, sa: 1, em: 0, comm: 0, rm: -1 },
          feedback: "Right instinct on the head, wrong sequencing: hypoglycaemia is fixable in ninety seconds, worsens conscious level (muddying the very GCS trend you need), and left untreated will sabotage your escalation call — 'sort the sugar first' is the easiest brush-off you could hand a busy registrar.",
          principles: ["t-dodar"]
        }
      ]
    },

    "recheck": {
      type: "info",
      text: "Glucose treated; repeat reading 6.2. For twenty minutes he brightens — GCS 14, mumbling complaints about the lights. It would be easy to file this as solved.\n\nAt 01:15, Adeyemi's half-hourly obs: GCS 11 (E3 V3 M5). He's vomited once. The left pupil is now a shade larger than the right, and slower.\n\nThe glucose is 6.2. The story it was covering for is coming through.",
      vitals: [
        { label: "GCS", value: "11 (was 14)", state: "bad" },
        { label: "Glucose", value: "6.2", state: "ok" },
        { label: "Pupils", value: "L sluggish", state: "bad" },
        { label: "HR", value: "70", state: "ok" },
        { label: "BP", value: "156/88", state: "warn" },
        { label: "SpO₂", value: "95%", state: "ok" }
      ],
      cues: [
        "GCS falling WITH a normal glucose: the convenient explanation is dead",
        "New vomiting + evolving pupil asymmetry: raised intracranial pressure",
        "Your pre-committed threshold has been crossed"
      ],
      next: "d-respond"
    },

    "recheck-closed": {
      type: "info",
      text: "Glucose treated; he brightens briefly and you move on, satisfied.\n\n01:50. Adeyemi fast-bleeps you: \"Bed 14 — GCS 10 and dropping, he's vomited twice, and his left pupil's bigger than the right.\" Repeat glucose: 6.2. Normal. The explanation you closed the case with has just resigned.\n\nYou're back at the bedside, an hour further down a curve that was always heading here.",
      vitals: [
        { label: "GCS", value: "10", state: "bad" },
        { label: "Glucose", value: "6.2", state: "ok" },
        { label: "Pupils", value: "L > R, sluggish", state: "bad" },
        { label: "HR", value: "66", state: "warn" },
        { label: "BP", value: "162/90", state: "bad" },
        { label: "SpO₂", value: "95%", state: "ok" }
      ],
      next: "d-respond"
    },

    "recheck-untreated": {
      type: "info",
      text: "While you're on hold to radiology, Adeyemi treats the glucose on her own initiative (correctly) and runs a fresh set of neuro obs.\n\n01:15: glucose 6.2, GCS 11, one vomit, left pupil sluggish. The picture has clarified itself in the worst way — and your CT request just acquired the trend data that makes it undeniable.",
      vitals: [
        { label: "GCS", value: "11", state: "bad" },
        { label: "Glucose", value: "6.2", state: "ok" },
        { label: "Pupils", value: "L sluggish", state: "bad" },
        { label: "HR", value: "70", state: "ok" },
        { label: "BP", value: "156/88", state: "warn" },
        { label: "SpO₂", value: "95%", state: "ok" }
      ],
      next: "d-respond"
    },

    "d-respond": {
      type: "decision",
      timeLimit: 25,
      text: "GCS 11 and falling, normal glucose, vomiting, evolving pupil asymmetry, on apixaban, head injury. Next move?",
      options: [
        {
          text: "Name it and mobilise: \"This is an intracranial bleed until proven otherwise.\" A–E, airway watch given falling GCS, urgent CT head request, and the registrar on the phone NOW — in parallel, with Adeyemi owning the obs.",
          next: "d-reg",
          quality: "good",
          scores: { dm: 3, sa: 1, em: 2, rm: 2, comm: 1 },
          feedback: "Declared, prioritised, parallelised. Saying 'bleed until proven otherwise' out loud commits the team to the worst-case pathway — the only safe default for an anticoagulated falling GCS. And everything moves at once: nothing in this picture rewards sequential working.",
          principles: ["declare-emergency", "ooda", "ten-for-ten"]
        },
        {
          text: "Could this be a post-ictal state, or the alcohol peaking? Give it 30 more minutes of close obs to declare itself before waking anyone.",
          next: "drift",
          quality: "poor",
          scores: { dm: -3, sa: -1, em: -2, rm: -1, comm: 0 },
          trap: "Searching for a softer diagnosis",
          feedback: "Notice the pattern: each time the data worsens, a new benign explanation auditions for the role the glucose just vacated. That's motivated reasoning under fatigue. A falling GCS on an anticoagulant doesn't get 30 minutes of benefit of the doubt — the doubt is the emergency.",
          principles: ["fixation", "rpd"]
        },
        {
          text: "Prescribe an antiemetic for the vomiting and tighten neuro obs to every 15 minutes — respond if the trend continues.",
          next: "drift",
          quality: "poor",
          scores: { dm: -2, sa: -1, em: -1, rm: -1, comm: 0 },
          feedback: "Treating the vomiting is symptom management for a sign of raised intracranial pressure — and '15-minute obs' converts the nurse into a chronicler of a deterioration you've already predicted. Monitoring is not an intervention. The intervention is the scanner.",
          principles: ["ooda"]
        }
      ]
    },

    drift: {
      type: "info",
      text: "Twenty minutes later the decision makes itself: GCS 9, the left pupil now obviously bigger and barely reacting. Adeyemi has the bed flat-ish, suction ready, and that look that says she'd already counted these minutes.\n\nThe phone is in your hand. The conversation you were avoiding is now happening at a worse GCS.",
      vitals: [
        { label: "GCS", value: "9", state: "bad" },
        { label: "Pupils", value: "L fixed-ish", state: "bad" },
        { label: "HR", value: "58", state: "bad" },
        { label: "BP", value: "172/92", state: "bad" },
        { label: "SpO₂", value: "93%", state: "warn" }
      ],
      next: "d-reg"
    },

    "d-late-response": {
      type: "decision",
      timeLimit: 20,
      text: "GCS 8, blown pupil evolving, on apixaban. The label has cost four hours. Now what?",
      options: [
        {
          text: "Full emergency response: 2222 peri-arrest/MET call — airway support for GCS 8 — anaesthetics and the registrar to the bedside, CT the moment he's safe to move.",
          next: "ct-late",
          quality: "good",
          scores: { dm: 2, rm: 3, em: 2, comm: 1, sa: 1 },
          feedback: "At GCS 8 this is an airway emergency before it's a diagnostic one, and you reached for the loudest tool on the wall — correctly. The MET call brings the anaesthetist, the urgency, and the institutional weight that four hours of drift removed.",
          principles: ["declare-emergency", "call-for-help"]
        },
        {
          text: "Phone the registrar and wait for them to assess before committing to the big guns — it's their call list.",
          next: "ct-late",
          quality: "poor",
          scores: { dm: -1, rm: -2, em: -1, comm: 0, sa: 0 },
          feedback: "GCS 8 cannot protect an airway while a registrar finishes a referral two floors away. The escalation ladder has an express button for exactly this physiology — etiquette about whose 'call' it is belongs to patients who are breathing reliably.",
          principles: ["call-for-help"]
        }
      ]
    },

    "d-reg": {
      type: "decision",
      timeLimit: 30,
      text: "The registrar answers on the fourth ring, voice flat with fatigue: \"If this is about bed 14 — the Red Lion guy? He does this. GCS bounces all over when they're loaded. The CT list is carnage tonight. Rescan the sugar and I'll see him on the morning round.\" — Your move.",
      options: [
        {
          text: "Hold the line with facts and PACE: \"I need you to hear the trend: GCS 14, then 13, now 11 with a NORMAL glucose. He's on apixaban, there's an impact mark on his temple, he's vomiting and his left pupil is sluggish. I'm not comfortable waiting — I think this is a bleed and he needs a CT now. If you can't come, tell me, and I'll call the consultant — but I'm not leaving this.\"",
          next: "reg-backs-down",
          quality: "good",
          scores: { comm: 3, em: 3, dm: 1, sa: 1, rm: 1 },
          feedback: "Graded assertiveness, executed: facts first (the trend, the anticoagulant, the pupil), an unambiguous statement of concern, a specific demand, and a stated next rung — calling the consultant — framed as procedure, not threat. This sentence pattern is rehearsable, and you just demonstrated why it gets rehearsed.",
          principles: ["pace", "sbar"]
        },
        {
          text: "\"…Okay. Morning round. I'll keep an eye on him overnight.\" They're senior, they know this patient group, and the CT list really is carnage.",
          next: "overnight-disaster",
          quality: "poor",
          scores: { comm: -3, em: -3, dm: -2, sa: -1, rm: -1 },
          trap: "The authority gradient",
          feedback: "You had the data, the assessment and the falling GCS — and surrendered them to seniority and a busy CT list. The authority gradient only flattens when someone junior pushes back with structure. This is THE moment human factors training exists for; the words must be available when it arrives.",
          principles: ["pace"]
        },
        {
          text: "Skip the argument — hang up politely and ring the consultant on call directly.",
          next: "consultant-call",
          quality: "ok",
          scores: { comm: 0, em: 1, dm: 1, sa: 0, rm: 0 },
          feedback: "It gets the scan — and it spends trust you didn't need to spend. The ladder exists to be climbed IN ORDER: challenge the registrar with the facts first, and escalate past them only when they've heard and refused. Skipping the rung deprives them of the chance to be persuaded (most are) and quietly poisons the working relationship the rest of your night runs on.",
          principles: ["pace"]
        }
      ]
    },

    "reg-backs-down": {
      type: "info",
      text: "Silence. Then, the sound of a chair pushed back: \"…Apixaban with a temple wound and a dropping GCS. Why didn't the day team— never mind. Get him to CT, I'm authorising it now and coming to you. Good push.\"\n\nThe whole exchange took ninety seconds. The 'argument' you were dreading was four facts and one refusal to fold.",
      next: "ct"
    },

    "consultant-call": {
      type: "info",
      text: "The consultant listens for forty seconds, then: \"Scan him now — I'll square it with radiology and speak to the registrar.\" It works.\n\nLater, the registrar finds you at the desk. \"You went over my head.\" — \"You'd already said no to the scan.\" — \"You never told me about the pupil, or the apixaban.\" There's the cost: the rung you skipped contained the facts that would have changed their mind ninety seconds sooner, with the relationship intact.",
      next: "ct"
    },

    "overnight-disaster": {
      type: "info",
      text: "You keep your uneasy watch. At 02:55 Adeyemi pulls the emergency buzzer: GCS 7, left pupil fixed and dilated. The MET call goes out; anaesthetics intubate on the unit; the CT happens within twenty minutes — at a GCS where 'list pressure' was never going to be mentioned.\n\nEverything that's happening at 03:15 was available, cheaper, at 01:20. The scan was always going to happen tonight. The only variable was his GCS when it did.",
      next: "ct-late"
    },

    ct: {
      type: "info",
      text: "CT head, 01:50: acute left subdural haematoma with 6 mm of midline shift.\n\nThe night accelerates: anticoagulation reversal per protocol, neurosurgical referral accepted, transfer arranged. The registrar runs the resus-side logistics and makes the calls; you write the timeline while it's fresh. Mr Kowalski goes to theatre at the regional centre before dawn.",
      next: "d-closing"
    },

    "ct-late": {
      type: "info",
      text: "CT head: acute left subdural haematoma, 9 mm midline shift. Reversal, intubation, blue-light transfer; neurosurgery operates within the hour. He survives to ICU — his outcome now belongs to the operation and to time already spent.\n\nThe timeline in the notes is stark when you write it honestly: the label at 21:00, the trend nobody measured, the explanations that each bought the bleed another hour.",
      next: "d-closing-late"
    },

    "d-closing-late": {
      type: "decision",
      text: "05:40. Transfer complete, unit quiet. The night went to the wire. Before the day team arrives:",
      options: [
        {
          text: "Write the honest timeline, file an incident report on the labelled handover, thank Adeyemi — and debrief yourself: name the exact moment the bleed became knowable, and what would have made you act on it.",
          next: "end-mixed",
          quality: "good",
          scores: { em: 3, comm: 1, rm: 0, sa: 0, dm: 0 },
          feedback: "The clinical window was missed, but the learning window is still open — and you used it. An honest timeline plus a systems-focused incident report is how a bad night becomes a safer unit. The self-debrief question ('when was it knowable?') is the single most valuable question in incident analysis.",
          principles: ["aar"]
        },
        {
          text: "He survived — that's what matters. Coffee, last two hours, home.",
          next: "end-poor",
          quality: "poor",
          scores: { em: -2, comm: 0, rm: 0, sa: 0, dm: 0 },
          feedback: "Without the timeline and the report, tonight officially never happened — the handover culture that produced it remains untouched, and the next 'regular' inherits the same label with the same odds. Survival by neurosurgeon is not a system working; it's a system getting lucky.",
          principles: ["aar"]
        }
      ]
    },

    "d-closing": {
      type: "decision",
      text: "05:40. Transfer complete, unit quiet. Before the day team arrives:",
      options: [
        {
          text: "Write the honest timeline in the notes, file an incident report on the unmeasured handover ('GCS 14, nothing to do'), thank Adeyemi specifically — and take five minutes to debrief yourself: which trap nearly got you, and what's your tripwire next time?",
          next: "end-good",
          quality: "good",
          scores: { em: 3, comm: 1, rm: 0, sa: 0, dm: 0 },
          feedback: "This is how one night becomes systemic learning: the incident report targets the SYSTEM (labels travelling through handover without data), not a person; the thanks reinforces the colleague who kept measuring; and the self-debrief converts a near-miss into a personal tripwire. Lessons-learnt leads are made of exactly this.",
          principles: ["aar"]
        },
        {
          text: "He made it out alive — chalk it up, grab coffee, survive the last two hours. The morning team can untangle how it started.",
          next: "end-mixed-quiet",
          quality: "poor",
          scores: { em: -2, comm: 0, rm: 0, sa: 0, dm: 0 },
          feedback: "The patient survived; the trap that nearly killed him is still installed — in the handover culture, and now in your unexamined memory, where it will feel familiar and safe next time. Ten minutes of paperwork and reflection is the difference between an anecdote and a defence.",
          principles: ["aar"]
        }
      ]
    },

    "end-good": {
      type: "end",
      outcome: "good",
      summary: "A label challenged at handover, a convenient finding treated without being believed, a trend measured relentlessly, and a senior challenged with structure instead of either silence or mutiny. This scenario contains the full anatomy of the incidents you analysed as lessons-learnt lead — run from the inside. The subdural was never the test. The test was every voice, including your own, offering you a comfortable reason to stop looking."
    },

    "end-mixed": {
      type: "end",
      outcome: "mixed",
      summary: "The scan happened and he survived — but reconstruct where the hours went. Each one was bought by a plausible story: the regular, the sugar, the busy list, the senior who knows best. Premature closure never feels like an error while it's happening; it feels like efficiency. The defence is mechanical, not moral: measure the trend, pre-commit thresholds, rehearse the challenge."
    },

    "end-mixed-quiet": {
      type: "end",
      outcome: "mixed",
      summary: "Clinically rescued; organisationally wasted. The same handover will transmit the same label next week, to a doctor who hasn't lived this night. Incident reporting isn't bureaucracy — it's how your 03:00 lesson reaches them before their patient does. (And the self-debrief matters for a quieter reason: unexamined near-misses don't teach, they just haunt.)"
    },

    "end-poor": {
      type: "end",
      outcome: "poor",
      summary: "Four hours under a borrowed diagnosis, surfacing only when the airway forced the issue. Notice that no single moment felt like negligence: a routine handover, a reasonable deferral, a plausible sugar, a tired registrar. That's precisely how the incidents in your lessons-learnt files assembled themselves. The countermeasures are unglamorous and they work: question the label while its author is still in the room, treat trends as the primary data, and keep the assertive sentences rehearsed and ready."
    }
  }
});
