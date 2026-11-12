// Certificates section for index.html.
// Rows come from data/certificates.json, which scripts/linkedin-certs.mjs builds from the LinkedIn
// export (see data/linkedin/README.md). Names stay in English; the month follows the language switch.
(function () {
  var LOCALES = { en: 'en-US', uk: 'uk-UA', ru: 'ru-RU', es: 'es-ES' };

  var section = document.getElementById('certificates');
  var list = document.getElementById('cert-list');
  if (!section || !list) return;
  var certs = [];

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function safeUrl(value) {
    try {
      var url = new URL(value);
      return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : null;
    } catch (e) {
      return null;
    }
  }

  function render() {
    var locale = LOCALES[document.documentElement.lang] || LOCALES.en;
    var titleLink = safeUrl('https://drive.google.com/') || 'https://drive.google.com/';
    var card = el('div', 'cert-card');
    var title = el('a', 'cert-title', 'Google Professional Certificate');
    title.href = titleLink;
    title.target = '_blank';
    title.rel = 'noopener';

    var meta = el('div', 'cert-meta');
    var summary = document.createTextNode('Completed full specialization track · ');
    var folder = el('a', '', 'View individual course certificates (Google Drive folder)');
    folder.href = 'https://drive.google.com/';
    folder.target = '_blank';
    folder.rel = 'noopener';

    meta.appendChild(summary);
    meta.appendChild(folder);
    card.appendChild(title);
    card.appendChild(meta);
    list.replaceChildren(card);
    section.hidden = false;
  }

  fetch('data/certificates.json', { cache: 'no-cache' })
    .then(function (res) {
      if (!res.ok) throw new Error('certificates.json returned ' + res.status);
      return res.json();
    })
    .then(function (data) {
      if (!Array.isArray(data)) throw new Error('certificates.json is not a list');
      certs = data.filter(function (c) { return c && c.name; });
      render();
    })
    .catch(function (err) {
      console.warn('Could not load certificates:', err.message);
      render();
    });

  document.addEventListener('langchange', function () {
    render();
  });
})();
