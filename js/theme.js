// Light/dark switch for every page. Load in <head> (not deferred) so the theme is set before first paint.
// The visitor's saved choice wins; otherwise the page follows the OS setting, live.
(function () {
  var root = document.documentElement;
  var media = window.matchMedia('(prefers-color-scheme: dark)');
  var SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
  var MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  var button = null;

  function saved() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }

  function apply(theme) {
    root.setAttribute('data-theme', theme);
    var color = theme === 'dark' ? '#111110' : '#fdfdfc';
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) { m.setAttribute('content', color); });
    if (button) {
      // Show where the click takes you: a sun in dark mode, a moon in light mode.
      button.innerHTML = theme === 'dark' ? SUN : MOON;
      button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      button.title = button.getAttribute('aria-label');
    }
  }

  var initial = saved();
  apply(initial === 'dark' || initial === 'light' ? initial : (media.matches ? 'dark' : 'light'));

  // Follow OS changes only until the visitor makes an explicit choice.
  media.addEventListener('change', function (e) {
    if (!saved()) apply(e.matches ? 'dark' : 'light');
  });

  document.addEventListener('DOMContentLoaded', function () {
    var head = document.querySelector('.site-head');
    if (!head) return;
    button = document.createElement('button');
    button.type = 'button';
    button.className = 'theme-toggle';
    button.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('theme', next); } catch (e) { /* choice lasts for this page only */ }
      apply(next);
    });
    head.appendChild(button);
    apply(root.getAttribute('data-theme'));
  });
})();
