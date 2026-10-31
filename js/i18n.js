// Language switch for index.html: English, Ukrainian, Russian.
// English lives in the HTML (search engines and no-JS visitors get it). Other languages live here,
// keyed by each element's data-i18n attribute. Keep every language in sync when the page copy changes.
(function () {
  var LANGS = {
    uk: {
      title: 'Iana Notebook | Інженерія якості від і до',
      desc: 'Яна Гриценко, архітектор автоматизації тестування та SDET: автоматизація тестування, тестування AI-агентів, API, продуктивності та доступності.',
      text: {
        'nav.projects': 'Проєкти',
        'nav.articles': 'Статті',
        'nav.scout': 'Знайди роботу мрії!',
        'nav.stats': 'Статистика',
        'nav.call': 'Запланувати дзвінок',
        'hero.projects': 'Переглянути проєкти',
        'proj.sub': 'Що я створюю і тестую.',
        'tab.contact': 'Контакти',

        'hero.title': 'Інженерія якості від і до',
        'hero.sub': 'Автоматизація тестування, тестування AI-агентів, API, продуктивність і доступність. Проєктує і пише код один інженер.',
        'hero.who': 'Яна Гриценко &middot; Архітектор автоматизації тестування &middot; SDET',
        'cta.call': 'Запланувати 30-хвилинний дзвінок',

        'p1.tags': '<span class="tag">Тестування AI</span>',
        'p1.h': 'Змагальна оцінка голосового AI-агента',
        'p1.p': 'Харнес на DeepEval атакує тестового банківського голосового агента сценаріями prompt injection, витоку даних, видавання себе за іншу людину та галюцинацій і оцінює його детермінованими метриками. Регресійна перевірка зупиняє збірку, якщо будь-яка оцінка опускається нижче базової.',
        'p1.role': '<b>Стек</b> Python, DeepEval, pytest, GitHub Actions',
        'p1.links': '<a href="https://github.com/janagrit/aviaryai-eval-demo" target="_blank" rel="noopener">Код</a>',
        'p2.alt': 'Головна сторінка Kids Nearby: пошук дитячих занять у Берліні',
        'p2.tags': '<span class="tag live">Працює</span><span class="tag">QA</span>',
        'p2.p': 'Застосунок для батьків у Берліні: дитячі заняття на мапі, ігрові зустрічі, розпродажі дитячого одягу зі щоденною розсилкою та закритий чат для учасників. Німецькою, англійською та російською.',
        'p2.role': '<b>Моя роль</b> Розробка і тестування, створюю застосунок для <a href="https://www.instagram.com/momup_app/" target="_blank" rel="noopener">@momup_app</a>',
        'p2.links': '<a href="https://momup-app.github.io/" target="_blank" rel="noopener">Відкрити застосунок</a>',
        'p3.alt': 'Сторінка статті Uptic Hospitality: Independent Hotels Should Think Independently',
        'p3.tags': '<span class="tag wip">У роботі</span><span class="tag">Автоматизація</span>',
        'p3.h': 'Uptic Hospitality: автоматизація тестування з нуля',
        'p3.p': 'Тести на Playwright + TypeScript, створені з нуля, починаючи зі <a href="https://uptichospitality.com/independent-hotels-should-think-independently/" target="_blank" rel="noopener">статті &laquo;Independent hotels&raquo;</a>: SEO, доступність, посилання, мобільна версія та візуальні перевірки. Кожне падіння стає виправленням у списку пріоритетів.',
        'p3.role': '<b>Стек</b> TypeScript, Playwright, axe-core',
        'p3.links': '<a href="https://github.com/janagrit/uptic-site-audit" target="_blank" rel="noopener">Код</a>',
        'p4.alt': 'Головна сторінка Job Scout: Find the jobs your CV fits',
        'p4.tags': '<span class="tag live">Працює</span><span class="tag">AI-агент</span>',
        'p4.p': 'Перевіряє власні дошки вакансій компаній (Greenhouse, Ashby, Lever, Workable, SmartRecruiters) і показує, які відкриті ролі підходять під ваше резюме. Швидкий пошук працює в браузері, тож резюме нікуди не завантажується.',
        'p4.role': '<b>Стек</b> Claude API, GitHub Actions',
        'p4.links': '<a href="https://job-scout-agent.com/" target="_blank" rel="noopener">Відкрити Job Scout</a>',
        'gh.title': 'Більше на GitHub',
        'gh.all': 'Усі репозиторії на GitHub',

        'nav.certs': 'Сертифікати',
        'cert.sub': 'Курси та сертифікати, кожен з посиланням для перевірки.',
        'art.title': 'Нотатки з практики',
        'art.dream': '<div class="meta">Кар&rsquo;єра &middot; 7 хв &middot; англійською</div><h3>Шлях до роботи мрії: визначте її, знайдіть і покажіть себе</h3><p>Складіть свій список, знайдіть компанії, які йому відповідають, і покажіть їм демо того, як виглядатиме робота з вами.</p><span class="more">Читати статтю &rarr;</span>',
        'art.noise': '<div class="meta">AI-інструменти &middot; 10 хв &middot; англійською</div><h3>Крізь шум навколо AI-агентів: порівняння Hermes Agent, ECC, oh-my-claudecode і Arena</h3><p>Чотири популярні проєкти на GitHub і чотири різні задачі. Порівняльні таблиці: що це, де застосовувати і навіщо.</p><span class="more">Читати статтю &rarr;</span>',
        'art.resume': '<div class="meta">Поради &middot; EN / RU &middot; менше 5 хв</div><h3>5 покращень резюме менш ніж за 5 хвилин</h3><p>Готові AI-промпти: прочитайте резюме очима рекрутера, перепишіть його через результати, пройдіть ATS-фільтри та адаптуйте під кожну вакансію.</p><span class="more">Отримати промпти &rarr;</span>',
        'art.twoqa': '<div class="meta">Професія QA &middot; 6 хв &middot; англійською</div><h3>Два типи QA: навчалися до AI і разом з ним</h3><p>Різні сильні сторони, різні сліпі зони і чого кожному варто навчитися в іншого.</p><span class="more">Читати статтю &rarr;</span>',
        'art.soon': '<div class="meta">Незабаром</div><h3>Відео та нові статті</h3><p>Розбори навантажувального тестування на k6 і AI-агента, який виправляє тести, що падають.</p>',

        'stats.sub': 'Відвідування сайту з початку підрахунку. Рахує GoatCounter, без cookies.',
        'stats.code': 'Введіть код',
        'stats.open': 'Відкрити',
        'stats.total': 'Усього відвідувань',
        'stats.home': 'Головна сторінка',
        'stats.hr': 'Сторінка для HR',
        'stats.articles': 'Прочитання статей',

        'contact.title': 'Поговорімо про якість вашого продукту.',
        'contact.lead': 'Розглядаю ролі Senior SDET, Test Architect і Staff QA, у штат або за контрактом, а також консалтингові проєкти.',
        'footer.city': 'Нью-Йорк / Вашингтон'
      }
    },

    ru: {
      title: 'Iana Notebook | Инженерия качества от и до',
      desc: 'Яна Гриценко, архитектор автоматизации тестирования и SDET: автоматизация тестирования, тестирование AI-агентов, API, производительности и доступности.',
      text: {
        'nav.projects': 'Проекты',
        'nav.articles': 'Статьи',
        'nav.scout': 'Найди работу мечты!',
        'nav.stats': 'Статистика',
        'nav.call': 'Созвониться',
        'hero.projects': 'Смотреть проекты',
        'proj.sub': 'Что я создаю и тестирую.',
        'tab.contact': 'Контакты',

        'hero.title': 'Инженерия качества от и до',
        'hero.sub': 'Автоматизация тестирования, тестирование AI-агентов, API, производительность и доступность. Проектирует и пишет код один инженер.',
        'hero.who': 'Яна Гриценко &middot; Архитектор автоматизации тестирования &middot; SDET',
        'cta.call': 'Созвониться на 30 минут',

        'p1.tags': '<span class="tag">Тестирование AI</span>',
        'p1.h': 'Состязательная оценка голосового AI-агента',
        'p1.p': 'Харнесс на DeepEval атакует тестового банковского голосового агента сценариями prompt injection, утечки данных, выдачи себя за другого человека и галлюцинаций и оценивает его детерминированными метриками. Регрессионная проверка роняет сборку, если любая оценка опускается ниже базовой.',
        'p1.role': '<b>Стек</b> Python, DeepEval, pytest, GitHub Actions',
        'p1.links': '<a href="https://github.com/janagrit/aviaryai-eval-demo" target="_blank" rel="noopener">Код</a>',
        'p2.alt': 'Главная страница Kids Nearby: поиск детских занятий в Берлине',
        'p2.tags': '<span class="tag live">Работает</span><span class="tag">QA</span>',
        'p2.p': 'Приложение для родителей в Берлине: детские занятия на карте, игровые встречи, распродажи детской одежды с ежедневной рассылкой и закрытый чат для участников. На немецком, английском и русском.',
        'p2.role': '<b>Моя роль</b> Разработка и тестирование, создаю приложение для <a href="https://www.instagram.com/momup_app/" target="_blank" rel="noopener">@momup_app</a>',
        'p2.links': '<a href="https://momup-app.github.io/" target="_blank" rel="noopener">Открыть приложение</a>',
        'p3.alt': 'Страница статьи Uptic Hospitality: Independent Hotels Should Think Independently',
        'p3.tags': '<span class="tag wip">В работе</span><span class="tag">Автоматизация</span>',
        'p3.h': 'Uptic Hospitality: автоматизация тестирования с нуля',
        'p3.p': 'Тесты на Playwright + TypeScript, построенные с нуля, начиная со <a href="https://uptichospitality.com/independent-hotels-should-think-independently/" target="_blank" rel="noopener">статьи &laquo;Independent hotels&raquo;</a>: SEO, доступность, ссылки, мобильная версия и визуальные проверки. Каждое падение становится исправлением в списке приоритетов.',
        'p3.role': '<b>Стек</b> TypeScript, Playwright, axe-core',
        'p3.links': '<a href="https://github.com/janagrit/uptic-site-audit" target="_blank" rel="noopener">Код</a>',
        'p4.alt': 'Главная страница Job Scout: Find the jobs your CV fits',
        'p4.tags': '<span class="tag live">Работает</span><span class="tag">AI-агент</span>',
        'p4.p': 'Проверяет собственные доски вакансий компаний (Greenhouse, Ashby, Lever, Workable, SmartRecruiters) и показывает, какие открытые роли подходят под ваше резюме. Быстрый поиск работает в браузере, поэтому резюме никуда не загружается.',
        'p4.role': '<b>Стек</b> Claude API, GitHub Actions',
        'p4.links': '<a href="https://job-scout-agent.com/" target="_blank" rel="noopener">Открыть Job Scout</a>',
        'gh.title': 'Больше на GitHub',
        'gh.all': 'Все репозитории на GitHub',

        'nav.certs': 'Сертификаты',
        'cert.sub': 'Курсы и сертификаты, у каждого есть ссылка для проверки.',
        'art.title': 'Заметки из практики',
        'art.dream': '<div class="meta">Карьера &middot; 7 мин &middot; на английском</div><h3>Путь к работе мечты: определите её, найдите и покажите себя</h3><p>Составьте свой список, найдите компании, которые ему подходят, и покажите им демо того, как будет выглядеть работа с вами.</p><span class="more">Читать статью &rarr;</span>',
        'art.noise': '<div class="meta">AI-инструменты &middot; 10 мин &middot; на английском</div><h3>Сквозь шум вокруг AI-агентов: сравнение Hermes Agent, ECC, oh-my-claudecode и Arena</h3><p>Четыре популярных проекта на GitHub и четыре разные задачи. Сравнительные таблицы: что это, где применять и зачем.</p><span class="more">Читать статью &rarr;</span>',
        'art.resume': '<div class="meta">Советы &middot; EN / RU &middot; меньше 5 мин</div><h3>5 улучшений резюме: меньше чем за 5 минут</h3><p>Готовые AI-промпты: прочитайте резюме глазами рекрутера, перепишите его через результаты, пройдите ATS-фильтры и подстройте под каждую вакансию.</p><span class="more">Взять промпты &rarr;</span>',
        'art.resume.href': 'articles/resume-improvements.html?lang=ru',
        'art.twoqa': '<div class="meta">Профессия QA &middot; 6 мин &middot; на английском</div><h3>Два типа QA: учились до AI и вместе с ним</h3><p>Разные сильные стороны, разные слепые зоны и чему каждому стоит поучиться у другого.</p><span class="more">Читать статью &rarr;</span>',
        'art.soon': '<div class="meta">Скоро</div><h3>Видео и новые статьи</h3><p>Разборы нагрузочного тестирования на k6 и AI-агента, который чинит падающие тесты.</p>',

        'stats.sub': 'Посещения сайта с начала подсчёта. Считает GoatCounter, без cookies.',
        'stats.code': 'Введите код',
        'stats.open': 'Открыть',
        'stats.total': 'Всего посещений',
        'stats.home': 'Главная страница',
        'stats.hr': 'Страница для HR',
        'stats.articles': 'Прочтения статей',

        'contact.title': 'Давайте поговорим о качестве вашего продукта.',
        'contact.lead': 'Рассматриваю роли Senior SDET, Test Architect и Staff QA, в штат или по контракту, а также консалтинговые проекты.',
        'footer.city': 'Нью-Йорк / Вашингтон'
      }
    }
  };
  var SUPPORTED = ['en', 'uk', 'ru'];
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

  // A missing translation falls back to the English already in the HTML.
  function pick(dict, item, attr) {
    var value = dict && dict.text[item.el.getAttribute(attr)];
    return value !== undefined ? value : item.en;
  }

  function apply(lang) {
    var dict = LANGS[lang];
    texts.forEach(function (t) { t.el.innerHTML = pick(dict, t, 'data-i18n'); });
    alts.forEach(function (t) { t.el.setAttribute('alt', pick(dict, t, 'data-i18n-alt')); });
    hrefs.forEach(function (t) { t.el.setAttribute('href', pick(dict, t, 'data-i18n-href')); });
    document.title = dict ? dict.title : en.title;
    if (descMeta) descMeta.content = dict ? dict.desc : en.desc;
    root.setAttribute('lang', lang);
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.set === lang)); });
    // Content built later by other scripts (js/github-projects.js) listens for this to re-label itself.
    document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
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
    if (SUPPORTED.indexOf(fromUrl) !== -1) return fromUrl;
    var stored = readStored();
    if (SUPPORTED.indexOf(stored) !== -1) return stored;
    var browser = (navigator.language || '').toLowerCase().slice(0, 2);
    return SUPPORTED.indexOf(browser) !== -1 ? browser : 'en';
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
