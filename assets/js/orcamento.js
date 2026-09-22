(() => {
  const form = document.getElementById('quote-form');
  if (!form) return;

  const description = form.querySelector('textarea[name="descricao"]');
  const count = document.getElementById('quote-count');
  const error = document.getElementById('quote-error');
  const phone = form.querySelector('input[name="telefone"]');
  const email = form.querySelector('input[name="email"]');

  const updateCount = () => {
    if (count && description) count.textContent = description.value.length;
  };

  description?.addEventListener('input', updateCount);
  updateCount();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    error.textContent = '';

    if (!form.checkValidity()) {
      form.reportValidity();
      error.textContent = 'Preencha os campos obrigatórios antes de continuar.';
      return;
    }

    if (!phone?.value.trim() && !email?.value.trim()) {
      error.textContent = 'Informe ao menos um WhatsApp ou e-mail para contato.';
      (phone || email)?.focus();
      return;
    }

    const data = new FormData(form);
    const params = new URLSearchParams(window.location.search);
    const source = params.get('utm_source') || form.dataset.source || 'site';
    const campaign = params.get('utm_campaign') || form.dataset.campaign || 'orcamento';
    const link = data.get('link').trim() || 'Não informado';
    const contactEmail = data.get('email').trim() || 'Não informado';
    const contactPhone = data.get('telefone').trim() || 'Não informado';
    const channel = event.submitter?.dataset.channel || 'whatsapp';

    const lines = [
      'NOVA SOLICITAÇÃO DE ORÇAMENTO — XGREAT OS',
      '',
      `Nome: ${data.get('nome').trim()}`,
      `Empresa: ${data.get('empresa').trim()}`,
      `WhatsApp: ${contactPhone}`,
      `E-mail: ${contactEmail}`,
      `Interesse: ${data.get('interesse')}`,
      `Site/Instagram: ${link}`,
      '',
      'Cenário informado:',
      data.get('descricao').trim(),
      '',
      `Origem: ${source} · Campanha: ${campaign}`
    ];

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', {
        event_category: 'orcamento',
        event_label: `${source}-${channel}`
      });
    }

    if (channel === 'email') {
      const subject = `Orçamento XGreat — ${data.get('empresa').trim()}`;
      window.location.href = `mailto:contato@xgreat.com.br?cc=xgreat@xgreat.com.br&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
      return;
    }

    const whatsappMessage = lines.map((line, index) => index === 0 ? `*${line}*` : line).join('\n');
    window.location.href = `https://wa.me/5511912131177?text=${encodeURIComponent(whatsappMessage)}`;
  });
})();
