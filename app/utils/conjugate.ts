import type { Verb } from '~/data/verbs'

export const PRONOUNS = ['je', 'tu', 'il / elle', 'nous', 'vous', 'ils / elles']
const PRESENT_ER = ['e', 'es', 'e', 'ons', 'ez', 'ent']
const PRESENT_IR = ['is', 'is', 'it', 'issons', 'issez', 'issent']
const IMPERFECT = ['ais', 'ais', 'ait', 'ions', 'iez', 'aient']
const FUTURE = ['ai', 'as', 'a', 'ons', 'ez', 'ont']
const ETRE = ['suis', 'es', 'est', 'sommes', 'êtes', 'sont']
const AVOIR = ['ai', 'as', 'a', 'avons', 'avez', 'ont']
const ALLER = ['vais', 'vas', 'va', 'allons', 'allez', 'vont']

// manger → nous mangeons, commencer → nous commençons: keep the soft g / c before a and o.
function soften(stem: string, ending: string) {
  if (!/^[ao]/.test(ending)) return stem + ending
  if (stem.endsWith('g')) return stem + 'e' + ending
  if (stem.endsWith('c')) return stem.slice(0, -1) + 'ç' + ending
  return stem + ending
}

// je → j' before a vowel or a silent h.
function withPronoun(i: number, form: string) {
  if (i === 0 && /^[aeiouyéèêâîôûh]/i.test(form)) return `j'${form}`
  return `${PRONOUNS[i]} ${form}`
}

export function presentForms(v: Verb): string[] {
  if (v.present) return v.present
  const stem = v.inf.slice(0, -2)
  return (v.group === 2 ? PRESENT_IR : PRESENT_ER).map(e => soften(stem, e))
}

export function participle(v: Verb) {
  return v.pp ?? v.inf.slice(0, -2) + (v.group === 2 ? 'i' : 'é')
}

export function conjugate(v: Verb) {
  const present = presentForms(v)
  const regularEr = v.group === 1 && !v.present
  const imperfectStem = v.imperfectStem ?? (regularEr ? v.inf.slice(0, -2) : present[3]!.replace(/ons$/, ''))
  const futureStem = v.futureStem ?? v.inf.replace(/e$/, '')
  const pp = participle(v)
  const withEtre = v.aux === 'être'

  const tuImperative = present[1]!.endsWith('es') ? present[1]!.slice(0, -1) : present[1]!
  const imperative = v.imperative === undefined ? [tuImperative, present[3]!, present[4]!] : v.imperative

  return {
    'Présent': present.map((f, i) => withPronoun(i, f)),
    'Passé composé': (withEtre ? ETRE : AVOIR).map((a, i) =>
      withPronoun(i, `${a} ${withEtre ? `${pp}(e)${i >= 3 ? 's' : ''}` : pp}`)),
    'Imparfait': IMPERFECT.map((e, i) => withPronoun(i, regularEr ? soften(imperfectStem, e) : imperfectStem + e)),
    'Futur proche': ALLER.map((a, i) => withPronoun(i, `${a} ${v.inf}`)),
    'Futur simple': FUTURE.map((e, i) => withPronoun(i, futureStem + e)),
    'Impératif': imperative ? imperative.map((f, i) => `${f} (${['tu', 'nous', 'vous'][i]})`) : []
  }
}