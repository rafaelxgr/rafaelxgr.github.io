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

(() => {
  const STORAGE_KEY = 'xgr_cookie_choice';
  const GA_ID = 'G-ZMDZW6X0LS';
  const META_PIXEL_ID = '3109264232797654';

  const getChoice = () => {
    try { return localStorage.getItem(STORAGE_KEY); }
    catch (_) { return null; }
  };

  const saveChoice = (value) => {
    try { localStorage.setItem(STORAGE_KEY, value); }
    catch (_) { /* The preference remains valid for the current page. */ }
  };

  const updateTrackingConsent = (granted) => {
    const state = granted ? 'granted' : 'denied';
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: state,
        ad_storage: state,
        ad_user_data: state,
        ad_personalization: state
      });
    }
    if (window.fbq) window.fbq('consent', granted ? 'grant' : 'revoke');
  };

  const loadAnalytics = () => {
    if (window.xgreatAnalyticsLoaded) return;
    window.xgreatAnalyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    updateTrackingConsent(true);
    window.gtag('config', GA_ID, { anonymize_ip: true });

    const ga = document.createElement('script');
    ga.async = true;
    ga.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(ga);

    if (!window.fbq) {
      const fbq = window.fbq = function () {
        fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
      };
      if (!window._fbq) window._fbq = fbq;
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = '2.0';
      fbq.queue = [];
      const pixel = document.createElement('script');
      pixel.async = true;
      pixel.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(pixel);
      fbq('init', META_PIXEL_ID);
      fbq('track', 'PageView');
    }
  };

  const banner = document.createElement('section');
  banner.id = 'xgrCookieConsent';
  banner.className = 'cookie-consent';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Preferências de cookies');
  banner.setAttribute('aria-live', 'polite');
  banner.innerHTML = `
    <div class="cookie-consent__copy">
      <strong>Sua privacidade importa</strong>
      <p>Usamos cookies de medição e marketing para entender os acessos e melhorar o site. Você pode aceitar ou recusar sem prejudicar a navegação.</p>
      <a href="cookies.html">Política de Cookies</a>
    </div>
    <div class="cookie-consent__actions">
      <button class="cookie-consent__button" type="button" data-cookie-choice="rejected">Recusar</button>
      <button class="cookie-consent__button cookie-consent__button--primary" type="button" data-cookie-choice="accepted">Aceitar</button>
    </div>`;
  document.body.appendChild(banner);

  const showBanner = () => banner.classList.add('is-visible');
  const hideBanner = () => banner.classList.remove('is-visible');

  banner.addEventListener('click', (event) => {
    const button = event.target.closest('[data-cookie-choice]');
    if (!button) return;
    const choice = button.dataset.cookieChoice;
    saveChoice(choice);
    hideBanner();
    if (choice === 'accepted') loadAnalytics();
    else updateTrackingConsent(false);
  });

  document.querySelectorAll('footer nav').forEach((nav) => {
    if (nav.querySelector('.cookie-settings-link')) return;
    const settings = document.createElement('button');
    settings.className = 'cookie-settings-link';
    settings.type = 'button';
    settings.setAttribute('aria-controls', 'xgrCookieConsent');
    settings.textContent = 'Preferências';
    nav.appendChild(settings);
  });

  document.addEventListener('click', (event) => {
    if (event.target.closest('.cookie-settings-link')) showBanner();
  });

  if (getChoice() === 'accepted') loadAnalytics();
  else if (!getChoice()) window.setTimeout(showBanner, 350);
})();
