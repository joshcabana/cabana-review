document.addEventListener('DOMContentLoaded', function () {
  const openButtons = document.querySelectorAll('[data-mobile-open]');
  const closeButtons = document.querySelectorAll('[data-mobile-close]');
  const drawer = document.querySelector('[data-mobile-drawer]');
  const overlay = document.querySelector('[data-mobile-overlay]');

  if (!drawer || !overlay) {
    return;
  }

  /** @type {HTMLElement|null} */
  let lastActiveElement = null;

  /**
   * Return focusable elements within a container
   * @param {HTMLElement} container
   */
  function getFocusable(container) {
    return container.querySelectorAll(
      [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(', ')
    );
  }

  function openDrawer(event) {
    lastActiveElement = (event && event.currentTarget) ? /** @type {HTMLElement} */ (event.currentTarget) : document.activeElement;
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    drawer.setAttribute('aria-modal', 'true');
    document.body.classList.add('is-locked');

    // Update trigger aria-expanded
    if (event && event.currentTarget && 'setAttribute' in event.currentTarget) {
      try { event.currentTarget.setAttribute('aria-expanded', 'true'); } catch (_) {}
    }

    // Move focus to first focusable inside the drawer
    const focusables = getFocusable(drawer);
    if (focusables.length > 0) {
      /** @type {HTMLElement} */ (focusables[0]).focus();
    } else {
      if (drawer && typeof drawer.focus === 'function') {
        drawer.focus();
      }
    }
  }

  function closeDrawer(event) {
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    drawer.removeAttribute('aria-modal');
    document.body.classList.remove('is-locked');

    // Update trigger aria-expanded
    if (event && event.currentTarget && 'setAttribute' in event.currentTarget) {
      try { event.currentTarget.setAttribute('aria-expanded', 'false'); } catch (_) {}
    }

    // Restore focus to the trigger
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      try { lastActiveElement.focus(); } catch (_) {}
    }
  }

  openButtons.forEach((btn) => btn.addEventListener('click', openDrawer));
  closeButtons.forEach((btn) => btn.addEventListener('click', closeDrawer));
  overlay.addEventListener('click', closeDrawer);

  // Trap focus within drawer when open
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer(e);
      return;
    }

    if (e.key === 'Tab' && drawer.classList.contains('is-open')) {
      const focusables = Array.from(getFocusable(drawer));
      if (focusables.length === 0) return;
      const first = /** @type {HTMLElement} */ (focusables[0]);
      const last = /** @type {HTMLElement} */ (focusables[focusables.length - 1]);

      if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  });
});


