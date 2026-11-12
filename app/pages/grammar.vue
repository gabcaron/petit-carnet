<script setup lang="ts">
import { units, type UnitContent, type Level } from '~/data/course'
import rules from '~/data/grammar.json'
import conjugation from '~/data/conjugation.json'
import { verbs } from '~/data/verbs'

useHead({ title: 'Grammar — Petit Carnet' })

type Sheet = UnitContent['grammar'] & { id: string; from?: { id: string; label: string } }
interface Section { title?: string; sheets: Sheet[] }

const TABS = [
  { id: 'rules', label: 'Rules' },
  { id: 'conjugation', label: 'Conjugation' },
  { id: 'conjugator', label: 'Conjugator' }
] as const
const tab = ref<(typeof TABS)[number]['id']>('rules')

const unitSheets = (level: Level): Sheet[] => units
  .filter(u => u.level === level && u.content)
  .map(u => ({ ...u.content!.grammar, id: u.id, from: { id: u.id, label: `Unit ${u.number}` } }))

const SECTIONS: Record<'rules' | 'conjugation', Section[]> = {
  rules: [
    { title: 'Basics', sheets: rules as Sheet[] },
    ...(['A1', 'A2', 'B1'] as Level[]).map(level => ({ title: level, sheets: unitSheets(level) })).filter(s => s.sheets.length)
  ],
  conjugation: [{ sheets: conjugation as Sheet[] }]
}

const query = ref('')
const searchable = (s: Sheet) => normalizeAnswer([s.title, s.intro, s.trap, ...s.table.flat(), ...s.examples.flatMap(e => [e.fr, e.en])].join(' '), false)
const sections = computed(() => {
  if (tab.value === 'conjugator') return []
  const q = normalizeAnswer(query.value, false)
  return SECTIONS[tab.value]
    .map(sec => ({ ...sec, sheets: q ? sec.sheets.filter(s => searchable(s).includes(q)) : sec.sheets }))
    .filter(sec => sec.sheets.length)
})
</script>

<template>
  <div class="section">
    <div class="container container--narrow stack">
      <h1>Grammar</h1>

      <div class="tabs" role="tablist" aria-label="Grammar sections">
        <button
          v-for="t in TABS" :key="t.id" type="button" role="tab" class="tabs__btn"
          :class="{ 'is-active': tab === t.id }" :aria-selected="tab === t.id" @click="tab = t.id"
        >{{ t.label }}</button>
      </div>

      <Conjugator v-if="tab === 'conjugator'" />

      <template v-else>
        <p class="muted">
          {{ tab === 'rules' ? 'Every rule from the lessons, plus the basics. Tap a sheet to open it.' : 'The 3 verb groups and every tense, with parler, finir and prendre as models.' }}
        </p>

        <input v-model="query" class="input" type="search" :placeholder="tab === 'rules' ? 'Search: pronouns, articles, en, y…' : 'Search: imparfait, être, aller…'" aria-label="Search the sheets">

        <p v-if="!sections.length" class="card empty muted">Nothing found for “{{ query }}”. Try another word.</p>

        <section v-for="sec in sections" :key="sec.title ?? 'all'" class="stack">
          <h2 v-if="sec.title" class="sec-title">{{ sec.title }}</h2>
          <details v-for="s in sec.sheets" :key="s.id" class="card sheet">
            <summary>
              <span class="sheet__title">{{ s.title }}</span>
              <span v-if="s.from" class="tag">{{ s.from.label }}</span>
            </summary>
            <div class="sheet__body">
              <GrammarSheet :sheet="s" />
              <NuxtLink v-if="s.from" :to="`/unit/${s.from.id}`" class="btn btn--ghost">Open the unit</NuxtLink>
            </div>
          </details>
        </section>

        <button v-if="tab === 'conjugation'" type="button" class="card cta" @click="tab = 'conjugator'">
          <strong>Conjugate any verb →</strong>
          <span class="muted small">Pick one of {{ verbs.length }} common verbs and see all its tenses.</span>
        </button>
      </template>
    </div>
  </div>
</template>

<style scoped>
.tabs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; padding: 4px; border: 2px solid var(--c-ink); border-radius: 18px; background: var(--c-surface); }
.tabs__btn {
  min-height: 44px; border: 0; border-radius: 14px; background: none; cursor: pointer;
  font: 600 var(--fs-body) / 1 var(--font-head); color: var(--c-muted);
  transition: background 0.15s ease, color 0.15s ease;
}
.tabs__btn:hover { color: var(--c-ink); }
.tabs__btn.is-active { background: var(--c-primary); color: #fff; }
@media (max-width: 480px) { .tabs__btn { font-size: var(--fs-small); } }

.sec-title { display: inline-block; margin: var(--s2) 0 0; padding: 2px 14px; border-radius: 12px; background: var(--c-ink); color: #fff; font-size: var(--fs-h3); }

.sheet { padding: 0; overflow: hidden; }
.sheet summary {
  display: flex; align-items: center; justify-content: space-between; gap: var(--s2);
  min-height: 64px; padding: var(--s2) var(--s3); cursor: pointer; list-style: none;
}
.sheet summary::-webkit-details-marker { display: none; }
.sheet summary::after { content: '+'; font: 600 1.5rem / 1 var(--font-head); color: var(--c-primary); transition: transform 0.2s ease; }
.sheet[open] summary::after { transform: rotate(45deg); }
.sheet[open] summary { border-bottom: 2px dashed var(--c-line); }
.sheet__title { flex: 1; font: 600 var(--fs-h3) / 1.3 var(--font-head); color: var(--c-ink); }
.sheet__body { padding: var(--s3); }
.sheet__body > * + * { margin-top: var(--s3); }
.empty { text-align: center; }

.cta { display: grid; gap: 4px; width: 100%; text-align: left; cursor: pointer; background: var(--c-accent-soft); font: inherit; color: var(--c-ink); }
.cta strong { font: 600 var(--fs-h3) / 1.3 var(--font-head); }
.cta:active { transform: translateY(4px); box-shadow: none; }
</style>