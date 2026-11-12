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

// One JSON file per unit in ./units/a1 and ./units/a2. To add one: import it here and add it to `contents`.
import a1_0 from './units/a1/a1-0.json'
import a1_1 from './units/a1/a1-1.json'
import a1_2 from './units/a1/a1-2.json'
import a1_3 from './units/a1/a1-3.json'
import a1_4 from './units/a1/a1-4.json'
import a1_5 from './units/a1/a1-5.json'
import a1_6 from './units/a1/a1-6.json'
import a1_7 from './units/a1/a1-7.json'
import a1_8 from './units/a1/a1-8.json'
import a1_9 from './units/a1/a1-9.json'
import a1_10 from './units/a1/a1-10.json'
import a1_11 from './units/a1/a1-11.json'
import a1_12 from './units/a1/a1-12.json'
import a1_13 from './units/a1/a1-13.json'
import a1_14 from './units/a1/a1-14.json'
import a1_15 from './units/a1/a1-15.json'
import a1_16 from './units/a1/a1-16.json'
import a1_17 from './units/a1/a1-17.json'
import a1_18 from './units/a1/a1-18.json'
import a1_19 from './units/a1/a1-19.json'
import a1_20 from './units/a1/a1-20.json'
import a1_21 from './units/a1/a1-21.json'
import a1_22 from './units/a1/a1-22.json'
import a1_23 from './units/a1/a1-23.json'
import a1_24 from './units/a1/a1-24.json'
import a2_1 from './units/a2/a2-1.json'
import a2_2 from './units/a2/a2-2.json'
import a2_3 from './units/a2/a2-3.json'
import a2_4 from './units/a2/a2-4.json'
import a2_5 from './units/a2/a2-5.json'
import a2_6 from './units/a2/a2-6.json'
import a2_7 from './units/a2/a2-7.json'
import a2_8 from './units/a2/a2-8.json'
import a2_9 from './units/a2/a2-9.json'
import a2_10 from './units/a2/a2-10.json'
import a2_11 from './units/a2/a2-11.json'
import a2_12 from './units/a2/a2-12.json'
import a2_13 from './units/a2/a2-13.json'
import a2_14 from './units/a2/a2-14.json'
import a2_15 from './units/a2/a2-15.json'
import a2_16 from './units/a2/a2-16.json'
import a2_17 from './units/a2/a2-17.json'
import a2_18 from './units/a2/a2-18.json'
import a2_19 from './units/a2/a2-19.json'
import a2_20 from './units/a2/a2-20.json'
import a2_21 from './units/a2/a2-21.json'
import a2_22 from './units/a2/a2-22.json'
import a2_23 from './units/a2/a2-23.json'
import a2_24 from './units/a2/a2-24.json'
import a2_25 from './units/a2/a2-25.json'

const contents: Record<string, UnitContent> = {
  'a1-0': a1_0 as UnitContent,
  'a1-1': a1_1 as UnitContent,
  'a1-2': a1_2 as UnitContent,
  'a1-3': a1_3 as UnitContent,
  'a1-4': a1_4 as UnitContent,
  'a1-5': a1_5 as UnitContent,
  'a1-6': a1_6 as UnitContent,
  'a1-7': a1_7 as UnitContent,
  'a1-8': a1_8 as UnitContent,
  'a1-9': a1_9 as UnitContent,
  'a1-10': a1_10 as UnitContent,
  'a1-11': a1_11 as UnitContent,
  'a1-12': a1_12 as UnitContent,
  'a1-13': a1_13 as UnitContent,
  'a1-14': a1_14 as UnitContent,
  'a1-15': a1_15 as UnitContent,
  'a1-16': a1_16 as UnitContent,
  'a1-17': a1_17 as UnitContent,
  'a1-18': a1_18 as UnitContent,
  'a1-19': a1_19 as UnitContent,
  'a1-20': a1_20 as UnitContent,
  'a1-21': a1_21 as UnitContent,
  'a1-22': a1_22 as UnitContent,
  'a1-23': a1_23 as UnitContent,
  'a1-24': a1_24 as UnitContent,
  'a2-1': a2_1 as UnitContent,
  'a2-2': a2_2 as UnitContent,
  'a2-3': a2_3 as UnitContent,
  'a2-4': a2_4 as UnitContent,
  'a2-5': a2_5 as UnitContent,
  'a2-6': a2_6 as UnitContent,
  'a2-7': a2_7 as UnitContent,
  'a2-8': a2_8 as UnitContent,
  'a2-9': a2_9 as UnitContent,
  'a2-10': a2_10 as UnitContent,
  'a2-11': a2_11 as UnitContent,
  'a2-12': a2_12 as UnitContent,
  'a2-13': a2_13 as UnitContent,
  'a2-14': a2_14 as UnitContent,
  'a2-15': a2_15 as UnitContent,
  'a2-16': a2_16 as UnitContent,
  'a2-17': a2_17 as UnitContent,
  'a2-18': a2_18 as UnitContent,
  'a2-19': a2_19 as UnitContent,
  'a2-20': a2_20 as UnitContent,
  'a2-21': a2_21 as UnitContent,
  'a2-22': a2_22 as UnitContent,
  'a2-23': a2_23 as UnitContent,
  'a2-24': a2_24 as UnitContent,
  'a2-25': a2_25 as UnitContent
}
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
  { id: 'a1-11', level: 'A1', number: 11, title: 'Les vêtements', canDo: 'Buy clothes, talk about colours and sizes', content: content('a1-11') },
  { id: 'a1-12', level: 'A1', number: 12, title: 'Chez le médecin', canDo: 'Say where it hurts and understand advice', content: content('a1-12') },
  { id: 'a1-13', level: 'A1', number: 13, title: 'Au restaurant', canDo: 'Order a meal and say how often you do things', content: content('a1-13') },
  { id: 'a1-14', level: 'A1', number: 14, title: 'Les transports', canDo: 'Get around town and say what just happened', content: content('a1-14') },
  { id: 'a1-15', level: 'A1', number: 15, title: 'En ce moment', canDo: 'Say what you are doing right now, on the phone', content: content('a1-15') },
  { id: 'a1-16', level: 'A1', number: 16, title: 'Au travail', canDo: 'Talk about your job and your working hours', content: content('a1-16') },
  { id: 'a1-17', level: 'A1', number: 17, title: 'Dans ma chambre', canDo: 'Describe a room and say where things are', content: content('a1-17') },
  { id: 'a1-18', level: 'A1', number: 18, title: "C'est la fête !", canDo: 'Give dates, invite someone, talk about celebrations', content: content('a1-18') },
  { id: 'a1-19', level: 'A1', number: 19, title: 'À la poste, à la banque', canDo: 'Ask for things politely', content: content('a1-19') },
  { id: 'a1-20', level: 'A1', number: 20, title: 'Les grands nombres', canDo: 'Understand prices, years and big numbers', content: content('a1-20') },
  { id: 'a1-21', level: 'A1', number: 21, title: "J'ai faim !", canDo: 'Say how you feel and what you need', content: content('a1-21') },
  { id: 'a1-22', level: 'A1', number: 22, title: "À l'hôtel", canDo: 'Check in at a hotel, use moi, toi, lui', content: content('a1-22') },
  { id: 'a1-23', level: 'A1', number: 23, title: 'En ligne', canDo: 'Talk about the internet, use verbs like attendre', content: content('a1-23') },
  { id: 'a1-24', level: 'A1', number: 24, title: 'Ma vie en France', canDo: 'Talk about your past, present and future', content: content('a1-24') },
  { id: 'a2-1', level: 'A2', number: 1, title: 'Souvenirs', canDo: 'Tell a story in the past', content: content('a2-1') },
  { id: 'a2-2', level: 'A2', number: 2, title: "Quand j'étais petite", canDo: 'Describe how things used to be', content: content('a2-2') },
  { id: 'a2-3', level: 'A2', number: 3, title: 'Le logement', canDo: 'Describe and compare places', content: content('a2-3') },
  { id: 'a2-4', level: 'A2', number: 4, title: 'Au quotidien', canDo: 'Avoid repeating words with pronouns', content: content('a2-4') },
  { id: 'a2-5', level: 'A2', number: 5, title: 'Voyages', canDo: 'Talk about places and quantities', content: content('a2-5') },
  { id: 'a2-6', level: 'A2', number: 6, title: 'Demain', canDo: 'Make predictions and promises', content: content('a2-6') },
  { id: 'a2-7', level: 'A2', number: 7, title: 'Les gens', canDo: 'Define and describe people and things', content: content('a2-7') },
  { id: 'a2-8', level: 'A2', number: 8, title: 'Mon avis', canDo: 'Explain why and link your ideas', content: content('a2-8') },
  { id: 'a2-9', level: 'A2', number: 9, title: 'Plus rien !', canDo: 'Say what you no longer do, nothing, nobody', content: content('a2-9') },
  { id: 'a2-10', level: 'A2', number: 10, title: "C'est à qui ?", canDo: 'Say who things belong to: le mien, le tien', content: content('a2-10') },
  { id: 'a2-11', level: 'A2', number: 11, title: 'Tous ensemble', canDo: 'Use tout, toute, tous, toutes', content: content('a2-11') },
  { id: 'a2-12', level: 'A2', number: 12, title: 'Quelle surprise !', canDo: 'React with exclamations', content: content('a2-12') },
  { id: 'a2-13', level: 'A2', number: 13, title: 'On se fait la bise ?', canDo: 'Talk about customs, use the three meanings of on', content: content('a2-13') },
  { id: 'a2-14', level: 'A2', number: 14, title: 'Bonnes résolutions', canDo: 'Talk about habits with verbs + à / de', content: content('a2-14') },
  { id: 'a2-15', level: 'A2', number: 15, title: 'En cuisine', canDo: 'Follow and give a recipe, use adverbs in -ment', content: content('a2-15') },
  { id: 'a2-16', level: 'A2', number: 16, title: 'Sauver la planète', canDo: 'Express obligation and prohibition', content: content('a2-16') },
  { id: 'a2-17', level: 'A2', number: 17, title: 'Au cinéma', canDo: 'Talk about films, use depuis, il y a, pendant, dans', content: content('a2-17') },
  { id: 'a2-18', level: 'A2', number: 18, title: 'À la pharmacie', canDo: 'Give advice with the imperative and pronouns', content: content('a2-18') },
  { id: 'a2-19', level: 'A2', number: 19, title: "Fêtes d'ici et d'ailleurs", canDo: 'Compare quantities and actions', content: content('a2-19') },
  { id: 'a2-20', level: 'A2', number: 20, title: 'Celui-ci ou celui-là ?', canDo: 'Choose between things: celui, celle, lequel', content: content('a2-20') },
  { id: 'a2-21', level: 'A2', number: 21, title: 'Chercher un emploi', canDo: "Pass a job interview, use c'est / il est", content: content('a2-21') },
  { id: 'a2-22', level: 'A2', number: 22, title: "Histoire d'amour", canDo: 'Tell a love story with reciprocal verbs', content: content('a2-22') },
  { id: 'a2-23', level: 'A2', number: 23, title: 'Petits problèmes', canDo: 'Complain, use déjà, encore, toujours', content: content('a2-23') },
  { id: 'a2-24', level: 'A2', number: 24, title: 'Écrire un message', canDo: 'Write formal and informal messages', content: content('a2-24') },
  { id: 'a2-25', level: 'A2', number: 25, title: 'Bilan A2', canDo: 'Tell your whole story using every A2 tense', content: content('a2-25') },
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
  { unit: 'a1-10', title: 'Yesterday', hint: "Tell what you did yesterday, from morning to evening: Hier, j'ai…" },
  { unit: 'a1-11', title: 'In the shop', hint: 'Describe what you are wearing today and ask a shop assistant for another colour.' },
  { unit: 'a1-12', title: "At the doctor's", hint: "Say where it hurts and give 3 pieces of advice: J'ai mal au… Il faut…" },
  { unit: 'a1-13', title: 'Your eating habits', hint: 'What do you always, often, never eat? Je ne mange jamais de…' },
  { unit: 'a1-14', title: 'My commute', hint: 'Explain how you go to work: transport, line, how long. Le bus vient de partir…' },
  { unit: 'a1-15', title: 'Right now', hint: 'Say what 4 people you know are doing right now: Il est en train de…' },
  { unit: 'a1-16', title: 'My job', hint: 'Describe your job: hours, colleagues, what you like. Je finis à…' },
  { unit: 'a1-17', title: 'Room tour', hint: "Describe your room: what's on, under, next to what?" },
  { unit: 'a1-18', title: 'Birthday party', hint: "Invite a friend to your party: date, time, place. C'est le premier…" },
  { unit: 'a1-19', title: 'At the counter', hint: 'Ask for 3 things politely at the post office or the bank: Je voudrais… Pourriez-vous…' },
  { unit: 'a1-20', title: 'Price check', hint: 'Say the price of 5 things around you, and the year you were born.' },
  { unit: 'a1-21', title: 'How do you feel?', hint: "Say 5 things you feel or need right now: J'ai faim, j'ai envie de…" },
  { unit: 'a1-22', title: 'Hotel check-in', hint: 'Check in at a hotel and ask about breakfast and wifi.' },
  { unit: 'a1-23', title: 'Online life', hint: 'Talk about what you do online: apps, messages, what you are waiting for.' },
  { unit: 'a1-24', title: 'My story', hint: "Your life in 3 times: hier… maintenant… l'année prochaine…" },
  { unit: 'a2-1', title: 'A great trip', hint: 'Tell a trip: when you left, how, what you did, when you came back. Je suis partie…' },
  { unit: 'a2-2', title: 'When I was little', hint: "Describe your childhood: where you lived, what you did every day. Quand j'étais petite…" },
  { unit: 'a2-3', title: 'Dream home', hint: 'Describe your dream home and compare it with your home now: plus grand, moins cher…' },
  { unit: 'a2-4', title: 'Who does what?', hint: 'Talk about chores at home without repeating the nouns: le ménage ? Je le fais…' },
  { unit: 'a2-5', title: 'Best trip ever', hint: "A place you love: when you went, what there is. J'y suis allée… Il y en a beaucoup…" },
  { unit: 'a2-6', title: 'In 10 years', hint: 'Where will you live? What will you do? Dans dix ans, je serai…' },
  { unit: 'a2-7', title: 'Guess who', hint: "Describe someone you both know without saying the name: C'est quelqu'un qui…" },
  { unit: 'a2-8', title: 'For or against', hint: "Paris or Jakarta? Give 2 advantages, 2 disadvantages and your conclusion: À mon avis… mais… donc…" },
  { unit: 'a2-9', title: 'Then and now', hint: "What don't you do any more? Je ne… plus, je n'ai jamais…" },
  { unit: 'a2-10', title: 'Whose is it?', hint: "Point at 5 things and say whose they are: c'est le mien, c'est la sienne…" },
  { unit: 'a2-11', title: 'All together', hint: 'Describe a family gathering with tout, toute, tous, toutes.' },
  { unit: 'a2-12', title: 'React!', hint: 'Someone tells you 5 pieces of news: react with Quel… ! Comme… !' },
  { unit: 'a2-13', title: 'Customs', hint: 'Explain 3 customs from Indonesia using on: En Indonésie, on…' },
  { unit: 'a2-14', title: 'Resolutions', hint: "Say 4 resolutions: J'arrête de… Je commence à… J'essaie de…" },
  { unit: 'a2-15', title: 'Recipe', hint: 'Explain a recipe step by step: coupez finement, mélangez doucement…' },
  { unit: 'a2-16', title: 'Green rules', hint: 'Give 5 rules to protect the planet: Il faut… Il est interdit de…' },
  { unit: 'a2-17', title: 'Film review', hint: 'Talk about a film you saw: when, how long, what it is about.' },
  { unit: 'a2-18', title: 'Get well soon', hint: 'A friend is ill: give 5 orders with pronouns. Prends-le, repose-toi…' },
  { unit: 'a2-19', title: 'Here and there', hint: 'Compare Indonesia and France: plus de, moins de, autant de…' },
  { unit: 'a2-20', title: 'Which one?', hint: 'Choose between two things around you: Je préfère celui-ci parce que…' },
  { unit: 'a2-21', title: 'Job interview', hint: "Present yourself for a job: Je suis… J'ai travaillé… C'est…" },
  { unit: 'a2-22', title: 'Love story', hint: 'Tell how a couple you know met: Ils se sont rencontrés…' },
  { unit: 'a2-23', title: 'Complaint', hint: "Complain about an order: Il n'est toujours pas arrivé…" },
  { unit: 'a2-24', title: 'Two messages', hint: 'Say the same thing to your boss and to a friend: vous / tu.' },
  { unit: 'a2-25', title: 'My journey', hint: 'Tell your whole story: avant… quand je suis arrivée… maintenant… dans cinq ans…' }
]