<script setup lang="ts">
import type { UnitContent } from '~/data/course'

defineProps<{ grammar: UnitContent['grammar'] }>()
const emit = defineEmits<{ done: [] }>()
</script>

<template>
  <div class="stack">
    <h2>{{ grammar.title }}</h2>
    <GrammarSheet :sheet="grammar" />
    <button type="button" class="btn btn--primary btn--block" @click="emit('done')">I understand, next</button>
  </div>
</template>