// Article pages: gives every section heading an id and a link icon that shows on hover,
// so a reader can copy a link to that section. Private articles call addAnchors() after decrypting.
(function () {
  var ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M10 19l-.17.17a4 4 0 0 1-5.66 0l-.34-.34a4 4 0 0 1 0-5.66L7.17 9.83a4 4 0 0 1 5.66 0l.34.34c.65.65 1.03 1.48 1.14 2.33" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M9.69 12.5c.1.85.49 1.68 1.14 2.33l.34.34a4 4 0 0 0 5.66 0l3.34-3.34a4 4 0 0 0 0-5.66l-.34-.34a4 4 0 0 0-5.66 0L14 6"  stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

  function slug(text) {
    return text.toLowerCase().trim()
      .replace(/[^\p{L}\p{N}]+/gu, '-')
      .replace(/^-+|-+$/g, '') || 'section';
  }

  function addAnchors(root) {
    var used = {};
    document.querySelectorAll('[id]').forEach(function (n) { used[n.id] = true; });
    (root || document).querySelectorAll('article h2').forEach(function (h) {
      if (h.querySelector('.anchor')) return;
      if (!h.id) {
        // Use the visible text only (skip the "01" number and hidden language copies).
        var copy = h.cloneNode(true);
        copy.querySelectorAll('.n, [data-l="ru"]').forEach(function (n) { n.remove(); });
        var id = slug(copy.textContent), base = id, i = 2;
        while (used[id]) id = base + '-' + i++;
        h.id = id;
      }
      used[h.id] = true;
      var a = document.createElement('a');
      a.className = 'anchor';
      a.href = '#' + h.id;
      a.setAttribute('aria-label', 'Link to this section');
      a.innerHTML = ICON;
      h.insertBefore(a, h.firstChild);
    });
    // Ids are added after load, so jump to the section ourselves when the URL names one.
    if (location.hash) {
      var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target && (!root || root.contains(target))) target.scrollIntoView();
    }
  }

  window.addAnchors = addAnchors;
  addAnchors(document);
})();
