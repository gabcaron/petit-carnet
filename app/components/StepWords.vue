<script setup lang="ts">
import type { Word } from '~/data/course'

const props = defineProps<{ words: Word[] }>()
const emit = defineEmits<{ done: [] }>()

const index = ref(0)
const flipped = ref(false)
const seen = ref(new Set([0]))
const seenAll = computed(() => seen.value.size === props.words.length)
const word = computed(() => props.words[index.value]!)

function go(delta: number) {
  index.value = (index.value + delta + props.words.length) % props.words.length
  flipped.value = false
  seen.value.add(index.value)
}
</script>

<template>
  <div class="stack">
    <p class="muted">{{ words.length }} words. Tap a card to see its meaning, listen, and say it out loud.</p>

    <button type="button" class="flash" :class="{ 'is-flipped': flipped }" :aria-label="flipped ? 'Show the front' : 'Show the back'" @click="flipped = !flipped">
      <span class="flash__inner">
        <span class="flash__face card">
          <span class="small muted count">{{ index + 1 }} / {{ words.length }}</span>
          <span v-if="word.gender" class="tag" :class="`tag--${word.gender}`">{{ word.gender === 'm' ? 'masculine' : 'feminine' }}</span>
          <span class="fr big">{{ word.fr }}</span>
          <span class="en">{{ word.en }}</span>
          <span class="small muted">Tap to flip</span>
        </span>
        <span class="flash__face flash__back card">
          <span class="big">{{ word.en }}</span>
          <span class="fr en">{{ word.fr }}</span>
          <span v-if="word.note" class="note">{{ word.note }}</span>
        </span>
      </span>
    </button>

    <div class="row controls">
      <button type="button" class="btn btn--ghost" aria-label="Previous word" @click="go(-1)">←</button>
      <SpeakButton :text="word.fr" />
      <button type="button" class="btn btn--ghost" aria-label="Next word" @click="go(1)">→</button>
    </div>

    <button type="button" class="btn btn--primary btn--block" :disabled="!seenAll" @click="emit('done')">
      {{ seenAll ? 'Add these words to my review deck' : 'Go through all the cards first' }}
    </button>
  </div>
</template>

<style scoped>
.flash { display: block; width: 100%; padding: 0; border: 0; background: none; font: inherit; color: inherit; cursor: pointer; perspective: 1200px; }
.flash__inner { display: grid; transition: transform 0.5s cubic-bezier(.34, 1.4, .64, 1); transform-style: preserve-3d; }
.flash.is-flipped .flash__inner { transform: rotateY(180deg); }
.flash__face {
  grid-area: 1 / 1; position: relative; min-height: 280px;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: var(--s1);
  text-align: center; backface-visibility: hidden; -webkit-backface-visibility: hidden;
}
.flash__back { transform: rotateY(180deg); background: var(--c-accent-soft); }
.en { font-size: var(--fs-h3); color: var(--c-muted); }
.count { position: absolute; top: var(--s2); left: var(--s3); }
.big { font-size: var(--fs-h1); line-height: 1.2; }
.note { max-width: 420px; color: var(--c-muted); }
.controls { justify-content: center; }
</style>
