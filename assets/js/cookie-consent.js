(function () {
  var storageKey = 'xgr_cookie_choice';
  var banner = document.getElementById('xgrCookieBanner');
  var acceptBtn = document.getElementById('xgrCookieAccept');
  var rejectBtn = document.getElementById('xgrCookieReject');

  if (!banner || !acceptBtn || !rejectBtn) return;

  function hideBanner() {
    banner.classList.remove('show');
  }

  function showBanner() {
    banner.classList.add('show');
  }

  function saveChoice(value) {
    try {
      localStorage.setItem(storageKey, value);
    } catch (e) {
      console.warn('Não foi possível salvar a preferência de cookies.', e);
    }
  }

  function getChoice() {
    try {
      return localStorage.getItem(storageKey);
    } catch (e) {
      return null;
    }
  }

  var choice = getChoice();

  if (!choice) {
    showBanner();
  }

  acceptBtn.addEventListener('click', function () {
    saveChoice('accepted');
    hideBanner();
  });

  rejectBtn.addEventListener('click', function () {
    saveChoice('rejected');
    hideBanner();
  });
})();
