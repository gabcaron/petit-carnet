import type { Progress } from '~/composables/useProgress'

export default defineNuxtPlugin(() => {
  const progress = useState<Progress>('progress', emptyProgress)
  try {
    const saved = localStorage.getItem(PROGRESS_KEY)
    if (saved) progress.value = { ...emptyProgress(), ...JSON.parse(saved) }
  } catch { /* private mode or corrupted data: start fresh */ }

  watch(progress, value => {
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(value)) } catch { /* storage full or blocked */ }
  }, { deep: true })
})
