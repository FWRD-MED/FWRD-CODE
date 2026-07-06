/* ============================================================
   Beginner's Guide — Lesson 1: Foundations
   Why clinical knowledge is not enough.
   (Block format is documented at the top of js/guide.js)
   ============================================================ */
window.FWRD = window.FWRD || {};
FWRD.guideLessons = FWRD.guideLessons || [];

FWRD.guideLessons.push({
  id: "foundations",
  num: 1,
  title: "Why Clinical Knowledge Is Not Enough",
  subtitle: "Foundations — what CRM is, and why it decides outcomes",
  minutes: 8,
  goal: "The opening argument: in a crisis, knowing the medicine is necessary but nowhere near sufficient. One real case will show you why.",
  closing: "You now know the single most important fact in patient safety: teams don't usually fail because they don't know. Lesson 2 breaks 'CRM' into the specific, visible behaviours you can start copying tomorrow.",
  blocks: [

    {
      type: "text",
      text: "It's 3am and your bleep goes off: cardiac arrest, Ward 9.\n\nHere is a strange truth about the next ten minutes. You know the algorithm — you've passed the course, you could recite it half-asleep, and so could every other person converging on that bay. If knowledge decided outcomes, every witnessed arrest in every teaching hospital would run perfectly.\n\nThey don't. You've seen it: the resus where nobody was clearly leading, the drug that was drawn up but never given because everyone thought someone else had given it, the scan that happened an hour late because a concern was raised too gently to land. None of those are knowledge failures. All of them kill.\n\nThis series is about the gap between **what clinicians know** and **what teams actually do under pressure** — and the discipline that closes it."
    },

    {
      type: "quiz",
      question: "Before we go further — think of the last serious incident or near-miss you saw with your own eyes. Honestly: what actually failed?",
      options: [
        {
          text: "Someone didn't know something they should have known",
          explain: "It happens — but rarely in isolation. Dig into most 'knowledge' failures and you find the knowledge was in the room, just in the wrong head, unspoken, or unheard. Keep that thought for the case coming up."
        },
        {
          text: "Communication, coordination, leadership or escalation broke down",
          explain: "This is what most clinicians remember when they're honest — and it matches the data. Across healthcare, aviation and other safety-critical industries, analyses repeatedly attribute the majority of serious incidents to human factors rather than gaps in technical knowledge."
        },
        {
          text: "Equipment, staffing or the system let everyone down",
          explain: "Systems absolutely contribute — and well-designed systems are themselves a human-factors intervention (that's Lesson 4). But watch closely and you'll usually find the system failure was survivable; it was the team's response under pressure that decided the outcome."
        }
      ]
    },

    {
      type: "text",
      text: "The pattern you just described has a name.\n\nWhen investigators take serious incidents apart — in medicine, in aviation, in nuclear plants — they keep finding the same thing: the technical knowledge needed to prevent the disaster **was present**, and the outcome was decided by how the team perceived the situation, communicated, prioritised, led, followed and used its resources. The commonly quoted figure across these industries is that **70–80% of serious incidents are primarily human-factors events**, not knowledge or equipment events.\n\nMedicine trains you for years on the knowledge, examines you on it relentlessly — and then largely assumes the rest will come with experience. It doesn't. It comes with training. That training has a name: **Crisis Resource Management (CRM)** — the set of non-technical skills that turn a group of knowledgeable individuals into a team that performs under pressure.\n\nOne case makes this real better than any statistic. It is worth reading slowly."
    },

    {
      type: "case",
      title: "Elaine Bromiley — 'just a routine operation' (2005)",
      text: "Elaine Bromiley was 37, healthy, and admitted for elective sinus surgery. At induction of anaesthesia, her airway collapsed: the team couldn't place the tube, then couldn't ventilate her — the emergency every anaesthetist trains for, 'can't intubate, can't ventilate'.\n\nIn the room were three experienced consultants — two anaesthetists and an ENT surgeon — with, between them, decades of experience and full knowledge of the emergency algorithm, which calls for a surgical airway before hypoxia causes brain injury.\n\nInstead, for over twenty minutes, they kept trying to intubate. Attempt after attempt, absorbed in the task, while her oxygen saturations sat at catastrophic levels. The nurses saw it clearly: one fetched the tracheostomy set and announced it; another phoned intensive care to book a bed and told the team she'd done so. Two clear, correct signals — hinted rather than insisted, heard but not acted on.\n\nElaine never regained consciousness and died thirteen days later.\n\nHer husband, Martin Bromiley, is an airline pilot — a professional trained since his first flying lesson in exactly the skills that were missing in that room. He asked the question aviation would ask: not 'who failed?' but 'why did it make sense to skilled people at the time?' The independent review he requested found what reviews of such cases almost always find: the clinicians were competent and conscientious. Under acute stress they lost awareness of time, fixated on one plan, hierarchy silenced the people holding the answer — and no one declared the emergency out loud.\n\nMartin Bromiley went on to found the Clinical Human Factors Group, and this case is now taught worldwide — not as a story about bad doctors, but as proof that **good people plus good knowledge, without CRM, is not safe**.",
      link: "https://litfl.com/lessons-from-the-bromiley-case/",
      linkLabel: "Read the full case analysis on LITFL"
    },

    {
      type: "quiz",
      question: "Why did that team fail?",
      options: [
        {
          text: "They didn't know the 'can't intubate, can't ventilate' algorithm well enough",
          explain: "They knew it. All three consultants could have recited it — that's what makes this case so important. Knowledge held under calm conditions was unavailable under stress, because nothing in the room triggered the switch from 'difficult intubation' to 'declared emergency'."
        },
        {
          text: "They were careless, and cases like this are about weeding out weak clinicians",
          explain: "The independent review concluded the opposite: these were skilled, careful, well-regarded clinicians. That's the uncomfortable lesson — if it could happen to them, it can happen to you. Safety built on 'just be better' fails every time stress physiology shows up."
        },
        {
          correct: true,
          text: "Normal human cognition under acute stress, in a team with no CRM structure to catch it",
          explain: "Exactly. Fixation, time distortion, hierarchy, unheard voices — these are predictable features of human brains under pressure, not character flaws. Aviation accepted this decades ago and built structures (declarations, challenges, role clarity, checklists) so that one person's cognitive tunnel can't take the whole aircraft with it. That structure is CRM."
        }
      ]
    },

    {
      type: "text",
      text: "Look at what was actually in that room.\n\nThe **knowledge** was present — three consultants who knew the algorithm. The **equipment** was present — the tracheostomy set, physically announced. The **way out** was present — an ICU bed, already booked. Every ingredient of survival was within arm's reach, and none of it was used, because the ingredients of a team were missing: nobody was named leader, the emergency was never declared out loud, the people with the clearest view had the least authority to insist, and no one was watching the clock.\n\nNow re-read that sentence with your own workplace in mind. The next deteriorating patient you attend will have the same ingredients scattered around the room: knowledgeable people, adequate kit, an available escalation route. **CRM is the discipline of assembling them, under pressure, on purpose.**\n\nAnd here is the genuinely hopeful part: every single one of those missing behaviours is trainable. Not personality. Not seniority. Trainable — like a cannula, like an ECG. That is what this app is for."
    },

    {
      type: "text",
      text: "So, a working definition.\n\n**Crisis Resource Management is the set of non-technical skills that let a team deploy its knowledge and resources effectively in a crisis.** The term comes from aviation — 'Crew Resource Management', built after a series of 1970s disasters in which airworthy planes were flown into the ground by crews who out-ranked, out-silenced or out-fixated each other. Anaesthetist David Gaba adapted it for medicine in the early 1990s, and it has since spread through resuscitation, surgery, obstetrics and emergency care.\n\nFWRD organises CRM into five trainable domains — the same five your scenario scores measure:\n\n**Situational awareness** — noticing, understanding, anticipating.\n**Communication** — moving information so it arrives and causes action.\n**Decision-making** — thinking in structures when stress narrows your brain.\n**Resource management** — people, time, equipment, help: deployed deliberately.\n**Error management** — expecting error, catching it early, learning from it every time.\n\nEach gets proper treatment in the lessons ahead. For now you only need the headline: **in a crisis, these five decide whether your knowledge matters.**"
    },

    {
      type: "keypoints",
      items: [
        "Most serious incidents — commonly 70–80% across safety-critical industries — are human-factors failures, not knowledge failures.",
        "The Bromiley case: three knowledgeable consultants, the right equipment announced, the escape route booked — and none of it used. Good people + good knowledge, without CRM, is not safe.",
        "Fixation, time distortion, hierarchy and silence are normal stress physiology, not character flaws — so the fix is structure and training, not 'try harder'.",
        "CRM = the non-technical skills that let a team deploy its knowledge under pressure: situational awareness, communication, decision-making, resource management, error management.",
        "Every one of these is trainable. That's the entire premise of this app."
      ]
    },

    {
      type: "try",
      text: "At your next emergency, simulation or even a busy ward round — spend sixty seconds watching **the team instead of the patient**. Count two things: instructions given to a named person versus instructions thrown to the room, and moments where someone clearly knew something but softened it into a hint. You will never un-see it."
    },

    {
      type: "action",
      label: "Watch: 'Just a Routine Operation' (Martin Bromiley, ~14 min)",
      href: "https://www.youtube.com/results?search_query=just+a+routine+operation+martin+bromiley",
      text: "Martin Bromiley tells Elaine's story himself in a short film used in safety training worldwide. If you watch one video this month, make it this one."
    },

    {
      type: "text",
      text: "A note on why this guide exists, from the person who built it.\n\nAs a lessons-learnt lead analysing patient safety incidents, I read case after case that looked exactly like the Bromiley room: the knowledge present, the outcome lost in the gaps between people. And yet in years of medical training I could count my formal human-factors teaching in single hours.\n\nThis guide is the introduction I wish someone had given me before my first night shift. Six lessons, one argument: **you can be a safer clinician by Friday than you were on Monday, without learning a single new fact of medicine.**\n\nNext: what these non-technical skills actually look like at the bedside — because 'communicate better' is useless advice until you can see the specific behaviours."
    }
  ]
});
