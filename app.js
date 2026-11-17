/* ============================================================
   The Lab Indonesia - Video Hub Application Logic
   Style Guide Compliant • Plus Jakarta Sans • Autoplay & Fallback
============================================================ */

(function () {
  'use strict';

  // Global State
  let allVideos = [];
  let completedSet = new Set();
  let currentProgram = 'spike-kinder';
  let currentLetter = 'ALL';
  let searchQuery = '';
  let activeVideo = null;
  let filteredVideos = [];

  // DOM Elements
  const searchInput = document.getElementById('tli-search-input');
  const searchClear = document.getElementById('tli-search-clear');
  const programTabs = document.getElementById('tli-program-tabs');
  const alphabetContainer = document.getElementById('tli-alphabet-inner');
  const homeView = document.getElementById('tli-home-view');
  const watchView = document.getElementById('tli-watch-view');
  const videoGrid = document.getElementById('tli-video-grid');
  const emptyState = document.getElementById('tli-empty-state');
  const gridCount = document.getElementById('tli-grid-count');
  const logoLink = document.getElementById('tli-logo-link');

  // Watch View Elements
  const watchIframe = document.getElementById('tli-watch-iframe');
  const watchTitle = document.getElementById('tli-watch-title');
  const watchSub = document.getElementById('tli-watch-sub');
  const btnWatchBack = document.getElementById('tli-btn-back');
  const btnWatchDone = document.getElementById('tli-btn-done');
  const btnYtFallback = document.getElementById('tli-btn-yt-fallback');
  const sidebarList = document.getElementById('tli-sidebar-list');

  // 1. Init
  function init() {
    loadCompleted();

    if (typeof VIDEOS_DATA !== 'undefined' && Array.isArray(VIDEOS_DATA)) {
      allVideos = VIDEOS_DATA;
      setup();
    } else {
      fetch('videos.json')
        .then((res) => res.json())
        .then((data) => {
          allVideos = data;
          setup();
        })
        .catch((err) => console.error('Data error:', err));
    }
  }

  function setup() {
    buildAlphabetRow();
    setupListeners();
    applyFilters();
    updateStats();
  }

  // 2. Storage
  function loadCompleted() {
    try {
      const saved = localStorage.getItem('thelab_completed_videos');
      if (saved) {
        completedSet = new Set(JSON.parse(saved));
      }
    } catch (e) {
      console.warn(e);
    }
  }

  function saveCompleted() {
    try {
      localStorage.setItem('thelab_completed_videos', JSON.stringify([...completedSet]));
    } catch (e) {
      console.warn(e);
    }
  }

  function updateStats() {
    // Model Selesai counter removed per request
  }

  // 3. Alphabet Quick-Bar
  function buildAlphabetRow() {
    const letters = new Set();
    const pool = currentProgram === 'all' 
      ? allVideos 
      : allVideos.filter((v) => v.program_id === currentProgram);

    pool.forEach((v) => {
      if (v.first_letter && /[A-Z]/.test(v.first_letter)) {
        letters.add(v.first_letter);
      }
    });

    const sorted = Array.from(letters).sort();
    alphabetContainer.innerHTML = '<span class="tli-alpha-label">Picking List A–Z:</span>';

    const allBtn = document.createElement('button');
    allBtn.className = `tli-alpha-btn ${currentLetter === 'ALL' ? 'active' : ''}`;
    allBtn.textContent = 'Semua';
    allBtn.addEventListener('click', () => {
      currentLetter = 'ALL';
      updateAlphabetButtons();
      switchToHome();
      applyFilters();
    });
    alphabetContainer.appendChild(allBtn);

    sorted.forEach((l) => {
      const btn = document.createElement('button');
      btn.className = `tli-alpha-btn ${currentLetter === l ? 'active' : ''}`;
      btn.textContent = l;
      btn.addEventListener('click', () => {
        currentLetter = l;
        updateAlphabetButtons();
        switchToHome();
        applyFilters();
      });
      alphabetContainer.appendChild(btn);
    });
  }

  function updateAlphabetButtons() {
    const btns = alphabetContainer.querySelectorAll('.tli-alpha-btn');
    btns.forEach((b) => {
      if (b.textContent === currentLetter || (currentLetter === 'ALL' && b.textContent === 'Semua')) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
  }

  // 4. Filtering Logic
  function applyFilters() {
    const q = searchQuery.trim().toLowerCase();

    filteredVideos = allVideos.filter((v) => {
      // Program filter
      if (currentProgram !== 'all' && v.program_id !== currentProgram) {
        return false;
      }

      // Letter filter
      if (currentLetter !== 'ALL' && v.first_letter !== currentLetter) {
        return false;
      }

      // Search query
      if (q) {
        const matchClean = v.clean_title.toLowerCase().includes(q);
        const matchOrig = v.original_title.toLowerCase().includes(q);
        if (!matchClean && !matchOrig) return false;
      }

      return true;
    });

    // Sort alphabetically by clean_title
    filteredVideos.sort((a, b) => a.clean_title.localeCompare(b.clean_title));

    renderGrid(filteredVideos);
  }

  // 5. Render Video Grid (The Lab Cards)
  function renderGrid(videos) {
    videoGrid.innerHTML = '';

    if (videos.length === 0) {
      emptyState.style.display = 'block';
      gridCount.textContent = '0 model ditemukan';
      return;
    }

    emptyState.style.display = 'none';
    gridCount.textContent = `Menampilkan ${videos.length} model LEGO:`;

    const fragment = document.createDocumentFragment();

    videos.forEach((video) => {
      const isDone = completedSet.has(video.id);
      const card = document.createElement('div');
      card.className = `tli-card ${isDone ? 'is-done' : ''}`;
      card.setAttribute('data-program', video.program_id);

      card.innerHTML = `
        <div class="tli-card-thumb-wrapper">
          <img class="tli-card-thumb" src="${video.thumbnail}" alt="${video.clean_title}" loading="lazy" />
          <span class="tli-card-done-badge">⭐ SELESAI</span>
        </div>
        <div class="tli-card-body">
          <h3 class="tli-card-model-name">${video.clean_title}</h3>
          <div class="tli-card-program-name">${video.program_name}</div>
          <div class="tli-card-picking-name">${video.original_title}</div>
        </div>
      `;

      card.addEventListener('click', () => {
        openWatchView(video);
      });

      fragment.appendChild(card);
    });

    videoGrid.appendChild(fragment);
  }

  // 6. Watch View (Iframe & Autoplay)
  function openWatchView(video) {
    activeVideo = video;

    // Standard YouTube embed parameters
    const embedUrl = `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`;
    watchIframe.src = embedUrl;

    watchTitle.textContent = video.clean_title;
    watchSub.textContent = `${video.program_name} • ${video.original_title}`;

    // Direct YouTube fallback link
    btnYtFallback.href = `https://www.youtube.com/watch?v=${video.id}`;

    updateDoneButton();
    renderSidebarList();

    homeView.style.display = 'none';
    watchView.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function switchToHome() {
    watchView.classList.remove('active');
    homeView.style.display = 'block';
    watchIframe.src = ''; // stop playback
  }

  function updateDoneButton() {
    if (!activeVideo) return;
    const isDone = completedSet.has(activeVideo.id);
    if (isDone) {
      btnWatchDone.classList.add('is-done');
      btnWatchDone.textContent = '✅ Selesai Dirakit';
    } else {
      btnWatchDone.classList.remove('is-done');
      btnWatchDone.textContent = '⭐ Tandai Selesai';
    }
  }

  function toggleDone() {
    if (!activeVideo) return;
    if (completedSet.has(activeVideo.id)) {
      completedSet.delete(activeVideo.id);
    } else {
      completedSet.add(activeVideo.id);
    }
    saveCompleted();
    updateStats();
    updateDoneButton();
    applyFilters();
  }

  // 7. Sidebar List
  function renderSidebarList() {
    sidebarList.innerHTML = '';
    const listVideos = filteredVideos.length > 0 ? filteredVideos : allVideos;

    listVideos.forEach((v) => {
      const item = document.createElement('div');
      item.className = `tli-side-item ${activeVideo && activeVideo.id === v.id ? 'active-item' : ''}`;

      item.innerHTML = `
        <img class="tli-side-thumb" src="${v.thumbnail}" alt="${v.clean_title}" loading="lazy" />
        <div class="tli-side-meta">
          <div class="tli-side-name">${v.clean_title}</div>
          <div class="tli-side-prog">${v.program_name}</div>
        </div>
      `;

      item.addEventListener('click', () => {
        openWatchView(v);
      });

      sidebarList.appendChild(item);
    });
  }

  // 8. Event Listeners
  function setupListeners() {
    // Logo Click returns to Home
    logoLink.addEventListener('click', (e) => {
      e.preventDefault();
      searchInput.value = '';
      searchQuery = '';
      currentProgram = 'spike-kinder';
      currentLetter = 'ALL';
      searchClear.style.display = 'none';

      programTabs.querySelectorAll('.tli-tab-btn').forEach((c) => c.classList.remove('active'));
      const defaultTab = programTabs.querySelector('[data-program="spike-kinder"]');
      if (defaultTab) defaultTab.classList.add('active');

      buildAlphabetRow();
      switchToHome();
      applyFilters();
    });

    btnWatchBack.addEventListener('click', switchToHome);
    btnWatchDone.addEventListener('click', toggleDone);

    // Search input
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      searchClear.style.display = searchQuery ? 'flex' : 'none';
      if (watchView.classList.contains('active')) {
        switchToHome();
      }
      applyFilters();
    });

    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      searchClear.style.display = 'none';
      searchInput.focus();
      applyFilters();
    });

    // Program tabs
    programTabs.querySelectorAll('.tli-tab-btn').forEach((tab) => {
      tab.addEventListener('click', () => {
        programTabs.querySelectorAll('.tli-tab-btn').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        currentProgram = tab.getAttribute('data-program');
        currentLetter = 'ALL';
        buildAlphabetRow();
        if (watchView.classList.contains('active')) {
          switchToHome();
        }
        applyFilters();
      });
    });
  }

  // PWA Service Worker
  if ('serviceWorker' in navigator && (window.location.protocol.startsWith('http') || window.location.hostname === 'localhost')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('./sw.js')
        .then((reg) => console.log('The Lab PWA Service Worker Registered:', reg.scope))
        .catch((err) => console.warn('SW registration info:', err));
    });
  }

  // Run
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
