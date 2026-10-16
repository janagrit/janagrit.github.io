// English / Russian switch for index.html.
// English lives in the HTML (search engines and no-JS visitors get it). Russian lives here,
// keyed by each element's data-i18n attribute. Keep both in sync when the page copy changes.
(function () {
  var RU = {
    'nav.services': 'Услуги',
    'nav.projects': 'Проекты',
    'nav.articles': 'Статьи',
    'nav.process': 'Как я работаю',
    'nav.about': 'Обо мне',
    'nav.contact': 'Связаться',
    'tab.contact': 'Контакты',

    'hero.title': 'Инженерия качества<br>от и до',
    'hero.sub': 'Автоматизация тестирования, тестирование AI-агентов, API, производительность и доступность. Проектирует и пишет код один инженер.',
    'hero.who': 'Яна Гриценко &middot; Архитектор автоматизации тестирования &middot; SDET',
    'cta.call': 'Созвониться на 30 минут',

    'stats.years': 'лет в QA и автоматизации тестирования',
    'stats.lines': 'продуктовых линий автоматизировано единственным SDET в команде',
    'stats.coverage': 'больше автотестового покрытия после миграции с Cypress на Playwright',
    'stats.flaky': 'меньше ложных падений из-за нестабильных тестов',

    'svc.title': 'Один QA-инженер.<br>Весь стек качества.',
    'svc.lead': 'От первого теста до релизного пайплайна и от интерфейса до очередей за ним. Я проектирую стратегию и пишу код своими руками.',
    'svc.ai.h': 'Тестирование AI',
    'svc.ai.what': 'Доказательство, что ваш AI-агент ведёт себя как надо, ещё до того, как клиенты заметят обратное.',
    'svc.ai.list': '<li>Состязательная (adversarial) оценка AI-агентов</li><li>Собственные метрики оценки на DeepEval</li><li>Регрессионные проверки при смене модели</li><li>End-to-end тесты через интерфейс</li><li>Написание тестов с AI: Claude Code и MCP</li><li>Ревью качества тестов, написанных AI</li>',
    'svc.ai.proof': '<b>10/10</b> атак отражено голосовым AI-агентом под тестом',
    'svc.auto.h': 'Автоматизация тестирования',
    'svc.auto.what': 'Фреймворки, построенные как продакшн-код, чтобы команда пользовалась ими и после моего ухода.',
    'svc.auto.list': '<li>Фреймворки с нуля: Playwright, Cypress, Selenium</li><li>Миграция на Playwright</li><li>Спасение нестабильных тест-сьютов</li><li>Компонентное, интеграционное и E2E-тестирование</li><li>Десктоп и мобильный веб</li><li>CI/CD: GitHub Actions, Azure DevOps, GitLab, Jenkins</li>',
    'svc.auto.proof': '<b>9 недель</b> до полного end-to-end фреймворка на legal-tech платформе',
    'svc.api.h': 'API, бэкенд и производительность',
    'svc.api.what': 'Проверки для того, чего пользователи не видят, но всегда чувствуют.',
    'svc.api.list': '<li>Тестирование REST и GraphQL API</li><li>Контрактное тестирование между сервисами</li><li>Событийная архитектура AWS: Lambda, SQS, SNS</li><li>Устойчивость: повторы, идемпотентность, dead-letter очереди</li><li>Нагрузочное тестирование и пропускная способность</li><li>Мониторинг продакшна с CloudWatch и Allure</li>',
    'svc.api.proof': '<b>5+</b> продуктовых линий на микросервисах AWS покрыты одним инженером по автоматизации',
    'svc.audit.h': 'Аудит качества сайтов',
    'svc.audit.what': 'Простым языком: что отпугивает клиентов с бизнес-сайта и что исправить в первую очередь.',
    'svc.audit.list': '<li>Доступность по WCAG 2.2 AA</li><li>Технические SEO-проверки</li><li>Битые ссылки</li><li>Мобильная вёрстка и переполнение</li><li>Визуальная регрессия</li><li>Отчёт с находками, отсортированными по влиянию</li>',
    'svc.audit.proof': '<b>19 пройдено, 3 упало</b> при первом запуске для Uptic Hospitality, и каждое падение превратилось в исправление',
    'engage.h': 'Форматы работы',
    'engage.p': 'Выберите то, что подходит под задачу.',
    'engage.list': '<li><b>Работа в штате</b><span>Senior SDET, Test Architect, Staff QA</span></li><li><b>Контракт</b><span>Присоединюсь к вашей команде на проект</span></li><li><b>Аудит с фиксированным объёмом</b><span>Понятный финиш и письменный отчёт</span></li><li><b>Консалтинг</b><span>Стратегия, ревью и коучинг</span></li>',

    'proj.title': 'Недавние работы',
    'p1.tags': '<span class="tag">Тестирование AI</span>',
    'p1.h': 'Состязательная оценка голосового AI-агента',
    'p1.result': '10/10 атак отражено',
    'p1.p': 'Харнесс на DeepEval атакует голосового ассистента сценариями из набора данных и оценивает его собственными метриками раскрытия информации. Регрессионная проверка роняет сборку, если любая метрика опускается ниже базовой.',
    'p1.role': '<b>Стек</b> Python, DeepEval, Playwright + TypeScript, GitHub Actions',
    'p1.links': '<a href="https://github.com/janagrit/aviaryai-eval-demo" target="_blank" rel="noopener">Код</a>',
    'p2.alt': 'Главная страница Kids Nearby: поиск детских занятий в Берлине',
    'p2.tags': '<span class="tag live">Работает</span><span class="tag">QA</span>',
    'p2.result': 'Живое приложение, 3 языка',
    'p2.p': 'Приложение для родителей в Берлине: детские занятия на карте, игровые встречи, распродажи детской одежды с ежедневной рассылкой и закрытый чат для участников. На немецком, английском и русском.',
    'p2.role': '<b>Моя роль</b> QA-инженер, тестирую приложение для <a href="https://www.instagram.com/momup_app/" target="_blank" rel="noopener">@momup_app</a>',
    'p2.links': '<a href="https://momup-app.github.io/" target="_blank" rel="noopener">Открыть приложение</a>',
    'p3.alt': 'Страница статьи Uptic Hospitality: Independent Hotels Should Think Independently',
    'p3.tags': '<span class="tag wip">В работе</span><span class="tag">Автоматизация</span>',
    'p3.h': 'Uptic Hospitality: автоматизация тестирования с нуля',
    'p3.result': '19 пройдено, 3 упало',
    'p3.p': 'Тесты на Playwright + TypeScript, построенные с нуля, начиная со <a href="https://uptichospitality.com/independent-hotels-should-think-independently/" target="_blank" rel="noopener">статьи &laquo;Independent hotels&raquo;</a>: SEO, доступность, ссылки, мобильная версия и визуальные проверки. Каждое падение становится исправлением в списке приоритетов.',
    'p3.role': '<b>Стек</b> TypeScript, Playwright, axe-core',
    'p3.links': '<a href="https://github.com/janagrit/uptic-site-audit" target="_blank" rel="noopener">Код</a>',
    'build.k': 'Сейчас в работе',
    'build.k6': '<b>Демо нагрузочного тестирования на k6</b><p>Нагрузочные тесты API с порогами pass/fail, запускаются в GitHub Actions.</p>',
    'build.agent': '<b>AI-агент, который чинит падающие тесты</b><p>Claude Code с MCP-сервером: читает падения тестов и открывает pull request с исправлением.</p>',

    'art.title': 'Заметки из практики',
    'art.noise': '<div class="meta">AI-инструменты &middot; 6 мин &middot; на английском</div><h3>Сквозь шум вокруг AI-агентов: сравнение Hermes Agent, ECC и Arena</h3><p>Три популярных проекта на GitHub и три разные задачи. Сравнительные таблицы: что это, где применять и зачем.</p><span class="more">Читать статью &rarr;</span>',
    'art.resume': '<div class="meta">Советы &middot; EN / RU &middot; меньше 5 мин</div><h3>5 улучшений резюме: меньше чем за 5 минут</h3><p>Готовые AI-промпты: прочитайте резюме глазами рекрутера, перепишите его через результаты, пройдите ATS-фильтры и подстройте под каждую вакансию.</p><span class="more">Взять промпты &rarr;</span>',
    'art.resume.href': 'articles/resume-improvements.html?lang=ru',
    'art.twoqa': '<div class="meta">Профессия QA &middot; 6 мин &middot; на английском</div><h3>Два типа QA: учились до AI и вместе с ним</h3><p>Разные сильные стороны, разные слепые зоны и чему каждому стоит поучиться у другого.</p><span class="more">Читать статью &rarr;</span>',
    'art.claude': '<div class="meta">QA с AI &middot; 5 мин &middot; на английском</div><h3>Как я тестирую с Claude Code</h3><p>Правильный старт, сначала падающий тест, каждый прогон больше одного раза и планка качества, ниже которой AI не опустится.</p><span class="more">Читать статью &rarr;</span>',
    'art.soon': '<div class="meta">Скоро</div><h3>Видео и новые статьи</h3><p>Разборы нагрузочного тестирования на k6 и AI-агента, который чинит падающие тесты.</p>',

    'proc.title': 'Чёткий объём<br>и понятный финиш.',
    'proc.1': '<b>Знакомство</b><p>Бесплатный 30-минутный звонок, затем я изучаю ваш код, CI и тесты. До начала работы вы получаете письменный план с объёмом и сроками.</p>',
    'proc.2': '<b>Разработка</b><p>Тесты и изменения пайплайна приходят небольшими pull request&rsquo;ами с ревью, а раз в неделю вы получаете отчёт: что запускается и что поймано.</p>',
    'proc.3': '<b>Передача</b><p>Документация, записанный разбор и совместные сессии, чтобы ваша команда владела тестами и после моего ухода.</p>',

    'about.alt': 'Яна Гриценко улыбается, стоя в дверном проёме в Нью-Йорке',
    'about.facts': '<div><dt>Где я</dt><dd>Нью-Йорк / Вашингтон</dd></div><div><dt>Формат работы</dt><dd>Удалённо, гибрид или в офисе</dd></div><div><dt>Основной стек</dt><dd>Playwright, TypeScript, Cypress, Selenium, Java</dd></div><div><dt>Языки</dt><dd>English, Українська, 中文</dd></div>',
    'about.teams': 'Опыт в командах',

    'contact.eyebrow': 'Контакты',
    'contact.title': 'Давайте поговорим о качестве вашего продукта.',
    'contact.lead': 'Рассматриваю роли Senior SDET, Test Architect и Staff QA, в штат или по контракту, а также консалтинговые проекты.',
    'contact.cv': 'Резюме по запросу',
    'footer.city': 'Нью-Йорк / Вашингтон'
  };
  var RU_TITLE = 'Яна Гриценко | Инженерия качества от и до';
  var RU_DESC = 'Яна Гриценко, архитектор автоматизации тестирования и SDET: автоматизация тестирования, тестирование AI-агентов, API, производительности и доступности.';
  var STORAGE_KEY = 'lang';

  var root = document.documentElement;
  var descMeta = document.querySelector('meta[name="description"]');
  var buttons = document.querySelectorAll('.langs button');

  // Remember the English that is in the HTML so we can switch back without a reload.
  function snapshot(selector, read) {
    return Array.prototype.map.call(document.querySelectorAll(selector), function (el) {
      return { el: el, en: read(el) };
    });
  }
  var texts = snapshot('[data-i18n]', function (el) { return el.innerHTML; });
  var alts = snapshot('[data-i18n-alt]', function (el) { return el.getAttribute('alt'); });
  var hrefs = snapshot('[data-i18n-href]', function (el) { return el.getAttribute('href'); });
  var en = { title: document.title, desc: descMeta ? descMeta.content : '' };

  function pick(lang, item, key, fallback) {
    return lang === 'ru' && RU[item.el.getAttribute(key)] !== undefined ? RU[item.el.getAttribute(key)] : fallback;
  }

  function apply(lang) {
    texts.forEach(function (t) { t.el.innerHTML = pick(lang, t, 'data-i18n', t.en); });
    alts.forEach(function (t) { t.el.setAttribute('alt', pick(lang, t, 'data-i18n-alt', t.en)); });
    hrefs.forEach(function (t) { t.el.setAttribute('href', pick(lang, t, 'data-i18n-href', t.en)); });
    document.title = lang === 'ru' ? RU_TITLE : en.title;
    if (descMeta) descMeta.content = lang === 'ru' ? RU_DESC : en.desc;
    root.setAttribute('lang', lang);
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.set === lang)); });
  }

  // Storage can be blocked (private mode, strict settings); the switch still works without it.
  function readStored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }
  function store(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* per-visit choice only */ }
  }

  function initialLang() {
    var fromUrl = new URLSearchParams(location.search).get('lang');
    if (fromUrl === 'ru' || fromUrl === 'en') return fromUrl;
    var stored = readStored();
    if (stored === 'ru' || stored === 'en') return stored;
    return (navigator.language || '').toLowerCase().indexOf('ru') === 0 ? 'ru' : 'en';
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      var lang = b.dataset.set;
      apply(lang);
      store(lang);
      var url = new URL(location.href);
      url.searchParams.set('lang', lang);
      history.replaceState(null, '', url);
    });
  });

  apply(initialLang());
})();
