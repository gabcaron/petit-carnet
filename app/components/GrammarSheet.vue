<script setup lang="ts">
import type { UnitContent } from '~/data/course'

// Shared by the unit "Grammar" step and the /grammar reference page.
defineProps<{ sheet: UnitContent['grammar'] }>()
</script>

<template>
  <div class="stack">
    <p>{{ sheet.intro }}</p>

    <div class="card table-wrap">
      <table class="simple">
        <thead>
          <tr><th v-for="(cell, i) in sheet.table[0]" :key="i">{{ cell }}</th></tr>
        </thead>
        <tbody>
          <tr v-for="(row, r) in sheet.table.slice(1)" :key="r">
            <td v-for="(cell, c) in row" :key="c" :class="{ fr: c < 2 }">{{ cell }}</td>
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
.examples { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--s2); }
.examples li { display: flex; gap: var(--s2); align-items: center; }
.examples p { margin: 0; }
.trap { border-left: 4px solid var(--c-accent); background: var(--c-accent-soft); border-radius: 0 var(--radius) var(--radius) 0; padding: var(--s2) var(--s3); }
.trap p { margin: var(--s1) 0 0; }
</style>