/* ============================================================
   Scenario 1 — "The Quiet Deterioration" (Level 1)
   Focus: situational awareness, escalation, SBAR.
   Traps: anchoring on 'post-op pain', delayed escalation,
          passive followership when help is far away.

   HOW SCENARIOS WORK (read this if you're writing your own):
   - `nodes` is a map of id → node.
   - node.type: 'info' (narrative + Continue), 'decision' (options),
     'end' (outcome screen).
   - Each option: text, next (node id), quality ('good'|'ok'|'poor'),
     scores per CRM domain (sa, comm, dm, rm, em — small integers,
     negatives allowed), feedback (shown in the debrief),
     principles (toolkit ids), optional trap name.
   - vitals: [{label, value, state: 'ok'|'warn'|'bad'}] — shown as a monitor.
   - timeLimit (seconds) on a decision adds time pressure when enabled.
   ============================================================ */
window.FWRD = window.FWRD || {};
FWRD.scenarios = FWRD.scenarios || [];

FWRD.scenarios.push({
  id: "sepsis-ward",
  title: "The Quiet Deterioration",
  level: 1,
  setting: "Surgical ward · 02:30 · night shift",
  role: "You are the FY1 covering the surgical wards overnight. You have three routine jobs pending and one registrar, who is busy in theatre.",
  estMinutes: 10,
  focus: ["sa", "comm", "rm"],
  desc: "A nurse is worried about a post-op patient who 'doesn't look right'. Nothing about this case is rare — which is exactly what makes it dangerous.",
  briefing: "Most preventable deaths in hospital don't start with a dramatic event. They start with a quiet trend, a plausible alternative explanation, and a doctor with too many jobs. This scenario tests how you gather information, whether you anchor on the obvious story, and how you escalate when help is 20 minutes away.",
  learningPoints: [
    "Phone triage: 60 seconds of structured questions beats both blind reassurance and blind running.",
    "'Post-op pain' and 'dehydration' are the classic anchors that hide early sepsis.",
    "Escalate on the trend and your assessment — don't wait to be 'sure'.",
    "When the plan isn't working (fluids in, BP still falling), that is new information: re-orient and escalate again."
  ],
  start: "intro",
  nodes: {

    intro: {
      type: "info",
      text: "02:30. Your bleep goes off — Ward 7.\n\nNurse Sarah: \"Sorry to bleep — can you review Mrs Carter in bed 12? She's day 2 after a lap chole. She just… doesn't look right to me. Heart rate's been creeping up all evening, it's 118 now.\"\n\nYour job list: a cannula on Ward 4, a 'sleeping tablet please' on Ward 6, and a fluid prescription review.",
      cues: [
        "Experienced nurse using the phrase 'doesn't look right' — a known red flag",
        "Heart rate trend rising over hours, not a one-off reading",
        "Day 2 post-op: the classic window for surgical sepsis"
      ],
      next: "d-phone"
    },

    "d-phone": {
      type: "decision",
      text: "How do you respond on the phone?",
      options: [
        {
          text: "\"Talk me through her full obs and NEWS2, and the trend since this afternoon. What's changed? I'm coming now — please repeat the obs as I head over.\"",
          next: "phone-info",
          quality: "good",
          scores: { sa: 3, comm: 2, rm: 1, dm: 1, em: 0 },
          feedback: "Structured phone triage: you start building the picture before you arrive, you can rank her against your other jobs, and you've set monitoring in motion. The nurse's concern is treated as data — because it is.",
          principles: ["sa-levels"]
        },
        {
          text: "\"On my way.\" Hang up and head straight there.",
          next: "arrive-less-info",
          quality: "ok",
          scores: { sa: 0, comm: 0, rm: 0, dm: 1, em: 0 },
          feedback: "Responsive — but you've spent your most useful minute. Sixty seconds of questions would have told you how sick she is, let you triage your other jobs, and got the next obs running before your arrival. Action without information is only half a response.",
          principles: ["sa-levels"]
        },
        {
          text: "\"Day 2 post lap chole with a fast heart rate? She's probably in pain or a bit dry. Give her some analgesia, encourage fluids, and I'll review once I've cleared my jobs.\"",
          next: "pushback",
          quality: "poor",
          scores: { sa: -1, comm: -1, rm: -1, dm: -2, em: 0 },
          trap: "Anchoring",
          feedback: "You diagnosed her down the phone using the most available explanation — the anchoring trap. Tachycardia trending up in a post-op patient is sepsis or bleeding until proven otherwise, and an experienced nurse saying 'she doesn't look right' has decent predictive value.",
          principles: ["fixation"]
        }
      ]
    },

    pushback: {
      type: "info",
      text: "There's a pause on the line.\n\nNurse Sarah, more firmly: \"I've given her analgesia already. Her NEWS2 is 6 and I'm not happy with her. I'd like you to come and see her.\"\n\nShe has just used escalation language on you. Nurses are trained to push when they're worried — this is the system working.",
      cues: [
        "NEWS2 of 6 — this mandates an urgent clinical review",
        "The nurse has repeated and strengthened her concern"
      ],
      next: "d-pushback"
    },

    "d-pushback": {
      type: "decision",
      text: "How do you respond to her pushback?",
      options: [
        {
          text: "\"You're right — thank you for pushing. NEWS2 6, I'm coming now. Get a fresh set of obs and have the notes out for me.\"",
          next: "phone-info",
          quality: "good",
          scores: { sa: 1, comm: 2, rm: 1, dm: 1, em: 2 },
          feedback: "Excellent error recovery. You changed course on new information without defensiveness — and you thanked the person who challenged you, which keeps that safety channel open for the rest of the night (and the rest of your career).",
          principles: ["pace", "aar"]
        },
        {
          text: "\"Okay, okay. Add her to my list — I'll get there within the hour.\"",
          next: "deteriorate-1",
          quality: "poor",
          scores: { sa: -1, comm: -1, rm: -2, dm: -1, em: -1 },
          trap: "Fixation on the job list",
          feedback: "A NEWS2 of 6 with a worried nurse outranks every routine job you hold. The job list is a queue, not a contract — re-prioritising it is exactly what resource management means.",
          principles: ["call-for-help"]
        }
      ]
    },

    "phone-info": {
      type: "info",
      text: "Sarah reads out the obs while you walk:\n\n\"HR 118, BP 98 over 64, resp rate 22, sats 95% on air, temp 38.2. She had rigors about an hour ago. NEWS2 is 6.\"\n\nYou mentally re-rank your jobs: the cannula and the sleeping tablet can wait. As you walk, you start your differential: post-op sepsis (biliary leak? collection?), bleeding, PE.",
      vitals: [
        { label: "HR", value: "118", state: "warn" },
        { label: "BP", value: "98/64", state: "warn" },
        { label: "RR", value: "22", state: "warn" },
        { label: "SpO₂", value: "95%", state: "ok" },
        { label: "Temp", value: "38.2", state: "warn" },
        { label: "NEWS2", value: "6", state: "warn" }
      ],
      cues: [
        "Rigors one hour ago — strongly suggests bacteraemia",
        "BP drifting down while HR climbs — compensating, for now",
        "You're forming a differential BEFORE arriving: level 3 situational awareness"
      ],
      next: "arrive"
    },

    "arrive-less-info": {
      type: "info",
      text: "You arrive slightly out of breath, knowing only 'HR 118'.\n\nMrs Carter, 74, is flushed and drowsy but rousable. As you start from scratch, Sarah hands you the obs chart: HR 118, BP 98/64, RR 22, SpO₂ 95%, temp 38.2 — rigors an hour ago. NEWS2 6. You could have had all of this two minutes ago.",
      vitals: [
        { label: "HR", value: "118", state: "warn" },
        { label: "BP", value: "98/64", state: "warn" },
        { label: "RR", value: "22", state: "warn" },
        { label: "SpO₂", value: "95%", state: "ok" },
        { label: "Temp", value: "38.2", state: "warn" },
        { label: "NEWS2", value: "6", state: "warn" }
      ],
      next: "d-approach"
    },

    arrive: {
      type: "info",
      text: "Bed 12. Mrs Carter, 74, is flushed, peripherally warm and drowsy but rousable. Her cheeks are sunken and her lips dry. The catheter bag shows about 20 ml of dark urine over the last two hours.\n\nSarah is at the bedside with the obs chart and the drug chart ready.",
      cues: [
        "Drowsy 'but rousable' — a soft sign that's easy to normalise at 2am",
        "Oliguria: the kidneys are telling you about her perfusion",
        "Warm peripheries + hypotension: think distributive (septic) picture"
      ],
      next: "d-approach"
    },

    "d-approach": {
      type: "decision",
      text: "Your first move at the bedside?",
      options: [
        {
          text: "A structured A–E assessment, verbalising findings to Sarah as you go.",
          next: "ae-findings",
          quality: "good",
          scores: { sa: 3, comm: 1, dm: 1, rm: 0, em: 1 },
          feedback: "The A–E structure exists precisely for 2am brains: it guarantees you collect the cues systematically instead of the ones that fit your current theory. Verbalising as you go builds a shared mental model with the nurse — she now knows what you know.",
          principles: ["sa-levels", "checklists"]
        },
        {
          text: "Go straight to the abdomen — she's post-op, the answer is probably under the dressing.",
          next: "ae-findings-anchored",
          quality: "ok",
          scores: { sa: 0, comm: 0, dm: 0, rm: 0, em: 0 },
          trap: "Anchoring",
          feedback: "The abdomen matters — but starting there means your exam is testing one hypothesis instead of assessing the patient. You'd have reached B (RR 24 and climbing) late or not at all. Structure first, hypothesis second.",
          principles: ["fixation", "sa-levels"]
        },
        {
          text: "Sit down with the notes and drug chart first to understand the background.",
          next: "ae-findings-delayed",
          quality: "poor",
          scores: { sa: -1, comm: 0, dm: -1, rm: -1, em: 0 },
          feedback: "Background reading is valuable — after you know whether the patient in front of you is about to deteriorate. In a patient with abnormal physiology, the chart can wait five minutes; the A–E can't.",
          principles: ["sa-levels"]
        }
      ]
    },

    "ae-findings": {
      type: "info",
      text: "A: talking, airway clear.\nB: RR 24, SpO₂ 94% on air, chest clear.\nC: HR 122, BP 92/58, cap refill 4 seconds, warm peripheries. Cannula in situ, working.\nD: drowsy but GCS 14, glucose 7.8.\nE: temp 38.4. Abdomen soft but tender in the right upper quadrant. Catheter: 20 ml in 2 hours.\n\nNEWS2 is now 8. Sarah is watching you, waiting for the plan.",
      vitals: [
        { label: "HR", value: "122", state: "bad" },
        { label: "BP", value: "92/58", state: "bad" },
        { label: "RR", value: "24", state: "warn" },
        { label: "SpO₂", value: "94%", state: "warn" },
        { label: "Temp", value: "38.4", state: "warn" },
        { label: "NEWS2", value: "8", state: "bad" }
      ],
      next: "d-diagnosis"
    },

    "ae-findings-anchored": {
      type: "info",
      text: "The wound looks clean. The abdomen is soft, tender in the right upper quadrant. For a moment that feels reassuring — then you notice her breathing.\n\nYou step back and run a proper A–E: RR 24, SpO₂ 94%, HR 122, BP 92/58, cap refill 4s, drowsy, temp 38.4, 20 ml urine in 2 hours. NEWS2 is now 8. The wound was never the question.",
      vitals: [
        { label: "HR", value: "122", state: "bad" },
        { label: "BP", value: "92/58", state: "bad" },
        { label: "RR", value: "24", state: "warn" },
        { label: "SpO₂", value: "94%", state: "warn" },
        { label: "Temp", value: "38.4", state: "warn" },
        { label: "NEWS2", value: "8", state: "bad" }
      ],
      next: "d-diagnosis"
    },

    "ae-findings-delayed": {
      type: "info",
      text: "Ten minutes into the notes, Sarah interrupts: \"Doctor — her BP's 92 systolic and she's more drowsy.\"\n\nYou put the chart down and run the A–E you should have started with: RR 24, SpO₂ 94%, HR 122, BP 92/58, cap refill 4s, GCS 14, temp 38.4, oliguric. NEWS2 8. The notes told you she had a cholecystectomy. The patient was telling you she's septic.",
      vitals: [
        { label: "HR", value: "122", state: "bad" },
        { label: "BP", value: "92/58", state: "bad" },
        { label: "RR", value: "24", state: "warn" },
        { label: "SpO₂", value: "94%", state: "warn" },
        { label: "Temp", value: "38.4", state: "warn" },
        { label: "NEWS2", value: "8", state: "bad" }
      ],
      next: "d-diagnosis"
    },

    "d-diagnosis": {
      type: "decision",
      timeLimit: 30,
      text: "Sarah: \"What do you think is going on?\" — What's your working diagnosis and immediate plan?",
      options: [
        {
          text: "\"This is sepsis until proven otherwise — likely biliary source. We start the sepsis bundle now: cultures, lactate, broad-spectrum antibiotics per protocol, fluids, oxygen, monitor urine output.\"",
          next: "d-escalate",
          quality: "good",
          scores: { sa: 1, comm: 1, dm: 3, rm: 1, em: 1 },
          feedback: "You named the diagnosis out loud (shared mental model), committed to a treatable worst-case rather than a comfortable best-case, and attached an immediate, protocolised plan. 'Until proven otherwise' is the phrase that keeps the differential open while you act.",
          principles: ["sa-levels", "checklists"]
        },
        {
          text: "\"I think she's dry and sore. Let's give fluids and analgesia and I'll reassess in an hour.\"",
          next: "deteriorate-1",
          quality: "poor",
          scores: { sa: -1, comm: 0, dm: -3, rm: -1, em: -1 },
          trap: "Premature closure",
          feedback: "Fever, rigors, hypotension, oliguria and rising NEWS2 — the data no longer supports the comfortable diagnosis. This is premature closure: stopping the search at the first explanation that lets you get back to the job list. The cost of treating presumed sepsis is small; the cost of missing it is not.",
          principles: ["fixation", "rpd"]
        },
        {
          text: "\"Let's get bloods, cultures, a gas and a chest X-ray, and decide once the results are back.\"",
          next: "deteriorate-2",
          quality: "poor",
          scores: { sa: 0, comm: 0, dm: -2, rm: 0, em: 0 },
          feedback: "Investigations are part of the answer — but 'wait for results before treating' costs an hour she may not have. In suspected sepsis with shock physiology, treatment and investigation start together. Decide with the data you have; refine with the data that's coming.",
          principles: ["ooda", "t-dodar"]
        }
      ]
    },

    "d-escalate": {
      type: "decision",
      text: "The bundle is in motion. Mrs Carter is on oxygen and Sarah is drawing cultures. Your registrar is in theatre. What about escalation?",
      options: [
        {
          text: "Call the registrar now, even though they're scrubbed — and ask Sarah to keep 15-minute obs running while you call.",
          next: "d-sbar",
          quality: "good",
          scores: { sa: 0, comm: 1, dm: 1, rm: 3, em: 1 },
          feedback: "NEWS2 8 with shock physiology is exactly what registrars want to hear about immediately — including in theatre, where they can advise, mobilise outreach, or send someone. Escalation isn't a confession that you can't cope; it's deploying the resource the situation requires.",
          principles: ["call-for-help"]
        },
        {
          text: "Start the bundle, give the first fluid bolus, and call only if she hasn't improved afterwards.",
          next: "bolus-fail",
          quality: "ok",
          scores: { sa: 0, comm: 0, dm: 0, rm: -1, em: 0 },
          trap: "Optimism bias",
          feedback: "'I'll call if the bolus doesn't work' feels efficient but delays help by exactly the time the bolus takes — and the help is 20+ minutes away. Make the call while the fluid runs: parallel, not serial. Optimism bias is the quiet engine of late escalation.",
          principles: ["call-for-help", "t-dodar"]
        },
        {
          text: "She's stable enough — ask Sarah to bleep you if anything changes, and get back to the cannula on Ward 4.",
          next: "deteriorate-2",
          quality: "poor",
          scores: { sa: -1, comm: 0, dm: -1, rm: -3, em: -1 },
          feedback: "A patient with NEWS2 8 and a systolic of 92 is the sickest person on your list by a distance — leaving before senior help is engaged abandons the one job that can't wait. 'Bleep me if anything changes' delegates your situational awareness to someone who has already escalated once tonight.",
          principles: ["call-for-help"]
        }
      ]
    },

    "d-sbar": {
      type: "decision",
      text: "Theatre answers and your registrar comes to the phone, masked and brisk: \"Go ahead.\" — Pick your opening.",
      options: [
        {
          text: "\"I'm calling about Mrs Carter on Ward 7 — I think she's septic and she's becoming shocked. 74, day 2 post lap chole. NEWS2 8: HR 122, BP 92/58, temp 38.4, oliguric. I've started the sepsis bundle. I need you to review her, and to tell me what to do if her BP keeps falling.\"",
          next: "reg-response",
          quality: "good",
          scores: { sa: 0, comm: 3, dm: 0, rm: 1, em: 0 },
          feedback: "Textbook SBAR: headline first (situation + your assessment), one line of background, the numbers that matter, and two explicit recommendations. A scrubbed registrar can act on this in 30 seconds.",
          principles: ["sbar"]
        },
        {
          text: "\"Hi, sorry to bother you. So, Mrs Carter came in on Tuesday with gallstones and had her lap chole, which I think went fine. This evening she had some pain, and the nurses gave analgesia, and then around one o'clock she had rigors, and her heart rate has been…\"",
          next: "reg-response-ramble",
          quality: "ok",
          scores: { sa: 0, comm: -1, dm: 0, rm: 0, em: 0 },
          feedback: "All true, all in chronological order — and the critical fact (she's shocked NOW) is still three sentences away when the registrar interrupts. Under pressure, stories must run headline-first. The history earns its place after the situation.",
          principles: ["sbar"]
        },
        {
          text: "\"It's about the lady in bed 12 — she's not looking great, NEWS is up a bit. Could you come and have a look at some point?\"",
          next: "reg-response-vague",
          quality: "poor",
          scores: { sa: 0, comm: -2, dm: 0, rm: -1, em: 0 },
          feedback: "Vague urgency invites a vague response — 'at some point' will be taken literally by a registrar with an open abdomen in front of them. No numbers, no assessment, no recommendation: the call happened, but the escalation didn't.",
          principles: ["sbar"]
        }
      ]
    },

    "reg-response": {
      type: "info",
      text: "Registrar: \"Good call. I'm stuck here for at least 20 minutes — appendix is on the table. Keep the bundle going, get a lactate on the gas, and give a 500 ml crystalloid bolus stat. If she doesn't respond, don't wait for me. Call me back after the bolus.\"\n\nThe VBG comes back: lactate 3.8. The bolus goes in over 15 minutes.\n\nThen Sarah, quietly: \"Doctor — BP's 84 over 50. She's harder to rouse.\"",
      vitals: [
        { label: "HR", value: "128", state: "bad" },
        { label: "BP", value: "84/50", state: "bad" },
        { label: "RR", value: "26", state: "bad" },
        { label: "SpO₂", value: "94% (O₂)", state: "warn" },
        { label: "Lactate", value: "3.8", state: "bad" },
        { label: "NEWS2", value: "10", state: "bad" }
      ],
      cues: [
        "Fluid given, BP lower: the plan is NOT working — that's new information",
        "Falling conscious level: organ hypoperfusion",
        "Registrar pre-authorised you to escalate beyond them: use it"
      ],
      next: "d-worsen"
    },

    "reg-response-ramble": {
      type: "info",
      text: "Registrar, cutting in: \"Sorry — give me the headline. How sick is she right now?\"\n\nYou regroup: \"Septic, shocked. NEWS2 8, BP 92 systolic, lactate pending.\" — \"That's what I needed first. I'm stuck in theatre 20 minutes. Bundle, 500 ml bolus stat, lactate, call me back. Don't wait for me if she worsens.\"\n\nLactate: 3.8. The bolus goes in. Then Sarah: \"BP's 84 over 50. She's harder to rouse.\"",
      vitals: [
        { label: "HR", value: "128", state: "bad" },
        { label: "BP", value: "84/50", state: "bad" },
        { label: "RR", value: "26", state: "bad" },
        { label: "SpO₂", value: "94% (O₂)", state: "warn" },
        { label: "Lactate", value: "3.8", state: "bad" },
        { label: "NEWS2", value: "10", state: "bad" }
      ],
      next: "d-worsen"
    },

    "reg-response-vague": {
      type: "info",
      text: "Registrar: \"I'm in theatre — pop her on the list for the morning round if she's stable, or bleep me again if you're worried.\" The line goes dead. The escalation bounced off, because nothing in your message demanded action.\n\nFifteen minutes later Sarah finds you: \"BP's 84 over 50 and she's harder to rouse. I think we need to get someone here.\" Lactate from the gas: 3.8.",
      vitals: [
        { label: "HR", value: "128", state: "bad" },
        { label: "BP", value: "84/50", state: "bad" },
        { label: "RR", value: "26", state: "bad" },
        { label: "SpO₂", value: "94% (O₂)", state: "warn" },
        { label: "Lactate", value: "3.8", state: "bad" },
        { label: "NEWS2", value: "10", state: "bad" }
      ],
      next: "d-worsen"
    },

    "bolus-fail": {
      type: "info",
      text: "You hold off calling and give the 500 ml bolus. The VBG shows lactate 3.8.\n\nFifteen minutes later: BP 84/50, HR 128, and she's harder to rouse. The bolus you were waiting on has answered you — with a no. You've now lost the 15 minutes the call would have run in parallel.",
      vitals: [
        { label: "HR", value: "128", state: "bad" },
        { label: "BP", value: "84/50", state: "bad" },
        { label: "RR", value: "26", state: "bad" },
        { label: "SpO₂", value: "94% (O₂)", state: "warn" },
        { label: "Lactate", value: "3.8", state: "bad" },
        { label: "NEWS2", value: "10", state: "bad" }
      ],
      next: "d-worsen"
    },

    "d-worsen": {
      type: "decision",
      timeLimit: 30,
      text: "BP 84/50 despite fluid. Lactate 3.8. GCS dropping. The registrar is still in theatre. What now?",
      options: [
        {
          text: "Second bolus running, and escalate UP: call critical care outreach / the MET now, then update the registrar. Tell Sarah exactly what's happening.",
          next: "d-loop",
          quality: "good",
          scores: { sa: 1, comm: 1, dm: 2, rm: 3, em: 2 },
          feedback: "This is the decision the whole scenario was built around. Fluid-refractory hypotension with lactate 3.8 is a critical-care problem, and 'my registrar is busy' never caps the escalation ladder — it redirects it. Re-orienting when the plan fails (OODA) and widening the team (outreach) is expert behaviour, whatever your grade.",
          principles: ["call-for-help", "ooda", "t-dodar"]
        },
        {
          text: "The registrar said they'd come in 20 minutes — keep fluids running and wait. They know her now; adding more people will confuse things.",
          next: "deteriorate-3",
          quality: "poor",
          scores: { sa: -1, comm: -1, dm: -2, rm: -3, em: -2 },
          trap: "Passive followership",
          feedback: "The registrar's plan was made on old data — she has deteriorated since, and they explicitly told you not to wait. Instructions are not a cage: when the situation changes, the plan must change. 'More people will confuse things' is the rationalisation; the reality is one exhausted FY1 holding a septic shock alone.",
          principles: ["pace", "call-for-help"]
        },
        {
          text: "Keep giving boluses back-to-back yourself — fluid is the treatment for hypotension, after all.",
          next: "deteriorate-3",
          quality: "poor",
          scores: { sa: -1, comm: 0, dm: -2, rm: -2, em: -2 },
          trap: "Fixation on a failing plan",
          feedback: "Repeating an action that is demonstrably failing is the definition of plan-continuation error. She may well need more fluid — but titrated by people with vasopressors and a bed for her. Your highest-value action is not another bag; it's the phone.",
          principles: ["fixation", "ooda"]
        }
      ]
    },

    "d-loop": {
      type: "decision",
      text: "Outreach is on the way. You need Sarah to get things moving while you call the registrar back. How do you hand her the tasks?",
      options: [
        {
          text: "\"Sarah — second 500 ml bolus stat, repeat obs every 5 minutes, and pull the notes and drug chart for outreach. Can you repeat that back?\"",
          next: "resolution",
          quality: "good",
          scores: { sa: 0, comm: 3, dm: 0, rm: 1, em: 0 },
          feedback: "Named person, specific tasks, read-back requested — a closed loop. In thirty seconds you've guaranteed the work is owned, understood and verifiable. This is the cheapest, highest-yield CRM behaviour there is.",
          principles: ["closed-loop"]
        },
        {
          text: "\"Right, we need another bolus, more frequent obs, and the paperwork ready for outreach.\" (said to the room, while dialling)",
          next: "resolution-loose",
          quality: "ok",
          scores: { sa: 0, comm: 0, dm: 0, rm: 0, em: 0 },
          feedback: "Everything you said was correct — and addressed to nobody. Tasks announced to a room have no owner; under pressure, unowned tasks silently fail. One word ('Sarah—') would have closed the gap.",
          principles: ["closed-loop"]
        }
      ]
    },

    resolution: {
      type: "info",
      text: "Sarah repeats it back and moves. Outreach arrives within ten minutes, agrees: septic shock, likely biliary source. She's started on vasopressor support via the ICU team and moved to critical care. Your registrar, out of theatre, finds you writing up: \"That outreach call was exactly right. If you'd waited for me, this would be a very different night.\"\n\nThe morning team takes over a patient who is sick — but alive, supported, and on the right pathway because the right people arrived at the right time.",
      next: "end-good"
    },

    "resolution-loose": {
      type: "info",
      text: "There's a scramble — the bolus starts late because nobody was sure who owned it, and the notes can't be found when outreach arrives. The outcome is rescued: outreach agree it's septic shock, vasopressors are started, and she goes to critical care.\n\nIt worked. But you watched three small delays stack up, each one born from an instruction without a name on it.",
      next: "end-good"
    },

    "deteriorate-3": {
      type: "info",
      text: "You hold the course. The fluid runs; the BP doesn't. Ten minutes later Mrs Carter stops responding to voice. BP 72/40. Sarah doesn't wait for you this time — she hits the emergency buzzer and puts out the MET call herself.\n\nThe room fills with the team you could have called twenty minutes ago, asking questions you could have answered twenty minutes calmer.",
      vitals: [
        { label: "HR", value: "136", state: "bad" },
        { label: "BP", value: "72/40", state: "bad" },
        { label: "RR", value: "30", state: "bad" },
        { label: "SpO₂", value: "92% (O₂)", state: "warn" },
        { label: "GCS", value: "11", state: "bad" },
        { label: "NEWS2", value: "14", state: "bad" }
      ],
      next: "end-poor"
    },

    "deteriorate-1": {
      type: "info",
      text: "You carry on with the plan. Forty minutes later your bleep goes again — Ward 7, urgent.\n\nMrs Carter is barely rousable. BP 78/44, HR 132, mottled knees. Sarah has already put out a call to critical care outreach herself.\n\nThe hour you spent on the comfortable diagnosis is an hour of septic shock she now has to survive.",
      vitals: [
        { label: "HR", value: "132", state: "bad" },
        { label: "BP", value: "78/44", state: "bad" },
        { label: "RR", value: "28", state: "bad" },
        { label: "SpO₂", value: "93% (O₂)", state: "warn" },
        { label: "GCS", value: "12", state: "bad" },
        { label: "NEWS2", value: "12", state: "bad" }
      ],
      next: "d-recover"
    },

    "deteriorate-2": {
      type: "info",
      text: "You move on. Thirty minutes later, the urgent bleep: Mrs Carter's BP is 78/44, she's barely rousable, and the gas you ordered is back — lactate 4.6. Sarah has fast-bleeped you and is reaching for the outreach number.",
      vitals: [
        { label: "HR", value: "132", state: "bad" },
        { label: "BP", value: "78/44", state: "bad" },
        { label: "RR", value: "28", state: "bad" },
        { label: "Lactate", value: "4.6", state: "bad" },
        { label: "GCS", value: "12", state: "bad" },
        { label: "NEWS2", value: "12", state: "bad" }
      ],
      next: "d-recover"
    },

    "d-recover": {
      type: "decision",
      timeLimit: 25,
      text: "She is peri-arrest. What do you do with this moment?",
      options: [
        {
          text: "Name it and mobilise everything at once: \"This is septic shock.\" MET/outreach call now, registrar informed, sepsis bundle started, Sarah on 5-minute obs — tasks by name.",
          next: "late-rescue",
          quality: "good",
          scores: { sa: 1, comm: 1, dm: 2, rm: 2, em: 3 },
          feedback: "Strong error recovery. The earlier anchor cost time — but the moment you recognised the failing trajectory, you abandoned the old plan completely instead of defending it. Teams are forgiven slow starts; what kills is the slow abandonment of a wrong plan.",
          principles: ["ooda", "call-for-help", "declare-emergency"]
        },
        {
          text: "Give a fluid bolus and stay with her to see if it works before making calls.",
          next: "end-poor",
          quality: "poor",
          scores: { sa: -1, comm: -1, dm: -2, rm: -2, em: -2 },
          trap: "Plan continuation",
          feedback: "At 78 systolic with a climbing lactate, solo management is no longer an option that exists. The bolus is right — but it runs WHILE the cavalry is called, never instead.",
          principles: ["call-for-help", "fixation"]
        }
      ]
    },

    "late-rescue": {
      type: "info",
      text: "The MET arrives in minutes. Septic shock, biliary source suspected; vasopressors started, ICU bed arranged. She survives the night — it was closer than it needed to be.\n\nIn the debrief over cold toast, you trace it back honestly: the moment the trajectory was knowable was the phone call, two hours before the MET call.",
      next: "end-mixed"
    },

    "end-good": {
      type: "end",
      outcome: "good",
      summary: "Mrs Carter reached critical care with the sepsis bundle running and the right teams mobilised. The case turned on three behaviours: treating the nurse's concern as data, naming a worst-case diagnosis early and acting on it, and escalating past a busy registrar when the plan stopped working. None of them required knowledge you didn't have — they required the frameworks under pressure."
    },

    "end-mixed": {
      type: "end",
      outcome: "mixed",
      summary: "She survived, but the system rescued the situation later than it should have. The lesson of this run isn't the diagnosis — you got there — it's the cost of anchoring and delayed escalation: every comfortable explanation you accepted bought septic shock another half hour. Run it again and watch how early the cues were available."
    },

    "end-poor": {
      type: "end",
      outcome: "poor",
      summary: "Sarah put out the MET call herself while you were watching the fluids run; Mrs Carter arrested before the team arrived and was resuscitated to ICU. This run shows how a chain of individually small choices — diagnose by phone, defer the review, wait on results, escalate late — assembles itself into a catastrophe without any single dramatic error. That is how real incidents look in the lessons-learnt room. Run it again: every link in that chain was breakable."
    }
  }
});
