/* ===================================================
   ÉDUCATIFS ÉPS — Zone Total Sport
   Application principale (v2 — données JSON externes)
   =================================================== */

'use strict';

// ─────────────────────────────────────────────────────
// TAXONOMIE — structure sans données
// ─────────────────────────────────────────────────────
const TAXONOMY = [
  {
    section: '🎯 Manipulation d\'objets',
    categories: [
      { key: 'balles_ballons', emoji: '🎾', name: 'Balles et ballons', desc: 'Jonglerie, lancer, attraper, frapper' },
      { key: 'batons_raquettes', emoji: '🏒', name: 'Bâtons et raquettes', desc: 'Hockey, badminton, tennis, ringuette' },
      { key: 'cordes_cerceaux', emoji: '🪢', name: 'Cordes et cerceaux', desc: 'Sauter, tourner, tisser' },
      { key: 'frisbee_disques', emoji: '🥏', name: 'Frisbee et disques', desc: 'Lancer, attraper, Ultimate' },
      { key: 'cirque', emoji: '🎪', name: 'Articles de cirque', desc: 'Jonglerie, équilibre, foulards' }
    ]
  },
  {
    section: '🏃 Locomotion',
    categories: [
      { key: 'courir', emoji: '🏃', name: 'Courir', desc: 'Sprint, endurance, relais' },
      { key: 'sauter', emoji: '🦘', name: 'Sauter', desc: 'Hauteur, longueur, corde' },
      { key: 'ramper_rouler', emoji: '🐍', name: 'Ramper et rouler', desc: 'Sol, parcours, roulades' },
      { key: 'grimper', emoji: '🧗', name: 'Grimper', desc: 'Espalier, escalade, agrès' },
      { key: 'esquiver', emoji: '💨', name: 'Esquiver', desc: 'Réaction, feinte, agilité' }
    ]
  },
  {
    section: '⚖️ Stabilisation et mobilité',
    categories: [
      { key: 'equilibre', emoji: '⚖️', name: 'Équilibre', desc: 'Statique, dynamique, proprioception' },
      { key: 'souplesse', emoji: '🤸', name: 'Souplesse', desc: 'Étirements, yoga, stretch' },
      { key: 'gainage', emoji: '💪', name: 'Gainage et force', desc: 'Core, planche, pompes' },
      { key: 'coordination', emoji: '🎯', name: 'Coordination', desc: 'Yeux-mains, rythmique, bilatérale' }
    ]
  },
  {
    section: '⚽ Sports collectifs',
    categories: [
      { key: 'soccer', emoji: '⚽', name: 'Soccer', desc: 'Technique, tactique, mini-jeux' },
      { key: 'basketball', emoji: '🏀', name: 'Basketball', desc: 'Dribble, tir, défense' },
      { key: 'volleyball', emoji: '🏐', name: 'Volleyball', desc: 'Service, manchette, smash' },
      { key: 'handball', emoji: '🤾', name: 'Handball', desc: 'Technique, jeu réduit, tir' }
    ]
  },
  {
    section: '💃 Arts corporels',
    categories: [
      { key: 'danse', emoji: '💃', name: 'Danse et rythme', desc: 'Créative, folklorique, hip-hop' },
      { key: 'acrosport', emoji: '🤸', name: 'Acrosport', desc: 'Pyramides, portés, équilibre duo' },
      { key: 'expression', emoji: '🎭', name: 'Expression corporelle', desc: 'Mime, théâtre corporel' }
    ]
  }
];

// ─────────────────────────────────────────────────────
// ÉTAT DE L'APPLICATION
// ─────────────────────────────────────────────────────
let educatifsData = {};  // key -> array of educatifs
let currentCategory = null;
let currentEducatifs = [];
let filtered = [];
let totalCount = 0;

// ─────────────────────────────────────────────────────
// CHARGEMENT DES DONNÉES JSON
// ─────────────────────────────────────────────────────
async function loadAllData() {
  const allKeys = [];
  TAXONOMY.forEach(section => {
    section.categories.forEach(cat => allKeys.push(cat.key));
  });

  const results = await Promise.allSettled(
    allKeys.map(key =>
      fetch(`data/educatifs/${key}.json`)
        .then(r => {
          if (!r.ok) throw new Error(`404: ${key}`);
          return r.json();
        })
        .then(data => ({ key, data }))
        .catch(err => {
          console.warn(`Fichier manquant: ${key}.json`, err.message);
          throw err;
        })
    )
  );

  let loaded = 0;
  totalCount = 0;

  results.forEach(result => {
    if (result.status === 'fulfilled') {
      const { key, data } = result.value;
      educatifsData[key] = Array.isArray(data) ? data : [];
      totalCount += educatifsData[key].length;
      loaded++;
    }
  });

  // Injecter les compteurs dans la taxonomy
  TAXONOMY.forEach(section => {
    section.categories.forEach(cat => {
      cat.educatifs = educatifsData[cat.key] || [];
    });
  });

  console.log(`${loaded} fichiers chargés — ${totalCount} éducatifs au total`);
}

// ─────────────────────────────────────────────────────
// INITIALISATION
// ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  initCanvas();
  await loadAllData();
  renderTaxonomy();
  updateTotalCount();
  hideLoading();
});

function hideLoading() {
  const screen = document.getElementById('loading-screen');
  if (screen) screen.classList.add('hidden');
}

function updateTotalCount() {
  const el = document.getElementById('stat-total');
  if (el) el.textContent = totalCount + '+';
}

// ─────────────────────────────────────────────────────
// TAXONOMIE — RENDU
// ─────────────────────────────────────────────────────
function renderTaxonomy() {
  const container = document.getElementById('taxonomy-container');
  if (!container) return;

  container.innerHTML = '';

  TAXONOMY.forEach(section => {
    const sectionTitle = document.createElement('div');
    sectionTitle.className = 'taxonomy-section-title';
    sectionTitle.textContent = section.section;
    container.appendChild(sectionTitle);

    const grid = document.createElement('div');
    grid.className = 'taxonomy-grid';

    section.categories.forEach(cat => {
      const tile = createTaxonomyTile(cat);
      grid.appendChild(tile);
    });

    container.appendChild(grid);
  });
}

function createTaxonomyTile(cat) {
  const tile = document.createElement('div');
  tile.className = 'taxonomy-tile';
  tile.setAttribute('data-key', cat.key);
  tile.innerHTML = `
    <div class="tile-emoji">${cat.emoji}</div>
    <div class="tile-name">${cat.name}</div>
    <div class="tile-desc">${cat.desc}</div>
    <div class="tile-count">${cat.educatifs.length} éducatifs</div>
  `;
  tile.addEventListener('click', () => selectCategory(cat.key));
  return tile;
}

// ─────────────────────────────────────────────────────
// SÉLECTION DE CATÉGORIE
// ─────────────────────────────────────────────────────
function selectCategory(key) {
  let foundCat = null;
  for (const section of TAXONOMY) {
    for (const cat of section.categories) {
      if (cat.key === key) {
        foundCat = cat;
        break;
      }
    }
    if (foundCat) break;
  }
  if (!foundCat) return;

  currentCategory = foundCat;
  currentEducatifs = foundCat.educatifs;
  filtered = [...currentEducatifs];

  document.getElementById('taxonomy-container').classList.add('hidden');
  document.getElementById('controls-bar').classList.remove('hidden');
  document.getElementById('edu-section').classList.remove('hidden');

  renderCategoryHeader(foundCat);

  document.getElementById('filter-niveau').value = '';
  document.getElementById('filter-diff').value = '';

  renderEducatifs(filtered);
  updateFilterCount();

  setTimeout(() => {
    document.getElementById('taxonomy-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 50);
}

function renderCategoryHeader(cat) {
  const header = document.getElementById('category-header');
  header.innerHTML = `
    <div class="cat-header-emoji">${cat.emoji}</div>
    <div class="cat-header-info">
      <h2>${cat.name}</h2>
      <p>${cat.desc} · ${cat.educatifs.length} éducatifs disponibles</p>
    </div>
  `;
}

// ─────────────────────────────────────────────────────
// RETOUR À LA TAXONOMIE
// ─────────────────────────────────────────────────────
function goBack() {
  currentCategory = null;
  currentEducatifs = [];
  filtered = [];

  document.getElementById('edu-section').classList.add('hidden');
  document.getElementById('controls-bar').classList.add('hidden');
  document.getElementById('taxonomy-container').classList.remove('hidden');
  document.getElementById('edu-grid').innerHTML = '';
  document.getElementById('category-header').innerHTML = '';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─────────────────────────────────────────────────────
// FILTRES
// ─────────────────────────────────────────────────────
function applyFilters() {
  const niveau = document.getElementById('filter-niveau').value.toLowerCase();
  const diff = document.getElementById('filter-diff').value.toLowerCase();

  filtered = currentEducatifs.filter(edu => {
    const matchNiveau = !niveau || edu.niveau.toLowerCase().includes(niveau);
    const matchDiff = !diff || edu.difficulte === diff;
    return matchNiveau && matchDiff;
  });

  renderEducatifs(filtered);
  updateFilterCount();
}

function updateFilterCount() {
  const el = document.getElementById('filter-count');
  if (el) {
    el.innerHTML = `<strong>${filtered.length}</strong> éducatif${filtered.length > 1 ? 's' : ''}`;
  }
}

// ─────────────────────────────────────────────────────
// RENDU DES ÉDUCATIFS
// ─────────────────────────────────────────────────────
function renderEducatifs(list) {
  const grid = document.getElementById('edu-grid');
  grid.innerHTML = '';

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <p>Aucun éducatif ne correspond aux filtres sélectionnés.</p>
      </div>
    `;
    return;
  }

  list.forEach((edu, index) => {
    const card = createEducatifCard(edu, index);
    grid.appendChild(card);
  });
}

function escapeHtml(str) {
  if (typeof str !== 'string') return String(str);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function createEducatifCard(edu, index) {
  const card = document.createElement('div');
  card.className = 'edu-card';
  card.style.animationDelay = `${index * 0.04}s`;

  const diffLabel = { debutant: 'Débutant', intermediaire: 'Intermédiaire', avance: 'Avancé' };
  const diffEmoji = { debutant: '🟢', intermediaire: '🟠', avance: '🔴' };

  card.innerHTML = `
    <div class="edu-card-header">
      <div class="edu-card-title">${escapeHtml(edu.titre)}</div>
    </div>
    <p class="edu-card-desc">${escapeHtml(edu.desc)}</p>
    <div class="edu-card-meta">
      <span class="badge badge-${edu.difficulte}">${diffEmoji[edu.difficulte]} ${diffLabel[edu.difficulte]}</span>
      <span class="badge badge-niveau">${escapeHtml(edu.niveau)}</span>
    </div>
    <div class="edu-card-footer">
      <span class="footer-duration">⏱ ${edu.duree} min</span>
      <span class="footer-competence">${escapeHtml(edu.competence)}</span>
      <span class="footer-arrow">→</span>
    </div>
  `;

  card.addEventListener('click', () => openModal(edu));
  return card;
}

// ─────────────────────────────────────────────────────
// MODAL
// ─────────────────────────────────────────────────────
function openModal(edu) {
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');

  const diffLabel = { debutant: 'Débutant', intermediaire: 'Intermédiaire', avance: 'Avancé' };
  const diffEmoji = { debutant: '🟢', intermediaire: '🟠', avance: '🔴' };

  const materielHtml = edu.materiel
    ? edu.materiel.map(m => `<span class="material-tag">${escapeHtml(m)}</span>`).join('')
    : '';

  const tagsHtml = edu.tags
    ? edu.tags.map(t => `<span class="tag">#${escapeHtml(t)}</span>`).join('')
    : '';

  content.innerHTML = `
    <div class="modal-header">
      <span class="modal-emoji">${currentCategory ? currentCategory.emoji : '🏋️'}</span>
      <h2 class="modal-title">${escapeHtml(edu.titre)}</h2>
      <div class="modal-badges">
        <span class="badge badge-${edu.difficulte}">${diffEmoji[edu.difficulte]} ${diffLabel[edu.difficulte]}</span>
        <span class="badge badge-niveau">${escapeHtml(edu.niveau)}</span>
      </div>
    </div>

    <div class="modal-meta-grid">
      <div class="meta-item">
        <div class="meta-item-label">Durée</div>
        <div class="meta-item-value">⏱ ${edu.duree} minutes</div>
      </div>
      <div class="meta-item">
        <div class="meta-item-label">Compétence</div>
        <div class="meta-item-value">${escapeHtml(edu.competence)}</div>
      </div>
    </div>

    <div class="modal-section">
      <div class="modal-section-label">Description pédagogique</div>
      <p class="modal-desc">${escapeHtml(edu.desc)}</p>
    </div>

    ${edu.materiel && edu.materiel.length > 0 ? `
    <div class="modal-section">
      <div class="modal-section-label">Matériel requis</div>
      <div class="modal-material">${materielHtml}</div>
    </div>
    ` : ''}

    ${edu.variantes ? `
    <div class="modal-section">
      <div class="modal-section-label">Variantes et progressions</div>
      <p class="modal-desc">${escapeHtml(edu.variantes)}</p>
    </div>
    ` : ''}

    ${edu.adaptation ? `
    <div class="modal-section">
      <div class="modal-section-label">Adaptations et différenciation</div>
      <p class="modal-desc">${escapeHtml(edu.adaptation)}</p>
    </div>
    ` : ''}

    ${tagsHtml ? `
    <div class="modal-divider"></div>
    <div class="modal-section">
      <div class="modal-tags">${tagsHtml}</div>
    </div>
    ` : ''}
  `;

  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal(event) {
  if (event && event.target !== document.getElementById('modal-overlay') && event.type === 'click') {
    if (event.target.closest('#modal-card')) return;
  }
  document.getElementById('modal-overlay').classList.add('hidden');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ─────────────────────────────────────────────────────
// CANVAS — PARTICULES DE FEU
// ─────────────────────────────────────────────────────
function initCanvas() {
  const canvas = document.getElementById('fire-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + Math.random() * 40;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedY = -(Math.random() * 0.6 + 0.2);
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.life = 0;
      this.maxLife = Math.random() * 200 + 100;
      this.hue = Math.random() * 30 + 10;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life++;
      if (this.life >= this.maxLife) this.reset();
    }

    draw() {
      const alpha = Math.sin((this.life / this.maxLife) * Math.PI) * 0.4;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 100%, 65%, ${alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 60; i++) {
    const p = new Particle();
    p.life = Math.random() * p.maxLife;
    particles.push(p);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}
