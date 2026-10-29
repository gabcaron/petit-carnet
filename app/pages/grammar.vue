<script setup lang="ts">
import { units, type UnitContent } from '~/data/course'
import basics from '~/data/grammar.json'

useHead({ title: 'Grammar — Petit Carnet' })

type Sheet = UnitContent['grammar'] & { id: string; from?: { id: string; label: string } }

const sheets: Sheet[] = [
  ...(basics as Sheet[]),
  ...units.filter(u => u.content).map(u => ({ ...u.content!.grammar, id: u.id, from: { id: u.id, label: `${u.level} · Unit ${u.number}` } }))
]

const query = ref('')
const shown = computed(() => {
  const q = normalizeAnswer(query.value, false)
  if (!q) return sheets
  return sheets.filter(s => normalizeAnswer([s.title, s.intro, s.trap, ...s.table.flat(), ...s.examples.flatMap(e => [e.fr, e.en])].join(' '), false).includes(q))
})
</script>

<template>
  <div class="section">
    <div class="container container--narrow stack">
      <h1>Grammar</h1>
      <p class="muted">All the rules in one place. Tap a sheet to open it.</p>

      <input v-model="query" class="input" type="search" placeholder="Search: pronouns, avoir, passé…" aria-label="Search the grammar sheets">

      <p v-if="!shown.length" class="card empty muted">Nothing found for “{{ query }}”. Try another word, like « être » or « questions ».</p>

      <details v-for="s in shown" :key="s.id" class="card sheet">
        <summary>
          <span class="sheet__title">{{ s.title }}</span>
          <span class="tag">{{ s.from ? s.from.label : 'Basics' }}</span>
        </summary>
        <div class="sheet__body">
          <GrammarSheet :sheet="s" />
          <NuxtLink v-if="s.from" :to="`/unit/${s.from.id}`" class="btn btn--ghost">Open the unit</NuxtLink>
        </div>
      </details>
    </div>
  </div>
</template>

<style scoped>
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
</style>