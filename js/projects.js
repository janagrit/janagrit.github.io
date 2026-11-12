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

  // Featured projects render as three equal cards (media, info, stack tags, actions).
  // repo: where the "GitHub" link comes from (omit for none). live: the live site (omit for none).
  // category: filter key ('ai-agent' | 'full-stack' | other); badge: the label shown next to the name.
  // stack: verified against each repo's config (package.json, wrangler.jsonc, README) on 2026-11-12.
  // videoSrc opens in the demo dialog; image is the project-specific thumbnail.
  var FEATURED = [
    {
      repo: null, // job-scout-agent is not public
      name: 'Job Scout Agent',
      category: 'ai-agent',
      badge: 'AI Agent',
      image: 'images/job-scout.jpg',
      alt: 'Job Scout application interface',
      videoSrc: 'images/job-scout-agent.mp4',
      videoCaption: 'Automated daily CV-to-role matching workflow using Claude API and GitHub Actions.',
      live: 'https://job-scout-agent.com/',
      stack: ['Claude API', 'TypeScript', 'Cloudflare D1', 'GitHub Actions', 'Brave Search'],
      desc: {
        en: 'An AI-powered job discovery and application tracking platform that finds relevant opportunities, evaluates CV-to-job compatibility, and automates candidate assessment.',
        uk: 'Платформа на базі AI для пошуку вакансій і відстеження відгуків: знаходить релевантні можливості, оцінює відповідність резюме вакансії та автоматизує оцінку кандидата.',
        ru: 'Платформа на базе AI для поиска вакансий и отслеживания откликов: находит подходящие возможности, оценивает соответствие резюме вакансии и автоматизирует оценку кандидата.',
        es: 'Una plataforma con IA para descubrir empleos y seguir candidaturas: encuentra oportunidades relevantes, evalúa la compatibilidad del CV con cada puesto y automatiza la evaluación del candidato.'
      }
    },
    {
      repo: 'janagrit/Moisha',
      name: 'Moisha',
      category: 'web',
      badge: 'Web App',
      image: 'images/moisha.jpg',
      videoSrc: 'images/moisha.mp4',
      videoCaption: 'Comparing nearby short-term rental rates, spotting empty dates, and suggesting nightly pricing.',
      alt: 'Moisha short-term rental pricing advisor illustration',
      stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
      desc: {
        en: 'An Airbnb pricing advisor for short-term rental hosts that helps evaluate comparable listings, identify pricing opportunities, and optimize nightly rates.',
        uk: 'Радник із цін Airbnb для власників короткострокової оренди: допомагає порівнювати схожі оголошення, знаходити цінові можливості та оптимізувати ціну за ніч.',
        ru: 'Советник по ценам Airbnb для хозяев краткосрочной аренды: помогает сравнивать похожие объявления, находить ценовые возможности и оптимизировать цену за ночь.',
        es: 'Un asesor de precios de Airbnb para anfitriones de alquiler vacacional que ayuda a comparar anuncios similares, detectar oportunidades de precio y optimizar la tarifa por noche.'
      }
    },
    {
      repo: 'momup-app/momup-app.github.io',
      name: 'Kids Nearby',
      category: 'full-stack',
      badge: 'Full-Stack',
      image: 'images/momup.jpg',
      videoSrc: 'images/kids-nearby.mp4',
      videoCaption: 'Browsing local family-friendly events and activities across Berlin neighborhoods on an interactive map.',
      alt: 'Kids Nearby activities website in Berlin',
      live: 'https://momup-app.github.io/',
      stack: ['JavaScript', 'Leaflet', 'OpenStreetMap', 'Supabase', 'GitHub Actions'],
      desc: {
        en: 'A platform for discovering family-friendly activities and events in Berlin, with interactive neighborhood filtering and map-based discovery.',
        uk: 'Платформа для пошуку сімейних активностей і подій у Берліні з інтерактивною фільтрацією за районами та пошуком на карті.',
        ru: 'Платформа для поиска семейных занятий и событий в Берлине с интерактивной фильтрацией по районам и поиском на карте.',
        es: 'Una plataforma para descubrir actividades y eventos para familias en Berlín, con filtros interactivos por barrio y búsqueda en el mapa.'
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
    en: { code: 'Code', live: 'Webpage', site: 'Live site', demo: 'Video demo' },
    uk: { code: 'Код', live: 'Вебсторінка', site: 'Сайт', demo: 'Відеодемо' },
    ru: { code: 'Код', live: 'Веб-страница', site: 'Сайт', demo: 'Видеодемо' },
    es: { code: 'Código', live: 'Página web', site: 'Sitio web', demo: 'Vídeo demo' }
  };

  var list = document.getElementById('projects-list');
  var filters = document.getElementById('projects-filters');
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

  // Compact text row for "More projects" and "More on GitHub".
  function row(title, main, description, second) {
    var li = el('li', 'row compact-project-row');
    var titleLink = link(main, title, 'title');
    li.appendChild(titleLink);
    var desc = el('span', 'desc', description);
    if (second) {
      desc.appendChild(document.createTextNode(description ? ' · ' : ''));
      desc.appendChild(link(second.href, second.text));
    }
    li.appendChild(desc);
    return li;
  }

  function videoAttrs(node, f, href, l) {
    node.setAttribute('data-video-src', f.videoSrc);
    node.setAttribute('data-video-caption', f.videoCaption);
    node.setAttribute('data-video-stack', f.stack.join(' · '));
    node.setAttribute('data-video-href', href);
    node.setAttribute('data-video-title', f.name);
  }

  // One card: media (opens the demo), name + badge, description, stack tags, actions footer.
  function card(f, code, l) {
    var labels = LABELS[l];
    var main = f.live || code;
    var li = el('li', 'project-card');
    li.setAttribute('data-category', f.category);

    var media = el('button', 'pc-media');
    media.type = 'button';
    media.setAttribute('aria-label', f.name + ': ' + labels.demo);
    videoAttrs(media, f, main || '#', l);
    var img = el('img');
    img.src = f.image;
    img.alt = f.alt || '';
    img.width = 640;
    img.height = 400;
    img.loading = 'lazy';
    media.appendChild(img);
    media.appendChild(el('span', 'pc-play', '▶'));
    li.appendChild(media);

    var body = el('div', 'pc-body');
    var head = el('div', 'pc-head');
    var h = el('h3', 'pc-title');
    if (main) h.appendChild(link(main, f.name));
    else h.textContent = f.name;
    head.appendChild(h);
    head.appendChild(el('span', 'pc-badge pc-badge--' + f.category, f.badge));
    body.appendChild(head);
    body.appendChild(el('p', 'pc-desc', local(f.desc, l)));
    var tags = el('ul', 'pc-tags');
    tags.setAttribute('aria-label', 'Tech stack');
    f.stack.forEach(function (t) { tags.appendChild(el('li', null, t)); });
    body.appendChild(tags);
    li.appendChild(body);

    var actions = el('div', 'pc-actions');
    var demo = el('button', 'pc-demo', '▶ ' + labels.demo);
    demo.type = 'button';
    videoAttrs(demo, f, main || '#', l);
    actions.appendChild(demo);
    if (f.live) actions.appendChild(link(f.live, labels.site + ' ↗'));
    if (code) actions.appendChild(link(code, 'GitHub ↗'));
    li.appendChild(actions);
    return li;
  }

  // Category filters work on whatever cards are in the list (static HTML or rendered).
  var activeFilter = 'all';
  function applyFilter() {
    if (!filters) return;
    filters.querySelectorAll('button[data-filter]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-filter') === activeFilter));
    });
    list.querySelectorAll('.project-card').forEach(function (c) {
      c.hidden = activeFilter !== 'all' && c.getAttribute('data-category') !== activeFilter;
    });
  }
  if (filters) {
    filters.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-filter]');
      if (!b) return;
      activeFilter = b.getAttribute('data-filter');
      applyFilter();
    });
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

    var featuredCards = [];
    FEATURED.forEach(function (f) {
      var repo = f.repo ? byName[f.repo] : null;
      var code = repo && isVisible(repo) ? safeUrl(repo.html_url) : null;
      // The GitHub link only appears while the repo is public; the card itself always stays (it has a demo).
      featuredCards.push(card(f, code, l));
    });
    list.replaceChildren.apply(list, featuredCards);
    applyFilter();

    selectedList.replaceChildren.apply(selectedList, SELECTED.map(function (project) {
      return row(project.name, 'https://github.com/' + project.repo, project.description, null);
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
