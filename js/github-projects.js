// Live "More on GitHub" list for index.html.
// Every visit reads the public repo list from the GitHub API, so a new repo shows up on its own.
// Shown: the user's own repos. Left out: forks, archived repos, the site repo, repos that already
// have a hand-made card above, and any repo with the topic "hide-from-site".
(function () {
  var USER = 'janagrit';
  var API_URL = 'https://api.github.com/users/' + USER + '/repos?per_page=100&sort=created';
  var HIDE_TOPIC = 'hide-from-site';
  var ALWAYS_SKIP = ['janagrit.github.io', 'aviaryai-eval-demo', 'uptic-site-audit'];
  var MAX_TAGS = 3;
  var CACHE_KEY = 'gh-repos';
  var CACHE_MS = 10 * 60 * 1000; // stay well under GitHub's 60 requests/hour limit for visitors

  var LABELS = {
    en: { code: 'Code', live: 'Webpage', updated: 'Updated', locale: 'en-US' },
    uk: { code: 'Код', live: 'Вебсторінка', updated: 'Оновлено', locale: 'uk-UA' },
    ru: { code: 'Код', live: 'Веб-страница', updated: 'Обновлено', locale: 'ru-RU' }
  };

  var wrap = document.getElementById('gh-more');
  var grid = document.getElementById('gh-grid');
  if (!wrap || !grid) return;
  var repos = [];

  function currentLabels() {
    return LABELS[document.documentElement.lang] || LABELS.en;
  }

  function isShown(repo) {
    var topics = repo.topics || [];
    return !repo.fork && !repo.archived && !repo.private &&
      ALWAYS_SKIP.indexOf(repo.name) === -1 && topics.indexOf(HIDE_TOPIC) === -1;
  }

  // "houserx-site-audit" -> "Houserx site audit"
  function prettyName(name) {
    var words = name.replace(/[-_]+/g, ' ').trim();
    return words.charAt(0).toUpperCase() + words.slice(1);
  }

  // Only real web links become clickable; anything else from the API is ignored.
  function safeUrl(value) {
    try {
      var url = new URL(value);
      return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : null;
    } catch (e) {
      return null;
    }
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text; // textContent, never innerHTML: repo data is external input
    return node;
  }

  function link(href, text) {
    var a = el('a', null, text);
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener';
    return a;
  }

  function card(repo, labels) {
    var article = el('article', 'card repo');
    var updated = new Date(repo.pushed_at || repo.updated_at)
      .toLocaleDateString(labels.locale, { year: 'numeric', month: 'short', day: 'numeric' });
    var meta = [repo.language, labels.updated + ' ' + updated].filter(Boolean).join(' · ');
    article.appendChild(el('div', 'meta', meta));
    article.appendChild(el('h3', null, prettyName(repo.name)));
    if (repo.description) article.appendChild(el('p', null, repo.description));

    var topics = (repo.topics || []).filter(function (t) { return t !== HIDE_TOPIC; }).slice(0, MAX_TAGS);
    if (topics.length) {
      var tags = el('div', 'tags');
      topics.forEach(function (t) { tags.appendChild(el('span', 'tag', t)); });
      article.appendChild(tags);
    }

    var links = el('p', 'links');
    var code = safeUrl(repo.html_url);
    // The repo's "Website" field wins; otherwise fall back to its GitHub Pages site, if it has one.
    var pages = repo.has_pages ? 'https://' + USER + '.github.io/' + encodeURIComponent(repo.name) + '/' : null;
    var live = safeUrl(repo.homepage) || pages;
    if (code) links.appendChild(link(code, labels.code));
    if (live) links.appendChild(link(live, labels.live));
    article.appendChild(links);
    return article;
  }

  function render() {
    var labels = currentLabels();
    grid.replaceChildren.apply(grid, repos.map(function (r) { return card(r, labels); }));
    wrap.hidden = repos.length === 0;
  }

  function readCache() {
    try {
      var saved = JSON.parse(sessionStorage.getItem(CACHE_KEY));
      return saved && Date.now() - saved.at < CACHE_MS ? saved.data : null;
    } catch (e) {
      return null;
    }
  }

  function writeCache(data) {
    try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data: data })); } catch (e) { /* cache is optional */ }
  }

  function load() {
    var cached = readCache();
    if (cached) return Promise.resolve(cached);
    return fetch(API_URL, { headers: { Accept: 'application/vnd.github+json' } })
      .then(function (res) {
        if (!res.ok) throw new Error('GitHub API returned ' + res.status);
        return res.json();
      })
      .then(function (data) {
        if (!Array.isArray(data)) throw new Error('Unexpected GitHub API response');
        writeCache(data);
        return data;
      });
  }

  load()
    .then(function (data) {
      repos = data.filter(isShown).sort(function (a, b) {
        return new Date(b.created_at) - new Date(a.created_at);
      });
      render();
    })
    .catch(function (err) {
      // The section stays hidden; the "All repositories on GitHub" link below still works.
      console.warn('Could not load GitHub projects:', err.message);
    });

  // Re-label the cards when the visitor switches language (event sent by js/i18n.js).
  document.addEventListener('langchange', function () {
    if (repos.length) render();
  });
})();
