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
