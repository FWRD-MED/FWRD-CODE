/* ============================================================
   Beginner's Guide — Lesson 4: Cross-Industry Lessons
   Risk management by design.
   ============================================================ */
window.FWRD = window.FWRD || {};
FWRD.guideLessons = FWRD.guideLessons || [];

FWRD.guideLessons.push({
  id: "industries",
  num: 4,
  title: "Risk Management by Design",
  subtitle: "What healthcare can learn from aviation, the military and other high-risk industries",
  minutes: 9,
  goal: "Other industries stopped treating crises as tests of individual brilliance and started designing for them. A tour of what they built — and an honest look at what transfers to the bedside.",
  closing: "Design, rehearse, review — you'll now spot the pattern (and its absence) everywhere you work. Lesson 5 brings everything home: the same principles, applied room by room across the hospital.",
  blocks: [

    {
      type: "text",
      text: "Here is a question worth sitting with: **why is flying safer than being in hospital?**\n\nCommercial aviation moves millions of people daily through a physically absurd activity, with a fatal accident rate so low that a career airline pilot will most likely never experience one. Healthcare, meanwhile — by the estimates that launched the modern patient safety movement, starting with *To Err is Human* in 1999 — harms a meaningful fraction of the patients it admits.\n\nThe difference is not talent. Medicine selects and trains people at least as hard as aviation. The difference is a decision aviation made after the disasters of the 1970s: **stop treating crises as tests of individual excellence, and start treating them as events to design for, rehearse, and review.**\n\nMedicine still largely runs the older model: crisis as exceptional event, met by whoever is there, reviewed only if something goes visibly wrong, with performance attributed to the individuals involved. This lesson is a tour of the alternative — through the industries that built it."
    },

    {
      type: "case",
      title: "Tenerife — the cost of an unchallengeable captain (1977)",
      text: "Two Boeing 747s — KLM and Pan Am — sat in fog on the single runway of a small Canary Islands airport, diverted there after a bomb incident closed the main airport. Delays stacked up. The KLM captain — Jacob van Zanten, the airline's chief flying instructor, literally the face of KLM's magazine adverts — was anxious about crew duty-time limits.\n\nCleared only for a route briefing, he pushed the throttles to take off. His co-pilot, sensing something wrong, offered a hesitant challenge — 'is he not clear, that Pan Am?' — was rebuffed, and deferred. A radio call that might have saved everyone was mangled by two transmissions overlapping into static. Seconds later the KLM jet, at takeoff speed, met the Pan Am taxiing through the fog. Five hundred and eighty-three people died — still the deadliest accident in aviation history.\n\nNo mechanical failure. Two fully functioning aircraft, destroyed by hierarchy, hurry, and ambiguous communication.\n\nTogether with United 173 (Lesson 3), Tenerife forced aviation's reckoning: the captain-as-unchallengeable-authority model was killing people. What replaced it — mandatory CRM training, standardised phraseology, read-backs for every clearance, and the explicit right and **duty** of any crew member to challenge — is the ancestor of everything in this guide.\n\nEvery hospital has its van Zantens: brilliant, senior, usually right, and moving fast. The question Tenerife asks medicine is not 'do you have difficult seniors?' but '**what structure exists for the moment when the most senior person in the room is wrong?**'"
    },

    {
      type: "text",
      text: "**Aviation's toolbox** — four exports, all bedside-ready:\n\n**Checklists — memory prostheses, not paperwork.** Pilots with ten thousand hours still read the before-landing checklist aloud, because aviation accepted that stressed experts miss steps — reliably, measurably. Note the design: short, critical items only, one person reads, another confirms. Compare the 40-item laminated forms medicine sometimes produces and calls 'a checklist'.\n\n**The briefing.** Before every single takeoff, crews who may have just met spend ninety seconds aligning: what we're doing, what could go wrong, who does what if it does. Not because takeoff is unusual — because it's critical. Medicine's equivalents (the trauma pre-brief, the theatre huddle, the ward safety huddle) work exactly as well, where they're actually done.\n\n**The sterile cockpit.** Below 10,000 feet — the critical phase — no conversation except the task. No admin, no anecdotes. The translation isn't silence on the ward; it's protecting critical moments (drug calculations, handovers, rhythm checks) from the interruption culture medicine treats as normal.\n\n**The just-culture debrief.** Every flight gets reviewed; near-misses are reported in tens of thousands per year, voluntarily, because reporting is safe and visibly leads to change. The 'black box' isn't the technology — it's the social contract that data about failure is for learning, not blame.\n\nAnd when it works? January 2009: US Airways 1549 loses both engines to birds over Manhattan. Watch the CRM: Sullenberger takes the controls with two words — 'my aircraft' — and the explicit reply 'your aircraft' (closed loop, role clarity); Skiles runs the restart checklist without being told (competent followership); 208 seconds, zero shouting, everyone lives. That wasn't heroism defeating a crisis. That was **design, rehearsed until it looked like calm**."
    },

    {
      type: "quiz",
      question: "In 2009, a study across eight hospitals worldwide introduced a 19-item surgical safety checklist — including the step where the team pause and introduce themselves by name and role. Deaths fell from 1.5% to 0.8%, complications from 11% to 7%. A two-minute checklist nearly halved surgical mortality. What's the best explanation of *why*?",
      options: [
        {
          text: "It caught technical omissions — antibiotics not given, wrong site, missing equipment",
          explain: "It did catch those, and that's real. But the omissions it catches were already 'known' by everyone in the room — the checklist's job was making the knowledge operational. And that still doesn't explain the size of the effect. Something else was happening."
        },
        {
          correct: true,
          text: "It manufactured a team: names spoken, roles clear, concerns invited — so that for the rest of the case, speaking up had already been rehearsed",
          explain: "This is the consensus reading, and the deepest lesson in this guide. A person who has said their name aloud and been asked 'any concerns?' at 08:35 is measurably more likely to say 'I think that's the wrong side' at 09:20. The checklist is a hierarchy-flattening device disguised as a tick-box — Tenerife's antidote, two minutes long. (The study: Haynes et al., NEJM 2009.)"
        },
        {
          text: "Observation effect — teams behave better when they know they're being studied",
          explain: "A fair scientific instinct, and some of the effect may be exactly that. But the improvement held across wildly different hospitals and persisted beyond the study window — and later work (e.g. crisis checklists in simulated theatre emergencies: 23% of critical steps missed without, 6% with) shows the mechanism working under controlled conditions."
        }
      ]
    },

    {
      type: "text",
      text: "**Three more industries, one habit each:**\n\n**The military: brief — execute — debrief.** No operation, however routine, without a briefing before and an After Action Review after. The AAR's four questions (*What was supposed to happen? What happened? Why the gap? What changes?*) are asked rank-free — a private can, and is expected to, point out a colonel's error, because the review is about the mission, not the people. The military also pioneered **stress inoculation**: repeatedly training under graded, realistic pressure so that the first time your hands shake isn't the first time it's real. Simulation — and, in its small way, this app's timed scenarios — is medicine's version.\n\n**The fire service: command by design.** At every incident, someone declares command, out loud, on the radio — from that moment there is exactly one coordinating voice, with a deliberately limited span of control. The 'size-up' — a structured first sweep of the scene before committing crews — is the A–E assessment's cousin. Nobody freelances into a burning building; enthusiasm without allocation is treated as the hazard it is.\n\n**Nuclear power and the high-reliability organisations: obsession with weak signals.** The safest complex industries share a mindset researchers call *preoccupation with failure*: near-misses are treasure, small anomalies are investigated as if they were the disaster's first draft, and expertise outranks seniority — in a reactor anomaly, the person who understands the system takes precedence over the person with the biggest office. 'Deference to expertise' is the institutionalised version of listening to the Bromiley nurses."
    },

    {
      type: "quiz",
      question: "Be honest about your own workplace. What's the closest thing your ward, theatre or department has to the pre-flight brief — ninety seconds where the team aligns before the risky work starts?",
      options: [
        {
          text: "We have one and it happens reliably (huddle, WHO checklist, board round done properly)",
          explain: "Genuinely excellent — and worth noticing *why* it survives: almost always because someone senior treats it as non-negotiable rather than nice-to-have. Guard it. And notice what it gives you personally: a licensed moment to say 'I'm worried about bed 4' before bed 4 becomes a crash call."
        },
        {
          text: "It exists on paper but gets skipped or gutted when things are busy",
          explain: "The most common answer — and it contains the whole cultural gap this lesson is about. Aviation briefs *because* it's busy; the brief is what makes busy survivable. A checklist that gets skipped under pressure was never a checklist — it was decoration. The fix rarely needs policy; it needs one person who starts saying 'thirty seconds, before we start—' and doesn't stop."
        },
        {
          text: "Nothing like that exists — the shift starts and we improvise",
          explain: "Thank you for the honesty — this is where much of medicine still is, and it's precisely the 'crisis as exceptional event' model this lesson describes. Here's the empowering bit: a brief needs no permission, no form and no budget. 'Before we start — who's here, who's sickest, what's likely to go wrong tonight?' You can run that tomorrow, at whatever grade you hold."
        }
      ]
    },

    {
      type: "text",
      text: "**What transfers — and what honestly doesn't**\n\nBe wary of anyone who says 'healthcare should just copy aviation'. It shouldn't, and can't. Aircraft are standardised; patients are anything but. A pilot flies one airframe at a time; you're cross-covering six wards. Aviation can ground the fleet; medicine cannot ground the flu season. And your crises rarely announce themselves like an engine failure — they creep, disguised as 'a bit off tonight'.\n\nSo copy the **principles**, not the costumes:\n\n**Design** for the crisis before it happens — briefs, checklists, pre-allocated roles, cognitive aids in known places.\n**Rehearse** — simulation, mental scripts, drills; the first run of anything shouldn't be the real one.\n**Review** — everything, not just catastrophes; near-misses are the cheapest tuition you'll ever get.\n**Flatten** — build the structures that make challenge normal *before* the day the junior is right and the consultant is wrong.\n\nNone of these need a policy, a committee or a budget to start. They need one clinician who has decided that crisis performance is a designed thing. That's the identity this guide is quietly recruiting you into."
    },

    {
      type: "keypoints",
      items: [
        "Aviation's safety record isn't talent — it's the decision to design, rehearse and review, made after Tenerife and United 173.",
        "Tenerife's question for every hospital: what structure exists for the moment the most senior person in the room is wrong?",
        "Checklists are memory prostheses for stressed experts — short, critical, read aloud. The WHO checklist's deepest effect was manufacturing a team that had rehearsed speaking up (deaths 1.5%→0.8%; Haynes, NEJM 2009).",
        "Steal one habit per industry: the military's brief–execute–debrief, fire's declared command and size-up, nuclear's obsession with near-misses and deference to expertise.",
        "Patients aren't airframes — copy principles, not costumes. Design, rehearse, review, flatten.",
        "None of it needs permission. A ninety-second brief can start tomorrow, run by you."
      ]
    },

    {
      type: "try",
      text: "Run one **ninety-second brief** this week, at whatever scale you can control. Before a procedure: 'talk me through what we're doing and what could go wrong.' Starting a night shift: 'who's sickest, and what's our plan if they deteriorate?' Say afterwards that you're trying it out — you'll be surprised who joins in."
    },

    {
      type: "tools",
      intro: "Toolkit cards that operationalise this lesson:",
      ids: ["checklists", "aar", "ten-for-ten", "declare-emergency"]
    }
  ]
});
