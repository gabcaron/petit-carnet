// Run: npx tsx tests/conjugate.test.ts
import assert from 'node:assert/strict'
import { verbs } from '../app/data/verbs'
import { conjugate } from '../app/utils/conjugate'
import sheets from '../app/data/conjugation.json'

const c = (inf: string) => conjugate(verbs.find(v => v.inf === inf)!)

// Present
assert.deepEqual(c('parler')['Présent'], ['je parle', 'tu parles', 'il / elle parle', 'nous parlons', 'vous parlez', 'ils / elles parlent'])
assert.equal(c('habiter')['Présent'][0], "j'habite")
assert.equal(c('manger')['Présent'][3], 'nous mangeons')
assert.equal(c('commencer')['Présent'][3], 'nous commençons')
assert.deepEqual(c('finir')['Présent'], ['je finis', 'tu finis', 'il / elle finit', 'nous finissons', 'vous finissez', 'ils / elles finissent'])
assert.equal(c('être')['Présent'][0], 'je suis')
assert.equal(c('avoir')['Présent'][0], "j'ai")

// Passé composé
assert.equal(c('parler')['Passé composé'][0], "j'ai parlé")
assert.equal(c('finir')['Passé composé'][3], 'nous avons fini')
assert.equal(c('prendre')['Passé composé'][2], 'il / elle a pris')
assert.equal(c('aller')['Passé composé'][0], 'je suis allé(e)')
assert.equal(c('aller')['Passé composé'][5], 'ils / elles sont allé(e)s')
assert.equal(c('être')['Passé composé'][0], "j'ai été")

// Imparfait
assert.equal(c('parler')['Imparfait'][0], 'je parlais')
assert.equal(c('manger')['Imparfait'][0], 'je mangeais')
assert.equal(c('manger')['Imparfait'][3], 'nous mangions')
assert.equal(c('commencer')['Imparfait'][2], 'il / elle commençait')
assert.equal(c('commencer')['Imparfait'][4], 'vous commenciez')
assert.equal(c('finir')['Imparfait'][0], 'je finissais')
assert.equal(c('faire')['Imparfait'][0], 'je faisais')
assert.equal(c('boire')['Imparfait'][3], 'nous buvions')
assert.equal(c('être')['Imparfait'][0], "j'étais")
assert.equal(c('avoir')['Imparfait'][5], 'ils / elles avaient')
assert.equal(c('étudier')['Imparfait'][3], 'nous étudiions')

// Futur
assert.equal(c('aller')['Futur proche'][0], 'je vais aller')
assert.equal(c('parler')['Futur simple'][0], 'je parlerai')
assert.equal(c('finir')['Futur simple'][3], 'nous finirons')
assert.equal(c('prendre')['Futur simple'][0], 'je prendrai')
assert.equal(c('aller')['Futur simple'][0], "j'irai")
assert.equal(c('être')['Futur simple'][1], 'tu seras')
assert.equal(c('acheter')['Futur simple'][0], "j'achèterai")
assert.equal(c('appeler')['Futur simple'][0], "j'appellerai")

// Impératif
assert.deepEqual(c('parler')['Impératif'], ['parle (tu)', 'parlons (nous)', 'parlez (vous)'])
assert.equal(c('aller')['Impératif'][0], 'va (tu)')
assert.equal(c('ouvrir')['Impératif'][0], 'ouvre (tu)')
assert.equal(c('prendre')['Impératif'][0], 'prends (tu)')
assert.equal(c('être')['Impératif'][0], 'sois (tu)')
assert.deepEqual(c('pouvoir')['Impératif'], [])

// Data sanity
for (const v of verbs) {
  if (v.present) assert.equal(v.present.length, 6, `${v.inf}: present needs 6 forms`)
  if (v.group === 3) assert.ok(v.present && v.pp && v.futureStem, `${v.inf}: irregular verb needs present, pp, futureStem`)
  if (v.group === 1) assert.ok(v.inf.endsWith('er'), `${v.inf}: 1st group ends in -er`)
  if (v.group === 2) assert.ok(v.inf.endsWith('ir'), `${v.inf}: 2nd group ends in -ir`)
}
assert.equal(new Set(verbs.map(v => v.inf)).size, verbs.length, 'duplicate verb')

// The tense sheets must agree with the conjugator (columns: parler, finir, prendre).
const sheet = (id: string) => sheets.find(s => s.id === id)!.table.slice(1)
const bare = (line: string) => line.replace(/^(j'|je |tu |il \/ elle |nous |vous |ils \/ elles )/, '').replace(/ \((tu|nous|vous)\)$/, '')
for (const [id, tense] of [['present', 'Présent'], ['imparfait', 'Imparfait'], ['futur-simple', 'Futur simple'], ['imperatif', 'Impératif']] as const) {
  ;['parler', 'finir', 'prendre'].forEach((inf, col) => {
    assert.deepEqual(sheet(id).map(row => row[col + 1]), c(inf)[tense].map(bare), `sheet ${id} ≠ conjugator for ${inf}`)
  })
}

console.log(`conjugate ok — ${verbs.length} verbs`)