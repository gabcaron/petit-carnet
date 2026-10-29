<script setup lang="ts">
import { challenges } from '~/data/course'

useHead({ title: 'Daily challenge — Petit Carnet' })
const { progress } = useProgress()

// Only topics from units she has started; same topic all day, "another" moves to the next one.
const available = computed(() => challenges.filter(c => (progress.value.steps[c.unit] ?? 0) > 0))
const daySeed = Number(isoDay().replaceAll('-', ''))
const offset = ref(0)
const topic = computed(() => available.value.length ? available.value[(daySeed + offset.value) % available.value.length] : null)

const SECONDS = 60
const left = ref(SECONDS)
const running = ref(false)
let timer: ReturnType<typeof setInterval> | undefined

function start() {
  left.value = SECONDS
  running.value = true
  timer = setInterval(() => {
    left.value--
    if (left.value <= 0) stop()
  }, 1000)
}
function stop() {
  clearInterval(timer)
  running.value = false
}
function another() {
  stop()
  left.value = SECONDS
  offset.value++
}
onUnmounted(stop)
</script>

<template>
  <div class="section">
    <div class="container container--narrow stack">
      <h1>Daily challenge</h1>
      <p class="muted">One topic, 60 seconds, out loud. Speak without stopping — mistakes are fine. Even better with someone listening.</p>

      <div v-if="!topic" class="card center">
        <p class="big">No challenge yet</p>
        <p class="muted">Start your first unit to unlock the daily challenges.</p>
        <NuxtLink to="/" class="btn btn--primary">Go to the lessons</NuxtLink>
      </div>

      <div v-else class="card center">
        <p class="small muted">Today’s topic</p>
        <p class="big">{{ topic.title }}</p>
        <p class="fr hint">{{ topic.hint }}</p>

        <div class="timer" :class="{ 'timer--end': left === 0 }" role="timer" aria-live="polite">
          {{ left === 0 ? 'Bravo !' : `${left}s` }}
        </div>

        <button v-if="!running" type="button" class="btn btn--primary btn--block" @click="start">
          {{ left === SECONDS ? 'Start the 60 seconds' : 'Do it again' }}
        </button>
        <button v-else type="button" class="btn btn--ghost btn--block" @click="stop">Stop</button>
        <button type="button" class="btn btn--ghost btn--block" @click="another">Another topic</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.center { display: grid; justify-items: center; gap: var(--s2); text-align: center; }
.center p { margin: 0; }
.big { font: 600 var(--fs-h2) / 1.2 var(--font-head); color: var(--c-ink); }
.hint { font-size: 1.125rem; max-width: 460px; }
.timer { font: 600 3.5rem / 1 var(--font-head); color: var(--c-primary); margin: var(--s3) 0; font-variant-numeric: tabular-nums; }
.timer--end { color: var(--c-accent-dark); }
</style>
