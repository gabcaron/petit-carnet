
// Uses the browser's own French voice. Quality depends on the device:
// best in Edge ("Natural" voices), Chrome ("Google français") and on iPhone/Mac.
let voice: SpeechSynthesisVoice | null = null
 
function pickVoice() {
  const french = speechSynthesis.getVoices().filter(v => v.lang.toLowerCase().startsWith('fr'))
  voice = french.find(v => /natural|online|neural|google|premium|enhanced|amélie|thomas/i.test(v.name)) ?? french[0] ?? null
}
 
export function useSpeak() {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window
 
  if (supported && !voice) {
    pickVoice()
    // Chrome loads its voices asynchronously: the list is often empty on the first call.
    speechSynthesis.addEventListener('voiceschanged', pickVoice, { once: true })
  }
 
  function speak(text: string, rate = 0.85) {
    if (!supported) return
    speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(speakable(text))
    utterance.lang = 'fr-FR'
    utterance.rate = rate
    if (voice) utterance.voice = voice
    speechSynthesis.speak(utterance)
  }
 
  return { supported, speak }
}
 