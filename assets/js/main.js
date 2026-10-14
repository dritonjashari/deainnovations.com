// DEA Innovations — small enhancements. Every page works without this file:
// it adds the mobile menu, the before/after slider and the copy-email button.
(function () {
  'use strict';

  /* Mobile navigation. --------------------------------------------------- */
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  function setNav(open) {
    header.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (header && toggle && nav) {
    toggle.addEventListener('click', function () {
      setNav(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('nav-open')) {
        setNav(false);
        toggle.focus();
      }
    });
    window.matchMedia('(min-width: 901px)').addEventListener('change', function (e) {
      if (e.matches) setNav(false);
    });
  }

  /* Before/after slider. -------------------------------------------------- */
  document.querySelectorAll('[data-compare]').forEach(function (box) {
    var range = box.querySelector('.compare-range');
    var clip = box.querySelector('[data-compare-clip]');
    var viewWidth = Number(clip.getAttribute('data-width'));

    function update() {
      var value = Number(range.value);
      box.style.setProperty('--pos', value + '%');
      clip.setAttribute('width', (viewWidth * value / 100).toFixed(1));
    }

    range.addEventListener('input', update);
    update();
  });

  /* Copy-to-clipboard buttons (hidden until this script runs). ----------- */
  document.querySelectorAll('[data-copy]').forEach(function (button) {
    var label = button.querySelector('span');
    var original = label.textContent;
    var timer = null;
    button.hidden = false;

    function confirmCopied() {
      button.classList.add('is-copied');
      label.textContent = 'Copied';
      clearTimeout(timer);
      timer = setTimeout(function () {
        button.classList.remove('is-copied');
        label.textContent = original;
      }, 2000);
    }

    function fallbackCopy(text) {
      var field = document.createElement('textarea');
      field.value = text;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      try {
        if (document.execCommand('copy')) confirmCopied();
      } catch (e) { /* nothing more we can do */ }
      document.body.removeChild(field);
    }

    button.addEventListener('click', function () {
      var text = button.getAttribute('data-copy');
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(confirmCopied, function () { fallbackCopy(text); });
      } else {
        fallbackCopy(text);
      }
    });
  });

  /* Footer year. ---------------------------------------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
