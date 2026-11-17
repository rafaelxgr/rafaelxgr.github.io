(function () {
  var PIXEL_ID = '3109264232797654';

  if (window.fbq) return;

  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', PIXEL_ID);
  fbq('track', 'PageView');
})();

(function () {
  function normalizeHeader() {
    var header = document.querySelector('.top-header');
    if (!header || header.querySelector('.brand-link')) return;
    var text = (header.textContent || '').trim() || 'XGreat';
    header.textContent = '';
    var link = document.createElement('a');
    link.className = 'brand-link';
    link.href = 'index.html';
    link.setAttribute('aria-label', 'Voltar para a página inicial da XGreat');
    link.textContent = text;
    header.appendChild(link);
  }

  function normalizeNav() {
    var currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar').forEach(function (navbar) {
      var allLinks = Array.prototype.slice.call(navbar.querySelectorAll('a'));
      var hasCrm = allLinks.some(function (link) {
        return (link.getAttribute('href') || '').indexOf('crm-comercial.html') !== -1;
      });
      if (!hasCrm) {
        var crm = document.createElement('a');
        crm.href = 'crm-comercial.html';
        crm.textContent = 'CRM Comercial';
        if (currentPath === 'crm-comercial.html') crm.className = 'active';
        var diagRef = Array.prototype.slice.call(navbar.querySelectorAll('a')).find(function (link) {
          return (link.getAttribute('href') || '') === 'diagnostico-xgreat.html';
        });
        var projetosRef = Array.prototype.slice.call(navbar.querySelectorAll('a')).find(function (link) {
          return (link.getAttribute('href') || '') === 'projetos.html';
        });
        if (diagRef) navbar.insertBefore(crm, diagRef);
        else if (projetosRef) navbar.insertBefore(crm, projetosRef);
        else navbar.appendChild(crm);
      }

      var hasDiag = Array.prototype.slice.call(navbar.querySelectorAll('a')).some(function (link) {
        return (link.getAttribute('href') || '').indexOf('diagnostico-xgreat.html') !== -1;
      });
      if (!hasDiag) {
        var diag = document.createElement('a');
        diag.href = 'diagnostico-xgreat.html';
        diag.textContent = 'Diagnóstico';
        if (currentPath === 'diagnostico-xgreat.html') diag.className = 'active';
        var projetos = Array.prototype.slice.call(navbar.querySelectorAll('a')).find(function (link) { return (link.getAttribute('href') || '') === 'projetos.html'; });
        if (projetos) navbar.insertBefore(diag, projetos);
        else navbar.appendChild(diag);
      }
    });
  }

  function normalizeFooter() {
    document.querySelectorAll('.xgr-site-footer__links').forEach(function (footerLinks) {
      var hasDiag = Array.prototype.slice.call(footerLinks.querySelectorAll('a')).some(function (link) {
        return (link.getAttribute('href') || '').indexOf('diagnostico-xgreat.html') !== -1;
      });
      if (hasDiag) return;
      var diag = document.createElement('a');
      diag.href = 'diagnostico-xgreat.html';
      diag.textContent = 'Diagnóstico Digital';
      footerLinks.insertBefore(diag, footerLinks.firstChild);
    });
  }

  function addViaVidrosCase() {
    if (!document.body.classList.contains('page-projetos')) return;
    var cases = document.querySelector('#cases-publicados .cards');
    if (!cases || document.querySelector('[data-xgr-case="via-vidros"]')) return;
    var article = document.createElement('article');
    article.className = 'card';
    article.setAttribute('data-xgr-case', 'via-vidros');
    article.innerHTML = '<button class="case-thumb" type="button" data-image="clientes/via-vidros/assets/img/ViaVidros_Portfolio.png" data-title="Via Vidros Ricardo Silva | Landing page local" aria-label="Ampliar imagem do case Via Vidros"><img src="clientes/via-vidros/assets/img/ViaVidros_Portfolio.png" alt="Prévia da landing page Via Vidros" loading="lazy"><span class="case-thumb-badge">Clique para ampliar</span></button><div class="case-topline"><span class="case-status">Landing page publicada</span><span class="case-brand">Presença Digital</span></div><h3>Via Vidros Ricardo Silva</h3><p class="case-summary">Landing page para negócio local de vidros, box, espelhos e instalações sob medida, criada para transformar presença básica em apresentação profissional com chamada direta para orçamento.</p><ul><li>Landing page responsiva para captação pelo WhatsApp</li><li>Galeria organizada por tipo de serviço e imagens ampliáveis</li><li>SEO básico, canonical, sitemap e dados estruturados</li><li>Base pronta para vincular ao Perfil da Empresa no Google</li></ul><div class="case-links"><a class="case-link is-primary" href="clientes/via-vidros/" target="_blank" rel="noopener noreferrer"><span>Ver landing page</span></a></div>';
    cases.appendChild(article);
  }

  function addCrmVisualFix() {
    if (!document.body.classList.contains('page-crm-comercial') || document.getElementById('xgrCrmVisualFix')) return;
    var style = document.createElement('style');
    style.id = 'xgrCrmVisualFix';
    style.textContent = [
      'body.page-crm-comercial .crm-board{min-width:0}',
      'body.page-crm-comercial .crm-pipeline{grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}',
      'body.page-crm-comercial .crm-stage{min-width:0;padding:10px;overflow:hidden}',
      'body.page-crm-comercial .crm-stage h3{font-size:.72rem;line-height:1.22;letter-spacing:.03em;overflow-wrap:anywhere}',
      'body.page-crm-comercial .crm-lead{padding:9px;font-size:.78rem;line-height:1.35;overflow-wrap:anywhere;word-break:normal}',
      'body.page-crm-comercial .crm-lead strong{font-size:.78rem;line-height:1.25;overflow-wrap:anywhere}',
      '@media (min-width:901px){body.page-crm-comercial .crm-hero-grid{grid-template-columns:minmax(0,1fr) minmax(430px,.95fr)}}',
      '@media (max-width:1100px) and (min-width:901px){body.page-crm-comercial .crm-board{transform:scale(.96);transform-origin:center right}}'
    ].join('');
    document.head.appendChild(style);
  }

  function runNavigationFixes() { normalizeHeader(); normalizeNav(); normalizeFooter(); addViaVidrosCase(); addCrmVisualFix(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', runNavigationFixes);
  else runNavigationFixes();
})();

(function () {
  var storageKey = 'xgr_cookie_choice';
  var banner = document.getElementById('xgrCookieBanner');
  var acceptBtn = document.getElementById('xgrCookieAccept');
  var rejectBtn = document.getElementById('xgrCookieReject');
  if (!banner || !acceptBtn || !rejectBtn) return;
  function hideBanner() { banner.classList.remove('show'); }
  function showBanner() { banner.classList.add('show'); }
  function saveChoice(value) { try { localStorage.setItem(storageKey, value); } catch (e) { console.warn('Não foi possível salvar a preferência de cookies.', e); } }
  function getChoice() { try { return localStorage.getItem(storageKey); } catch (e) { return null; } }
  if (!getChoice()) showBanner();
  acceptBtn.addEventListener('click', function () { saveChoice('accepted'); hideBanner(); });
  rejectBtn.addEventListener('click', function () { saveChoice('rejected'); hideBanner(); });
})();

(function () {
  var path = window.location.pathname.split('/').pop() || 'index.html';
  var swaps = {
    'modelo-moda-local.html': [['.editorial-photo img', 'editorial-moda-xgr.png'], ['.promo-banner img', 'banner-moda-xgr.png']],
    'modelo-petshop-local.html': [['.care-photo img', 'editorial-petshop-xgr.png'], ['.promo-banner img', 'banner-petshop-xgr.png']]
  };
  (swaps[path] || []).forEach(function (item) {
    var img = document.querySelector(item[0]);
    if (img) img.src = item[1];
  });
})();