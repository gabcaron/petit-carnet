// Verbs available in the conjugator.
// Regular -er (1st group) and -ir (2nd group) verbs only need `inf` and `en`: everything is computed.
// Irregular verbs give their present tense, participle and future stem; the rest is still computed.
export interface Verb {
  inf: string
  en: string
  group: 1 | 2 | 3
  aux?: 'être'              // default: avoir
  present?: string[]        // 6 forms, without pronoun
  pp?: string               // past participle
  futureStem?: string       // e.g. 'ir' for aller → j'irai
  imperfectStem?: string    // only for être ('ét')
  imperative?: string[] | null // [tu, nous, vous]; null = no imperative
}

export const verbs: Verb[] = [
  // 1st group: -er
  { inf: 'parler', en: 'to speak', group: 1 },
  { inf: 'aimer', en: 'to like, to love', group: 1 },
  { inf: 'habiter', en: 'to live (somewhere)', group: 1 },
  { inf: 'travailler', en: 'to work', group: 1 },
  { inf: 'regarder', en: 'to watch, to look at', group: 1 },
  { inf: 'écouter', en: 'to listen to', group: 1 },
  { inf: 'manger', en: 'to eat', group: 1 },
  { inf: 'voyager', en: 'to travel', group: 1 },
  { inf: 'commencer', en: 'to start', group: 1 },
  { inf: 'chanter', en: 'to sing', group: 1 },
  { inf: 'danser', en: 'to dance', group: 1 },
  { inf: 'jouer', en: 'to play', group: 1 },
  { inf: 'chercher', en: 'to look for', group: 1 },
  { inf: 'trouver', en: 'to find', group: 1 },
  { inf: 'donner', en: 'to give', group: 1 },
  { inf: 'penser', en: 'to think', group: 1 },
  { inf: 'demander', en: 'to ask', group: 1 },
  { inf: 'préparer', en: 'to prepare', group: 1 },
  { inf: 'cuisiner', en: 'to cook', group: 1 },
  { inf: 'étudier', en: 'to study', group: 1 },
  { inf: 'oublier', en: 'to forget', group: 1 },
  { inf: 'visiter', en: 'to visit (a place)', group: 1 },
  { inf: 'arriver', en: 'to arrive', group: 1, aux: 'être' },
  { inf: 'entrer', en: 'to go in', group: 1, aux: 'être' },
  { inf: 'rentrer', en: 'to go back home', group: 1, aux: 'être' },
  { inf: 'rester', en: 'to stay', group: 1, aux: 'être' },
  { inf: 'monter', en: 'to go up', group: 1, aux: 'être' },
  { inf: 'tomber', en: 'to fall', group: 1, aux: 'être' },
  // 1st group with a spelling change
  { inf: 'acheter', en: 'to buy', group: 1, present: ['achète', 'achètes', 'achète', 'achetons', 'achetez', 'achètent'], futureStem: 'achèter' },
  { inf: 'préférer', en: 'to prefer', group: 1, present: ['préfère', 'préfères', 'préfère', 'préférons', 'préférez', 'préfèrent'] },
  { inf: 'appeler', en: 'to call', group: 1, present: ['appelle', 'appelles', 'appelle', 'appelons', 'appelez', 'appellent'], futureStem: 'appeller' },
  { inf: 'envoyer', en: 'to send', group: 1, present: ['envoie', 'envoies', 'envoie', 'envoyons', 'envoyez', 'envoient'], futureStem: 'enverr' },

  // 2nd group: -ir with -issons
  { inf: 'finir', en: 'to finish', group: 2 },
  { inf: 'choisir', en: 'to choose', group: 2 },
  { inf: 'réussir', en: 'to succeed, to pass', group: 2 },
  { inf: 'grandir', en: 'to grow up', group: 2 },
  { inf: 'réfléchir', en: 'to think (about)', group: 2 },

  // 3rd group: irregular
  { inf: 'être', en: 'to be', group: 3, present: ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'], pp: 'été', futureStem: 'ser', imperfectStem: 'ét', imperative: ['sois', 'soyons', 'soyez'] },
  { inf: 'avoir', en: 'to have', group: 3, present: ['ai', 'as', 'a', 'avons', 'avez', 'ont'], pp: 'eu', futureStem: 'aur', imperative: ['aie', 'ayons', 'ayez'] },
  { inf: 'aller', en: 'to go', group: 3, aux: 'être', present: ['vais', 'vas', 'va', 'allons', 'allez', 'vont'], pp: 'allé', futureStem: 'ir', imperative: ['va', 'allons', 'allez'] },
  { inf: 'faire', en: 'to do, to make', group: 3, present: ['fais', 'fais', 'fait', 'faisons', 'faites', 'font'], pp: 'fait', futureStem: 'fer' },
  { inf: 'prendre', en: 'to take', group: 3, present: ['prends', 'prends', 'prend', 'prenons', 'prenez', 'prennent'], pp: 'pris', futureStem: 'prendr' },
  { inf: 'apprendre', en: 'to learn', group: 3, present: ['apprends', 'apprends', 'apprend', 'apprenons', 'apprenez', 'apprennent'], pp: 'appris', futureStem: 'apprendr' },
  { inf: 'comprendre', en: 'to understand', group: 3, present: ['comprends', 'comprends', 'comprend', 'comprenons', 'comprenez', 'comprennent'], pp: 'compris', futureStem: 'comprendr' },
  { inf: 'venir', en: 'to come', group: 3, aux: 'être', present: ['viens', 'viens', 'vient', 'venons', 'venez', 'viennent'], pp: 'venu', futureStem: 'viendr' },
  { inf: 'pouvoir', en: 'can, to be able to', group: 3, present: ['peux', 'peux', 'peut', 'pouvons', 'pouvez', 'peuvent'], pp: 'pu', futureStem: 'pourr', imperative: null },
  { inf: 'vouloir', en: 'to want', group: 3, present: ['veux', 'veux', 'veut', 'voulons', 'voulez', 'veulent'], pp: 'voulu', futureStem: 'voudr', imperative: null },
  { inf: 'devoir', en: 'must, to have to', group: 3, present: ['dois', 'dois', 'doit', 'devons', 'devez', 'doivent'], pp: 'dû', futureStem: 'devr', imperative: null },
  { inf: 'savoir', en: 'to know (a fact)', group: 3, present: ['sais', 'sais', 'sait', 'savons', 'savez', 'savent'], pp: 'su', futureStem: 'saur', imperative: ['sache', 'sachons', 'sachez'] },
  { inf: 'connaître', en: 'to know (a person, a place)', group: 3, present: ['connais', 'connais', 'connaît', 'connaissons', 'connaissez', 'connaissent'], pp: 'connu', futureStem: 'connaîtr' },
  { inf: 'voir', en: 'to see', group: 3, present: ['vois', 'vois', 'voit', 'voyons', 'voyez', 'voient'], pp: 'vu', futureStem: 'verr' },
  { inf: 'croire', en: 'to believe', group: 3, present: ['crois', 'crois', 'croit', 'croyons', 'croyez', 'croient'], pp: 'cru', futureStem: 'croir' },
  { inf: 'dire', en: 'to say, to tell', group: 3, present: ['dis', 'dis', 'dit', 'disons', 'dites', 'disent'], pp: 'dit', futureStem: 'dir' },
  { inf: 'lire', en: 'to read', group: 3, present: ['lis', 'lis', 'lit', 'lisons', 'lisez', 'lisent'], pp: 'lu', futureStem: 'lir' },
  { inf: 'écrire', en: 'to write', group: 3, present: ['écris', 'écris', 'écrit', 'écrivons', 'écrivez', 'écrivent'], pp: 'écrit', futureStem: 'écrir' },
  { inf: 'mettre', en: 'to put, to put on', group: 3, present: ['mets', 'mets', 'met', 'mettons', 'mettez', 'mettent'], pp: 'mis', futureStem: 'mettr' },
  { inf: 'boire', en: 'to drink', group: 3, present: ['bois', 'bois', 'boit', 'buvons', 'buvez', 'boivent'], pp: 'bu', futureStem: 'boir' },
  { inf: 'partir', en: 'to leave', group: 3, aux: 'être', present: ['pars', 'pars', 'part', 'partons', 'partez', 'partent'], pp: 'parti', futureStem: 'partir' },
  { inf: 'sortir', en: 'to go out', group: 3, aux: 'être', present: ['sors', 'sors', 'sort', 'sortons', 'sortez', 'sortent'], pp: 'sorti', futureStem: 'sortir' },
  { inf: 'dormir', en: 'to sleep', group: 3, present: ['dors', 'dors', 'dort', 'dormons', 'dormez', 'dorment'], pp: 'dormi', futureStem: 'dormir' },
  { inf: 'ouvrir', en: 'to open', group: 3, present: ['ouvre', 'ouvres', 'ouvre', 'ouvrons', 'ouvrez', 'ouvrent'], pp: 'ouvert', futureStem: 'ouvrir' },
  { inf: 'attendre', en: 'to wait (for)', group: 3, present: ['attends', 'attends', 'attend', 'attendons', 'attendez', 'attendent'], pp: 'attendu', futureStem: 'attendr' },
  { inf: 'vendre', en: 'to sell', group: 3, present: ['vends', 'vends', 'vend', 'vendons', 'vendez', 'vendent'], pp: 'vendu', futureStem: 'vendr' },
  { inf: 'descendre', en: 'to go down', group: 3, aux: 'être', present: ['descends', 'descends', 'descend', 'descendons', 'descendez', 'descendent'], pp: 'descendu', futureStem: 'descendr' }
]