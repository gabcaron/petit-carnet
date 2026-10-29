// The course outline. A unit's content is app/data/units/<id>.json; without that file it shows as "Coming soon".
// Order and goals follow the Eaquals/CIEP "Inventaire linguistique des contenus clés des niveaux du CECRL".

export type Level = 'A1' | 'A2' | 'B1'

export interface Word { id: string; fr: string; en: string; gender?: 'm' | 'f'; note?: string }
export interface Line { who: string; fr: string; en: string }

export type Exercise =
  | { type: 'choice'; prompt: string; options: string[]; answer: string; listen?: string; explain?: string }
  | { type: 'fill'; prompt: string; sentence: string; answers: string[]; explain?: string }
  | { type: 'order'; prompt: string; words: string[]; answer: string; explain?: string }

export interface UnitContent {
  dialogue: Line[]
  words: Word[]
  grammar: { title: string; intro: string; table: string[][]; examples: { fr: string; en: string }[]; trap: string }
  sounds: { title: string; explain: string; pairs: [string, string][]; tip: string }
  practice: Exercise[]
  task: { prompt: string; example: string; checklist: string[] }
}

export interface Unit { id: string; level: Level; number: number; title: string; canDo: string; content?: UnitContent }

export const STEPS = ['Goal', 'Words', 'Grammar', 'Sounds', 'Practice', 'Can I do it?'] as const

export const LEVELS: Record<Level, string> = {
  A1: 'Beginner — talk about yourself and everyday needs',
  A2: 'Elementary — tell stories in the past, link your ideas',
  B1: 'Independent — give your opinion, imagine, argue'
}

// One JSON file per unit in ./units. To add one: import it here and add it to `contents`.
import a1_0 from './units/a1-0.json'
import a1_1 from './units/a1-1.json'
import a1_2 from './units/a1-2.json'
import a1_3 from './units/a1-3.json'
import a1_4 from './units/a1-4.json'
import a1_5 from './units/a1-5.json'
import a1_6 from './units/a1-6.json'
import a1_7 from './units/a1-7.json'
import a1_8 from './units/a1-8.json'
import a1_9 from './units/a1-9.json'
import a1_10 from './units/a1-10.json'

const contents: Record<string, UnitContent> = { 'a1-0': a1_0 as UnitContent, 'a1-1': a1_1 as UnitContent, 'a1-2': a1_2 as UnitContent, 'a1-3': a1_3 as UnitContent, 'a1-4': a1_4 as UnitContent, 'a1-5': a1_5 as UnitContent, 'a1-6': a1_6 as UnitContent, 'a1-7': a1_7 as UnitContent, 'a1-8': a1_8 as UnitContent, 'a1-9': a1_9 as UnitContent, 'a1-10': a1_10 as UnitContent }
const content = (id: string) => contents[id]

export const units: Unit[] = [
  { id: 'a1-0', level: 'A1', number: 0, title: 'Les sons du français', canDo: 'Read a new word aloud and count to 20', content: content('a1-0') },
  { id: 'a1-1', level: 'A1', number: 1, title: 'Bonjour !', canDo: 'Say hello, introduce yourself, give your nationality', content: content('a1-1') },
  { id: 'a1-2', level: 'A1', number: 2, title: 'Moi et les autres', canDo: 'Give your age, job and contact details', content: content('a1-2') },
  { id: 'a1-3', level: 'A1', number: 3, title: 'Ma famille', canDo: 'Introduce your family, describe a person', content: content('a1-3') },
  { id: 'a1-4', level: 'A1', number: 4, title: "J'aime, je n'aime pas", canDo: 'Talk about what you like and your hobbies', content: content('a1-4') },
  { id: 'a1-5', level: 'A1', number: 5, title: 'Ma journée', canDo: 'Tell the time, describe your daily routine', content: content('a1-5') },
  { id: 'a1-6', level: 'A1', number: 6, title: 'Au café, au marché', canDo: 'Order, ask for a price, buy and pay', content: content('a1-6') },
  { id: 'a1-7', level: 'A1', number: 7, title: 'En ville', canDo: 'Ask for and give directions', content: content('a1-7') },
  { id: 'a1-8', level: 'A1', number: 8, title: 'Des questions ?', canDo: 'Ask all the basic questions', content: content('a1-8') },
  { id: 'a1-9', level: 'A1', number: 9, title: 'Mes projets', canDo: 'Talk about next weekend and your plans', content: content('a1-9') },
  { id: 'a1-10', level: 'A1', number: 10, title: 'Hier', canDo: 'Say in a few sentences what you did', content: content('a1-10') },
  { id: 'a2-1', level: 'A2', number: 1, title: 'Souvenirs', canDo: 'Tell a story in the past' },
  { id: 'a2-2', level: 'A2', number: 2, title: "Quand j'étais petite", canDo: 'Describe how things used to be' },
  { id: 'a2-3', level: 'A2', number: 3, title: 'Le logement', canDo: 'Describe and compare places' },
  { id: 'a2-4', level: 'A2', number: 4, title: 'Au quotidien', canDo: 'Avoid repeating words with pronouns' },
  { id: 'a2-5', level: 'A2', number: 5, title: 'Voyages', canDo: 'Talk about places and quantities' },
  { id: 'a2-6', level: 'A2', number: 6, title: 'Demain', canDo: 'Make predictions and promises' },
  { id: 'a2-7', level: 'A2', number: 7, title: 'Les gens', canDo: 'Define and describe people and things' },
  { id: 'a2-8', level: 'A2', number: 8, title: 'Mon avis', canDo: 'Explain why and link your ideas' },
  { id: 'b1-1', level: 'B1', number: 1, title: "Si j'étais…", canDo: 'Imagine and make hypotheses' },
  { id: 'b1-2', level: 'B1', number: 2, title: 'Il faut que…', canDo: 'Express obligation and feelings' },
  { id: 'b1-3', level: 'B1', number: 3, title: "Il m'a dit que…", canDo: 'Report what someone said' },
  { id: 'b1-4', level: 'B1', number: 4, title: 'Pour ou contre', canDo: 'Argue and nuance your opinion' },
  { id: 'b1-5', level: 'B1', number: 5, title: 'Récits', canDo: 'Tell a story with precision' },
  { id: 'b1-6', level: 'B1', number: 6, title: 'Le monde', canDo: 'Talk about society and the news' }
]

export const wordsById: Record<string, Word> = Object.fromEntries(
  units.flatMap(u => u.content?.words ?? []).map(w => [w.id, w])
)

// Daily speaking challenge, like a 60-second "mot-roulette". `unit` = first unit that makes it doable.
export const challenges = [
  { unit: 'a1-0', title: 'Count out loud', hint: 'Count from 0 to 20, then backwards from 20 to 0.' },
  { unit: 'a1-0', title: 'Numbers around you', hint: 'Find 5 numbers around you (a clock, a phone, a door) and say them.' },
  { unit: 'a1-1', title: 'Introduce yourself', hint: "Je m'appelle… Je suis… Ça va ?" },
  { unit: 'a1-1', title: 'Nationalities', hint: 'Say the nationality of 3 people you know: Il est… / Elle est…' },
  { unit: 'a1-1', title: 'Hello and goodbye', hint: 'Greet a friend, a neighbour in the evening, and a shop assistant.' },
  { unit: 'a1-2', title: 'Your ID card', hint: 'Say your name, age, job and city — then do the same for a friend.' },
  { unit: 'a1-3', title: 'My family', hint: 'Describe 3 people in your family: name, age, one adjective.' },
  { unit: 'a1-4', title: 'Love it or not', hint: "3 things you love, 3 things you don't like: J'adore… Je n'aime pas…" },
  { unit: 'a1-5', title: 'My day', hint: 'Tell your day from morning to night, with times: Je me lève à…' },
  { unit: 'a1-6', title: 'At the café', hint: 'Order breakfast for two, ask the price, ask for the bill.' },
  { unit: 'a1-7', title: 'Guide me', hint: 'Explain how to go from your home to the nearest shop: Allez tout droit…' },
  { unit: 'a1-8', title: 'Interview', hint: 'Ask 6 questions to someone, then answer them yourself.' },
  { unit: 'a1-9', title: 'Next weekend', hint: "What are you going to do? What's the weather going to be like?" },
  { unit: 'a1-10', title: 'Yesterday', hint: "Tell what you did yesterday, from morning to evening: Hier, j'ai…" }
]
