<template>
  <div class="hof-page" v-if="edition">

    <!-- HERO -->
    <section class="hof-hero">
      <div class="hero-bg-year" aria-hidden="true">{{ edition.year }}</div>
      <NuxtLink to="/designathon" class="back-btn">← BACK</NuxtLink>
      <div class="hero-center">
        <span class="hero-tag">HALL OF FAME</span>
        <h1 class="hero-title">DESIGNATHON<br /><span class="hero-year">{{ edition.year }}</span></h1>
        <p class="hero-sub">{{ edition.date }} · {{ edition.participants }} participants · Top 10 finalists</p>
      </div>
      <div class="hero-marquee" aria-hidden="true">
        <div class="marquee-track">
          <span v-for="n in 8" :key="n" class="marquee-item">
            TOP 10 ✦ HALL OF FAME ✦ {{ edition.date.toUpperCase() }} ✦ BEST OF THE BEST ✦&nbsp;
          </span>
        </div>
      </div>
    </section>

    <!-- PODIUM — #1 gets full width -->
    <section class="podium-section">
      <div class="section-header">
        <span class="section-label">THE PODIUM</span>
        <h2 class="section-title">TOP <span class="gradient-text">THREE</span></h2>
      </div>

      <!-- Gold -->
      <div class="gold-card">
        <div class="gold-rank">#1</div>
        <a :href="edition.podium[0].link" target="_blank" class="gold-preview">
          <img :src="edition.podium[0].image" :alt="edition.podium[0].name" loading="lazy" />
          <div class="preview-overlay">VISIT SITE →</div>
        </a>
        <div class="gold-info">
          <h3>{{ edition.podium[0].name }}</h3>
          <a :href="edition.podium[0].link" target="_blank" class="visit-btn gold-btn">Visit Website →</a>
        </div>
      </div>

      <!-- Silver & Bronze -->
      <div class="runners">
        <div v-for="(w, i) in [edition.podium[1], edition.podium[2]]" :key="i" class="runner-card" :class="i === 0 ? 'silver-card' : 'bronze-card'">
          <div class="runner-rank">#{{ i + 2 }}</div>
          <a :href="w.link" target="_blank" class="runner-preview">
            <img :src="w.image" :alt="w.name" loading="lazy" />
            <div class="preview-overlay">VISIT SITE →</div>
          </a>
          <div class="runner-info">
            <h3>{{ w.name }}</h3>
            <a :href="w.link" target="_blank" class="visit-btn">Visit Website →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- FINALISTS -->
    <section class="finalists-section">
      <div class="section-header">
        <span class="section-label">RANKS 4-10</span>
        <h2 class="section-title">THE <span class="gradient-text-blue">FINALISTS</span></h2>
      </div>

      <div class="finalists-grid">
        <div v-for="(f, index) in edition.finalists" :key="index" class="finalist-card">
          <div class="finalist-rank">#{{ index + 4 }}</div>
          <a :href="f.link" target="_blank" class="finalist-preview">
            <img :src="f.image" :alt="f.name" loading="lazy" />
            <div class="preview-overlay">VISIT SITE →</div>
          </a>
          <h4>{{ f.name }}</h4>
          <a :href="f.link" target="_blank" class="visit-btn-sm">Visit Website →</a>
        </div>
      </div>
    </section>

    <!-- Credits -->
    <section class="credits">
      <p>
        Originally curated by
        <a href="https://linkedin.com/in/khaledmiari" target="_blank">Khaled Miari</a>
        — 2025-2026 President of the Graphic Design Club
      </p>
    </section>
  </div>

  <!-- 404 -->
  <div v-else class="hof-page hof-404">
    <h1>EDITION NOT FOUND</h1>
    <NuxtLink to="/designathon" class="visit-btn">← RETURN TO DESIGNATHON</NuxtLink>
  </div>
</template>

<script setup>
const route = useRoute();
const year = route.params.year;

const archiveData = {
  "2025": {
    year: "2025",
    date: "Fall 2025",
    participants: "45+",
    podium: [
      {
        name: "Mira Mohd. Ismail",
        link: "https://mira-m-ismail.github.io/SpaceLullaby/space-lullaby.html",
        image: "https://image.thum.io/get/width/600/crop/800/https://mira-m-ismail.github.io/SpaceLullaby/space-lullaby.html",
      },
      {
        name: "Muhammad Arsalan Habib",
        link: "https://me.arhb.net/GroupBTribute/index.html",
        image: "https://image.thum.io/get/width/600/crop/800/https://me.arhb.net/GroupBTribute/index.html",
      },
      {
        name: "Fazilah Syed",
        link: "https://fazsyed.github.io/DesignAthon/",
        image: "https://image.thum.io/get/width/600/crop/800/https://fazsyed.github.io/DesignAthon/",
      },
    ],
    finalists: [
      {
        name: "Heer Ravi Kewlani",
        link: "https://show-cell-65331087.figma.site/",
        image: "/heer.png",
      },
      {
        name: "Gautam Binu",
        link: "https://astraestudios.gautambinu.me/",
        image: "https://image.thum.io/get/width/600/crop/800/https://astraestudios.gautambinu.me/",
      },
      {
        name: "Rashed Saeed Almansoori",
        link: "https://rsmsixpoint1.wixstudio.com/vibe67",
        image: "https://image.thum.io/get/width/600/crop/800/https://rsmsixpoint1.wixstudio.com/vibe67",
      },
      {
        name: "Asim Mairaj",
        link: "https://projectworldcrisis-s71u.vercel.app/",
        image: "https://image.thum.io/get/width/600/crop/800/https://projectworldcrisis-s71u.vercel.app/",
      },
      {
        name: "Srivignan Saravanan",
        link: "https://srivignan123.github.io/DesignathonSubmission/",
        image: "https://image.thum.io/get/width/600/crop/800/https://srivignan123.github.io/DesignathonSubmission/",
      },
      {
        name: "Mohamad Moukayed",
        link: "https://hypercreeper.github.io/Chefly/",
        image: "https://image.thum.io/get/width/600/crop/800/https://hypercreeper.github.io/Chefly/",
      },
      {
        name: "Yazan Kastali",
        link: "https://yazan-kastali.github.io/EcoHero-Tracker/",
        image: "https://image.thum.io/get/width/600/crop/800/https://yazan-kastali.github.io/EcoHero-Tracker/",
      },
    ],
  },
};

const edition = archiveData[year] || null;

if (edition) {
  useHead({
    title: `DesignAthon ${edition.year} · Hall of Fame`,
    meta: [
      {
        name: "description",
        content: `Top 10 web design submissions from DesignAthon ${edition.date}.`,
      },
    ],
  });
}
</script>

<style scoped>
.hof-page {
  --hot-orange: #F76902;
  --electric-yellow: #f6be00;
  --punk-pink: #7D55C7;
  --acid-green: #C4D600;
  --sky-blue: #009CBD;
  --gold-color: #f6be00;
  --silver-color: #94a3b8;
  --bronze-color: #CD7F32;
  overflow-x: hidden;
}

/* ── HERO ──────────────────────────── */
.hof-hero {
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 6rem 2rem 0;
  overflow: hidden;
}

.hero-bg-year {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: "PP Editorial", serif;
  font-weight: 800;
  font-size: clamp(20rem, 50vw, 45rem);
  color: rgba(255, 255, 255, 0.015);
  line-height: 1;
  pointer-events: none;
  user-select: none;
}

.back-btn {
  position: absolute;
  top: 7rem;
  left: 2rem;
  font-family: "Geist", sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color 0.2s;
  z-index: 10;
}
.back-btn:hover { color: white; }

.hero-center {
  text-align: center;
  z-index: 2;
}

.hero-tag {
  display: inline-block;
  font-family: "Geist", sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  padding: 0.5rem 1.5rem;
  border: 2px solid var(--gold-color);
  color: var(--gold-color);
  border-radius: 100px;
  margin-bottom: 2rem;
}

.hero-title {
  font-family: "PP Editorial", serif;
  font-size: clamp(3rem, 10vw, 7rem);
  font-weight: 800;
  color: white;
  line-height: 0.95;
  margin-bottom: 1.5rem;
}

.hero-year {
  background: linear-gradient(90deg, var(--hot-orange), var(--electric-yellow));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-sub {
  font-family: "Geist", sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
}

/* Marquee */
.hero-marquee {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--gold-color);
  overflow: hidden;
  white-space: nowrap;
  padding: 0.5rem 0;
  z-index: 3;
}

.marquee-track {
  display: inline-flex;
  animation: marquee 25s linear infinite;
}

.marquee-item {
  font-family: "Geist", sans-serif;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: #030304;
  text-transform: uppercase;
  white-space: nowrap;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* ── SECTIONS ──────────────────────── */
.section-header {
  margin-bottom: 3rem;
}

.section-label {
  font-family: "Geist", sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  color: rgba(255, 255, 255, 0.6);
  display: block;
  margin-bottom: 0.75rem;
}

.section-title {
  font-family: "PP Editorial", serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  color: white;
  font-weight: 800;
}

.gradient-text {
  background: linear-gradient(90deg, var(--electric-yellow), var(--hot-orange));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-text-blue {
  background: linear-gradient(90deg, var(--sky-blue), var(--acid-green));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── PODIUM ────────────────────────── */
.podium-section {
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.gold-card {
  margin-bottom: 3rem;
  position: relative;
}

.gold-rank {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 5;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: var(--gold-color);
  color: #030304;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Geist", sans-serif;
  font-weight: 900;
  font-size: 1.1rem;
}

.gold-preview {
  display: block;
  border-radius: 16px;
  overflow: hidden;
  border: 3px solid var(--gold-color);
  box-shadow: 0 0 60px rgba(255, 225, 86, 0.1);
  aspect-ratio: 16 / 8;
  margin-bottom: 1.5rem;
  position: relative;
}

.gold-preview img,
.runner-preview img,
.finalist-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  transition: transform 0.6s ease;
}

.gold-preview:hover img,
.runner-preview:hover img,
.finalist-preview:hover img {
  transform: scale(1.05);
}

.preview-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Geist", sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: white;
  opacity: 0;
  transition: opacity 0.3s;
}

.gold-preview:hover .preview-overlay,
.runner-preview:hover .preview-overlay,
.finalist-preview:hover .preview-overlay {
  opacity: 1;
}

.gold-info h3,
.runner-info h3 {
  font-family: "PP Editorial", serif;
  font-size: 1.5rem;
  color: white;
  font-weight: 400;
  margin-bottom: 0.5rem;
}

.visit-btn {
  font-family: "Geist", sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.2s;
}
.visit-btn:hover { color: white; }

.gold-btn { color: var(--gold-color); }
.gold-btn:hover { color: white; }

/* Runners */
.runners {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .runners {
    grid-template-columns: 1fr 1fr;
  }
}

.runner-card {
  position: relative;
}

.runner-rank {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 5;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Geist", sans-serif;
  font-weight: 900;
  font-size: 0.85rem;
}

.silver-card .runner-rank { background: var(--silver-color); color: #030304; }
.bronze-card .runner-rank { background: var(--bronze-color); color: #030304; }

.runner-preview {
  display: block;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  margin-bottom: 1rem;
  position: relative;
}

.silver-card .runner-preview { border: 2px solid var(--silver-color); }
.bronze-card .runner-preview { border: 2px solid var(--bronze-color); }

/* ── FINALISTS ─────────────────────── */
.finalists-section {
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.finalists-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 640px) {
  .finalists-grid { grid-template-columns: 1fr 1fr; }
}

@media (min-width: 1024px) {
  .finalists-grid { grid-template-columns: 1fr 1fr 1fr; }
  .finalist-card:nth-child(7) {
    grid-column: 2;
  }
}

.finalist-card {
  position: relative;
}

.finalist-rank {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 5;
  font-family: "Geist", sans-serif;
  font-weight: 800;
  font-size: 0.7rem;
  background: rgba(0, 0, 0, 0.7);
  color: rgba(255, 255, 255, 0.8);
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
}

.finalist-preview {
  display: block;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  aspect-ratio: 16 / 10;
  margin-bottom: 0.75rem;
  position: relative;
  transition: border-color 0.3s;
}

.finalist-card:hover .finalist-preview {
  border-color: rgba(255, 255, 255, 0.2);
}

.finalist-card h4 {
  font-family: "Geist", sans-serif;
  font-size: 1rem;
  color: white;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.visit-btn-sm {
  font-family: "Geist", sans-serif;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color 0.2s;
}
.visit-btn-sm:hover { color: white; }

/* ── CREDITS ───────────────────────── */
.credits {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.credits p {
  font-family: "Geist", sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

.credits a {
  color: var(--electric-yellow);
  text-decoration: none;
}
.credits a:hover { color: white; }

/* ── 404 ───────────────────────────── */
.hof-404 {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem;
}

.hof-404 h1 {
  font-family: "PP Editorial", serif;
  font-size: 3rem;
  color: white;
}
</style>
