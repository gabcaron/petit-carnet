// Run: npx tsx tests/logic.test.ts
import assert from 'node:assert/strict'
import { checkAnswer, normalizeAnswer, shuffle } from '../app/utils/answers'
import { addDays, reviewCard } from '../app/utils/srs'
import { units } from '../app/data/course'
import { speakable } from '../app/utils/audio'
import basics from '../app/data/grammar.json'

assert.equal(checkAnswer('Je suis', ['je suis']), 'right')
assert.equal(checkAnswer("  je m’appelle Sari. ", ["Je m'appelle Sari"]), 'right')
assert.equal(checkAnswer('Non je suis indonésienne', ['Non, je suis indonésienne']), 'right')
assert.equal(checkAnswer('indonesienne', ['indonésienne']), 'accent')
assert.equal(checkAnswer('dix huit', ['dix-huit', 'dix huit']), 'right')
assert.equal(checkAnswer('es', ['suis']), 'wrong')

assert.equal(addDays('2026-10-31', 1), '2026-11-01')
assert.equal(addDays('2026-12-31', 3), '2027-01-03')
assert.deepEqual(reviewCard({ box: 1, due: '2026-10-28' }, true, '2026-10-28'), { box: 2, due: '2026-10-31' })
assert.deepEqual(reviewCard({ box: 5, due: '2026-10-28' }, true, '2026-10-28'), { box: 5, due: '2026-11-27' })
assert.deepEqual(reviewCard({ box: 4, due: '2026-10-28' }, false, '2026-10-28'), { box: 1, due: '2026-10-29' })

assert.deepEqual(shuffle([1, 2, 3, 4]).sort(), [1, 2, 3, 4])

// Content checks: catch typos in course.ts before she does.
const allWords = units.flatMap(u => u.content?.words ?? [])
assert.equal(new Set(allWords.map(w => w.id)).size, allWords.length, 'duplicate word id')
for (const u of units) {
  for (const ex of u.content?.practice ?? []) {
    if (ex.type === 'choice') assert.ok(ex.options.includes(ex.answer), `${u.id}: "${ex.answer}" not in options`)
    const tokens = (s: string) => normalizeAnswer(s).split(' ').sort().join(' ')
    if (ex.type === 'order') assert.equal(tokens(ex.words.join(' ')), tokens(ex.answer), `${u.id}: order words ≠ answer`)
    if (ex.type === 'fill') assert.ok(ex.sentence.includes('___'), `${u.id}: fill without ___`)
  }
}

assert.equal(speakable('enchanté / enchantée'), 'enchanté, enchantée')
assert.equal(speakable("je m'appelle…"), "je m'appelle")
for (const s of basics) {
  assert.ok(s.id && s.title && s.intro && s.trap && s.examples.length, `grammar sheet ${s.id} incomplete`)
  assert.ok(s.table.every(row => row.length === s.table[0]!.length), `grammar sheet ${s.id}: uneven table`)
}
console.log('logic ok')