(() => {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
        }
      });
    },
    { rootMargin: '120px 0px' }
  );
  document.querySelectorAll('[data-animate]').forEach((el) => io.observe(el));
})();
