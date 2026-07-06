/* ============================================================
   Beginner's Guide — Lesson 5: Healthcare CRM
   From theory to bedside.
   ============================================================ */
window.FWRD = window.FWRD || {};
FWRD.guideLessons = FWRD.guideLessons || [];

FWRD.guideLessons.push({
  id: "bedside",
  num: 5,
  title: "From Theory to Bedside",
  subtitle: "Applying CRM to arrests, trauma, theatre, ICU and ward crises",
  minutes: 10,
  goal: "CRM only matters if it changes what you do at work. A room-by-room walk through the hospital — arrest, trauma, theatre, the deteriorating ward patient, handover — watching the same five skills wear different uniforms.",
  closing: "Same grammar, every room — you now have the map. The final lesson turns all of it into artefacts: the scripts, checklists and routines you'll actually carry in your pocket.",
  blocks: [

    {
      type: "text",
      text: "Everything so far has been building one claim: crisis performance is a designed, rehearsed, reviewable skill. This lesson cashes the claim in.\n\nWe're going to walk through the hospital — arrest call, trauma bay, theatre, the ward at 3am, and the handover between them all — and watch the **same five domains** (awareness, communication, decision-making, resources, error management) wear five different uniforms.\n\nTwo instructions for the walk. First, as in Lesson 2, keep the camera running: everything here is a visible behaviour, not a virtue. Second, keep asking the personal question: *which of these could I do at my current grade, without anyone's permission?* The answer, you'll find, is nearly all of them."
    },

    {
      type: "text",
      text: "**Room one: the cardiac arrest**\n\nThe arrest is CRM's home fixture — maximum time pressure, ad-hoc team, an algorithm everyone knows and a room that still, somehow, descends into chaos. The choreography that prevents chaos:\n\n**Minute zero:** confirm, then **declare** — 'this is a cardiac arrest, I'm leading until the team arrives.' Roles to names: compressions, airway, defib, 2222 with a read-back. The declaration is the keystone; every unled arrest you'll ever attend skipped it.\n\n**The cycles:** the leader stays off the chest, watching the whole board — compression quality, the clock, the next decision. Drugs move on closed loops ('adrenaline 1mg IV given' — said aloud, written down). Rhythm checks are **choreographed pauses**, not scrambles: 'stopping in ten seconds… rhythm check… VF, charging, everybody clear — oxygen away — shocking.'\n\n**The quiet moments:** the ninety seconds mid-cycle are the leader's thinking time — a ten-for-ten recap ('third cycle, VF throughout, likely cardiac; anything I'm missing?') that hunts reversible causes and synchronises the room.\n\n**The team arrives:** a ten-second structured handover — 'found unresponsive at 03:10, VF, two shocks, adrenaline at 03:16' — then take an assigned role. Information walks out of the room when the finder melts away.\n\n**Afterwards:** two minutes, everyone: what went well, what was hard, is everyone okay? The hot debrief is where an arrest becomes training — and where the HCA who's just seen their first death gets noticed."
    },

    {
      type: "quiz",
      question: "Rhythm check. Compressions have stopped, six people are looking at the monitor, and three voices start at once — 'is that fine VF?', 'shall I charge?', 'do we resume?'. Hands have been off the chest for eight seconds. What restores order fastest?",
      options: [
        {
          text: "The most senior person present takes over the analysis — experience reads rhythms fastest",
          explain: "Reading the rhythm was never the bottleneck — six capable people can see the screen. The bottleneck is that nobody owns the *decision*, so everyone is negotiating. Seniority helps only if the senior does the thing in the correct answer: speaks as the single voice."
        },
        {
          correct: true,
          text: "One voice — the leader — narrates the protocol: \"Back on the chest. I'm calling it VF. Charging to 150. Everybody clear… shocking.\"",
          explain: "Two moves in one: compressions restart *while* the decision is made (hands-off time is the currency of arrest outcomes), and the decision gets a single owner narrating a shared script. The narration isn't ceremony — it's how six brains stay one team. If you're leading and the room starts polling, the fix is a sentence: 'one voice — mine.'"
        },
        {
          text: "Pause everything for five seconds of silence so the rhythm can be assessed without distraction",
          explain: "Silence helps the analysis but doubles down on the real error — the still chest. The protocol solves this precisely: compressions resume during charging, and the *only* mandatory pause is the shock itself. Order comes from the script, not from quiet."
        }
      ]
    },

    {
      type: "text",
      text: "**Room two: the trauma call — won before the patient arrives**\n\nTrauma is the specialty that institutionalised the pre-brief, because it gets a gift no other crisis offers: **notice**. Seven minutes of warning is seven minutes of CRM:\n\nRoles allocated *by name* before the doors open — primary survey, airway, access and bloods, scribe, team leader — so nobody negotiates over a bleeding patient. Predictions shared: 'fall from scaffolding — I'm worried about pelvis and c-spine; if he's hypotensive we activate the massive haemorrhage protocol early.' Kit checked, drugs drawn, sizes guessed. The leader states their own position: hands-off, at the foot of the bed.\n\nThen the patient arrives, and you can *hear* whether the brief worked: a good trauma bay sounds like a quiet series of closed loops — primary survey called out ('airway patent, trachea central…'), findings acknowledged by the scribe, decisions narrated by one voice.\n\nSteal the structure even where there's no trauma centre: the pre-arrival phone call about a sick patient coming to the ward, the two minutes before a high-risk procedure, the moment before you open the door to a deteriorating patient with the nurse at your side — every one is a miniature trauma brief waiting to happen. 'Before we go in: I think this is sepsis. You're on obs and fluids, I'm assessing. If I say outreach, that's a 2222-priority call.'"
    },

    {
      type: "text",
      text: "**Room three: theatre — CRM's birthplace in medicine**\n\nAnaesthesia adopted CRM before the rest of medicine (Gaba's Anesthesia Crisis Resource Management, early 1990s) for a simple reason: its crises look most like aviation's — a stable, monitored routine that can go catastrophic in ninety seconds. What theatre built is worth studying wherever you work:\n\n**The WHO checklist as team manufacture** — Lesson 4's finding in daily practice. Names and roles aloud, anticipated problems stated by surgeon *and* anaesthetist *and* scrub team. When it's performed (rather than mumbled at the ceiling), it licenses every person in the room to speak later.\n\n**Crisis manuals at arm's reach** — laminated, indexed emergency drills (anaphylaxis, malignant hyperthermia, can't-intubate-can't-oxygenate) with a cultural rule attached: reaching for the manual is *expertise*, not weakness, and someone is nominated to read it aloud while hands stay busy.\n\n**Declared emergencies** — 'I need the room quiet, we have a problem' converts a theatre from routine mode to crisis mode in one sentence: music off, spare people to the phone, hierarchy flattened.\n\nAnd hovering over all of it, the Bromiley case — which happened in exactly this environment, to exactly this calibre of team, and is the reason these structures now exist. Theatre didn't get safer by hiring better people. It redesigned the room."
    },

    {
      type: "text",
      text: "**Room four: the ward at 3am — the commonest crisis in the hospital**\n\nForget the drama of the arrest: the modal crisis in any hospital is a patient quietly deteriorating on a general ward, held by the most junior doctor in the building. Every incident report you'll ever read about one has the same skeleton — deterioration unrecognised, escalation delayed, concerns diluted. Which means the CRM is knowable in advance:\n\n**Recognition is a system, not a feeling.** NEWS2 exists because 'looks okay to me' fails at night. The trend outranks the snapshot; the nurse's 'she's just not right' is data with a decent evidence base behind it; and your job at review is to build all three levels of awareness — what's happening, what it means, what happens next.\n\n**Escalation is a skill, not an admission.** Headline first ('I think she's septic and she's shocked'), numbers that matter, an explicit ask with a timeframe. Pre-commit your tripwires — 'NEWS2 ≥7, lactate >2, or my own unease = I call' — so 3am-you doesn't renegotiate them. And when the response is 'sounds fine, review in the morning' and your gut says otherwise: that is the PACE moment the whole guide has been rehearsing you for. *'I'm not comfortable waiting. I think this needs review tonight — if you can't come, tell me and I'll call the consultant. I'm not leaving this.'*\n\n**ICU's exportable habit:** the daily review that ends with *stated* shared awareness — 'sickest patient on the unit, plan if he worsens is X, everyone agree?' — plus the outreach team as institutionalised 'calling for help early'. The ward round that names its sickest patient and its contingency plan is running ICU-grade CRM with zero extra resources."
    },

    {
      type: "quiz",
      question: "02:40. Your patient's NEWS2 has climbed from 3 to 7; you think this is evolving sepsis. The registrar, clearly exhausted, says: \"He's young, he'll hold till the morning round — just repeat the gas at six.\" You disagree. What does good CRM sound like now?",
      options: [
        {
          text: "\"Okay — I'll do the gas at six and call you if the numbers get worse.\"",
          explain: "The authority gradient wins again — and notice *how* it wins: not through fear, but through plausible-sounding compromise. You've accepted a four-hour observation window on a patient whose trend you don't trust, and made your next escalation conditional on him getting sicker. This is the exact sentence pattern in a hundred incident reports."
        },
        {
          text: "Skip the registrar and put out a peri-arrest call — the system's there to be used and he'll deteriorate eventually",
          explain: "Tempting, and in a true peri-arrest, correct. But here it spends the loudest alarm in the building on a disagreement you haven't yet had properly — and teaches the registrar you're erratic rather than assertive. The ladder exists: challenge clearly first, state your next rung, *then* climb it if refused. (If he were periarrest-sick right now, different answer.)"
        },
        {
          correct: true,
          text: "\"I hear you — but his NEWS2 has doubled in four hours and I think this is sepsis. I'm not comfortable waiting till morning. I need you to see him tonight, or tell me, and I'll ring outreach and the consultant myself.\"",
          explain: "Graded assertiveness, delivered whole: acknowledgment, the trend (not just the number), a named concern, an explicit ask, and the next rung stated as procedure rather than threat. Most registrars come at this point — fatigue was the barrier, not judgement. And if they don't, you've cleanly earned the next call. This one paragraph is the highest-yield thing a junior doctor can rehearse."
        }
      ]
    },

    {
      type: "text",
      text: "**The corridor between every room: handover**\n\nOne more location, easy to miss because it doesn't look like a crisis: the handover. It should — it's the moment the patient's entire safety is compressed into a few sentences and passed between brains. Lesson 3's 'Just Drunk?' trap began at handover, with a label ('sleeping it off') that then digested every new finding for four hours.\n\nCRM at handover is mercifully concrete: **structure** (SBAR per sick patient, sickest first, not bed order); **explicit uncertainty** — the single most protective sentence in medicine may be *'the bit I'm not sure about is…'*, because it hands the next shift a question instead of a conclusion; **read-back for the critical items** ('so: chase the 22:00 gas, escalate if lactate's up'); and **receiving actively** — the one question that tests the label: 'what's the evidence he's just intoxicated?'\n\nNow step back and look at the whole hospital tour at once. Declaration, named roles, closed loops, shared pictures, pre-briefs, tripwires, structured challenge, debriefs — five rooms, one grammar. That's the punchline of this lesson: **you don't learn arrest-CRM and trauma-CRM and theatre-CRM. You learn CRM, once, deeply — and it works in rooms you haven't seen yet.**"
    },

    {
      type: "keypoints",
      items: [
        "Arrest: declare, allocate to names, leader off the chest, choreographed rhythm checks, ten-second handover to the team, two-minute hot debrief.",
        "Trauma: the crisis is won in the pre-arrival brief — roles, predictions, kit, leader's position. Steal the structure for any warned emergency.",
        "Theatre: checklists that manufacture teams, crisis manuals within reach, declared emergencies — the room was redesigned, not the people upgraded.",
        "Ward: recognition is a system (trends + NEWS2 + the nurse's unease); escalation is a rehearsed skill with pre-committed tripwires; the registrar-says-wait moment is PACE's home ground.",
        "Handover: SBAR, explicit uncertainty ('the bit I'm not sure about is…'), read-backs, and one question that tests the inherited label.",
        "It's one grammar in five uniforms — learn it once, deeply, and every room becomes legible."
      ]
    },

    {
      type: "try",
      text: "At your very next handover — giving or receiving — deploy one sentence. Giving: **'the bit I'm not sure about is…'** Receiving: **'what's the evidence for that diagnosis?'** (asked with curiosity, not challenge). Either one punctures a label that would otherwise travel all night."
    },

    {
      type: "tools",
      intro: "The Toolkit cards doing the heavy lifting in this lesson:",
      ids: ["sbar", "pace", "call-for-help", "declare-emergency", "aar"]
    },

    {
      type: "action",
      label: "Run the ward at 3am: 'The Quiet Deterioration'",
      href: "#play/sepsis-ward",
      text: "The Level 1 sepsis scenario is this lesson's ward section made playable — the trend, the tripwires, the busy registrar and all. If you ran it before the guide, run it again and watch your own decisions change."
    }
  ]
});
