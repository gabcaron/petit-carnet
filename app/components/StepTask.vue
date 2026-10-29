<script setup lang="ts">
import type { UnitContent } from '~/data/course'

const props = defineProps<{ unitId: string; task: UnitContent['task'] }>()
const emit = defineEmits<{ done: [] }>()
const { progress } = useProgress()

const text = computed({
  get: () => progress.value.notes[props.unitId] ?? '',
  set: v => { progress.value.notes[props.unitId] = v }
})
const showExample = ref(false)
const checked = ref<boolean[]>(props.task.checklist.map(() => false))
const ready = computed(() => checked.value.every(Boolean))
</script>

<template>
  <div class="stack">
    <h2>Can I do it?</h2>
    <p>{{ task.prompt }}</p>

    <textarea v-model="text" class="input" rows="5" aria-label="Your answer" placeholder="Write here in French. It's saved — show it to your teacher for corrections." />

    <button type="button" class="btn btn--ghost" @click="showExample = !showExample">{{ showExample ? 'Hide' : 'See' }} an example</button>
    <div v-if="showExample" class="card row">
      <SpeakButton :text="task.example" />
      <p class="fr example">{{ task.example }}</p>
    </div>

    <h3>Tick what you can do</h3>
    <label v-for="(item, i) in task.checklist" :key="item" class="check">
      <input v-model="checked[i]" type="checkbox">
      <span>{{ item }}</span>
    </label>

    <button type="button" class="btn btn--primary btn--block" :disabled="!ready" @click="emit('done')">Finish the unit</button>
  </div>
</template>

<style scoped>
textarea.input { resize: vertical; min-height: 140px; }
.example { margin: 0; flex: 1; }
.check { display: flex; gap: var(--s2); align-items: center; min-height: 48px; padding: 0 var(--s2); border: 1px solid var(--c-line); border-radius: 12px; background: var(--c-surface); cursor: pointer; }
.check input { width: 22px; height: 22px; accent-color: var(--c-primary); }
</style>
