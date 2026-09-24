(() => {
  const modal = document.getElementById('caseModal');
  if (!modal) return;
  const image = document.getElementById('caseModalImage');
  const close = document.getElementById('caseModalClose');
  const status = document.getElementById('caseModalStatus');
  const caption = document.getElementById('caseModalCaption');
  const original = document.getElementById('caseModalOriginal');
  let trigger, overflow;
  const finish = () => { status.textContent = ''; image.hidden = false; };
  image.addEventListener('load', finish);
  image.addEventListener('error', () => {
    image.hidden = true;
    status.textContent = 'Não foi possível carregar a imagem. Tente abrir o arquivo original abaixo.';
  });
  function hide() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = overflow;
    trigger?.focus();
    image.removeAttribute('src');
    image.hidden = true;
  }
  document.querySelectorAll('.case-thumb').forEach(button => {
    button.addEventListener('click', () => {
      trigger = button;
      overflow = document.body.style.overflow;
      const preview = button.querySelector('img');
      const src = preview?.currentSrc || button.dataset.image;
      caption.textContent = button.dataset.title || 'Imagem do projeto';
      image.alt = caption.textContent;
      original.href = src;
      image.hidden = true;
      status.textContent = 'Carregando imagem…';
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      close.focus();
      image.src = src;
      if (image.complete && image.naturalWidth) finish();
    });
  });
  close.addEventListener('click', hide);
  modal.addEventListener('click', event => { if (event.target === modal) hide(); });
  document.addEventListener('keydown', event => {
    if (!modal.classList.contains('is-open')) return;
    if (event.key === 'Escape') { event.preventDefault(); hide(); }
    if (event.key === 'Tab') {
      const next = event.shiftKey ? close : original;
      const last = event.shiftKey ? original : close;
      event.preventDefault();
      (document.activeElement === last ? next : last).focus();
    }
  });
})();
