document.addEventListener('DOMContentLoaded', function(){
  var wrapper = document.querySelector('.philosophy');
  if(!wrapper) return;
  function mount(){
    wrapper.classList.add('philosophy--mounted');
    var isDesktop = window.matchMedia('(min-width: 768px)').matches;
    var saveData = navigator.connection && navigator.connection.saveData;
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(isDesktop && !saveData && !prefersReduced){
      var video = document.getElementById('philosophyVideo');
      if(video){
        // Promote poster/background only after mount if desired
        var src = video.querySelector('source[type="video/mp4"][data-src]');
        if(src && !src.src){ src.src = src.getAttribute('data-src'); }
        try { video.load(); video.play().catch(function(){}); } catch(e){}
      }
    }
  }
  function scheduleMount(){ if('requestIdleCallback' in window){ requestIdleCallback(mount); } else { setTimeout(mount, 1); } }
  var io = new IntersectionObserver(function(entries, obs){
    entries.forEach(function(entry){
      if(entry.isIntersecting){ scheduleMount(); obs.unobserve(entry.target); }
    });
  }, { rootMargin: '200px 0px', threshold: 0.01 });
  io.observe(wrapper);
});

