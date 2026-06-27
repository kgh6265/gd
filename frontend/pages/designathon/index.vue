<template>
  <div class="da-page" @mousemove="onMouseMove">

    <!-- ████████████████████████████████████████ -->
    <!--  HERO — BIG, LOUD, IN YOUR FACE          -->
    <!-- ████████████████████████████████████████ -->
    <section class="hero">
      <div class="hero-bg-text" aria-hidden="true">
        <span class="bg-word bg-1">CREATE</span>
        <span class="bg-word bg-2">BUILD</span>
        <span class="bg-word bg-3">DESIGN</span>
        <span class="bg-word bg-4">COMPETE</span>
        <span class="bg-word bg-5">SHIP</span>
      </div>

      <div class="hero-center">
        <div class="hero-badge">INTRODUCING</div>
        <h1 class="hero-title">
          <span class="title-line title-the" :style="{ transform: `translateX(${mouseX * 0.02}px)` }">THE</span>
          <span class="title-line title-design" :style="{ transform: `translateX(${mouseX * -0.015}px)` }">DESIGN</span>
          <span class="title-line title-athon" :style="{ transform: `translateX(${mouseX * 0.025}px)` }">ATHON</span>
        </h1>
        <p class="hero-sub">
          Build the wildest website you can.<br />
          Solo. From scratch. Under pressure.<br />
          <span class="hero-clarification">✦ 100% Digital Event • Open to all UAE University Students ✦</span>
        </p>
        <div class="hero-actions">
          <div class="hero-date">
            SEPT 2026
          </div>
          <a href="#hall-of-fame" class="hero-cta">
            PAST WINNERS ↓
          </a>
        </div>
      </div>

      <div class="hero-marquee" aria-hidden="true">
        <div class="marquee-track">
          <span v-for="n in 8" :key="n" class="marquee-item">
            WEB DESIGN COMPETITION ✦ ANNUAL EVENT ✦ CREATIVITY ✦ INNOVATION ✦&nbsp;
          </span>
        </div>
      </div>
    </section>

    <!-- ████████████████████████████████████████ -->
    <!--  WHAT IS IT — Bold statement cards        -->
    <!-- ████████████████████████████████████████ -->
    <section class="what-section">
      <div class="what-header">
        <span class="what-label">WHAT IS IT?</span>
        <h2 class="what-title">
          Not a hackathon.<br />
          A <span class="highlight-yellow">Design</span>Athon.
        </h2>
        <p class="what-desc">
          The DesignAthon is the Graphic Design Club's MAGNUM OPUS; a competition where students compete individually to design and build the most creative frontend web experience BUT WITH A HIDDEN TWIST.
        </p>
      </div>

      <div class="what-cards">
        <div class="what-card card-1">
          <span class="card-num">01</span>
          <h3>SOLO</h3>
          <p>No teams. No partners. Just you and your creativity against the clock.</p>
        </div>
        <div class="what-card card-2">
          <span class="card-num">02</span>
          <h3>TIMED</h3>
          <p>Two to three weeks to design and code a stunning frontend experience.</p>
        </div>
        <div class="what-card card-3">
          <span class="card-num">03</span>
          <h3>JUDGED</h3>
          <p>Creativity. Execution. Design quality. No participation trophies.</p>
        </div>
        <div class="what-card card-4">
          <span class="card-num">04</span>
          <h3>TWISTED</h3>
          <p>Every year brings a new surprise. We never do the same thing twice.</p>
        </div>
      </div>
    </section>

    <!-- ████████████████████████████████████████ -->
    <!--  UPCOMING — Loud announcement             -->
    <!-- ████████████████████████████████████████ -->
    <section class="upcoming-section">
      <div class="upcoming-bg-year" aria-hidden="true">2026</div>
      <div class="upcoming-content">
        <div class="upcoming-tag">NEXT EDITION</div>
        <h2 class="upcoming-title">COMING<br />SEPTEMBER<br /><span class="upcoming-year-text">2026</span></h2>
        <div class="upcoming-details">
          <div class="upcoming-row">
            <span class="row-key">REGISTRATION</span>
            <span class="row-val row-dim">NOT YET OPEN</span>
          </div>
          <div class="upcoming-row">
            <span class="row-key">PRIZE POOL</span>
            <span class="row-val row-hot">TBA 🔥</span>
          </div>
          <div class="upcoming-row">
            <span class="row-key">THEME</span>
            <span class="row-val row-glitch">CLASSIFIED</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ████████████████████████████████████████ -->
    <!--  HALL OF FAME                             -->
    <!-- ████████████████████████████████████████ -->
    <section id="hall-of-fame" class="hof-section">
      <div class="hof-header">
        <span class="hof-label">ARCHIVE</span>
        <h2 class="hof-title">HALL OF FAME</h2>
        <p class="hof-desc">Every edition leaves a mark. This is the record.</p>
      </div>

      <div v-for="edition in pastEditions" :key="edition.year" class="hof-edition">
        <div class="hof-edition-header">
          <span class="hof-edition-year">{{ edition.year }}</span>
          <span class="hof-edition-sem">{{ edition.semester }}</span>
        </div>
        <div class="hof-podium">
          <div v-for="w in edition.topThree" :key="w.rank" class="hof-winner" :class="`rank-${w.rank}`">
            <span class="winner-rank">#{{ w.rank }}</span>
            <span class="winner-name">{{ w.name }}</span>
          </div>
        </div>
        <div class="hof-stats">
          {{ edition.stats.participants }} participants · {{ edition.stats.finalists }} finalists
        </div>
        <NuxtLink :to="edition.link" class="hof-link">
          VIEW FULL RESULTS →
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: "DesignAthon · RIT Dubai Graphic Design Club",
  meta: [
    {
      name: "description",
      content: "DesignAthon — an annual web design competition by the Graphic Design Club at RIT Dubai.",
    },
  ],
});

const mouseX = ref(0);

const onMouseMove = (e) => {
  mouseX.value = e.clientX - window.innerWidth / 2;
};

const pastEditions = [
  {
    year: "2025",
    semester: "FALL 2025",
    topThree: [
      { name: "Mira Mohd. Ismail", rank: 1 },
      { name: "Muhammad Arsalan Habib", rank: 2 },
      { name: "Fazilah Syed", rank: 3 },
    ],
    stats: { participants: "45+", finalists: "Top 10" },
    link: "/designathon/2025",
  },
];
</script>

<style scoped>
/* ═══════════════════════════════════════ */
/*  BASE                                   */
/* ═══════════════════════════════════════ */
.da-page {
  --hot-orange: #F76902;
  --electric-yellow: #f6be00;
  --punk-pink: #7D55C7;
  --acid-green: #C4D600;
  --sky-blue: #009CBD;
  overflow-x: hidden;
}

/* ═══════════════════════════════════════ */
/*  HERO                                   */
/* ═══════════════════════════════════════ */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 6rem 2rem 5rem;
  overflow: hidden;
}

/* Floating background words */
.hero-bg-text {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.bg-word {
  position: absolute;
  font-family: "PP Editorial", serif;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.025);
  white-space: nowrap;
  user-select: none;
}

@media (max-width: 768px) {
  .hero-bg-text {
    display: none;
  }
}

.bg-1 { font-size: 12vw; top: 5%; left: -3%; transform: rotate(-8deg); }
.bg-2 { font-size: 9vw; top: 25%; right: -5%; transform: rotate(4deg); }
.bg-3 { font-size: 15vw; bottom: 30%; left: 10%; transform: rotate(-3deg); }
.bg-4 { font-size: 8vw; bottom: 15%; right: 8%; transform: rotate(7deg); }
.bg-5 { font-size: 11vw; top: 60%; left: -8%; transform: rotate(-12deg); }

.hero-center {
  position: relative;
  z-index: 2;
  text-align: center;
}

.hero-badge {
  display: inline-block;
  font-family: "Geist", sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  padding: 0.6rem 1.5rem;
  border: 2px solid var(--electric-yellow);
  color: var(--electric-yellow);
  border-radius: 100px;
  margin-bottom: 2.5rem;
  animation: badge-pulse 3s ease-in-out infinite;
}

@keyframes badge-pulse {
  0%, 100% { box-shadow: 0 0 0px var(--electric-yellow); }
  50% { box-shadow: 0 0 20px rgba(255, 225, 86, 0.3); }
}

.hero-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.title-line {
  display: block;
  font-family: "PP Editorial", serif;
  line-height: 0.9;
  transition: transform 0.1s ease-out;
}

.title-the {
  font-weight: 100;
  font-style: italic;
  font-size: clamp(2.5rem, 7vw, 6rem);
  color: rgba(255, 255, 255, 0.4);
  align-self: flex-start;
  margin-left: 15%;
}

.title-design {
  font-weight: 800;
  font-size: clamp(5rem, 16vw, 15rem);
  background: linear-gradient(135deg, var(--hot-orange), var(--punk-pink), var(--electric-yellow));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: saturate(1.3);
}

.title-athon {
  font-weight: 800;
  font-size: clamp(4rem, 13vw, 12rem);
  color: white;
  align-self: flex-end;
  margin-right: 10%;
  letter-spacing: -0.03em;
}

.hero-sub {
  font-family: "Geist", sans-serif;
  font-size: clamp(1rem, 2.2vw, 1.35rem);
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.8;
  margin-bottom: 3rem;
}

.hero-clarification {
  display: inline-block;
  margin-top: 1.5rem;
  font-size: 0.95rem;
  color: var(--electric-yellow);
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.hero-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.hero-date {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: "Geist", sans-serif;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.5);
}

.date-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--acid-green);
  animation: dot-blink 2s ease-in-out infinite;
}

@keyframes dot-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.hero-cta {
  font-family: "Geist", sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-decoration: none;
  color: var(--sky-blue);
  padding: 0.8rem 2rem;
  border: 2px solid var(--sky-blue);
  border-radius: 4px;
  transition: all 0.2s;
}

.hero-cta:hover {
  background: var(--sky-blue);
  color: #030304;
}

/* Marquee */
.hero-marquee {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--hot-orange);
  overflow: hidden;
  white-space: nowrap;
  padding: 0.6rem 0;
  z-index: 3;
}

.marquee-track {
  display: inline-flex;
  animation: marquee 30s linear infinite;
}

.marquee-item {
  font-family: "Geist", sans-serif;
  font-size: 0.75rem;
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

/* ═══════════════════════════════════════ */
/*  WHAT IS IT                             */
/* ═══════════════════════════════════════ */
.what-section {
  padding: 8rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.what-header {
  margin-bottom: 4rem;
}

.what-label {
  font-family: "Geist", sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  color: var(--acid-green);
  display: block;
  margin-bottom: 1rem;
}

.what-title {
  font-family: "PP Editorial", serif;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  color: white;
  font-weight: 400;
  line-height: 1.15;
  margin-bottom: 1.5rem;
}

.what-desc {
  font-family: "Geist", sans-serif;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  max-width: 600px;
}

.highlight-yellow {
  color: var(--electric-yellow);
  font-style: italic;
}

.what-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .what-cards {
    grid-template-columns: 1fr 1fr;
  }
}

.what-card {
  padding: 2.5rem;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s;
}

.what-card:hover {
  transform: scale(1.03);
}

.card-1 {
  background: linear-gradient(135deg, rgba(247, 105, 2, 0.15), rgba(247, 105, 2, 0.05));
  border: 1px solid rgba(247, 105, 2, 0.25);
}

.card-2 {
  background: linear-gradient(135deg, rgba(196, 214, 0, 0.15), rgba(196, 214, 0, 0.05));
  border: 1px solid rgba(196, 214, 0, 0.25);
}

.card-3 {
  background: linear-gradient(135deg, rgba(0, 156, 189, 0.15), rgba(0, 156, 189, 0.05));
  border: 1px solid rgba(0, 156, 189, 0.25);
}

.card-4 {
  background: linear-gradient(135deg, rgba(125, 85, 199, 0.15), rgba(125, 85, 199, 0.05));
  border: 1px solid rgba(125, 85, 199, 0.25);
}

.card-num {
  font-family: "PP Editorial", serif;
  font-size: 4rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.05);
  position: absolute;
  top: -0.5rem;
  right: 1rem;
  line-height: 1;
}

.what-card h3 {
  font-family: "Geist", sans-serif;
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: white;
  margin-bottom: 0.75rem;
}

.card-1 h3 { color: var(--hot-orange); }
.card-2 h3 { color: var(--acid-green); }
.card-3 h3 { color: var(--sky-blue); }
.card-4 h3 { color: var(--punk-pink); }

.what-card p {
  font-family: "Geist", sans-serif;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.55);
  line-height: 1.7;
}

/* ═══════════════════════════════════════ */
/*  UPCOMING                               */
/* ═══════════════════════════════════════ */
.upcoming-section {
  padding: 8rem 2rem;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.upcoming-bg-year {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: "PP Editorial", serif;
  font-weight: 800;
  font-size: clamp(15rem, 40vw, 35rem);
  color: rgba(255, 255, 255, 0.02);
  line-height: 1;
  pointer-events: none;
  user-select: none;
}

.upcoming-content {
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 0 auto;
}

.upcoming-tag {
  font-family: "Geist", sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  color: var(--punk-pink);
  margin-bottom: 2rem;
}

.upcoming-title {
  font-family: "PP Editorial", serif;
  font-size: clamp(3rem, 10vw, 5rem);
  font-weight: 800;
  color: white;
  line-height: 1.1;
  margin-bottom: 3rem;
}

.upcoming-year-text {
  background: linear-gradient(90deg, var(--hot-orange), var(--electric-yellow));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.upcoming-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: left;
  max-width: 400px;
  margin: 0 auto;
}

.upcoming-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.row-key {
  font-family: "Geist", sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.4);
}

.row-val {
  font-family: "Geist", sans-serif;
  font-size: 1rem;
  color: white;
}

.row-dim { color: rgba(255, 255, 255, 0.5); }
.row-hot { color: var(--hot-orange); font-weight: 700; }
.row-glitch {
  font-weight: 700;
  color: var(--punk-pink);
  animation: glitch-flicker 4s ease-in-out infinite;
}

@keyframes glitch-flicker {
  0%, 90%, 100% { opacity: 1; }
  92% { opacity: 0.3; transform: translateX(2px); }
  94% { opacity: 1; transform: translateX(-1px); }
  96% { opacity: 0.5; transform: translateX(1px); }
}

/* ═══════════════════════════════════════ */
/*  HALL OF FAME                           */
/* ═══════════════════════════════════════ */
.hof-section {
  padding: 8rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.hof-header {
  margin-bottom: 4rem;
}

.hof-label {
  font-family: "Geist", sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  color: var(--electric-yellow);
  display: block;
  margin-bottom: 1rem;
}

.hof-title {
  font-family: "PP Editorial", serif;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  color: white;
  font-weight: 800;
  margin-bottom: 1rem;
}

.hof-desc {
  font-family: "Geist", sans-serif;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
}

.hof-edition {
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 3rem;
  margin-bottom: 2rem;
  transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
}

.hof-edition:hover {
  border-color: var(--electric-yellow);
  box-shadow: 0 4px 30px rgba(246, 190, 0, 0.15);
  transform: translateY(-4px);
}

.hof-edition-header {
  display: flex;
  align-items: baseline;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.hof-edition-year {
  font-family: "PP Editorial", serif;
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(90deg, var(--electric-yellow), var(--hot-orange));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hof-edition-sem {
  font-family: "Geist", sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.6);
}

.hof-podium {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
}

.hof-winner {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.winner-rank {
  font-family: "Geist", sans-serif;
  font-weight: 800;
  font-size: 0.85rem;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.rank-1 .winner-rank { background: var(--electric-yellow); color: #030304; }
.rank-2 .winner-rank { background: #94a3b8; color: #030304; }
.rank-3 .winner-rank { background: #b45309; color: white; }

.winner-name {
  font-family: "Geist", sans-serif;
  font-size: 1.1rem;
  color: white;
}

.hof-stats {
  font-family: "Geist", sans-serif;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1.5rem;
}

.hof-link {
  font-family: "Geist", sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-decoration: none;
  color: #030304;
  background: var(--electric-yellow);
  padding: 0.75rem 2rem;
  border-radius: 4px;
  display: inline-block;
  white-space: nowrap;
  transition: all 0.2s;
}

.hof-link:hover {
  background: white;
  transform: scale(1.05);
}
</style>
