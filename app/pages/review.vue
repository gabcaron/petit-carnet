<script setup lang="ts">
import { wordsById } from '~/data/course'

useHead({ title: 'Review — Petit Carnet' })
const { progress, dueIds, review } = useProgress()

// Snapshot today's pile so cards don't vanish mid-answer.
const pile = ref(dueIds.value.filter(id => wordsById[id]))
const pos = ref(0)
const revealed = ref(false)
const known = ref(0)
const word = computed(() => wordsById[pile.value[pos.value]!])
const hasDeck = computed(() => Object.keys(progress.value.cards).length > 0)

function answer(correct: boolean) {
  review(pile.value[pos.value]!, correct)
  if (correct) known.value++
  pos.value++
  revealed.value = false
}
</script>

<template>
  <div class="section">
    <div class="container container--narrow stack">
      <h1>Review</h1>

      <div v-if="!hasDeck" class="card empty">
        <p class="big">Your deck is empty</p>
        <p class="muted">Finish the “Words” step of a unit and its words will appear here, at the right moment to remember them.</p>
        <NuxtLink to="/" class="btn btn--primary">Go to the lessons</NuxtLink>
      </div>

      <div v-else-if="!pile.length" class="card empty">
        <p class="big">All done for today</p>
        <p class="muted">No words to review right now. Come back tomorrow — short daily reviews work best.</p>
        <NuxtLink to="/challenge" class="btn btn--primary">Try today’s challenge</NuxtLink>
      </div>

      <div v-else-if="pos >= pile.length" class="card empty">
        <p class="cheer">Bravo !</p>
        <p>You knew {{ known }} of {{ pile.length }} words. The ones you missed will come back tomorrow.</p>
        <NuxtLink to="/" class="btn btn--primary">Back to the lessons</NuxtLink>
      </div>

      <template v-else-if="word">
        <p class="muted small">{{ pos + 1 }} / {{ pile.length }} · Do you know what it means?</p>
        <div class="card flash">
          <span class="fr big">{{ word.fr }}</span>
          <SpeakButton :text="word.fr" />
          <template v-if="revealed">
            <span class="answer">{{ word.en }}</span>
            <span v-if="word.note" class="small muted">{{ word.note }}</span>
          </template>
        </div>

        <button v-if="!revealed" type="button" class="btn btn--primary btn--block" @click="revealed = true">Show the answer</button>
        <div v-else class="grid">
          <button type="button" class="btn btn--ghost span-6" @click="answer(false)">Not yet</button>
          <button type="button" class="btn btn--primary span-6" @click="answer(true)">I knew it</button>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.empty, .flash { display: grid; justify-items: center; gap: var(--s2); text-align: center; }
.empty p { margin: 0; }
.flash { min-height: 240px; align-content: center; }
.big { font: 600 var(--fs-h2) / 1.2 var(--font-head); color: var(--c-ink); }
.answer { font-size: var(--fs-h3); font-weight: 600; }
.grid { gap: var(--s2); }
@media (max-width: 736px) { .grid .span-6 { grid-column: span 6; } }
</style>
