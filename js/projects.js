// Projects section for index.html, built from the GitHub API on every visit (cached 10 minutes).
// - FEATURED: hand-picked projects shown first, in this order, with media and a one-liner per language.
// - SELECTED: additional projects shown directly below the featured rows.
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
  // Never listed in "More on GitHub".
  var SKIP = [
    'janagrit/janagrit.github.io',
    'janagrit/cedar-test-platform',
    'janagrit/houserx-site-audit',
    'janagrit/dili-qa-skeleton',
    'janagrit/calendar-app',
    'janagrit/campaign'
  ];
  // Repos from other accounts that still belong in "More on GitHub".
  var ALSO_MORE = ['momup-app/momup-app.github.io'];
  var CACHE_KEY = 'gh-projects-v1';
  var CACHE_MS = 10 * 60 * 1000; // stay well under GitHub's 60 requests/hour limit for visitors

  // repo: where the "Code" link comes from (omit for no code link). live: where the title points.
  // videoSrc opens in the demo dialog; image is the project-specific thumbnail.
  var FEATURED = [
    {
      name: 'Job Scout Agent',
      image: 'images/job-scout.jpg',
      alt: 'Job Scout application interface',
      videoSrc: 'images/job-scout-agent.mp4',
      videoCaption: 'Automated daily CV-to-role matching workflow using Claude API and GitHub Actions.',
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
      videoSrc: 'images/moisha.mp4',
      videoCaption: 'Comparing nearby short-term rental rates, spotting empty dates, and suggesting nightly pricing.',
      alt: 'Moisha short-term rental pricing advisor illustration',
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
      image: 'images/momup.jpg',
      videoSrc: 'images/kids-nearby.mp4',
      videoCaption: 'Browsing local family-friendly events and activities across Berlin neighborhoods on an interactive map.',
      alt: 'Kids Nearby activities website in Berlin',
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

  var SELECTED = [
    {
      repo: 'janagrit/jobscout_rag_overlay',
      name: 'Job Scout RAG Overlay',
      description: 'AI job-search assistant: discovery, matching, skill gaps, tailored resumes.'
    },
    {
      repo: 'janagrit/uptic-site-audit',
      name: 'Full Audit for Uptic Hospitality',
      description: 'A test suite built from scratch for Uptic Hospitality.'
    },
    {
      repo: 'janagrit/voice-agent-eval-harness',
      name: 'Voice Agent Eval Harness',
      description: 'Adversarial testing for an AI voice agent.'
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
  var selectedList = document.getElementById('projects-selected-list');
  var moreWrap = document.getElementById('projects-more');
  var moreList = document.getElementById('projects-more-list');
  if (!list || !selectedList || !moreWrap || !moreList) return;
  var repos = null;

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

  function row(title, main, description, second, media, compact) {
    var li = el('li', compact ? 'row compact-project-row' : 'row project-row');
    var titleLink = link(main, title, 'title');

    if (media) {
      li.classList.add('has-thumb');
      var img = el('img', 'thumb');
      img.src = media.src;
      img.alt = media.alt || '';
      img.width = 96;
      img.height = 60;
      img.loading = 'lazy';
      li.appendChild(img);

      var text = el('div', 'text');
      var head = el('div', 'project-head');
      head.appendChild(titleLink);
      head.appendChild(el('span', 'project-separator', '·'));
      var demo = el('button', 'project-demo', 'Video demo');
      demo.type = 'button';
      demo.setAttribute('data-video-src', media.videoSrc);
      demo.setAttribute('data-video-caption', media.videoCaption);
      demo.setAttribute('data-video-stack', media.videoStack || '');
      demo.setAttribute('data-video-href', main);
      demo.setAttribute('data-video-title', title);
      head.appendChild(demo);
      text.appendChild(head);
      text.appendChild(el('span', 'desc', description));
      li.appendChild(text);
      return li;
    }

    li.appendChild(titleLink);
    var desc = el('span', 'desc', description);
    if (second) {
      desc.appendChild(document.createTextNode(description ? ' · ' : ''));
      desc.appendChild(link(second.href, second.text));
    }
    li.appendChild(desc);
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
      var text = [local(f.desc, l), local(f.stack, l)].filter(Boolean).join(' ');
      featuredRows.push(row(f.name, main, text, f.live && code ? { href: code, text: labels.code } : null,
        { src: f.image, alt: f.alt, videoSrc: f.videoSrc, videoCaption: f.videoCaption, videoStack: local(f.stack, l) }));
    });
    list.replaceChildren.apply(list, featuredRows);

    selectedList.replaceChildren.apply(selectedList, SELECTED.map(function (project) {
      return row(project.name, 'https://github.com/' + project.repo, project.description, null, null, true);
    }));

    var featured = FEATURED.map(function (f) { return f.repo; }).concat(SELECTED.map(function (project) { return project.repo; }));
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
        return row(extra.name || prettyName(r.name), code, description, live ? { href: live, text: labels.live } : null, null, true);
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
