// Private statistics: the "Statistics" link in the footer opens a dialog that asks for the passcode every time.
// Only the passcode's SHA-256 is stored here. This hides the numbers from casual visitors; it is not real
// security (static site, and the counts are public at janagrit.goatcounter.com/counter/TOTAL.json).
(function () {
  var CODE_HASH = '07334386287751ba02a4588c1a0875dbd074a61bd9e6ab7c48d244eacd0c99e0';
  var WRONG = { en: 'Sorry, ask Iana for the code.', uk: 'Вибачте, попросіть код у Яни.', ru: 'Извините, попросите код у Яны.', es: 'Lo siento, pide el código a Iana.' };
  var modal = document.getElementById('stats');
  if (!modal) return;
  var lock = document.getElementById('stats-lock');
  var input = document.getElementById('stats-code');
  var data = document.getElementById('stats-data');
  var err = document.getElementById('stats-err');
  var loaded = false;

  // Each number lists one or more paths (space-separated) and shows their summed all-time count.
  // Needs "Allow adding visitor counts on your website" in GoatCounter settings; a path with no visits returns 404 (= 0).
  function loadCounts() {
    if (loaded) return;
    loaded = true;
    var counter = 'https://janagrit.goatcounter.com/counter/';
    var fmt = new Intl.NumberFormat('en-US');
    function count(path) {
      return fetch(counter + encodeURIComponent(path) + '.json')
        .then(function (r) { return r.status === 404 ? { count: '0' } : r.ok ? r.json() : Promise.reject(r.status); })
        .then(function (d) { return Number(String(d.count).replace(/\D/g, '')); });
    }
    document.querySelectorAll('[data-count]').forEach(function (el) {
      Promise.all(el.dataset.count.split(' ').map(count))
        .then(function (nums) { el.textContent = fmt.format(nums.reduce(function (a, b) { return a + b; }, 0)); })
        .catch(function () { /* keep the dash if the counter is unavailable */ });
    });
  }

  document.getElementById('stats-open').addEventListener('click', function () {
    lock.hidden = false;
    data.hidden = true;
    input.value = '';
    err.textContent = '';
    modal.showModal();
    input.focus();
  });
  document.getElementById('stats-close').addEventListener('click', function () { modal.close(); });
  // A click on the dimmed backdrop lands on the dialog element itself.
  modal.addEventListener('click', function (e) { if (e.target === modal) modal.close(); });

  lock.addEventListener('submit', function (e) {
    e.preventDefault();
    crypto.subtle.digest('SHA-256', new TextEncoder().encode(input.value.trim())).then(function (bytes) {
      var hash = Array.from(new Uint8Array(bytes), function (b) { return b.toString(16).padStart(2, '0'); }).join('');
      if (hash !== CODE_HASH) {
        err.textContent = WRONG[document.documentElement.lang] || WRONG.en;
        input.select();
        return;
      }
      lock.hidden = true;
      data.hidden = false;
      loadCounts();
    });
  });
})();
