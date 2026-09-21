(() => {
  const form = document.querySelector('#quote-form');
  if (!form) return;

  const description = form.elements.descricao;
  const counter = document.querySelector('#quote-count');
  const error = document.querySelector('#quote-error');
  const phone = form.elements.telefone;

  description.addEventListener('input', () => { counter.textContent = description.value.length; });
  phone.addEventListener('input', () => {
    const digits = phone.value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) phone.value = digits;
    else if (digits.length <= 7) phone.value = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    else phone.value = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    error.textContent = '';

    if (!form.checkValidity()) {
      error.textContent = 'Preencha os campos obrigatórios antes de continuar.';
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const params = new URLSearchParams(window.location.search);
    const source = params.get('utm_source') || 'site';
    const campaign = params.get('utm_campaign') || 'orcamento';
    const link = data.get('link').trim() || 'Não informado';
    const message = [
      '*NOVA SOLICITAÇÃO DE ORÇAMENTO — XGREAT OS*',
      '',
      `*Nome:* ${data.get('nome').trim()}`,
      `*Empresa:* ${data.get('empresa').trim()}`,
      `*WhatsApp:* ${data.get('telefone').trim()}`,
      `*Interesse:* ${data.get('interesse')}`,
      `*Site/Instagram:* ${link}`,
      '',
      '*Cenário informado:*',
      data.get('descricao').trim(),
      '',
      `_Origem: ${source} · Campanha: ${campaign}_`
    ].join('\n');

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', { event_category: 'orcamento', event_label: source });
    }

    window.location.href = `https://wa.me/5511912131177?text=${encodeURIComponent(message)}`;
  });
})();
