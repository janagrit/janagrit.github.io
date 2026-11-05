// Certificates section for index.html.
// Rows come from data/certificates.json, which scripts/linkedin-certs.mjs builds from the LinkedIn
// export (see data/linkedin/README.md). Names stay in English; the month follows the language switch.
(function () {
  var LOCALES = { en: 'en-US', uk: 'uk-UA', ru: 'ru-RU', es: 'es-ES' };

  var section = document.getElementById('certificates');
  var list = document.getElementById('cert-list');
  if (!section || !list) return;
  var certs = null;

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

  // "2026-10" -> "Oct 2026" (or the visitor's language); "2026" stays as is
  function month(value, locale) {
    if (!value) return '';
    var parts = value.split('-');
    if (parts.length < 2) return parts[0];
    return new Date(+parts[0], +parts[1] - 1, 1).toLocaleDateString(locale, { year: 'numeric', month: 'short' });
  }

  function render() {
    var locale = LOCALES[document.documentElement.lang] || LOCALES.en;
    list.replaceChildren.apply(list, certs.map(function (c) {
      var li = el('li', 'row');
      var url = safeUrl(c.url);
      var title;
      if (url) {
        title = el('a', 'title', c.name);
        title.href = url;
        title.target = '_blank';
        title.rel = 'noopener';
      } else {
        title = el('span', 'title', c.name);
      }
      li.appendChild(title);
      li.appendChild(el('span', 'desc', [c.issuer, month(c.date, locale)].filter(Boolean).join(' · ')));
      return li;
    }));
    section.hidden = certs.length === 0;
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
    });

  // Re-label the month when the visitor switches language (event sent by js/i18n.js).
  document.addEventListener('langchange', function () {
    if (certs) render();
  });
})();
