/* ============================================================
   Scenario 2 — "Breathless in Bay 4" (Level 1)
   Focus: situational awareness, decision-making, error management.
   Traps: equipment fixation ("the probe's playing up"),
          attribution to anxiety, anchoring on the commonest diagnosis.
   ============================================================ */
window.FWRD = window.FWRD || {};
FWRD.scenarios = FWRD.scenarios || [];

FWRD.scenarios.push({
  id: "hypoxia-bay4",
  title: "Breathless in Bay 4",
  level: 1,
  setting: "Orthopaedic ward · 10:40 · day shift",
  role: "You are the FY1 on the orthopaedic ward, mid-way through the post-round job list. The registrar is in clinic, reachable by phone.",
  estMinutes: 8,
  focus: ["sa", "dm", "em"],
  desc: "A sats probe reads 88% — but 'it's been playing up all morning'. The most dangerous sentence on the ward is the one that explains the data away for you.",
  briefing: "Monitoring is only as good as the team's willingness to believe it. This scenario tests whether you treat abnormal data as real until proven otherwise, whether you can resist the two great relabelling traps ('it's the probe', 'he's just anxious'), and whether you keep your differential open when the common answer is also the comfortable one.",
  learningPoints: [
    "Abnormal readings are real until the PATIENT — not the equipment — proves otherwise. Check both at once.",
    "'Anxious' is a description of behaviour, not a diagnosis. Hypoxia, pain and fear look identical at first glance.",
    "Day 1 post-arthroplasty: atelectasis is common, but PE is the one that kills. Common and dangerous must both stay on the list.",
    "A 10-second verbalised recap ('here's what I think, here's the plan — what am I missing?') recruits the team's eyes and ears."
  ],
  start: "intro",
  nodes: {

    intro: {
      type: "info",
      text: "10:40. You're writing discharge letters when Dana, the healthcare assistant, leans in:\n\n\"Don't panic, but Mr Devlin in Bay 4 — his sats are reading 88%. To be fair, that probe's been playing up all morning. It said 85% on Mrs Okafor earlier and she was fine.\"\n\nMr Devlin: 68, day 1 after a total hip replacement. You saw him on the round two hours ago — comfortable, obs fine.",
      cues: [
        "A reading of 88% — severely abnormal if true",
        "A ready-made explanation has arrived WITH the data: 'the probe's playing up'",
        "Day 1 post-arthroplasty: a high-risk window for pulmonary embolism"
      ],
      next: "d-first"
    },

    "d-first": {
      type: "decision",
      text: "How do you respond to Dana?",
      options: [
        {
          text: "\"Thanks Dana — I'll come now. Grab a different sats probe and a full set of obs while I walk over. We treat 88% as real until he proves otherwise.\"",
          next: "arrive",
          quality: "good",
          scores: { sa: 3, dm: 1, em: 2, comm: 1, rm: 1 },
          feedback: "You did both things at once: troubleshoot the equipment AND assess the patient. Saying 'real until proven otherwise' out loud sets the team's frame too — Dana now knows abnormal numbers get reviewed, not rationalised.",
          principles: ["fixation", "sa-levels"]
        },
        {
          text: "\"Try a different probe or a different finger, and let me know what the new one says.\"",
          next: "probe-recheck",
          quality: "ok",
          scores: { sa: 0, dm: 0, em: 0, comm: 0, rm: 0 },
          feedback: "Reasonable troubleshooting — but you've made the patient's assessment conditional on the equipment's verdict, and parked yourself behind a callback. If the second probe also reads 88%, you've lost five minutes; if it malfunctions differently, you may be falsely reassured.",
          principles: ["fixation"]
        },
        {
          text: "\"That probe's notorious. Log it with equipment services and recheck him at the next obs round.\"",
          next: "dismissed",
          quality: "poor",
          scores: { sa: -2, dm: -2, em: -2, comm: 0, rm: -1 },
          trap: "Confirmation bias",
          feedback: "You accepted the explanation that arrived bundled with the data — because it was convenient. The probe being unreliable on one patient earlier says nothing about this patient now. Confirmation bias rarely feels like bias; it feels like experience.",
          principles: ["fixation"]
        }
      ]
    },

    "probe-recheck": {
      type: "info",
      text: "Four minutes later Dana calls back, voice tighter: \"New probe, other hand — it's reading 87% now, and he's breathing faster than before. Can you come?\"\n\nThe equipment was never the problem. You head to Bay 4.",
      next: "arrive"
    },

    dismissed: {
      type: "info",
      text: "Twenty-five minutes later the ward sister finds you: \"Bay 4 — Mr Devlin. RR is 28, he's clammy, and the new probe reads 86%. He's been like this a while, I think.\"\n\nThe reading was real the whole time. The 'faulty probe' story bought the hypoxia twenty-five minutes of cover.",
      next: "arrive-late"
    },

    arrive: {
      type: "info",
      text: "Bay 4. Mr Devlin is propped upright, talking in short sentences. \"Bit… puffed, doctor. Came on… this last hour.\"\n\nThe new probe, on the other hand, reads 88%. He looks frightened.",
      vitals: [
        { label: "HR", value: "104", state: "warn" },
        { label: "BP", value: "128/76", state: "ok" },
        { label: "RR", value: "24", state: "warn" },
        { label: "SpO₂", value: "88%", state: "bad" },
        { label: "Temp", value: "37.4", state: "ok" },
        { label: "NEWS2", value: "6", state: "warn" }
      ],
      cues: [
        "Two different probes agree: this number is real",
        "Acute onset over an hour, day 1 post-op",
        "Frightened + breathless: fear is a SIGN here, not an explanation"
      ],
      next: "d-assess"
    },

    "arrive-late": {
      type: "info",
      text: "Bay 4. Mr Devlin is propped upright, clammy, talking in three-word sentences. He's been deteriorating for the better part of half an hour.\n\n\"Can't… catch it… doctor.\"",
      vitals: [
        { label: "HR", value: "112", state: "bad" },
        { label: "BP", value: "118/72", state: "ok" },
        { label: "RR", value: "28", state: "bad" },
        { label: "SpO₂", value: "86%", state: "bad" },
        { label: "Temp", value: "37.4", state: "ok" },
        { label: "NEWS2", value: "8", state: "bad" }
      ],
      next: "d-assess"
    },

    "d-assess": {
      type: "decision",
      timeLimit: 25,
      text: "He's breathless, frightened, sats in the high 80s. Your move?",
      options: [
        {
          text: "Oxygen on now, then a structured A–E, verbalising findings to Dana as you go.",
          next: "findings",
          quality: "good",
          scores: { sa: 3, dm: 2, em: 1, comm: 1, rm: 0 },
          feedback: "Treatment and assessment in parallel: oxygen doesn't wait for a diagnosis. The A–E structure stops the exam being steered by anyone's favourite theory — including yours.",
          principles: ["sa-levels", "checklists"]
        },
        {
          text: "He looks panicky — sit with him, reassure, coach slow breathing, and see if the sats settle as he calms.",
          next: "anxiety-trap",
          quality: "poor",
          scores: { sa: -2, dm: -2, em: -1, comm: 0, rm: 0 },
          trap: "Attribution to anxiety",
          feedback: "'Anxious' is how hypoxia presents. Attributing the picture to panic inverts cause and effect — he's frightened BECAUSE he can't breathe. Anxiety is a diagnosis of exclusion in a breathless post-op patient, and you haven't excluded anything yet.",
          principles: ["fixation"]
        },
        {
          text: "Oxygen on, ask Dana to repeat obs in 15 minutes, and get back to the discharge letters — you'll review the trend.",
          next: "dismissed-again",
          quality: "poor",
          scores: { sa: -1, dm: -2, em: -1, comm: 0, rm: -1 },
          feedback: "Oxygen treats the number, not the cause. New hypoxia day 1 post-arthroplasty needs a diagnosis today — masking the main warning sign and walking away removes your only early-warning system while the clot, if it is one, declares itself.",
          principles: ["sa-levels", "ooda"]
        }
      ]
    },

    "anxiety-trap": {
      type: "info",
      text: "You spend five minutes coaching his breathing. He tries, gamely. The sats read 87%… 86%. His heart rate is climbing.\n\nDana, carefully: \"Doctor… should we maybe get some oxygen on him?\"\n\nThe reassurance was kind. It was also five minutes of untreated hypoxia. You reach for the mask and start again — properly this time.",
      next: "findings"
    },

    "dismissed-again": {
      type: "info",
      text: "You're two letters deep when Dana returns: \"Sats are 91 on oxygen but his resp rate's up to 28 and he says his chest feels tight.\"\n\nOxygen bought the gap between you and the problem — and the problem kept moving. Back to Bay 4, properly this time.",
      next: "findings"
    },

    findings: {
      type: "info",
      text: "A: talking, airway clear.\nB: RR 26, SpO₂ 92% on 15L. Chest: clear, maybe slightly quiet at the left base. No wheeze.\nC: HR 108, BP 124/74, warm, ECG — sinus tachycardia.\nD: alert, frightened. E: temp 37.4. Calves: the LEFT is swollen and tender — he says it's been 'achy since yesterday'.\n\nA clear chest, hypoxia out of proportion to findings, sinus tach, a swollen calf, day 1 after hip surgery.",
      vitals: [
        { label: "HR", value: "108", state: "warn" },
        { label: "BP", value: "124/74", state: "ok" },
        { label: "RR", value: "26", state: "bad" },
        { label: "SpO₂", value: "92% (15L)", state: "warn" },
        { label: "Temp", value: "37.4", state: "ok" },
        { label: "NEWS2", value: "7", state: "bad" }
      ],
      cues: [
        "Hypoxia with a near-normal chest exam — the PE signature",
        "Unilateral swollen calf in a post-arthroplasty patient",
        "Atelectasis is the COMMON answer; it doesn't explain the calf"
      ],
      next: "d-frame"
    },

    "d-frame": {
      type: "decision",
      text: "Dana is waiting. What do you do with what you've found?",
      options: [
        {
          text: "Take 10 seconds and say it out loud: \"Here's my thinking — hypoxia with a clear chest and a swollen calf, day 1 post-hip. Top of my list is PE; atelectasis and early pneumonia are behind it. Plan: gas, ECG done, bloods, escalate to the reg now. Dana — anything I've missed?\"",
          next: "d-escalate",
          quality: "good",
          scores: { sa: 3, dm: 2, comm: 2, em: 1, rm: 1 },
          feedback: "A textbook '10 seconds for 10 minutes': you shared the mental model, ranked the differential with the dangerous diagnosis explicitly on top, attached a plan, and invited challenge. Dana now knows what to watch for — you've multiplied your situational awareness by the number of people in the bay.",
          principles: ["ten-for-ten", "sa-levels"]
        },
        {
          text: "Day 1 post-op with quiet bases — this is atelectasis. Chest physio referral, incentive spirometry, keep the oxygen going, reassess this afternoon.",
          next: "atelectasis-anchor",
          quality: "poor",
          scores: { sa: -1, dm: -2, em: -1, comm: 0, rm: 0 },
          trap: "Anchoring on the commonest diagnosis",
          feedback: "Atelectasis is genuinely the most likely single diagnosis — and settling for it here is still wrong, because it doesn't explain the calf, and because the cost of missing the second-most-likely diagnosis is death. 'Common' answers must also be SUFFICIENT answers. What doesn't fit your diagnosis is the most important data you have.",
          principles: ["fixation", "rpd"]
        },
        {
          text: "Don't theorise at all — just phone the registrar immediately and describe what you see.",
          next: "d-escalate-unframed",
          quality: "ok",
          scores: { sa: 0, dm: 0, comm: 0, em: 0, rm: 1 },
          feedback: "Escalating is right — but escalating WITHOUT committing to an assessment exports your thinking to someone in a clinic who can't see the patient. The registrar's first question will be 'what do you think it is?'. An assessment isn't a final answer; it's the thing that makes your escalation actionable.",
          principles: ["sbar"]
        }
      ]
    },

    "atelectasis-anchor": {
      type: "info",
      text: "You write the physio referral. As you finish, Dana — who watched you examine the calf — says quietly: \"Doctor, that left leg… my last ward, a hip patient with a leg like that had a clot on the lung. Should we mention it to someone?\"\n\nShe's right, and you know she's right. The calf never fit the story.",
      cues: [
        "A junior colleague is speaking up — this is the safety net working",
        "Disconfirming evidence (the calf) was available before the plan was made"
      ],
      next: "d-challenge"
    },

    "d-challenge": {
      type: "decision",
      text: "How do you take Dana's challenge?",
      options: [
        {
          text: "\"You're absolutely right — that calf doesn't fit atelectasis. I anchored. New plan: PE until proven otherwise, I'm calling the reg now. Thank you for saying it.\"",
          next: "d-escalate",
          quality: "good",
          scores: { sa: 1, dm: 1, em: 3, comm: 1, rm: 0 },
          feedback: "This is what error recovery looks like: the challenge was heard, the plan changed on its merits, and the challenger was thanked — which guarantees you'll be challenged again next time it matters. Teams where juniors speak up are teams where this exchange got rewarded.",
          principles: ["aar", "pace", "fixation"]
        },
        {
          text: "\"It's very common for legs to swell after hip surgery, Dana. Physio first — if he's no better tomorrow we'll think again.\"",
          next: "deteriorate",
          quality: "poor",
          scores: { sa: -1, dm: -2, em: -3, comm: -1, rm: 0 },
          trap: "Dismissing a challenge",
          feedback: "Two errors in one sentence: the plan stayed wrong, and the person who tried to fix it learned not to bother next time. Dismissed challenges are how wards go quiet — and quiet wards are where incident reports come from.",
          principles: ["pace", "fixation"]
        }
      ]
    },

    "d-escalate": {
      type: "decision",
      text: "You call the registrar in clinic. \"Go ahead.\"",
      options: [
        {
          text: "\"Mr Devlin, day 1 post left THR — new hypoxia, sats 88% on air, now 92% on 15 litres. Chest is clear, left calf is swollen and tender. I think this is a PE. Gas and bloods are underway. I'd like you to review him and advise on imaging and anticoagulation.\"",
          next: "resolution",
          quality: "good",
          scores: { comm: 3, dm: 1, rm: 1, sa: 0, em: 0 },
          feedback: "Headline, key findings, a committed assessment and two specific asks — the registrar can act from a clinic chair in under a minute. Saying 'I think this is a PE' is the load-bearing sentence: it tells them exactly what's at stake if they deprioritise the call.",
          principles: ["sbar"]
        },
        {
          text: "\"Sorry to interrupt clinic. Mr Devlin's sats have been a bit low this morning — we've got him on oxygen and he's more comfortable. Could you pop by after clinic and check him over?\"",
          next: "soft-call",
          quality: "poor",
          scores: { comm: -2, dm: 0, rm: -1, sa: 0, em: 0 },
          trap: "Minimising language",
          feedback: "Every word minimises: 'a bit low', 'more comfortable', 'pop by'. You've described a possible PE in the language of a routine review, and the response will match the language — not the patient. Soft words are how urgent calls get triaged to the bottom.",
          principles: ["sbar", "pace"]
        }
      ]
    },

    "d-escalate-unframed": {
      type: "decision",
      text: "\"Go ahead,\" says the registrar. You describe the obs and findings, and finish. There's a pause: \"OK — what do you think is going on?\"",
      options: [
        {
          text: "Commit: \"Hypoxia, clear chest, swollen calf, day 1 post-hip — I think this is a PE, and I'd like your review and advice on imaging.\"",
          next: "resolution",
          quality: "good",
          scores: { comm: 2, dm: 2, sa: 0, rm: 0, em: 1 },
          feedback: "You committed to an assessment when asked — better late than never. Notice the registrar had to extract it: leading with it next time saves the round trip.",
          principles: ["sbar"]
        },
        {
          text: "Hedge: \"I'm not sure — could be atelectasis, could be the start of a chest infection… I just thought someone senior should know.\"",
          next: "soft-call",
          quality: "poor",
          scores: { comm: -1, dm: -1, sa: 0, rm: 0, em: 0 },
          feedback: "An escalation without an assessment or an ask isn't an escalation — it's a notification. The registrar now has to guess the urgency, and busy people guess low. You don't have to be RIGHT; you have to be clear about what you're worried about.",
          principles: ["sbar", "call-for-help"]
        }
      ]
    },

    "soft-call": {
      type: "info",
      text: "\"Thanks — I'll swing by after clinic,\" says the registrar, and is gone.\n\nForty minutes later Mr Devlin's sats drop to 84% on 15L and he becomes clammy and pre-syncopal. The ward sister puts out a MET call. The team's first question: \"When did the hypoxia start, and who knew?\"",
      vitals: [
        { label: "HR", value: "124", state: "bad" },
        { label: "BP", value: "98/60", state: "warn" },
        { label: "RR", value: "30", state: "bad" },
        { label: "SpO₂", value: "84% (15L)", state: "bad" },
        { label: "NEWS2", value: "11", state: "bad" }
      ],
      next: "end-poor"
    },

    deteriorate: {
      type: "info",
      text: "The physio arrives an hour later and stops at the doorway: Mr Devlin is grey, RR 32, sats 85% on 15L. She pulls the emergency buzzer.\n\nThe MET team diagnose a massive PE on bedside echo. He goes to ICU. Dana doesn't say anything to you. That's the worst part.",
      next: "end-poor"
    },

    resolution: {
      type: "info",
      text: "The registrar reviews him within the half hour, agrees: PE until proven otherwise. He's treated per protocol while CTPA is arranged — it confirms bilateral segmental emboli. By evening he's stable on the ward, anticoagulated, sats 96% on 2 litres.\n\nThe registrar, signing the notes: \"Good catch on the calf. Half of these get called 'atelectasis' for a day first — that day matters.\"",
      next: "end-good"
    },

    "end-good": {
      type: "end",
      outcome: "good",
      summary: "A real reading believed, a frightened patient assessed instead of labelled, a differential that kept the killer diagnosis on top, and an escalation that committed to an assessment. Notice that the clinical knowledge involved was FY1-level throughout — what carried this case was the discipline of not letting three separate comfortable stories ('the probe', 'anxiety', 'atelectasis') close the file early."
    },

    "end-poor": {
      type: "end",
      outcome: "poor",
      summary: "Mr Devlin's PE declared itself on its own schedule, with the team a step behind throughout. Trace the chain: each handoff of responsibility — to the probe, to anxiety, to physio, to 'after clinic' — felt reasonable in the moment. That's the anatomy of most real incidents: not one bad decision, but a relay of soft ones. Run it again and watch for the moment the calf stopped fitting the story."
    }
  }
});
