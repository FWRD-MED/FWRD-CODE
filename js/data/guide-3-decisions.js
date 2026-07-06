/* ============================================================
   Beginner's Guide — Lesson 3: Decision-Making & Error Systems
   Thinking under pressure.
   ============================================================ */
window.FWRD = window.FWRD || {};
FWRD.guideLessons = FWRD.guideLessons || [];

FWRD.guideLessons.push({
  id: "decisions",
  num: 3,
  title: "Thinking Under Pressure",
  subtitle: "Decision tools, cognitive traps and error management",
  minutes: 10,
  goal: "Crises degrade cognition — yours included. Meet the traps that catch intelligent clinicians, and the simple structures that keep thinking possible when stress narrows the brain.",
  closing: "You now know your own failure modes — which is most of the defence. Lesson 4 zooms out: how entire industries redesigned themselves around these same human limits, and what medicine can steal.",
  blocks: [

    {
      type: "text",
      text: "Start with an uncomfortable experiment you've already run.\n\nRecall a moment of real clinical fear — your first arrest, a sick child, a haemorrhage. Now recall trying to *think* during it: the drug dose you knew cold on Tuesday that evaporated on Saturday night; the tunnel that formed around one monitor number; the colleague's question you heard but didn't process.\n\nThat wasn't weakness. That was **adrenaline doing exactly what it evolved to do**: sharpen you for running and fighting by stripping resources from slow, expensive processes — working memory, broad attention, time perception, verbal reasoning. The very processes clinical medicine runs on.\n\nUnder acute stress, everyone's working memory shrinks, everyone's attention tunnels, everyone's sense of time distorts. The Bromiley team's twenty minutes that felt like five — that's the physiology. You will not out-think it, because it's upstream of thinking.\n\nWhat you can do is what every high-reliability industry does: **give the brain external structure so it doesn't have to be brilliant while frightened.** That's this lesson."
    },

    {
      type: "case",
      title: "United 173 — fixation, measured in fuel (1978)",
      text: "Approaching Portland, Oregon, a United Airlines DC-8 lowered its landing gear — and got a bang, a shudder, and no green 'locked' light. The captain broke off the approach to troubleshoot. Sensible.\n\nFor the next hour, the crew circled while the captain worked the problem: checking bulbs, sending an engineer to peer at gear indicators, preparing the cabin. The gear, it later turned out, was down and locked the whole time — the fault was in the light.\n\nMeanwhile the fuel gauges did what fuel gauges do. The flight engineer mentioned the numbers, then mentioned them again — factually, deferentially, never forcing the conclusion. The captain, a decade of authority in the seat, absorbed and deprioritised each hint. One by one, the engines flamed out. The aircraft crash-landed in a Portland suburb, killing ten.\n\nAn airworthy plane, a trivial fault, a full crew — lost to **fixation** (one problem consuming all attention), an **authority gradient** (a subordinate softening the most important message on the aircraft), and **task saturation** (nobody left flying the big picture). The industry's response was historic: within three years, the first Crew Resource Management courses were running. CRM — the thing this whole guide teaches — was born from this crash.\n\nRead it again replacing 'landing gear light' with 'difficult airway', and 'fuel' with 'oxygen saturation'. That's the Bromiley case. Twenty-seven years apart, same accident."
    },

    {
      type: "text",
      text: "**The traps, by name**\n\nKnowing the taxonomy matters, because you can only catch what you can name:\n\n**Fixation** — one task or theory consumes all attention while the world moves on. *Airway attempt number nine; the sats have been unreadable for ten minutes.*\n\n**Anchoring** — the first information weighs the most, forever. *'Post-op pain' at 22:00 is still the working diagnosis at 02:00 despite a NEWS2 of 8.*\n\n**Confirmation bias** — you notice what fits and explain away what doesn't. *The probe 'playing up' conveniently explains the sats of 88%.*\n\n**Premature closure** — the search stops at the first answer that lets everyone relax. *Glucose 3.4 'explains' the drowsiness — the head injury goes unexamined.*\n\n**Task saturation** — demand exceeds capacity; things silently drop. The deadliest part is invisibility: a saturated clinician looks busy, not failing.\n\nNotice something: every one of these is a **strength misfiring**. Anchoring is fast pattern-recognition; fixation is deep focus; premature closure is decisive efficiency. That's why intelligence doesn't protect you — these traps are made of intelligence. Under stress, they just run without supervision."
    },

    {
      type: "quiz",
      question: "Night shift. Handover says bed 4 is 'agitated, known alcohol misuse, sleeping it off'. At 01:00 the nurse reports he's harder to wake. His glucose is 3.6; you treat it and he briefly improves. At 02:30 he's drowsier still. What's the trap you are — right now, in this vignette — sitting inside?",
      options: [
        {
          text: "Task saturation — night shifts are simply too busy to reassess everyone",
          explain: "Workload is real, but look closer: the case doesn't show you failing to attend — it shows you attending and being satisfied too early, twice. Busyness is the accelerant here, not the trap itself."
        },
        {
          correct: true,
          text: "An inherited anchor plus premature closure — the label 'sleeping it off' has absorbed every new finding, and the glucose gave everyone permission to stop looking",
          explain: "Exactly. The diagnosis arrived with the patient at handover and has been quietly digesting evidence ever since: drowsiness fits, agitation fits, even a genuinely abnormal glucose fits. A falling conscious level with a *corrected* glucose is a new problem — classically, in this story, a head injury on an anticoagulated patient. The defence is mechanical: treat every inherited label as a hypothesis, and let **trends** outvote explanations."
        },
        {
          text: "Confirmation bias in the nurse — they keep reporting drowsiness in a way that fits the alcohol story",
          explain: "The nurse is actually the safety system functioning: three escalating reports across the night. The bias is in how those reports are being *received* — each one filed as more of the same story rather than as a trend demanding a fresh look."
        }
      ]
    },

    {
      type: "text",
      text: "**How experts actually decide — and when not to trust it**\n\nPsychologist Gary Klein studied firefighters, ICU nurses and military commanders making real decisions under real pressure, and found they almost never compare options. They **recognise**: this situation matches a pattern, the pattern comes with an action, run it — checking it briefly in mental simulation first. He called it Recognition-Primed Decision-making, and it's what your consultants are doing when they 'just know'. It's fast, and usually right.\n\nUsually. Pattern-matching fails in exactly the situations this guide cares about: the ambiguous, the novel, the case that resembles something common while being something rare. So the expert skill isn't the pattern-matching — you'll build that with years and with the Scenario Lab. The expert skill is noticing the **slow-down triggers**:\n\n— the plan isn't working (fluids in, BP still falling)\n— two findings don't fit the story (clear chest, sats of 88%)\n— everyone is certain, and nobody can say why\n— you catch the thought *'let's just get through the list'* attached to a sick patient\n\nWhen a trigger fires, you switch modes: deliberately, briefly, structurally."
    },

    {
      type: "text",
      text: "**The structures: three tools, one idea**\n\nEvery crisis decision tool ever invented is the same idea wearing different acronyms: **stop, name the situation, choose out loud, review**. Pick one and make it yours.\n\n**OODA** (Observe–Orient–Decide–Act) — the fighter pilot's loop, best for fast-moving situations. Its real teaching is the *loop*: every action is an experiment, so re-observe after acting. 'Bolus given — BP worse. New information. Re-orient.' Fixation is, precisely, a stuck loop.\n\n**T-DODAR** (Time–Diagnosis–Options–Decide–Assign–Review) — aviation's structured version, best when you have minutes rather than seconds: *How much time do we have? What do we think this is? What are the options? Decide — out loud. Assign tasks to names. Set a review point.* That last step is the anti-fixation device: **'if she's not better in ten minutes, we escalate'** is a tripwire you set while still calm, so future-you doesn't have to renegotiate with fatigue.\n\n**FORDEC** (Facts–Options–Risks–Decide–Execute–Check) — the same skeleton, favoured in European cockpits; useful when two plans genuinely compete and you need the risks spoken aloud.\n\nDon't collect acronyms — that's how CRM dies in laminated posters. Choose one (T-DODAR fits ward medicine beautifully), and drill it until 'stop and structure' is itself the pattern your brain matches under stress."
    },

    {
      type: "quiz",
      question: "You gave a fluid bolus for hypotension ten minutes ago. BP is now lower. In OODA terms, what does discipline look like here?",
      options: [
        {
          correct: true,
          text: "Treat the failed bolus as data: re-orient — 'this isn't simple hypovolaemia' — and choose the next action from the *new* picture, out loud",
          explain: "The loop closed properly: Act produced an observation, the observation forced re-orientation. Verbalising it ('fluids aren't working — I'm now thinking sepsis with vasoplegia, I'm calling outreach') drags the whole team's mental model along with yours. This single habit — *the plan failing is information* — would have saved United 173 and Elaine Bromiley."
        },
        {
          text: "Repeat the bolus — hypovolaemia often needs more than one, and changing plans too early causes chaos",
          explain: "Sometimes clinically true — which is what makes it such a comfortable place to fixate. The discipline isn't 'never repeat'; it's *re-orient before repeating*: say out loud why you believe the diagnosis survives the failed test, and set a review point. If you can't say it, you're not deciding — you're looping."
        },
        {
          text: "Escalate immediately and hand the decision to someone senior",
          explain: "Escalation is very likely part of the right answer (Lesson 5 is emphatic about this) — but 'hand it up' without re-orienting means you deliver a stale picture to your senior: 'BP's low despite fluids' instead of 'I think this is septic shock, fluids have failed, I need you now'. Re-orient first; escalate with the new picture in the same breath."
        }
      ]
    },

    {
      type: "text",
      text: "**Error management: the third pillar**\n\nHere is the mindset shift that separates safety-mature teams from the rest: **errors are not anomalies. They are continuous.** You made several today. So did your consultant. Almost all were caught — by you, by a colleague, by a system — before they touched a patient.\n\nJames Reason's famous Swiss-cheese model says exactly this: harm happens when the holes in every defensive layer line up. You cannot remove the holes (they're made of human cognition — see above). You can add layers and shrink holes:\n\n**Detect early** — verbalise your working theory so others can shoot at it; ask 'what am I missing?' and mean it; treat surprise ('that's odd…') as an alarm, not an inconvenience.\n\n**Recover fast** — when you catch yourself wrong, change plans *completely* rather than defending the old one in instalments. Teams forgive slow starts; incidents grow from slow abandonments.\n\n**Flatten your own gradient** — thank people who challenge you, especially juniors, especially when they're wrong. You're buying the challenge that will one day be right.\n\nAnd afterwards: debrief. Every near-miss you talk about is a hole documented before it kills someone. Lesson 6 gives you the two-minute format."
    },

    {
      type: "keypoints",
      items: [
        "Stress physiology shrinks working memory, tunnels attention and distorts time — in everyone. Structure beats willpower.",
        "Know the traps by name: fixation, anchoring, confirmation bias, premature closure, task saturation. They are strengths misfiring, so intelligence doesn't protect you.",
        "Experts decide by pattern-matching (RPD) — the skill is spotting slow-down triggers: plan not working, findings that don't fit, certainty without reasons.",
        "One structure, learned deeply, beats five on a poster. T-DODAR's review point — 'if no better by X, we do Y' — is a fixation tripwire you set while still calm.",
        "A failing plan is data. Re-orient out loud, then act — never defend the old plan in instalments.",
        "Errors are continuous; safety is detection and recovery. Verbalise your theory, welcome challenge, debrief the near-misses."
      ]
    },

    {
      type: "try",
      text: "Write down your three personal **slow-down triggers** — the specific moments where you commit, in advance, to stopping and running a structure. Steal these if you like: *any patient not responding to my plan; any 'odd' finding I'm tempted to explain away; any inherited label on a patient who's getting worse.* Put them in your phone. Pre-commitment at 2pm is what saves you at 2am."
    },

    {
      type: "tools",
      intro: "Toolkit cards to bookmark from this lesson:",
      ids: ["rpd", "ooda", "t-dodar", "fixation"]
    },

    {
      type: "action",
      label: "Sit inside the trap: run 'Just Drunk?'",
      href: "#play/drowsy-amu",
      text: "The Level 3 scenario is this lesson weaponised — an inherited label, a finding that 'explains everything', and a senior who isn't listening. See if you can feel the pull of premature closure even when you know it's coming."
    }
  ]
});
