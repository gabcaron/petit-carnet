<script setup lang="ts">
import type { UnitContent } from '~/data/course'

// Shared by the unit "Grammar" step and the /grammar reference page.
const props = defineProps<{ sheet: UnitContent['grammar'] }>()

// Wide tables (long sentences or many columns) turn into one block per row on phones, instead of scrolling sideways.
const stacked = computed(() => props.sheet.table[0]!.length >= 5 || props.sheet.table.flat().some(cell => cell.length > 18))
</script>

<template>
  <div class="stack">
    <p>{{ sheet.intro }}</p>

    <div class="card table-wrap">
      <table class="simple" :class="{ stacked }">
        <thead>
          <tr><th v-for="(cell, i) in sheet.table[0]" :key="i">{{ cell }}</th></tr>
        </thead>
        <tbody>
          <tr v-for="(row, r) in sheet.table.slice(1)" :key="r">
            <td v-for="(cell, c) in row" :key="c" :class="{ fr: c < 2, 'no-label': !sheet.table[0]![c] }" :data-label="sheet.table[0]![c]">{{ cell }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3>Examples</h3>
    <ul class="examples">
      <li v-for="ex in sheet.examples" :key="ex.fr">
        <SpeakButton :text="ex.fr" />
        <div>
          <p class="fr">{{ ex.fr }}</p>
          <p class="small muted">{{ ex.en }}</p>
        </div>
      </li>
    </ul>

    <div class="trap">
      <strong>Watch out</strong>
      <p>{{ sheet.trap }}</p>
    </div>
  </div>
</template>

<style scoped>
.table-wrap { padding: var(--s1) var(--s2); overflow-x: auto; }

@media (max-width: 736px) {
  .simple th, .simple td { padding: 8px 6px; font-size: 1rem; }
  .stacked thead { display: none; }
  .stacked tr { display: block; padding: 10px 0; border-bottom: 2px dashed var(--c-line); }
  .stacked tr:last-child { border-bottom: 0; }
  .stacked td { display: flex; gap: var(--s1); padding: 3px 0; border: 0; }
  .stacked td::before { content: attr(data-label); flex: 0 0 38%; font: 600 var(--fs-small) / 1.6 var(--font-head); color: var(--c-muted); }
  /* A column without a header (je, tu, il…) becomes the title of its block. */
  .stacked td.no-label { font-weight: 600; color: var(--c-ink); }
  .stacked td.no-label::before { display: none; }
}
.examples { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--s2); }
.examples li { display: flex; gap: var(--s2); align-items: center; }
.examples p { margin: 0; }
.trap { border-left: 4px solid var(--c-accent); background: var(--c-accent-soft); border-radius: 0 var(--radius) var(--radius) 0; padding: var(--s2) var(--s3); }
.trap p { margin: var(--s1) 0 0; }
</style>