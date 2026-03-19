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

// Pagination
let currentPage = 0;
const ITEMS_PER_PAGE = 30;

// Recherche globale
let searchDebounceTimer = null;
let isSearchActive = false;

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
  initGlobalSearch();
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

  // Clear search state
  isSearchActive = false;
  const searchInput = document.getElementById('global-search-input');
  const clearBtn = document.getElementById('global-search-clear');
  if (searchInput) searchInput.value = '';
  if (clearBtn) clearBtn.classList.add('hidden');

  currentCategory = foundCat;
  currentEducatifs = foundCat.educatifs;
  filtered = [...currentEducatifs];
  currentPage = 0;

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
  isSearchActive = false;
  currentCategory = null;
  currentEducatifs = [];
  filtered = [];
  currentPage = 0;

  const searchInput = document.getElementById('global-search-input');
  const clearBtn = document.getElementById('global-search-clear');
  if (searchInput) searchInput.value = '';
  if (clearBtn) clearBtn.classList.add('hidden');

  document.getElementById('edu-section').classList.add('hidden');
  document.getElementById('controls-bar').classList.add('hidden');
  document.getElementById('taxonomy-container').classList.remove('hidden');
  document.getElementById('edu-grid').innerHTML = '';
  document.getElementById('category-header').innerHTML = '';
  renderPagination(0);

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

  currentPage = 0;
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
    renderPagination(0);
    return;
  }

  const totalPages = Math.ceil(list.length / ITEMS_PER_PAGE);
  if (currentPage >= totalPages) currentPage = totalPages - 1;
  if (currentPage < 0) currentPage = 0;

  const start = currentPage * ITEMS_PER_PAGE;
  const end = Math.min(start + ITEMS_PER_PAGE, list.length);
  const page = list.slice(start, end);

  page.forEach((edu, index) => {
    const card = createEducatifCard(edu, index);
    grid.appendChild(card);
  });

  renderPagination(totalPages);
}

// ─────────────────────────────────────────────────────
// PAGINATION
// ─────────────────────────────────────────────────────
function renderPagination(totalPages) {
  const pag = document.getElementById('pagination');
  if (!pag) return;

  if (totalPages <= 1) {
    pag.classList.add('hidden');
    pag.innerHTML = '';
    return;
  }

  pag.classList.remove('hidden');
  pag.innerHTML = '';

  // Prev button
  const prevBtn = document.createElement('button');
  prevBtn.className = 'pag-btn' + (currentPage === 0 ? ' disabled' : '');
  prevBtn.textContent = '←';
  prevBtn.disabled = currentPage === 0;
  prevBtn.addEventListener('click', () => { if (currentPage > 0) goToPage(currentPage - 1); });
  pag.appendChild(prevBtn);

  // Page buttons with ellipsis logic
  const maxVisible = 7;
  const pages = buildPageNumbers(currentPage, totalPages, maxVisible);

  pages.forEach(p => {
    if (p === '...') {
      const ell = document.createElement('span');
      ell.className = 'pag-ellipsis';
      ell.textContent = '...';
      pag.appendChild(ell);
    } else {
      const btn = document.createElement('button');
      btn.className = 'pag-btn' + (p === currentPage ? ' active' : '');
      btn.textContent = p + 1;
      btn.addEventListener('click', () => goToPage(p));
      pag.appendChild(btn);
    }
  });

  // Next button
  const nextBtn = document.createElement('button');
  nextBtn.className = 'pag-btn' + (currentPage >= totalPages - 1 ? ' disabled' : '');
  nextBtn.textContent = '→';
  nextBtn.disabled = currentPage >= totalPages - 1;
  nextBtn.addEventListener('click', () => { if (currentPage < totalPages - 1) goToPage(currentPage + 1); });
  pag.appendChild(nextBtn);

  // Info
  const info = document.createElement('span');
  info.className = 'pag-info';
  const activeList = isSearchActive ? filtered : filtered;
  const start = currentPage * ITEMS_PER_PAGE + 1;
  const end = Math.min((currentPage + 1) * ITEMS_PER_PAGE, filtered.length);
  info.textContent = `${start}-${end} sur ${filtered.length}`;
  pag.appendChild(info);
}

function buildPageNumbers(current, total, maxVisible) {
  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i);
  }
  const pages = [];
  pages.push(0);
  let start = Math.max(1, current - 1);
  let end = Math.min(total - 2, current + 1);
  if (current <= 2) { start = 1; end = Math.min(total - 2, 3); }
  if (current >= total - 3) { start = Math.max(1, total - 4); end = total - 2; }
  if (start > 1) pages.push('...');
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 2) pages.push('...');
  pages.push(total - 1);
  return pages;
}

function goToPage(page) {
  currentPage = page;
  renderEducatifs(filtered);
  document.getElementById('taxonomy-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  const catBadge = (isSearchActive && edu._catEmoji && edu._catName)
    ? `<span class="badge badge-category">${edu._catEmoji} ${escapeHtml(edu._catName)}</span>`
    : '';

  card.innerHTML = `
    <div class="edu-card-header">
      <div class="edu-card-title">${escapeHtml(edu.titre)}</div>
    </div>
    ${catBadge ? `<div class="edu-card-cat">${catBadge}</div>` : ''}
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
// RECHERCHE GLOBALE
// ─────────────────────────────────────────────────────
function initGlobalSearch() {
  const input = document.getElementById('global-search-input');
  if (!input) return;

  input.addEventListener('input', () => {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      performGlobalSearch(input.value.trim());
    }, 250);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      input.value = '';
      clearGlobalSearch();
    }
  });
}

function performGlobalSearch(query) {
  const clearBtn = document.getElementById('global-search-clear');

  if (!query || query.length < 2) {
    if (isSearchActive) clearGlobalSearch();
    if (clearBtn) clearBtn.classList.add('hidden');
    return;
  }

  if (clearBtn) clearBtn.classList.remove('hidden');

  const terms = query.toLowerCase().split(/\s+/);

  // Build a category lookup for display
  const catLookup = {};
  TAXONOMY.forEach(section => {
    section.categories.forEach(cat => {
      catLookup[cat.key] = { emoji: cat.emoji, name: cat.name };
    });
  });

  const results = [];
  for (const [key, edus] of Object.entries(educatifsData)) {
    const catInfo = catLookup[key] || { emoji: '', name: key };
    for (const edu of edus) {
      const searchable = [
        edu.titre || '',
        edu.desc || '',
        edu.competence || '',
        edu.niveau || '',
        (edu.tags || []).join(' ')
      ].join(' ').toLowerCase();

      const match = terms.every(t => searchable.includes(t));
      if (match) {
        results.push({ ...edu, _catKey: key, _catEmoji: catInfo.emoji, _catName: catInfo.name });
      }
    }
  }

  isSearchActive = true;
  currentCategory = null;
  currentEducatifs = results;
  filtered = results;
  currentPage = 0;

  // Show results in edu-grid
  document.getElementById('taxonomy-container').classList.add('hidden');
  document.getElementById('controls-bar').classList.add('hidden');
  document.getElementById('edu-section').classList.remove('hidden');
  document.getElementById('global-search-bar').classList.remove('hidden');

  const header = document.getElementById('category-header');
  header.innerHTML = `
    <div class="cat-header-emoji">🔍</div>
    <div class="cat-header-info">
      <h2>Résultats de recherche</h2>
      <p>${results.length} éducatif${results.length > 1 ? 's' : ''} trouvé${results.length > 1 ? 's' : ''} pour « ${escapeHtml(query)} »</p>
    </div>
  `;

  renderEducatifs(filtered);
}

function clearGlobalSearch() {
  const input = document.getElementById('global-search-input');
  const clearBtn = document.getElementById('global-search-clear');
  if (input) input.value = '';
  if (clearBtn) clearBtn.classList.add('hidden');

  isSearchActive = false;
  currentCategory = null;
  currentEducatifs = [];
  filtered = [];
  currentPage = 0;

  document.getElementById('edu-section').classList.add('hidden');
  document.getElementById('controls-bar').classList.add('hidden');
  document.getElementById('taxonomy-container').classList.remove('hidden');
  document.getElementById('edu-grid').innerHTML = '';
  document.getElementById('category-header').innerHTML = '';
  renderPagination(0);
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
