<script setup lang="ts">
import { verbs } from '~/data/verbs'

const GROUPS = [
  { group: 1, label: '1st group (-er)' },
  { group: 2, label: '2nd group (-ir, -issons)' },
  { group: 3, label: '3rd group (irregular)' }
] as const

const inf = ref('être')
const verb = computed(() => verbs.find(v => v.inf === inf.value)!)
const tenses = computed(() => Object.entries(conjugate(verb.value)).filter(([, forms]) => forms.length))
const spoken = (forms: string[]) => forms.map(f => f.replace(/ \((tu|nous|vous)\)$/, '')).join(', ')
const groupLabel = (group: number) => GROUPS.find(g => g.group === group)?.label
const sorted = (group: number) => verbs.filter(v => v.group === group).sort((a, b) => a.inf.localeCompare(b.inf, 'fr'))
</script>

<template>
  <div class="stack">
    <label class="pick">
      <span class="small muted">Choose a verb</span>
      <select v-model="inf" class="input">
        <optgroup v-for="g in GROUPS" :key="g.group" :label="g.label">
          <option v-for="v in sorted(g.group)" :key="v.inf" :value="v.inf">{{ v.inf }} — {{ v.en }}</option>
        </optgroup>
      </select>
    </label>

    <div class="card verb">
      <div class="row">
        <span class="fr verb__inf">{{ verb.inf }}</span>
        <SpeakButton :text="verb.inf" />
      </div>
      <p class="muted">{{ verb.en }}</p>
      <div class="row tags">
        <span class="tag">{{ groupLabel(verb.group) }}</span>
        <span class="tag">past with {{ verb.aux ?? 'avoir' }}</span>
        <span class="tag">participle: {{ participle(verb) }}</span>
      </div>
    </div>

    <div class="tenses">
      <section v-for="[name, forms] in tenses" :key="name" class="card tense">
        <div class="tense__head">
          <h3>{{ name }}</h3>
          <SpeakButton :text="spoken(forms)" />
        </div>
        <ul>
          <li v-for="f in forms" :key="f" class="fr">{{ f }}</li>
        </ul>
      </section>
    </div>

    <p class="small muted">{{ verbs.length }} common verbs. Reflexive verbs (se lever…) work like the verb + me, te, se — see the « Ma journée » unit.</p>
  </div>
</template>

<style scoped>
.pick { display: grid; gap: 4px; }
.pick select { font-family: var(--font-head); font-size: 1.125rem; }
.verb p { margin: var(--s1) 0; }
.verb__inf { font-size: var(--fs-h1); color: var(--c-ink); }
.tags { gap: var(--s1); }
.tenses { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--s2); }
@media (max-width: 736px) { .tenses { grid-template-columns: 1fr; } }
.tense { padding: var(--s2) var(--s3); }
.tense__head { display: flex; align-items: center; justify-content: space-between; gap: var(--s1); margin-bottom: var(--s1); }
.tense__head h3 { margin: 0; }
.tense ul { list-style: none; margin: 0; padding: 0; }
.tense li { padding: 6px 0; border-bottom: 2px dashed var(--c-line); font-size: 1.0625rem; }
.tense li:last-child { border-bottom: 0; }
</style>