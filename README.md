# Petit Carnet

A small Nuxt site to learn French from English, step by step, following the CEFR (A1 → B1).

## Run it

```bash
npm install
npm run dev            # http://localhost:3000
npx tsx tests/logic.test.ts   # answer checking, spaced repetition, content sanity checks
```

Deploy on Vercel as-is (it detects Nuxt). Everything runs in the browser: no account, progress is saved in `localStorage`.

## How it's organised

- `app/data/units/<id>.json` — **the content of each unit** (A1 units 0–10 are written). `app/data/course.ts` holds the outline: to add a unit, copy a JSON file, then import it in `course.ts`. A unit without content shows as "Coming soon".
- Each unit has 6 steps: Goal (dialogue) → Words (flashcards, added to the review deck) → Grammar → Sounds (ear training) → Practice (exercises; wrong answers come back once) → Can I do it? (writing task, saved so you can correct it).
- `/review` — spaced repetition (Leitner boxes: 1, 3, 7, 14, 30 days).
- `/grammar` — every grammar sheet in one place, searchable: basics in `app/data/grammar.json` + the sheet of each unit.
- `/challenge` — a 60-second speaking topic per day, from units she has started.
- `/styleguide` — colours, type and components, from "The Fundamentals".

Exercise types in `course.ts`: `choice` (optionally with `listen` to play audio), `fill` (`___` in the sentence, several accepted `answers`), `order` (words to put in order).

## Audio

Audio uses the browser's built-in French voice (no account, no API key). The site picks the most natural French voice available on the device: "Natural" voices in Edge, "Google français" in Chrome, Amélie/Thomas on iPhone and Mac. On Linux, Chrome often only has the robotic eSpeak voice — Edge sounds much better there.