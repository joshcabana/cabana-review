// Lightweight performance helpers used across pages
(function () {
  var reduceMotion = false;
  try {
    reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch (_) {}

  // Pause videos when offscreen (respect reduced motion)
  if (!reduceMotion) {
    var videos = document.querySelectorAll('video[data-offscreen-pause]');
    if ('IntersectionObserver' in window && videos.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var vid = entry.target;
          if (entry.isIntersecting) {
            if (vid.paused) {
              vid.play().catch(function () {});
            }
          } else {
            try {
              vid.pause();
            } catch (_) {}
          }
        });
      }, { threshold: 0.05 });
      videos.forEach(function (v) { io.observe(v); });
    }
  } else {
    // If user prefers reduced motion, ensure videos are paused and not autoplaying
    try {
      document.querySelectorAll('video').forEach(function (v) {
        v.pause();
        v.removeAttribute('autoplay');
      });
    } catch (_) {}
  }

  // Defer heavy work until idle
  (window.requestIdleCallback || function (cb) { setTimeout(cb, 150); })(function () {
    // Preconnect commonly used origins if not already present
    var origins = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'];
    origins.forEach(function (href) {
      if (!document.querySelector('link[rel="preconnect"][href="' + href + '"]')) {
        var link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = href;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
    });
  });
})();


