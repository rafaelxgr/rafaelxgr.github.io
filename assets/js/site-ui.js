(() => {
  const button = document.createElement('button');
  button.className = 'back-to-top';
  button.type = 'button';
  button.setAttribute('aria-label', 'Voltar ao topo');
  button.setAttribute('title', 'Voltar ao topo');
  button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 14.5 12 8l6 6.5"></path></svg>';
  document.body.appendChild(button);

  const update = () => button.classList.toggle('is-visible', window.scrollY > 520);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  window.addEventListener('scroll', update, { passive: true });
  update();
})();
