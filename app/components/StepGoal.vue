<script setup lang="ts">
import type { Line } from '~/data/course'

defineProps<{ canDo: string; dialogue: Line[] }>()
const emit = defineEmits<{ done: [] }>()
const showEnglish = ref(false)
</script>

<template>
  <div class="stack">
    <div class="goal card">
      <p class="small muted">By the end of this unit, you can…</p>
      <h2>{{ canDo }}</h2>
    </div>

    <div class="row between">
      <h3>Listen to the dialogue</h3>
      <button type="button" class="btn btn--ghost" @click="showEnglish = !showEnglish">
        {{ showEnglish ? 'Hide' : 'Show' }} English
      </button>
    </div>

    <ul class="dialogue">
      <li v-for="(line, i) in dialogue" :key="i" class="line" :class="{ 'line--right': i % 2 }">
        <SpeakButton :text="line.fr" />
        <div>
          <span class="small muted">{{ line.who }}</span>
          <p class="fr">{{ line.fr }}</p>
          <p v-if="showEnglish" class="small muted">{{ line.en }}</p>
        </div>
      </li>
    </ul>

    <button type="button" class="btn btn--primary btn--block" @click="emit('done')">Got it, next</button>
  </div>
</template>

<style scoped>
.goal { background: var(--c-primary-soft); border-color: transparent; box-shadow: none; }
.goal h2 { margin: 0; }
.goal p { margin-bottom: var(--s1); }
.between { justify-content: space-between; }
.between h3 { margin: 0; }
.dialogue { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--s2); }
.line { display: flex; gap: var(--s2); align-items: flex-start; max-width: 90%; }
.line--right { margin-left: auto; flex-direction: row-reverse; text-align: right; }
.line > div { background: var(--c-surface); border: 1px solid var(--c-line); border-radius: var(--radius); padding: 10px var(--s2); }
.line p { margin: 0; }
.line .fr { font-size: 1.125rem; }
</style>
