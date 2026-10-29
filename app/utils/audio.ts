// "enchanté / enchantée" → "enchanté, enchantée" so voices don't read the slash.
export function speakable(text: string) {
  return text.replace(/\s*\/\s*/g, ', ').replace(/…/g, '').trim()
}