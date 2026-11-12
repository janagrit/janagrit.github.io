// Projects section for index.html, built from the GitHub API on every visit (cached 10 minutes).
// - FEATURED: hand-picked projects shown first, in this order, with a name and one-liner per language.
//   Their code link comes from the API, so a renamed repo keeps working.
// - Everything else: every own public repo that isn't a fork, archived, in SKIP, or tagged
//   "hide-from-site" is listed under "More on GitHub", newest push first. New repos appear on their own.
// The static rows in index.html stay in place if GitHub can't be reached.
(function () {
  var USER = 'janagrit';
  var SOURCES = [
    'https://api.github.com/users/' + USER + '/repos?per_page=100&sort=pushed',
    'https://api.github.com/repos/momup-app/momup-app.github.io'
  ];
  var HIDE_TOPIC = 'hide-from-site';
  // Never listed in "More on GitHub": this site.
  var SKIP = ['janagrit/janagrit.github.io'];
  // Repos from other accounts that still belong in "More on GitHub".
  var ALSO_MORE = ['momup-app/momup-app.github.io'];
  var CACHE_KEY = 'gh-projects-v1';
  var CACHE_MS = 10 * 60 * 1000; // stay well under GitHub's 60 requests/hour limit for visitors

  // repo: where the "Code" link comes from (omit for no code link). live: where the title points.
  // Main portfolio projects, shown first with a small picture or short video, in this order.
  var FEATURED = [
    {
      name: 'Job Scout Agent',
      image: 'images/job-scout-agent.jpg',
      video: 'images/job-scout-agent.mp4',
      alt: 'A friendly robot sitting next to a laptop',
      live: 'https://job-scout-agent.com/',
      stack: 'Claude API, GitHub Actions',
      desc: {
        en: 'Finds open roles that fit your CV.',
        uk: 'Знаходить відкриті ролі під ваше резюме.',
        ru: 'Находит открытые роли под ваше резюме.',
        es: 'Encuentra vacantes que encajan con tu CV.'
      }
    },
    {
      repo: 'janagrit/Moisha',
      name: 'Moisha',
      image: 'images/moisha.jpg',
      video: 'images/moisha.mp4',
      alt: 'Moisha logo: a bearded man writing next to a laptop',
      live: 'https://github.com/janagrit/Moisha',
      stack: 'React, TypeScript, Google Gemini',
      desc: {
        en: 'An AI pricing advisor for short-term rental hosts: compares nearby rates, flags empty dates, suggests nightly prices.',
        uk: 'AI-радник із цін для власників короткострокової оренди: порівнює ціни поблизу, виявляє порожні дати, пропонує ціну за ніч.',
        ru: 'AI-советник по ценам для хозяев краткосрочной аренды: сравнивает цены поблизу, находит пустые даты, предлагает цену за ночь.',
        es: 'Un asesor de precios con IA para anfitriones de alquiler vacacional: compara tarifas cercanas, detecta fechas libres y sugiere el precio por noche.'
      }
    },
    {
      repo: 'momup-app/momup-app.github.io',
      name: 'Kids Nearby',
      image: 'images/kids-nearby.jpg',
      video: 'images/kids-nearby.mp4',
      alt: 'Kids Nearby map and activity cards',
      live: 'https://momup-app.github.io/',
      stack: 'React, Mapbox, child activities',
      desc: {
        en: 'Find events and family-friendly activities nearby in Berlin.',
        uk: 'Знаходить події та сімейні активності поблизу в Берліні.',
        ru: 'Находит события и семейные активности рядом в Берлине.',
        es: 'Encuentra eventos y actividades para familias cerca de ti en Berlín.'
      }
    }
  ];

  // Extra details for repos in "More on GitHub": a live site and a description when GitHub has none.
  var EXTRAS = {
    'momup-app/momup-app.github.io': {
      name: 'Kids Nearby',
      live: 'https://momup-app.github.io/',
      description: 'Kids’ activities in Berlin, on a map. Developer and tester'
    },
    'janagrit/calendar-app': {
      live: 'https://janagrit-calendar.netlify.app/',
      description: 'A month calendar with the weather forecast on each day.'
    }
  };

  var LABELS = {
    en: { code: 'Code', live: 'Webpage' },
    uk: { code: 'Код', live: 'Вебсторінка' },
    ru: { code: 'Код', live: 'Веб-страница' },
    es: { code: 'Código', live: 'Página web' }
  };

  var list = document.getElementById('projects-list');
  var moreWrap = document.getElementById('projects-more');
  var moreList = document.getElementById('projects-more-list');
  if (!list || !moreWrap || !moreList) return;
  var repos = null;
  // Visitors who ask their device for less motion get still pictures instead of video.
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function lang() {
    return LABELS[document.documentElement.lang] ? document.documentElement.lang : 'en';
  }
  function local(value, l) {
    return typeof value === 'string' ? value : (value && (value[l] || value.en)) || '';
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

  // "houserx-site-audit" -> "Houserx site audit"
  function prettyName(name) {
    var words = name.replace(/[-_]+/g, ' ').trim();
    return words.charAt(0).toUpperCase() + words.slice(1);
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text; // textContent, never innerHTML: repo data is external input
    return node;
  }

  function link(href, text, className) {
    var a = el('a', className, text);
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener';
    return a;
  }

  // One row: the title opens `main`; the muted line holds the description and an optional second link.
  function row(title, main, description, second, image) {
    var li = el('li', image ? 'row has-thumb' : 'row');
    var text = li;
    if (image) {
      var img;
      if (image.video && !reduceMotion) {
        // A short silent loop; the still picture shows until it plays.
        img = el('video', 'thumb');
        img.src = image.video;
        img.poster = image.src;
        img.muted = true;
        img.loop = true;
        img.autoplay = true;
        img.playsInline = true;
        img.preload = 'metadata';
        img.setAttribute('aria-label', image.alt || '');
      } else {
        img = el('img', 'thumb');
        img.src = image.src;
        img.alt = image.alt || '';
        img.loading = 'lazy';
      }
      img.width = 96;
      img.height = 60;
      li.appendChild(img);
      text = el('div', 'text');
      li.appendChild(text);
    }
    text.appendChild(link(main, title, 'title'));
    var desc = el('span', 'desc', description);
    if (second) {
      desc.appendChild(document.createTextNode(description ? ' · ' : ''));
      desc.appendChild(link(second.href, second.text));
    }
    text.appendChild(desc);
    return li;
  }

  function isVisible(repo) {
    var topics = repo.topics || [];
    return !repo.fork && !repo.archived && !repo.private && topics.indexOf(HIDE_TOPIC) === -1;
  }

  function render() {
    var l = lang();
    var labels = LABELS[l];
    var byName = {};
    repos.forEach(function (r) { byName[r.full_name] = r; });

    var featuredRows = [];
    FEATURED.forEach(function (f) {
      var repo = f.repo ? byName[f.repo] : null;
      var code = repo && isVisible(repo) ? safeUrl(repo.html_url) : null;
      var main = f.live || code;
      if (!main) return; // repo gone or hidden, and no live site: drop the row
      var text = local(f.desc, l) + ' ' + local(f.stack, l);
      featuredRows.push(row(f.name, main, text, f.live && code ? { href: code, text: labels.code } : null,
        f.image ? { src: f.image, video: f.video, alt: f.alt } : null));
    });
    list.replaceChildren.apply(list, featuredRows);

    var featured = FEATURED.map(function (f) { return f.repo; });
    var more = repos
      .filter(function (r) {
        return r.owner && (r.owner.login === USER || ALSO_MORE.indexOf(r.full_name) !== -1) && isVisible(r) &&
          SKIP.indexOf(r.full_name) === -1 && featured.indexOf(r.full_name) === -1;
      })
      .sort(function (a, b) { return new Date(b.pushed_at) - new Date(a.pushed_at); })
      .map(function (r) {
        var extra = EXTRAS[r.full_name] || {};
        var code = safeUrl(r.html_url);
        var pages = r.has_pages ? 'https://' + USER + '.github.io/' + encodeURIComponent(r.name) + '/' : null;
        var live = extra.live || safeUrl(r.homepage) || pages;
        var description = [extra.description || r.description, r.language].filter(Boolean).join(' · ');
        return row(extra.name || prettyName(r.name), code, description, live ? { href: live, text: labels.live } : null);
      });
    moreList.replaceChildren.apply(moreList, more);
    moreWrap.hidden = more.length === 0;
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

  function getJson(url) {
    return fetch(url, { headers: { Accept: 'application/vnd.github+json' } }).then(function (res) {
      if (!res.ok) throw new Error('GitHub API returned ' + res.status + ' for ' + url);
      return res.json();
    });
  }

  function load() {
    var cached = readCache();
    if (cached) return Promise.resolve(cached);
    return Promise.all([
      getJson(SOURCES[0]),
      getJson(SOURCES[1]).catch(function () { return null; }) // the extra repo is optional
    ]).then(function (results) {
      if (!Array.isArray(results[0])) throw new Error('Unexpected GitHub API response');
      var data = results[0].concat(results[1] ? [results[1]] : []);
      writeCache(data);
      return data;
    });
  }

  load()
    .then(function (data) {
      repos = data;
      render();
    })
    .catch(function (err) {
      // The static rows in index.html stay as they are.
      console.warn('Could not load GitHub projects:', err.message);
    });

  // Re-label the rows when the visitor switches language (event sent by js/i18n.js).
  document.addEventListener('langchange', function () {
    if (repos) render();
  });
})();
