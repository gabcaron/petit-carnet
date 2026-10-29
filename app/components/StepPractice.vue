<script setup lang="ts">
import type { Verdict } from '~/utils/answers'
import type { Exercise } from '~/data/course'

const props = defineProps<{ exercises: Exercise[] }>()
const emit = defineEmits<{ done: [] }>()

// Wrong answers come back once at the end of the queue.
const queue = ref(props.exercises.map((_, i) => i))
const retried = new Set<number>()
const pos = ref(0)
const firstTry = ref(0)
const verdict = ref<Verdict | null>(null)
const typed = ref('')
const picked = ref('')
const built = ref<number[]>([])
const chips = ref<string[]>([])

const finished = computed(() => pos.value >= queue.value.length)
const ex = computed(() => props.exercises[queue.value[pos.value]!]!)
const correction = computed(() => {
  const e = ex.value
  return e.type === 'choice' ? e.answer : e.type === 'order' ? e.answer : e.answers[0]
})
const canCheck = computed(() => {
  const e = ex.value
  return e.type === 'choice' ? !!picked.value : e.type === 'fill' ? !!typed.value.trim() : built.value.length === e.words.length
})

const { speak } = useSpeak()

watch(pos, () => {
  verdict.value = null
  typed.value = picked.value = ''
  built.value = []
  if (!finished.value && ex.value.type === 'order') chips.value = shuffle(ex.value.words)
  if (!finished.value && ex.value.type === 'choice' && ex.value.listen) speak(ex.value.listen)
}, { immediate: true })

function check() {
  const e = ex.value
  if (e.type === 'choice') verdict.value = picked.value === e.answer ? 'right' : 'wrong'
  else if (e.type === 'fill') verdict.value = checkAnswer(typed.value, e.answers)
  else verdict.value = checkAnswer(built.value.map(i => chips.value[i]).join(' '), [e.answer])

  const index = queue.value[pos.value]!
  if (verdict.value === 'wrong' && !retried.has(index)) {
    retried.add(index)
    queue.value.push(index)
  } else if (verdict.value !== 'wrong' && !retried.has(index)) firstTry.value++
}

function onEnter() {
  if (verdict.value) pos.value++
  else if (canCheck.value) check()
}
</script>

<template>
  <div v-if="finished" class="card done">
    <p class="cheer">Bravo !</p>
    <p>{{ firstTry }} / {{ exercises.length }} right on the first try.</p>
    <button type="button" class="btn btn--primary btn--block" @click="emit('done')">Last step</button>
  </div>

  <div v-else class="stack">
    <div class="progress" :aria-label="`Exercise ${pos + 1} of ${queue.length}`">
      <span :style="{ width: `${(pos / queue.length) * 100}%` }" />
    </div>

    <h3>{{ ex.prompt }}</h3>

    <template v-if="ex.type === 'choice'">
      <button v-if="ex.listen" type="button" class="btn btn--ghost" @click="speak(ex.listen)">▶ Listen again</button>
      <div class="choices">
        <button
          v-for="option in ex.options" :key="option" type="button" class="choice"
          :class="{ 'is-picked': picked === option && !verdict, 'is-right': verdict && option === ex.answer, 'is-wrong': verdict && picked === option && option !== ex.answer }"
          :disabled="!!verdict" @click="picked = option"
        >{{ option }}</button>
      </div>
    </template>

    <template v-else-if="ex.type === 'fill'">
      <p class="fr sentence">{{ ex.sentence }}</p>
      <input
        v-model="typed" class="input" :readonly="!!verdict" autocapitalize="off" autocomplete="off" spellcheck="false"
        aria-label="Your answer" placeholder="Type your answer" @keyup.enter="onEnter"
      >
    </template>

    <template v-else>
      <div class="built">
        <button v-for="(chipIndex, i) in built" :key="chipIndex" type="button" class="chip fr" :disabled="!!verdict" @click="built.splice(i, 1)">{{ chips[chipIndex] }}</button>
        <span v-if="!built.length" class="muted small">Tap the words in the right order</span>
      </div>
      <div class="row">
        <button
          v-for="(word, i) in chips" :key="i" type="button" class="chip fr" :disabled="built.includes(i) || !!verdict"
          @click="built.push(i)"
        >{{ word }}</button>
      </div>
    </template>

    <div v-if="verdict" class="feedback" :class="verdict === 'wrong' ? 'feedback--wrong' : 'feedback--right'" role="status">
      <strong>{{ verdict === 'right' ? 'Correct!' : verdict === 'accent' ? 'Correct — watch the accents.' : 'Not quite.' }}</strong>
      <p v-if="verdict !== 'right'">Answer: <span class="fr">{{ correction }}</span></p>
      <p v-if="ex.explain">{{ ex.explain }}</p>
    </div>

    <button v-if="!verdict" type="button" class="btn btn--primary btn--block" :disabled="!canCheck" @click="check">Check</button>
    <button v-else type="button" class="btn btn--primary btn--block" @click="pos++">Continue</button>
  </div>
</template>

<style scoped>
.sentence { font-size: 1.375rem; margin: 0; }
.built { min-height: 64px; display: flex; flex-wrap: wrap; gap: var(--s1); align-items: center; padding: var(--s1) 0; border-bottom: 2px solid var(--c-line); }
.done { text-align: center; }
</style>
