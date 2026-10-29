<script setup lang="ts">
// Living style guide (Consistency): every new screen should reuse these pieces.
useHead({ title: 'Style guide — Petit Carnet' })
const colors = [
  ['--c-primary', 'Primary — actions only'], ['--c-accent', 'Accent — rewards only'], ['--c-ink', 'Ink — outlines'],
  ['--c-text', 'Text (dark grey, not black)'], ['--c-muted', 'Muted text'], ['--c-line', 'Lines'],
  ['--c-success', 'Right answer'], ['--c-error', 'Wrong answer'], ['--c-m', 'Masculine'], ['--c-f', 'Feminine']
]
</script>

<template>
  <div class="section">
    <div class="container stack">
      <h1>Style guide</h1>

      <h2>Colours</h2>
      <div class="grid">
        <div v-for="[token, label] in colors" :key="token" class="span-4 swatch">
          <span :style="{ background: `var(${token})` }" />
          <div><strong class="small">{{ label }}</strong><br><code class="small muted">{{ token }}</code></div>
        </div>
      </div>

      <h2>Typography</h2>
      <div class="card">
        <h1>Heading 1 · Fredoka 32px</h1>
        <h2>Heading 2 · Fredoka 24px</h2>
        <h3>Heading 3 · Fredoka 20px</h3>
        <p>Paragraph · Nunito, 17px, line height 1.6.</p>
        <p class="small muted">Small text · 14px</p>
        <p class="fr">Bonjour, je m'appelle Sari. (French text uses Fredoka)</p>
      </div>

      <h2>Components</h2>
      <div class="row">
        <button type="button" class="btn btn--primary">Primary</button>
        <button type="button" class="btn btn--ghost">Secondary</button>
        <button type="button" class="btn btn--primary" disabled>Disabled</button>
        <SpeakButton text="Bonjour" />
        <span class="tag tag--m">masculine</span>
        <span class="tag tag--f">feminine</span>
      </div>
      <div class="choices">
        <button type="button" class="choice">Answer option</button>
        <button type="button" class="choice is-right">Right answer</button>
        <button type="button" class="choice is-wrong">Wrong answer</button>
      </div>
      <div class="feedback feedback--right"><strong>Correct!</strong></div>
      <div class="feedback feedback--wrong"><strong>Not quite.</strong><p>Answer: suis</p></div>
      <input class="input" placeholder="Text input">
    </div>
  </div>
</template>

<style scoped>
.swatch { display: flex; gap: var(--s2); align-items: center; }
.swatch > span { width: 48px; height: 48px; border-radius: 12px; border: 1px solid var(--c-line); flex: none; }
</style>
