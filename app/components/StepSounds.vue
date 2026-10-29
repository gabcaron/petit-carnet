<script setup lang="ts">
import type { UnitContent } from '~/data/course'

const props = defineProps<{ sounds: UnitContent['sounds'] }>()
const emit = defineEmits<{ done: [] }>()
const { supported, speak } = useSpeak()

const ROUNDS = 6
const round = ref(0)
const right = ref(0)
const pair = ref<[string, string]>(props.sounds.pairs[0]!)
const target = ref(0)
const picked = ref<number | null>(null)

function newRound() {
  pair.value = props.sounds.pairs[Math.floor(Math.random() * props.sounds.pairs.length)]!
  target.value = Math.round(Math.random())
  picked.value = null
}
function pick(i: number) {
  if (picked.value !== null) return
  picked.value = i
  if (i === target.value) right.value++
}
function next() {
  round.value++
  if (round.value < ROUNDS) newRound()
}
newRound()
</script>

<template>
  <div class="stack">
    <h2>{{ sounds.title }}</h2>
    <p>{{ sounds.explain }}</p>

    <div class="pairs">
      <div v-for="p in sounds.pairs" :key="p[0]" class="pair">
        <span class="fr">{{ p[0] }}</span><SpeakButton :text="p[0]" />
        <span class="muted">vs</span>
        <span class="fr">{{ p[1] }}</span><SpeakButton :text="p[1]" />
      </div>
    </div>

    <p class="small muted">{{ sounds.tip }}</p>

    <div v-if="supported" class="card quiz">
      <template v-if="round < ROUNDS">
        <p class="small muted">Ear training · {{ round + 1 }} / {{ ROUNDS }}</p>
        <button type="button" class="btn btn--ghost" @click="speak(pair[target])">▶ Play the sound</button>
        <p>Which one did you hear?</p>
        <div class="choices">
          <button
            v-for="(option, i) in pair" :key="option" type="button" class="choice fr"
            :class="{ 'is-right': picked !== null && i === target, 'is-wrong': picked === i && i !== target }"
            @click="pick(i)"
          >{{ option }}</button>
        </div>
        <button v-if="picked !== null" type="button" class="btn btn--primary btn--block" @click="next">Next</button>
      </template>
      <p v-else class="center"><strong>{{ right }} / {{ ROUNDS }}</strong> — {{ right >= ROUNDS - 1 ? 'Great ear!' : 'Keep listening, it comes with practice.' }}</p>
    </div>

    <button type="button" class="btn btn--primary btn--block" :disabled="supported && round < ROUNDS" @click="emit('done')">Next step</button>
  </div>
</template>

<style scoped>
.pairs { display: grid; gap: var(--s1); }
.pair { display: flex; align-items: center; gap: var(--s1); font-size: 1.125rem; }
.quiz { display: grid; gap: var(--s2); justify-items: center; text-align: center; }
.quiz p { margin: 0; }
.choices { display: grid; grid-template-columns: 1fr 1fr; gap: var(--s2); width: 100%; }
.center { text-align: center; }
</style>
