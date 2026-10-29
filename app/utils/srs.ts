// Leitner boxes 1–5: a right answer moves the card up a box, a wrong one sends it back to box 1.
export interface Card { box: number; due: string }

const DAYS_BY_BOX = [0, 1, 3, 7, 14, 30]

export function isoDay(d = new Date()) {
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

export function addDays(iso: string, days: number) {
  const [y, m, d] = iso.split('-').map(Number)
  return isoDay(new Date(y!, m! - 1, d! + days))
}

export function reviewCard(card: Card, correct: boolean, today = isoDay()): Card {
  const box = correct ? Math.min(card.box + 1, 5) : 1
  return { box, due: addDays(today, DAYS_BY_BOX[box]!) }
}
