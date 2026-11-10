(() => {
  const viewport = document.getElementById('bookViewport');
  const pages = Array.from(document.querySelectorAll('.book-page'));
  const count = document.getElementById('pageCount');
  const progress = document.getElementById('progressBar');
  const prev = document.getElementById('prevPage');
  const next = document.getElementById('nextPage');
  let current = 0;

  function goTo(index) {
    current = Math.max(0, Math.min(pages.length - 1, index));
    viewport.scrollTo({ left: current * viewport.clientWidth, behavior: 'smooth' });
    update();
  }
  function update() {
    count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(pages.length).padStart(2, '0')}`;
    progress.style.width = `${((current + 1) / pages.length) * 100}%`;
    prev.disabled = current === 0;
    next.disabled = current === pages.length - 1;
  }

  prev.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));
  viewport.addEventListener('scroll', () => {
    const index = Math.round(viewport.scrollLeft / viewport.clientWidth);
    if (index !== current && index >= 0 && index < pages.length) {
      current = index;
      update();
    }
  }, { passive: true });
  window.addEventListener('resize', () => {
    viewport.scrollLeft = current * viewport.clientWidth;
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') goTo(current + 1);
    if (event.key === 'ArrowLeft') goTo(current - 1);
  });
  update();
})();

// BACKGROUND MUSIC - SELEBRITIS
const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");
const musicVolume = document.getElementById("musicVolume");
const nextPage = document.getElementById("nextPage");
const prevPage = document.getElementById("prevPage");

if (bgMusic && musicToggle) {
  bgMusic.volume = 0.5;

  let musicStarted = false;

  async function playMusic() {
    try {
      await bgMusic.play();
      musicStarted = true;
      musicToggle.textContent = "Ⅱ Pause";
    } catch (error) {
      musicToggle.textContent = "▶ Play";
    }
  }

  musicToggle.addEventListener("click", async () => {
    if (bgMusic.paused) {
      await playMusic();
    } else {
      bgMusic.pause();
      musicToggle.textContent = "▶ Play";
    }
  });

  // Mulai musik saat pengunjung membalik halaman
  async function startMusicOnFlip() {
    if (!musicStarted && bgMusic.paused) {
      await playMusic();
    }
  }

  nextPage?.addEventListener("click", startMusicOnFlip);
  prevPage?.addEventListener("click", startMusicOnFlip);

  // Pengaturan volume
  musicVolume?.addEventListener("input", (event) => {
    bgMusic.volume = Number(event.target.value);
  });

  bgMusic.addEventListener("ended", () => {
    musicToggle.textContent = "▶ Play";
  });
}

// MENYESUAIKAN TINGGI BUKU DENGAN HALAMAN AKTIF
const viewport = document.getElementById("bookViewport");
const pagesContainer = document.getElementById("bookPages");

if (viewport && pagesContainer) {
  function updateBookHeight() {
    const pageWidth = viewport.clientWidth;

    if (!pageWidth) return;

    const index = Math.round(viewport.scrollLeft / pageWidth);
    const currentPage = pagesContainer.children[index];

    if (currentPage) {
      viewport.style.height = currentPage.offsetHeight + "px";
    }
  }

  viewport.addEventListener("scroll", () => {
    requestAnimationFrame(updateBookHeight);
  });

  window.addEventListener("resize", updateBookHeight);

  pagesContainer.querySelectorAll("img").forEach(img => {
    img.addEventListener("load", updateBookHeight);
  });

  window.addEventListener("load", updateBookHeight);

  updateBookHeight();
}
