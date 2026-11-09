// Language switch for index.html: English, Ukrainian, Russian, Spanish.
// English lives in the HTML (search engines and no-JS visitors get it). Other languages live here,
// keyed by each element's data-i18n attribute. Keep every language in sync when the page copy changes.
// Project and certificate rows are built by js/projects.js and js/certificates.js, which keep their own labels.
// Job titles stay in English. Translations avoid gendered verb forms.
(function () {
  var GH = '<a href="https://github.com/janagrit" target="_blank" rel="noopener">GitHub</a>';
  var LI = '<a href="https://www.linkedin.com/in/ianagrytsenko" target="_blank" rel="noopener">LinkedIn</a>';
  function call(label) { return '<a href="https://calendly.com/ianagrytsenko/30min" target="_blank" rel="noopener">' + label + '</a>.'; }

  var LANGS = {
    uk: {
      title: 'Яна Гриценко · Senior SDET · AI Quality Engineering | Iana Notebook',
      desc: 'Яна Гриценко, Senior SDET (AI Quality Engineering) у Нью-Йорку: надійне програмне забезпечення, інфраструктура автоматизації тестування та застосунки на основі AI.',
      text: {
        'label.today': 'Сьогодні',
        'intro.p': 'Створюю надійне програмне забезпечення, інфраструктуру автоматизації тестування та застосунки на основі AI, на практиці працюю з Claude і Google Gemini.',
        'intro.loc': 'Нью-Йорк, США. ' + GH + ', ' + LI + ', <a href="mailto:ianagrytsenko@gmail.com">Email</a>. ' + call('Запланувати 30-хвилинний дзвінок'),
        'label.projects': 'Проєкти',
        'label.more': 'Більше на GitHub',
        'label.writing': 'Статті',
        'label.certs': 'Сертифікати',
        'w.aiqe.t': 'Від Senior SDET до AI Quality Engineering: регресійний фреймворк для AI-агентів',
        'w.aiqe.d': 'Власні метрики, змагальні сценарії та регресійний гейт у CI для мок-агента голосового банкінгу. Англійською.',
        'nav.stats': 'Статистика',
        'stats.sub': 'Відвідування сайту з початку підрахунку. Рахує GoatCounter, без cookies.',
        'stats.code': 'Введіть код',
        'stats.open': 'Відкрити',
        'stats.total': 'Усього відвідувань',
        'stats.home': 'Головна сторінка',
        'stats.hr': 'Сторінка для HR',
        'stats.articles': 'Прочитання статей',
        'stats.byArticle': 'За статтями'
      }
    },

    ru: {
      title: 'Яна Гриценко · Senior SDET · AI Quality Engineering | Iana Notebook',
      desc: 'Яна Гриценко, Senior SDET (AI Quality Engineering) в Нью-Йорке: надёжное программное обеспечение, инфраструктура автоматизации тестирования и приложения на основе AI.',
      text: {
        'label.today': 'Сегодня',
        'intro.p': 'Создаю надёжное программное обеспечение, инфраструктуру автоматизации тестирования и приложения на основе AI, на практике работаю с Claude и Google Gemini.',
        'intro.loc': 'Нью-Йорк, США. ' + GH + ', ' + LI + ', <a href="mailto:ianagrytsenko@gmail.com">Email</a>. ' + call('Созвониться на 30 минут'),
        'label.projects': 'Проекты',
        'label.more': 'Больше на GitHub',
        'label.writing': 'Статьи',
        'label.certs': 'Сертификаты',
        'w.aiqe.t': 'От Senior SDET к AI Quality Engineering: регрессионный фреймворк для AI-агентов',
        'w.aiqe.d': 'Собственные метрики, состязательные сценарии и регрессионный гейт в CI для мок-агента голосового банкинга. На английском.',
        'nav.stats': 'Статистика',
        'stats.sub': 'Посещения сайта с начала подсчёта. Считает GoatCounter, без cookies.',
        'stats.code': 'Введите код',
        'stats.open': 'Открыть',
        'stats.total': 'Всего посещений',
        'stats.home': 'Главная страница',
        'stats.hr': 'Страница для HR',
        'stats.articles': 'Прочтения статей',
        'stats.byArticle': 'По статьям'
      }
    },

    es: {
      title: 'Iana Grytsenko · Senior SDET · AI Quality Engineering | Iana Notebook',
      desc: 'Iana Grytsenko, Senior SDET (AI Quality Engineering) en Nueva York: software fiable, infraestructura de automatización de pruebas y aplicaciones con IA.',
      text: {
        'label.today': 'Hoy',
        'intro.p': 'Construyo software fiable, infraestructura de automatización de pruebas y aplicaciones con IA, trabajando a diario con Claude y Google Gemini.',
        'intro.loc': 'Desde Nueva York, EE. UU. ' + GH + ', ' + LI + ', <a href="mailto:ianagrytsenko@gmail.com">Email</a>. ' + call('Agendar una llamada de 30 minutos'),
        'label.projects': 'Proyectos',
        'label.more': 'Más en GitHub',
        'label.writing': 'Artículos',
        'label.certs': 'Certificados',
        'w.aiqe.t': 'De Senior SDET a AI Quality Engineering: un framework de regresión para agentes de IA',
        'w.aiqe.d': 'Métricas propias, escenarios adversarios y una barrera de regresión en CI para un agente de voz bancario simulado. En inglés.',
        'nav.stats': 'Estadísticas',
        'stats.sub': 'Visitas al sitio desde que empezó el conteo. Las cuenta GoatCounter, sin cookies.',
        'stats.code': 'Introduce el código',
        'stats.open': 'Abrir',
        'stats.total': 'Visitas totales',
        'stats.home': 'Página principal',
        'stats.hr': 'Página para RR. HH.',
        'stats.articles': 'Lecturas de artículos',
        'stats.byArticle': 'Por artículo'
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
