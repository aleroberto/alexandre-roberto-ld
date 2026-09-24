const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
if (menuButton && mobileMenu) {
  const closeMenu = () => {
    mobileMenu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
  };
  menuButton.addEventListener('click', () => {
    const opening = mobileMenu.hidden;
    mobileMenu.hidden = !opening;
    menuButton.setAttribute('aria-expanded', String(opening));
    menuButton.setAttribute('aria-label', opening ? 'Fechar menu' : 'Abrir menu');
  });
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !mobileMenu.hidden) { closeMenu(); menuButton.focus(); }
  });
}

const themeButton = document.querySelector('.theme-toggle');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const applyTheme = theme => {
  const dark = theme === 'dark';
  document.documentElement.dataset.theme = theme;
  if (themeButton) {
    themeButton.textContent = dark ? 'Tema claro' : 'Tema escuro';
    themeButton.setAttribute('aria-label', dark ? 'Ativar tema claro' : 'Ativar tema escuro');
    themeButton.setAttribute('aria-pressed', String(dark));
  }
  if (themeMeta) themeMeta.content = dark ? '#080d17' : '#f7f8f7';
};
try {
  const saved = localStorage.getItem('alexandre-theme');
  if (saved === 'light' || saved === 'dark') applyTheme(saved);
} catch (_) { /* O site continua no tema escuro sem armazenamento. */ }
if (themeButton) themeButton.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('alexandre-theme', next); } catch (_) { /* Apenas esta visita. */ }
});

const stages = [...document.querySelectorAll('.story-step')];
const boardRows = [...document.querySelectorAll('.board-row')];
const setStage = id => {
  stages.forEach(el => el.classList.toggle('is-active', el.dataset.stage === id));
  boardRows.forEach(el => el.classList.toggle('is-active', el.dataset.board === id));
};
if (stages.length) {
  setStage('1');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setStage(visible.target.dataset.stage);
    }, { rootMargin: '-20% 0px -35% 0px', threshold: [0, .25, .5, .75] });
    stages.forEach(el => observer.observe(el));
  }
}

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());
