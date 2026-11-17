(function(){
  const pages={'index.html':'inicio','':'inicio','como-ajudar.html':'como-ajudar','transparencia.html':'transparencia','contato.html':'contato','sobre.html':'sobre','privacidade.html':'privacidade','cookies.html':'cookies','termos.html':'termos'};
  const file=(location.pathname.split('/').pop()||'index.html');
  const active=document.body.dataset.page||pages[file]||'inicio';
  const nav=[['inicio','index.html','Início'],['como-ajudar','como-ajudar.html','Como ajudar'],['transparencia','transparencia.html','Transparência'],['contato','contato.html','Contato'],['sobre','sobre.html','Sobre']];
  const instagram='https://www.instagram.com/missao.rua/';
  const whatsapp='https://wa.me/551998675130?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20a%20Miss%C3%A3o%20Rua.';
  const pixKey='214.794.088-75';
  const style=document.createElement('style');
  style.textContent=`
    .site-icon{width:50px;height:50px;border-radius:50%;object-fit:cover;border:3px solid #7c3511;box-shadow:0 8px 22px rgba(126,62,16,.22);background:#ffe4a8}
    .help-hero-grid{display:grid;grid-template-columns:minmax(0,.82fr) minmax(480px,1.18fr);gap:48px;align-items:center}
    .help-card-img{display:block;width:100%;border-radius:32px;box-shadow:0 22px 70px rgba(83,45,13,.13)}
    .smart-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}
    .smart-card{position:relative;overflow:hidden;background:linear-gradient(145deg,#fffef8,#fff3df 70%,#f5dfb8);border:1px solid rgba(79,50,25,.14);box-shadow:0 16px 42px rgba(83,45,13,.09);border-radius:26px;padding:24px;display:flex;gap:18px;align-items:flex-start}
    .smart-card:after{content:'';position:absolute;right:-36px;bottom:-42px;width:128px;height:128px;border-radius:50%;background:rgba(198,106,31,.08)}
    .icon-badge{width:58px;height:58px;border-radius:20px;display:grid;place-items:center;background:linear-gradient(135deg,#fff6df,#f4c766);box-shadow:0 12px 26px rgba(83,45,13,.12);flex:0 0 auto;overflow:hidden;color:#11394a;font-weight:1000}
    .icon-badge img{display:block;max-width:36px;max-height:36px;object-fit:contain}.icon-badge--wide{width:88px}.icon-badge--wide img{max-width:74px;max-height:34px}
    .smart-card h3,.smart-card p,.smart-card a,.smart-card button{position:relative;z-index:1}.smart-card h3{margin-bottom:6px}.smart-card p{margin-bottom:14px}.smart-card .btn{min-height:42px;padding:10px 15px;font-size:.92rem}.copy-status{display:block;margin-top:8px;font-size:.9rem;font-weight:800;color:#826851}
    .whatsapp-float{position:fixed!important;right:22px!important;bottom:22px!important;width:52px!important;height:52px!important;display:flex!important;align-items:center!important;justify-content:center!important;z-index:90!important;background:transparent!important;border:0!important;box-shadow:none!important;padding:0!important;margin:0!important;line-height:0!important;overflow:visible!important}
    .whatsapp-float::before{content:none!important;display:none!important}.whatsapp-float svg{display:none!important}.whatsapp-float img{width:48px!important;height:48px!important;object-fit:contain!important;display:block!important;filter:drop-shadow(0 10px 18px rgba(37,211,102,.24))}.whatsapp-float:hover{transform:translateY(-2px)}
    @media(max-width:900px){
      html,body{max-width:100%;overflow-x:hidden}
      .topbar{position:relative!important;top:auto!important;padding:14px 0!important}
      .topbar__inner{width:min(100% - 28px,1180px)!important;display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:14px!important;margin:0 auto!important;position:relative!important;padding-right:58px!important;box-sizing:border-box!important}
      .brand{width:100%!important;display:flex!important;align-items:center!important;gap:12px!important;min-height:52px!important}
      .brand__text strong{font-size:1rem!important}.brand__text span{font-size:.68rem!important;letter-spacing:.22em!important}
      .topbar__right{width:100%!important;display:block!important}
      .header-social{position:absolute!important;right:0!important;top:4px!important;width:46px!important;height:46px!important;display:grid!important;place-items:center!important;border-radius:50%!important;background:#fff!important;box-shadow:0 10px 26px rgba(83,45,13,.12)!important;border:1px solid rgba(79,50,25,.12)!important}
      .nav{width:100%!important;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important;overflow:visible!important;white-space:normal!important;margin-top:10px!important}
      .nav a{display:flex!important;align-items:center!important;justify-content:center!important;text-align:center!important;min-height:42px!important;padding:10px 8px!important;border-radius:999px!important;font-size:.92rem!important;background:#fffaf2!important;border:1px solid rgba(79,50,25,.12)!important;line-height:1.1!important}
      .nav a.active{background:#fff!important;color:#a74912!important;box-shadow:0 8px 20px rgba(83,45,13,.08)!important}
      .hero{padding-top:46px!important;padding-bottom:42px!important}.section{padding-top:44px!important;padding-bottom:44px!important}
      .wrapper--wide{width:min(100% - 28px,1180px)!important;margin-left:auto!important;margin-right:auto!important}
      .help-hero-grid,.hero .wrapper--wide[style*='grid-template-columns']{display:grid!important;grid-template-columns:1fr!important;gap:26px!important;align-items:start!important}
      h1{font-size:clamp(2.65rem,14vw,4.7rem)!important;line-height:.98!important;letter-spacing:-.06em!important;max-width:100%!important;word-break:normal!important;overflow-wrap:normal!important}
      .lead{font-size:1.08rem!important;line-height:1.55!important;max-width:100%!important;word-break:normal!important;overflow-wrap:normal!important}
      .actions{display:flex!important;flex-wrap:wrap!important;gap:10px!important}.actions .btn{flex:1 1 150px!important;text-align:center!important;justify-content:center!important}
      .help-card-img,.hero .wrapper--wide[style*='grid-template-columns'] img{width:100%!important;max-width:100%!important;border-radius:24px!important;margin:0!important;object-fit:contain!important}
      .smart-grid{grid-template-columns:1fr!important;gap:14px!important}.smart-card{padding:20px!important;gap:14px!important;border-radius:22px!important}.icon-badge{width:52px;height:52px}.icon-badge--wide{width:82px}
      .footer{padding:38px 0 18px!important}.footer__inner{grid-template-columns:1fr!important;gap:18px!important;align-items:start!important;width:min(100% - 28px,1180px)!important}
      .whatsapp-float{right:16px!important;bottom:16px!important;width:46px!important;height:46px!important}.whatsapp-float img{width:42px!important;height:42px!important}
    }
    @media(max-width:430px){.nav{grid-template-columns:1fr 1fr!important}.nav a{font-size:.86rem!important}.site-icon{width:44px!important;height:44px!important}.hero{padding-top:36px!important}h1{font-size:clamp(2.45rem,16vw,4.2rem)!important}.kicker{font-size:.72rem!important;padding:12px 18px!important}.lead{font-size:1rem!important}.header-social{top:2px!important;width:44px!important;height:44px!important}.topbar__inner{padding-right:54px!important}.whatsapp-float{width:42px!important;height:42px!important}.whatsapp-float img{width:38px!important;height:38px!important}}
  `;
  document.head.appendChild(style);
  const iconInstagram='<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"></circle></svg>';
  const headerTarget=document.getElementById('site-header');
  if(headerTarget){headerTarget.innerHTML=`<header class="topbar"><div class="topbar__inner"><a class="brand" href="index.html" aria-label="Página inicial da Missão Rua"><img class="site-icon" src="assets/img/logo-missao.svg" alt=""><span class="brand__text"><strong>Missão Rua</strong><span>Juntos somos mais fortes</span></span></a><div class="topbar__right"><nav class="nav" aria-label="Menu principal">${nav.map(([key,href,label])=>`<a class="${active===key?'active':''}" href="${href}">${label}</a>`).join('')}</nav><a class="header-social" href="${instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram oficial da Missão Rua">${iconInstagram}<span class="sr-only">Instagram</span></a></div></div></header>`;}
  const footerTarget=document.getElementById('site-footer');
  if(footerTarget){footerTarget.innerHTML=`<footer class="footer" style="min-height:160px;padding:70px 0 18px;display:flex;align-items:flex-end;"><div class="footer__inner" style="align-items:end;"><div><strong class="footer__title">Missão Rua</strong><p>Juntos somos mais fortes.</p><a class="footer-social" href="${instagram}" target="_blank" rel="noopener noreferrer">@missao.rua</a></div><nav class="footer__links footer__links--policies" aria-label="Políticas"><a href="privacidade.html">Privacidade</a><a href="cookies.html">Cookies</a><a href="termos.html">Termos</a></nav><div><strong class="footer__title">Projeto solidário</strong><p class="credit">Site solidário desenvolvido por <a href="https://xgreat.com.br" target="_blank" rel="noopener noreferrer">XGreat</a>.</p></div></div></footer>`;}
  let wa=document.querySelector('.whatsapp-float');
  if(!wa){wa=document.createElement('a');wa.className='whatsapp-float';document.body.appendChild(wa);}
  wa.href=whatsapp;
  wa.setAttribute('aria-label','Falar pelo WhatsApp oficial da Missão Rua');
  wa.setAttribute('title','WhatsApp da Missão Rua');
  wa.setAttribute('target','_blank');
  wa.setAttribute('rel','noopener noreferrer');
  wa.innerHTML='<img src="assets/img/Whats.png?v=1" alt="WhatsApp">';
  document.querySelectorAll('[data-copy-pix]').forEach(function(button){button.addEventListener('click',function(){const value=button.getAttribute('data-copy-pix')||pixKey;const status=document.querySelector(button.getAttribute('data-copy-target')||'');const done=function(){if(status){status.textContent='Chave Pix copiada.';}};if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(value).then(done).catch(done);}else{const input=document.createElement('input');input.value=value;document.body.appendChild(input);input.select();document.execCommand('copy');document.body.removeChild(input);done();}});});
})();