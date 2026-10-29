export type Verdict = 'right' | 'accent' | 'wrong'

export function normalizeAnswer(s: string, keepAccents = true) {
  let t = s
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/[.!?,;:«»"-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (!keepAccents) t = t.normalize('NFD').replace(/[̀-ͯ]/g, '')
  return t
}

// A missing accent still counts, but she is told about it.
export function checkAnswer(input: string, accepted: string[]): Verdict {
  if (accepted.some(a => normalizeAnswer(a) === normalizeAnswer(input))) return 'right'
  if (accepted.some(a => normalizeAnswer(a, false) === normalizeAnswer(input, false))) return 'accent'
  return 'wrong'
}

export function shuffle<T>(items: T[]): T[] {
  const a = [...items]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j]!, a[i]!]
  }
  return a
}
