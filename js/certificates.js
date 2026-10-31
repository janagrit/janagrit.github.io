// Certificates section for index.html.
// To add a certificate, add one line to CERTS (newest first). Names stay in English in every language;
// only the date and the "Verify" label follow the language switch (js/i18n.js).
(function () {
  var CERTS = [
    { name: 'Claude Academy: Introduction to Model Context Protocol', issuer: 'Anthropic', date: '2026-10', url: 'https://academy.claude.com/verify/9388e5f3ad3df7265c3bc23c4c2a0ae8' }
  ];

  var LABELS = {
    en: { verify: 'Verify credential', locale: 'en-US' },
    uk: { verify: 'Перевірити сертифікат', locale: 'uk-UA' },
    ru: { verify: 'Проверить сертификат', locale: 'ru-RU' }
  };

  var grid = document.getElementById('cert-grid');
  if (!grid) return;

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  // "2026-10" -> "Oct 2026" (or the visitor's language)
  function month(value, locale) {
    var parts = value.split('-');
    return new Date(+parts[0], +parts[1] - 1, 1).toLocaleDateString(locale, { year: 'numeric', month: 'short' });
  }

  function render() {
    var labels = LABELS[document.documentElement.lang] || LABELS.en;
    grid.replaceChildren.apply(grid, CERTS.map(function (c) {
      var card = el('a', 'card art cert');
      card.href = c.url;
      card.target = '_blank';
      card.rel = 'noopener';
      card.appendChild(el('div', 'meta', c.issuer + ' · ' + month(c.date, labels.locale)));
      card.appendChild(el('h3', null, c.name));
      card.appendChild(el('span', 'more', labels.verify + ' ↗'));
      return card;
    }));
  }

  render();
  // Re-label when the visitor switches language (event sent by js/i18n.js).
  document.addEventListener('langchange', render);
})();
