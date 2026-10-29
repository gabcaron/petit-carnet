<script setup lang="ts">
import { units, STEPS } from '~/data/course'

const route = useRoute()
const unit = units.find(u => u.id === route.params.id)
if (!unit?.content) throw createError({ statusCode: 404, statusMessage: 'This unit does not exist yet', fatal: true })
const content = unit.content

useHead({ title: `${unit.title} — Petit Carnet` })

const { progress, completeStep, addCards } = useProgress()
const doneCount = computed(() => progress.value.steps[unit.id] ?? 0)
const step = ref(doneCount.value >= STEPS.length ? 0 : doneCount.value)
const finished = ref(false)
const nextUnit = units.slice(units.indexOf(unit) + 1).find(u => u.content)

function onDone() {
  if (step.value === 1) addCards(content.words.map(w => w.id))
  completeStep(unit!.id, step.value)
  if (step.value < STEPS.length - 1) step.value++
  else finished.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function goTo(i: number) {
  finished.value = false
  step.value = i
}
</script>

<template>
  <div class="section">
    <div class="container container--narrow">
      <NuxtLink to="/" class="back small">← All units</NuxtLink>
      <p class="small muted">{{ unit!.level }} · Unit {{ unit!.number }}</p>
      <h1 class="fr">{{ unit!.title }}</h1>

      <nav class="steps" aria-label="Unit steps">
        <button
          v-for="(name, i) in STEPS" :key="name" type="button" class="step"
          :class="{ 'step--current': i === step && !finished, 'step--done': i < doneCount }"
          :disabled="i > doneCount" :aria-current="i === step && !finished ? 'step' : undefined"
          @click="goTo(i)"
        >
          <span class="step__dot">{{ i < doneCount ? '✓' : i + 1 }}</span>
          <span class="step__name">{{ name }}</span>
        </button>
      </nav>

      <div v-if="finished" class="card reward">
        <p class="cheer">Félicitations !</p>
        <p>You finished “{{ unit!.title }}”. Your {{ content.words.length }} new words are now in your review deck.</p>
        <div class="row center">
          <NuxtLink to="/review" class="btn btn--ghost">Review words</NuxtLink>
          <NuxtLink v-if="nextUnit" :to="`/unit/${nextUnit.id}`" class="btn btn--primary">Next unit: {{ nextUnit.title }}</NuxtLink>
          <NuxtLink v-else to="/" class="btn btn--primary">Back to all units</NuxtLink>
        </div>
      </div>

      <template v-else>
        <StepGoal v-if="step === 0" :can-do="unit!.canDo" :dialogue="content.dialogue" @done="onDone" />
        <StepWords v-else-if="step === 1" :words="content.words" @done="onDone" />
        <StepGrammar v-else-if="step === 2" :grammar="content.grammar" @done="onDone" />
        <StepSounds v-else-if="step === 3" :sounds="content.sounds" @done="onDone" />
        <StepPractice v-else-if="step === 4" :exercises="content.practice" @done="onDone" />
        <StepTask v-else :unit-id="unit!.id" :task="content.task" @done="onDone" />
      </template>
    </div>
  </div>
</template>

<style scoped>
.back { display: inline-flex; align-items: center; min-height: 44px; text-decoration: none; font-weight: 600; }
h1 { margin-bottom: var(--s3); }
.steps { display: grid; grid-template-columns: repeat(6, 1fr); gap: var(--s1); margin-bottom: var(--s4); }
.step { display: flex; flex-direction: column; align-items: center; gap: 4px; min-height: 56px; padding: 4px; border: 0; background: none; font: inherit; color: var(--c-muted); cursor: pointer; }
.step:disabled { cursor: not-allowed; opacity: 0.5; }
.step__dot { display: grid; place-items: center; width: 32px; height: 32px; border-radius: 50%; border: 1.5px solid var(--c-line); background: var(--c-surface); font-size: var(--fs-small); font-weight: 600; }
.step__name { font-size: 12px; text-align: center; line-height: 1.2; }
.step--done .step__dot { background: var(--c-success-soft); border-color: var(--c-success); color: var(--c-success); }
.step--current { color: var(--c-primary); }
.step--current .step__dot { background: var(--c-primary); border-color: var(--c-primary); color: #fff; }
@media (max-width: 480px) { .step__name { visibility: hidden; } .step--current .step__name { visibility: visible; } }

.reward { text-align: center; background: var(--c-accent-soft); }
.center { justify-content: center; }
</style>
