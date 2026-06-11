/* ============================================================
   FWRD CRM Toolkit — the cognitive tools library.
   Each tool: id, name, category, oneLiner, what, when, example, practice.
   Scenarios link to these via option `principles: ['sbar', ...]`.
   Categories: 'Communication', 'Situational awareness',
               'Decision-making', 'Team & resources', 'Error management'
   ============================================================ */
window.FWRD = window.FWRD || {};

FWRD.toolkit = [

  /* ---------------- Communication ---------------- */
  {
    id: "sbar",
    name: "SBAR",
    category: "Communication",
    oneLiner: "A four-part structure for escalation calls: Situation, Background, Assessment, Recommendation.",
    what: "SBAR forces the critical information to the front of the call and ends with a clear request, so the listener knows in the first ten seconds why you are calling and what you need.",
    when: "Any escalation or referral: phoning a registrar at 3am, calling critical care outreach, handing over to the crash team.",
    example: "S — \"I'm calling about Mrs Carter on Ward 7, who I think is septic and is hypotensive.\"\nB — \"She's 74, day 2 post lap chole. She was well at the evening round.\"\nA — \"NEWS2 is 8. HR 118, BP 84 systolic after a fluid bolus, temp 38.2. Lactate is pending.\"\nR — \"I need you to review her within 15 minutes, and I'd like to start the sepsis bundle now.\"",
    practice: "Pick any patient you saw recently. Out loud, deliver a 30-second SBAR as if escalating them. Time yourself — the Recommendation should arrive before 30 seconds."
  },
  {
    id: "closed-loop",
    name: "Closed-loop communication",
    category: "Communication",
    oneLiner: "Direct an instruction to a named person, get it repeated back, and confirm completion.",
    what: "Three steps: (1) you address a specific person by name with a specific task, (2) they read it back, (3) they report when it's done. It eliminates the two classic failures: tasks aimed at nobody ('someone get access') and tasks assumed done but never started.",
    when: "Every time-critical instruction in an emergency — drugs, access, calls for help, monitoring.",
    example: "You: \"Sarah, please give 500 ml Hartmann's stat and tell me when it's running.\"\nSarah: \"500 ml Hartmann's stat — on it.\"\nSarah (later): \"Fluids are running.\"",
    practice: "In your next routine shift, deliver three instructions using name + task + read-back. Notice how often un-named requests evaporate."
  },
  {
    id: "pace",
    name: "Graded assertiveness (PACE)",
    category: "Communication",
    oneLiner: "Probe → Alert → Challenge → Emergency: a ladder for speaking up when something feels wrong.",
    what: "PACE gives you pre-rehearsed language to challenge a decision, even up the hierarchy, escalating in firmness: Probe (\"I'm not sure I follow — what makes us confident this is just intoxication?\"), Alert (\"I'm concerned his GCS has dropped\"), Challenge (\"I'm not comfortable waiting; I think he needs a scan now\"), Emergency (\"Stop — this is unsafe. I'm calling the consultant\"). The related CUS tool uses three trigger phrases: I'm Concerned, I'm Uncomfortable, this is a Safety issue.",
    when: "Whenever your concern persists after being dismissed — diagnosis you doubt, a plan that ignores new data, a senior who hasn't seen what you've seen.",
    example: "P — \"Can I check my understanding — we're attributing the drowsiness to alcohol?\"\nA — \"I'm concerned: his GCS has fallen from 14 to 11 since admission.\"\nC — \"I don't think we should wait until the morning round. I think he needs urgent imaging.\"\nE — \"I'm now really worried this is unsafe. I'm putting out a call / contacting the consultant.\"",
    practice: "Say all four PACE steps out loud for a scenario where a senior dismisses your concern about a deteriorating patient. Rehearsing the words is what makes them available under stress."
  },

  /* ---------------- Situational awareness ---------------- */
  {
    id: "sa-levels",
    name: "Three levels of situational awareness",
    category: "Situational awareness",
    oneLiner: "Endsley's model: perceive the cues → understand what they mean → project what happens next.",
    what: "Level 1: what do I actually see/hear (obs, monitor, patient, team)? Level 2: what do these cues mean together (synthesis, diagnosis)? Level 3: what is likely to happen in the next 5–30 minutes, and what should be ready? Most SA failures are level 1 (cue never noticed) or level 3 (nobody anticipated the next problem).",
    when: "Continuously — but deliberately rebuild all three levels whenever the situation changes, you return to a bedside, or you take handover.",
    example: "Level 1: \"RR 28, new oxygen requirement, patient pale and quiet.\"\nLevel 2: \"This is respiratory deterioration, not anxiety — the quiet patient is the worrying one.\"\nLevel 3: \"If this continues she'll need critical care review — I'll alert outreach now, not in an hour.\"",
    practice: "With any clinical photo, vignette or TV resus scene: list 5 cues (L1), one sentence of meaning (L2), and your prediction for the next 10 minutes (L3)."
  },
  {
    id: "ten-for-ten",
    name: "10 seconds for 10 minutes",
    category: "Situational awareness",
    oneLiner: "A deliberate 10-second pause to step back, share the picture and re-plan — buying the next 10 minutes.",
    what: "Under pressure teams tunnel onto tasks and lose the overview. The leader calls a brief structured pause: \"Quick recap: this is what I think is going on, this is what we've done, this is the plan — does anyone disagree or have anything to add?\" It synchronises the team's mental model and surfaces information held by only one person.",
    when: "At natural breaks (rhythm check, after a drug, when new results arrive), whenever you feel lost, or when the situation isn't responding as expected.",
    example: "\"Team, 10 seconds: 68-year-old, PEA arrest, third cycle, adrenaline given. Likely causes — hypoxia or hypovolaemia. Plan: continue CPR, get the blood gas, check the drain output. Anyone got anything I'm missing?\"",
    practice: "Script your own 10-second recap for the last emergency you attended (or saw). Say it out loud in under 15 seconds."
  },
  {
    id: "fixation",
    name: "Fixation & anchoring traps",
    category: "Situational awareness",
    oneLiner: "The errors that make smart clinicians wrong: locking onto one diagnosis, one task, or the first explanation offered.",
    what: "Anchoring: weighting the first information too heavily ('post-op pain', 'just drunk'). Fixation: persisting with a plan despite evidence it's failing. Confirmation bias: only noticing cues that fit. Premature closure: stopping the diagnostic search once any answer is found. The defence isn't intelligence — it's habits: verbalise your working diagnosis, actively seek disconfirming evidence, and treat every inherited label as a hypothesis.",
    when: "Highest risk when you've inherited a diagnosis from someone else, when you're tired or task-saturated, and when the story is 'obvious'.",
    example: "Trap: \"The sats probe has been playing up\" → reading dismissed → hypoxia missed.\nDefence: \"Treat the number as real until the patient proves otherwise — check the probe AND the patient.\"",
    practice: "Recall a near-miss you've seen. Name the specific bias involved, and the single cue that — if attended to — would have broken the fixation."
  },

  /* ---------------- Decision-making ---------------- */
  {
    id: "ooda",
    name: "OODA loop",
    category: "Decision-making",
    oneLiner: "Observe → Orient → Decide → Act, then loop. Fast, repeated cycles beat one perfect plan.",
    what: "A crisis is not solved with one decision but with rapid cycles: gather cues (Observe), fit them to your mental model (Orient), choose the next action (Decide), do it (Act) — then immediately re-observe the effect. The discipline is in closing the loop: every action is also a test of your current theory.",
    when: "Dynamic situations where the picture keeps changing — resus, deteriorating patients, multiple competing jobs.",
    example: "Observe: BP didn't respond to the bolus. Orient: this is not simple hypovolaemia — think sepsis with vasoplegia. Decide: escalate to critical care now. Act: phone outreach, prepare for review. Loop: recheck BP in 5 minutes.",
    practice: "Take any decision you made today and ask: what observation would have told me it was wrong, and when did I actually recheck?"
  },
  {
    id: "t-dodar",
    name: "T-DODAR",
    category: "Decision-making",
    oneLiner: "Aviation's structured decision tool: Time, Diagnosis, Options, Decide, Assign, Review.",
    what: "T — how much time do we have before this decision is made for us? D — what do we think is going on? O — what are the realistic options? D — decide and say the decision out loud. A — assign tasks to named people. R — set a review point ('if no better in 10 minutes, we do X'). It converts a swirling crisis into six answerable questions.",
    when: "Decisions with a little more time than a cardiac arrest: the sick-but-not-arrested patient, transfer decisions, whether to wait for a senior.",
    example: "T: \"BP is falling — we have minutes, not seconds.\" D: \"Likely sepsis.\" O: \"More fluid + outreach, or wait for the registrar.\" D: \"We escalate now.\" A: \"Sarah — fluids. I'll phone outreach.\" R: \"Reassess BP in 5 minutes.\"",
    practice: "Run T-DODAR out loud on a written scenario. The step most people skip is R — always state your review point."
  },
  {
    id: "rpd",
    name: "Recognition-primed decisions — and when to slow down",
    category: "Decision-making",
    oneLiner: "Experts decide by pattern-matching, not option-listing. The skill is knowing when the pattern can't be trusted.",
    what: "Klein's research: under time pressure experts recognise a situation as typical and run the matched response, mentally simulating it first. This is fast and usually right — but it fails when cues are ambiguous, the situation is novel, or the data contradicts the pattern. Triggers to deliberately slow down (switch to System 2): 'this isn't responding as expected', 'two cues don't fit', 'everyone is certain but I can't say why'.",
    when: "Always running in the background; the actionable part is noticing the slow-down triggers.",
    example: "Pattern: drowsy + smells of alcohol = intoxicated. Slow-down trigger: GCS still falling at 4 hours, on anticoagulants. Action: abandon the pattern, image the head.",
    practice: "List three 'slow-down triggers' you will personally watch for. Write them somewhere you'll see them on shift."
  },

  /* ---------------- Team & resources ---------------- */
  {
    id: "declare-emergency",
    name: "Declaring an emergency & allocating roles",
    category: "Team & resources",
    oneLiner: "Name the emergency out loud, claim or assign leadership, and give every helper a named role.",
    what: "Teams perform when the situation is explicit. Saying \"This is a cardiac arrest — I'm leading until the team arrives\" does three things: tells everyone the rules have changed, establishes a single coordinating voice, and licenses task allocation. Then allocate by name: compressions, airway, drugs, scribe, runner. A leader who stays hands-off keeps the bandwidth to see the whole picture.",
    when: "Cardiac arrest, peri-arrest, major haemorrhage, any scene with more than two helpers and no clear structure.",
    example: "\"This is a cardiac arrest. I'm leading. Maria — compressions. Tom — airway and oxygen. Priya — attach the defib pads and put out the 2222 call, tell me when it's done.\"",
    practice: "Verbally run the first 60 seconds of an arrest you lead: declaration, three named allocations, and the 2222 call — in under 30 seconds."
  },
  {
    id: "call-for-help",
    name: "Calling for help early",
    category: "Team & resources",
    oneLiner: "Help is a resource you deploy, not an admission of failure. The best clinicians call earlier, not later.",
    what: "The commonest resource-management failure in junior practice is delayed escalation — driven by fear of looking incapable, uncertainty about 'bothering' seniors, and optimism bias ('they'll pick up after this bolus'). Reframe: your job at 3am is not to fix everything; it is to recognise, start safe first steps, and mobilise the right people fast. A call that turns out unnecessary costs minutes; a late call can cost a life.",
    when: "NEWS2 triggers, any 'gut feeling' of deterioration, anything you've never managed alone before, two simultaneous sick patients.",
    example: "\"I may be wrong, but I'm worried about this patient and I want you to see her — NEWS2 is 8 and she's not responding to fluids.\" (No senior worth their salt criticises that call.)",
    practice: "Decide your personal tripwires now — e.g. 'NEWS2 ≥ 7, any falling GCS, any lactate > 2 = I call'. Pre-commitment removes the 3am negotiation with yourself."
  },

  /* ---------------- Error management ---------------- */
  {
    id: "checklists",
    name: "Checklists & cognitive aids",
    category: "Error management",
    oneLiner: "Under stress, working memory shrinks. Written aids hold the steps so your brain can hold the situation.",
    what: "Stress physiology reliably degrades recall and narrows attention — that's biology, not weakness. High-reliability industries respond by offloading: emergency checklists, algorithm cards, dose references. Using an aid in a crisis is a marker of expertise, not inexperience. Know where your aids live (resus algorithm on the trolley, anaphylaxis poster, local escalation policy) before you need them.",
    when: "Any rare, high-stakes event: arrests, anaphylaxis, malignant hyperthermia, major haemorrhage protocols.",
    example: "\"Priya, grab the algorithm card from the trolley and be our checklist reader — call out anything we've missed.\"",
    practice: "On your next shift, physically locate three cognitive aids in your clinical area. You can't use what you can't find."
  },
  {
    id: "aar",
    name: "After Action Review (debrief)",
    category: "Error management",
    oneLiner: "Four questions after any significant event: What was supposed to happen? What happened? Why the gap? What do we change?",
    what: "The debrief is where experience becomes learning — without it, ten emergencies teach less than one reviewed emergency. The AAR is blame-free and behaviour-focused: it asks about systems, communication and decisions, not about who was 'good'. Even a 3-minute 'hot debrief' after an arrest measurably improves team performance and protects team welfare.",
    when: "After every arrest, every emergency, every simulation — and privately after any shift that rattled you.",
    example: "\"Before we scatter — two minutes. What went well? The 2222 call and early compressions. What was hard? We had no scribe and lost track of adrenaline timing. Next time: allocate a scribe in the first roles. Everyone okay?\"",
    practice: "Self-AAR your last difficult shift in writing: the four questions, one honest sentence each."
  }
];
