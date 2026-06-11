# FWRD — Forward Medicine CRM Trainer

A browser-based Crisis Resource Management (CRM) / human factors trainer for clinicians,
from [Forward Medicine](https://forwardmedicine.co.uk).

Branching clinical scenarios score you across the five CRM domains — **situational awareness,
communication, decision-making, resource management and error management** — with structured
debriefs, a frameworks toolkit, and guided mental rehearsal. All progress is stored in the
user's own browser; there is no server and no account.

---

## Running it

There is **no build step and nothing to install**. The app is plain HTML, CSS and JavaScript.

- **Locally:** double-click `index.html` — it opens and works in any modern browser.
- **Editing:** change any file, save, refresh the browser. That's the whole workflow.

## Publishing to GitHub Pages (free hosting)

This folder is named `FWRD-CODE.github.io` because GitHub serves a repository with that name
as a website automatically.

1. Create a GitHub account/organisation called `FWRD-CODE` (or adjust the name below to match yours).
2. Create a new repository named exactly `FWRD-CODE.github.io`.
3. In Terminal, from this folder:
   ```bash
   git init
   git add .
   git commit -m "FWRD CRM Trainer v1"
   git branch -M main
   git remote add origin https://github.com/FWRD-CODE/FWRD-CODE.github.io.git
   git push -u origin main
   ```
4. A few minutes later the app is live at **https://fwrd-code.github.io**.
   (You can later point a custom domain like `app.forwardmedicine.co.uk` at it in the
   repository's *Settings → Pages*.)

---

## How the code is organised

```
index.html                  The app shell (navigation + empty views)
css/styles.css              All styling (colours/design tokens at the top)
js/
  app.js                    Navigation + the Home, Scenario Lab, Toolkit,
                            Rehearsal and About screens
  player.js                 The scenario engine: decisions, timers, scoring, debrief
  state.js                  Progress storage (browser localStorage), streaks, unlocks
  charts.js                 The radar chart on the dashboard
  data/
    scenario-1-sepsis.js    ← scenario content lives here…
    scenario-2-hypoxia.js
    scenario-3-arrest.js
    scenario-4-drowsy.js
    toolkit-data.js         The CRM frameworks library
    rehearsal-data.js       The mental rehearsal scripts
```

**The golden rule: content lives in `js/data/`, behaviour lives in `js/`.**
You can add scenarios, tools and rehearsal scripts without touching the engine.

---

## Writing a new scenario

1. Copy an existing file, e.g. `js/data/scenario-2-hypoxia.js`, to `js/data/scenario-5-yourcase.js`.
2. Add one line to `index.html` next to the other scenario `<script>` tags:
   ```html
   <script src="js/data/scenario-5-yourcase.js"></script>
   ```
3. Edit the content. A scenario is a set of **nodes** (scenes), each with an `id`:

| Node type  | What it does | Required fields |
|------------|--------------|-----------------|
| `info`     | Narrative beat with a Continue button | `text`, `next` |
| `decision` | A choice between 2–3 options | `text`, `options` |
| `end`      | Finishes the run and triggers the debrief | `outcome` (`good`/`mixed`/`poor`), `summary` |

Each **option** in a decision looks like:

```js
{
  text: "What the player clicks",
  next: "id-of-the-next-node",
  quality: "good",                 // good | ok | poor (drives the feedback colour)
  scores: { sa: 2, comm: 1, dm: 0, rm: 0, em: 0 },  // small integers; negatives allowed
  feedback: "The coaching shown after choosing, and again in the debrief.",
  principles: ["sbar", "closed-loop"],  // ids from toolkit-data.js → linked in debrief
  trap: "Anchoring"                // optional: names the human-factors trap
}
```

Optional extras on any node:
- `cues: ["...", "..."]` — a "What you notice" box (trains Level-1 situational awareness)
- `vitals: [{ label: "HR", value: "118", state: "warn" }]` — the dark monitor panel
  (`state` is `ok`, `warn` or `bad`); vitals persist on screen until replaced
- `timeLimit: 25` — on decision nodes, a countdown (only when "Timed pressure" is on)

**Scoring, in one sentence:** at each decision the engine compares what you chose against the
best available option, per domain — so a domain score of 100% means "chose the strongest
CRM behaviour at every opportunity", and the traps you author are what create the spread.

**Authoring tips from the first four scenarios:**
- Build each scenario around 1–3 named human-factors traps, not around rare diagnoses.
- Give wrong choices a *recovery* path (with `em` points) — error management is a skill.
- Keep the spine mostly linear with short corrective detours; it plays branchy but stays writable.
- The `feedback` strings are the real teaching. Write them like a great debriefer: name the
  behaviour, explain the mechanism, never shame.

## Adding a toolkit entry or rehearsal script

Append an object to the array in `js/data/toolkit-data.js` or `js/data/rehearsal-data.js` —
the format is documented at the top of each file. Toolkit `id`s are what scenarios reference
in `principles`.

---

## Roadmap ideas (from the design document)

- More scenarios: OR fire, paediatric resus, major haemorrhage, multi-patient prioritisation
- Spaced-repetition nudges ("your communication score is decaying — 5-minute drill?")
- Audio narration for mental rehearsal scripts
- Scenario randomisation (varying cues/vitals per run) and a challenge mode
- An authoring page so educators can write scenarios in a form instead of a file
- Optional accounts + cohort dashboards for educators (needs a backend — a later phase)

## Disclaimer

FWRD is an educational tool for practising **non-technical skills**. Clinical content within
scenarios is illustrative and simplified, and is not clinical guidance. Always follow local
protocols, current guidelines and senior advice in real clinical practice.
