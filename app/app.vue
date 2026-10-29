<script setup lang="ts">
const { dueIds } = useProgress()
</script>

<template>
  <div class="app">
    <header class="topbar">
      <div class="container topbar__inner">
        <NuxtLink to="/" class="brand">Petit Carnet</NuxtLink>
        <nav class="nav" aria-label="Main">
          <NuxtLink to="/" class="nav__link">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5V5a2 2 0 0 1 2-2h14v16H6.5A2.5 2.5 0 0 0 4 21.5z" /></svg>
            <span>Lessons</span>
          </NuxtLink>
          <NuxtLink to="/review" class="nav__link">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="6" width="14" height="14" rx="2" /><path d="M7 3h12a2 2 0 0 1 2 2v12" /></svg>
            <span>Review</span>
            <b v-if="dueIds.length" class="badge">{{ dueIds.length }}</b>
          </NuxtLink>
          <NuxtLink to="/grammar" class="nav__link">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 19 8 5l5 14M4.8 14h6.4" /><path d="M14 19v-6.5a2.5 2.5 0 0 1 5 0V19M14 15.5h5" /></svg>
            <span>Grammar</span>
          </NuxtLink>
          <NuxtLink to="/challenge" class="nav__link">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2 2M9 2h6" /></svg>
            <span>Challenge</span>
          </NuxtLink>
        </nav>
      </div>
    </header>

    <main>
      <NuxtPage :page-key="route => route.fullPath" />
    </main>
  </div>
</template>

<style scoped>
.topbar { position: sticky; top: 0; z-index: 10; background: rgb(255 248 239 / 0.92); backdrop-filter: blur(8px); border-bottom: 2px solid var(--c-ink); }
.topbar__inner { display: flex; align-items: center; justify-content: space-between; min-height: 64px; }
.brand { font: 600 var(--fs-h3) / 1 var(--font-head); color: var(--c-ink); text-decoration: none; }
.brand::before { content: ''; display: inline-block; width: 22px; height: 14px; margin-right: 10px; border-radius: 4px; border: 2px solid var(--c-ink); background: linear-gradient(90deg, #3d5af1 33%, #fff 33% 66%, #ef4c4c 66%); vertical-align: middle; }
.nav { display: flex; gap: var(--s1); }
.nav__link {
  position: relative; display: flex; align-items: center; gap: 6px;
  min-height: 44px; padding: 0 var(--s2); border-radius: 999px;
  color: var(--c-muted); font-weight: 600; text-decoration: none;
}
.nav__link.router-link-exact-active, .nav__link:hover { color: var(--c-primary); background: var(--c-primary-soft); }
.badge { min-width: 20px; height: 20px; padding: 0 6px; border-radius: 999px; background: var(--c-accent); color: #fff; font-size: 12px; line-height: 20px; text-align: center; }

/* Mobile: navigation moves to the bottom, inside the easy thumb zone. */
@media (max-width: 736px) {
  .app { padding-bottom: 80px; }
  .topbar__inner { justify-content: center; min-height: 56px; }
  .nav {
    position: fixed; left: 0; right: 0; bottom: 0;
    justify-content: space-around; padding: 6px var(--s1) calc(6px + env(safe-area-inset-bottom));
    background: var(--c-surface); border-top: 2px solid var(--c-ink);
  }
  .nav__link { flex-direction: column; gap: 2px; padding: 6px var(--s2); font-size: 12px; }
  .nav__link.router-link-exact-active, .nav__link:hover { background: none; }
  .badge { position: absolute; top: 0; right: 8px; }
}
</style>