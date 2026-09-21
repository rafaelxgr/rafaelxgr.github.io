(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  const revealTargets = document.querySelectorAll(
    '.os-section .section-heading, .os-section .os-card, .process-step, .final-cta, .home-quote__copy, .home-quote .quote-panel'
  );

  document.body.classList.add('motion-ready');

  revealTargets.forEach((element, index) => {
    element.classList.add('reveal-on-scroll');
    element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 70}ms`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });

  revealTargets.forEach((element) => observer.observe(element));

  const steps = Array.from(document.querySelectorAll('.ops-step'));
  if (!steps.length) return;

  let activeIndex = 0;
  let timer;

  const activateNext = () => {
    steps.forEach((step, index) => step.classList.toggle('is-active', index === activeIndex));
    activeIndex = (activeIndex + 1) % steps.length;
  };

  const start = () => {
    if (timer) return;
    activateNext();
    timer = window.setInterval(activateNext, 1400);
  };

  const stop = () => {
    window.clearInterval(timer);
    timer = undefined;
  };

  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
  start();
})();