<script setup lang="ts">
import { units, LEVELS, STEPS, type Level } from '~/data/course'

const { progress, dueIds } = useProgress()
const total = STEPS.length

const done = (id: string) => progress.value.steps[id] ?? 0
const nextUnit = computed(() => units.find(u => u.content && done(u.id) < total))
const started = computed(() => Object.keys(progress.value.steps).length > 0)
const levels = Object.keys(LEVELS) as Level[]
const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <div>
    <section class="section hero">
      <div class="container container--narrow">
        <p class="eyebrow">Bonjour ! <span aria-hidden="true">👋</span> French · A1 → B1</p>
        <h1>Learn French, one <mark>small step</mark> at a time.</h1>
        <p class="muted lead">Each unit has one goal you can use in real life, a few words, one grammar point and one sound. About 20 minutes a day.</p>

        <div class="row">
          <NuxtLink v-if="nextUnit" :to="`/unit/${nextUnit.id}`" class="btn btn--primary">
            {{ started ? 'Continue' : 'Start' }}: {{ nextUnit.title }}
          </NuxtLink>
          <NuxtLink v-if="dueIds.length" to="/review" class="btn btn--ghost">Review {{ dueIds.length }} words</NuxtLink>
        </div>
      </div>
    </section>

    <section v-for="level in levels" :key="level" class="section level">
      <div class="container">
        <div class="level__head">
          <h2>{{ level }}</h2>
          <p class="muted">{{ LEVELS[level] }}</p>
        </div>

        <div class="grid">
          <component
            :is="u.content ? NuxtLink : 'div'"
            v-for="(u, i) in units.filter(u => u.level === level)"
            :key="u.id"
            :to="u.content ? `/unit/${u.id}` : undefined"
            class="span-4 card unit"
            :class="{ 'unit--soon': !u.content, 'unit--done': done(u.id) >= total }"
            :style="u.content ? { background: `var(--p${(i % 6) + 1})` } : undefined"
          >
            <div class="unit__top">
              <span class="unit__num">{{ u.number }}</span>
              <span v-if="!u.content" class="tag">Coming soon</span>
              <span v-else-if="done(u.id) >= total" class="tag tag--done">Done ✓</span>
            </div>
            <h3 class="fr">{{ u.title }}</h3>
            <p class="muted small">{{ u.canDo }}</p>
            <div v-if="u.content" class="progress" :aria-label="`${done(u.id)} of ${total} steps done`">
              <span :style="{ width: `${(done(u.id) / total) * 100}%` }" />
            </div>
          </component>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero { padding-top: var(--s6); }
.hero h1 { font-size: clamp(2rem, 5vw, 2.75rem); }
.hero mark { background: linear-gradient(transparent 60%, var(--c-accent) 60%); color: inherit; padding: 0 2px; }
.eyebrow { display: inline-block; padding: 4px 14px; margin-bottom: var(--s2); border: 2px solid var(--c-ink); border-radius: 999px; background: var(--c-surface); font: 600 var(--fs-small) / 1.4 var(--font-head); color: var(--c-ink); }
.lead { font-size: 1.125rem; margin-bottom: var(--s4); }
.level { padding-top: 0; }
.level__head { display: flex; align-items: center; gap: var(--s2); flex-wrap: wrap; margin-bottom: var(--s3); }
.level__head h2 { padding: 2px 14px; border-radius: 12px; background: var(--c-ink); color: #fff; }
.level__head h2, .level__head p { margin: 0; }

.unit { display: flex; flex-direction: column; gap: var(--s1); color: inherit; text-decoration: none; transition: transform 0.15s ease, box-shadow 0.15s ease; }
a.unit:hover { transform: translateY(-3px) rotate(-0.6deg); box-shadow: 0 7px 0 var(--c-ink); }
a.unit:active { transform: translateY(4px); box-shadow: 0 0 0 var(--c-ink); }
.unit h3 { margin: 0; }
.unit p { margin: 0 0 var(--s1); flex: 1; }
.unit__top { display: flex; justify-content: space-between; align-items: center; min-height: 26px; }
.unit__num { display: grid; place-items: center; width: 36px; height: 36px; border: 2px solid var(--c-ink); border-radius: 50%; background: var(--c-surface); font: 600 var(--fs-body) / 1 var(--font-head); color: var(--c-ink); }
.unit--soon { box-shadow: none; background: transparent; border-style: dashed; border-color: #c9c2b6; }
.unit--soon .unit__num { border-color: #c9c2b6; color: var(--c-muted); }
.unit--soon h3 { color: var(--c-muted); }
.tag--done { background: var(--c-success-soft); color: var(--c-success); }
</style>
