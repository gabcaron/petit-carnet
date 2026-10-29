import type { Card } from '~/utils/srs'

export interface Progress {
  steps: Record<string, number>   // unit id → number of steps completed (0–6)
  cards: Record<string, Card>     // word id → Leitner box + next review day
  notes: Record<string, string>   // unit id → what she wrote in "Can I do it?"
}

export const PROGRESS_KEY = 'petit-carnet:v1'
export const emptyProgress = (): Progress => ({ steps: {}, cards: {}, notes: {} })

// shortcut: progress is stored on one device only (localStorage); add Supabase if she studies on several devices.
export function useProgress() {
  const progress = useState<Progress>('progress', emptyProgress)

  function completeStep(unitId: string, stepIndex: number) {
    progress.value.steps[unitId] = Math.max(progress.value.steps[unitId] ?? 0, stepIndex + 1)
  }

  function addCards(wordIds: string[]) {
    for (const id of wordIds) progress.value.cards[id] ??= { box: 1, due: isoDay() }
  }

  const dueIds = computed(() => {
    const today = isoDay()
    return Object.entries(progress.value.cards).filter(([, c]) => c.due <= today).map(([id]) => id)
  })

  function review(wordId: string, correct: boolean) {
    const card = progress.value.cards[wordId]
    if (card) progress.value.cards[wordId] = reviewCard(card, correct)
  }

  return { progress, completeStep, addCards, dueIds, review }
}
