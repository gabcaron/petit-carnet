<script setup lang="ts">
const props = defineProps<{ text: string }>()
const { supported, speak } = useSpeak()
</script>

<template>
  <button v-if="supported" type="button" class="icon-btn" :aria-label="`Listen: ${props.text}`" @click.stop="speak(props.text)">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M11 5 6 9H2v6h4l5 4V5z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M19 5a10 10 0 0 1 0 14" />
    </svg>
  </button>
</template>
