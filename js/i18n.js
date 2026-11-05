// Language switch for index.html: English, Ukrainian, Russian, Spanish.
// English lives in the HTML (search engines and no-JS visitors get it). Other languages live here,
// keyed by each element's data-i18n attribute. Keep every language in sync when the page copy changes.
// Project and certificate rows are built by js/projects.js and js/certificates.js, which keep their own labels.
// Job titles stay in English. Translations avoid gendered verb forms.
(function () {
  var GH = '<a href="https://github.com/janagrit" target="_blank" rel="noopener">GitHub</a>';
  var LI = '<a href="https://www.linkedin.com/in/ianagrytsenko" target="_blank" rel="noopener">LinkedIn</a>';

  var LANGS = {
    uk: {
      title: 'Яна Гриценко · Senior SDET | Iana Notebook',
      desc: 'Яна Гриценко, Senior SDET у Нью-Йорку: надійне програмне забезпечення, інфраструктура автоматизації тестування та застосунки на основі AI.',
      text: {
        'label.today': 'Сьогодні',
        'intro.p': 'Створюю надійне програмне забезпечення, інфраструктуру автоматизації тестування та застосунки на основі AI, на практиці працюю з Claude і Google Gemini.',
        'intro.loc': 'Нью-Йорк, США. ' + GH + ', ' + LI + ', <a href="mailto:ianagrytsenko@gmail.com">Email</a>.',
        'label.projects': 'Проєкти',
        'label.more': 'Більше на GitHub',
        'label.writing': 'Статті',
        'label.certs': 'Сертифікати',
        'w.omni.t': 'Розумніший стек для AI-розробки: ECC + OmniRoute',
        'w.omni.d': 'Приватна, потрібен код. Англійською.',
        'w.dream.t': 'Шлях до роботи мрії',
        'w.dream.d': 'Визначте її, знайдіть і покажіть себе. Англійською.',
        'w.noise.t': 'Крізь шум навколо AI-агентів',
        'w.noise.d': 'Порівняння Hermes Agent, ECC, oh-my-claudecode і Arena. Англійською.',
        'w.claude.t': 'Як я тестую з Claude Code',
        'w.claude.d': 'Швидше і дешевше тестування з ECC та oh-my-claudecode. Англійською.',
        'w.twoqa.t': 'Два типи QA',
        'w.twoqa.d': 'Навчалися до AI і разом з ним. Англійською.',
        'w.resume.t': '5 покращень резюме',
        'w.resume.d': 'Готові AI-промпти, менш ніж за 5 хвилин. Англійською та російською.'
      }
    },

    ru: {
      title: 'Яна Гриценко · Senior SDET | Iana Notebook',
      desc: 'Яна Гриценко, Senior SDET в Нью-Йорке: надёжное программное обеспечение, инфраструктура автоматизации тестирования и приложения на основе AI.',
      text: {
        'label.today': 'Сегодня',
        'intro.p': 'Создаю надёжное программное обеспечение, инфраструктуру автоматизации тестирования и приложения на основе AI, на практике работаю с Claude и Google Gemini.',
        'intro.loc': 'Нью-Йорк, США. ' + GH + ', ' + LI + ', <a href="mailto:ianagrytsenko@gmail.com">Email</a>.',
        'label.projects': 'Проекты',
        'label.more': 'Больше на GitHub',
        'label.writing': 'Статьи',
        'label.certs': 'Сертификаты',
        'w.omni.t': 'Более умный стек для AI-разработки: ECC + OmniRoute',
        'w.omni.d': 'Приватная, нужен код. На английском.',
        'w.dream.t': 'Путь к работе мечты',
        'w.dream.d': 'Определите её, найдите и покажите себя. На английском.',
        'w.noise.t': 'Сквозь шум вокруг AI-агентов',
        'w.noise.d': 'Сравнение Hermes Agent, ECC, oh-my-claudecode и Arena. На английском.',
        'w.claude.t': 'Как я тестирую с Claude Code',
        'w.claude.d': 'Быстрее и дешевле тестирование с ECC и oh-my-claudecode. На английском.',
        'w.twoqa.t': 'Два типа QA',
        'w.twoqa.d': 'Учились до AI и вместе с ним. На английском.',
        'w.resume.t': '5 улучшений резюме',
        'w.resume.d': 'Готовые AI-промпты, меньше чем за 5 минут.',
        'w.resume.href': 'articles/resume-improvements.html?lang=ru'
      }
    },

    es: {
      title: 'Iana Grytsenko · Senior SDET | Iana Notebook',
      desc: 'Iana Grytsenko, Senior SDET en Nueva York: software fiable, infraestructura de automatización de pruebas y aplicaciones con IA.',
      text: {
        'label.today': 'Hoy',
        'intro.p': 'Construyo software fiable, infraestructura de automatización de pruebas y aplicaciones con IA, trabajando a diario con Claude y Google Gemini.',
        'intro.loc': 'Desde Nueva York, EE. UU. ' + GH + ', ' + LI + ', <a href="mailto:ianagrytsenko@gmail.com">Email</a>.',
        'label.projects': 'Proyectos',
        'label.more': 'Más en GitHub',
        'label.writing': 'Artículos',
        'label.certs': 'Certificados',
        'w.omni.t': 'Un stack de desarrollo con IA más inteligente: ECC + OmniRoute',
        'w.omni.d': 'Privado, requiere código. En inglés.',
        'w.dream.t': 'El camino al trabajo de tus sueños',
        'w.dream.d': 'Defínelo, encuéntralo y demuéstralo. En inglés.',
        'w.noise.t': 'Entre tanto ruido sobre agentes de IA',
        'w.noise.d': 'Hermes Agent, ECC, oh-my-claudecode y Arena comparados. En inglés.',
        'w.claude.t': 'Cómo pruebo con Claude Code',
        'w.claude.d': 'Pruebas más rápidas y baratas con ECC y oh-my-claudecode. En inglés.',
        'w.twoqa.t': 'Dos tipos de QA',
        'w.twoqa.d': 'Antes de la IA y con ella. En inglés.',
        'w.resume.t': '5 mejoras para tu CV',
        'w.resume.d': 'Prompts de IA listos para copiar, en menos de 5 minutos. En inglés y ruso.'
      }
    }
  };
  var SUPPORTED = ['en', 'uk', 'ru', 'es'];
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
    // Content built later by other scripts (js/projects.js, js/certificates.js) listens for this to re-label itself.
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
