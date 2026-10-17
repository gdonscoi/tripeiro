(() => {
  const script = document.currentScript;
  const root = new URL('../', script.src);
  const url = new URL(location.href);
  const requested = url.searchParams.get('lang');
  const language = requested === 'pt' || requested === 'en'
    ? requested : (/^pt(?:-|$)/i.test(navigator.language || '') ? 'pt' : 'en');
  const target = new URL(language === 'en' ? 'en/' : './', root);
  if (url.pathname !== target.pathname) {
    target.search = url.search;
    target.hash = url.hash;
    location.replace(target.href);
    return;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const english = language === 'en';
    const updateLinks = () => {
      document.querySelectorAll('[data-language]').forEach(link => {
        const destination = new URL(link.dataset.language === 'en' ? 'en/' : './', root);
        destination.search = location.search;
        destination.searchParams.set('lang', link.dataset.language);
        destination.hash = location.hash;
        link.href = destination.href;
      });
    };
    updateLinks();
    window.addEventListener('hashchange', updateLinks);

    const button = document.getElementById('copy');
    button.addEventListener('click', async () => {
      const status = document.getElementById('copy-status');
      button.disabled = true;
      status.textContent = '';
      try {
        const response = await fetch(new URL(english ? 'en/instrucoes.txt' : 'instrucoes.txt', root));
        if (!response.ok) throw new Error('Instructions unavailable');
        await navigator.clipboard.writeText(await response.text());
        status.textContent = english ? 'Instructions copied.' : 'Instruções copiadas.';
      } catch {
        status.textContent = english
          ? 'Could not copy. Use “Open the text” and copy it there.'
          : 'Não foi possível copiar. Use “Abrir o texto” e copie de lá.';
      } finally {
        button.disabled = false;
      }
    });
  });
})();
