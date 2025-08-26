document.addEventListener('DOMContentLoaded', function(){
  var media = document.querySelector('.cabana-hero-media');
  if(!media) return;
  var isDesktop = window.matchMedia('(min-width: 768px)').matches;
  var saveData = navigator.connection && navigator.connection.saveData;
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!isDesktop || saveData || prefersReduced) return;
  var attach = function(){
    // Replace the <img> with a <video> for desktop only
    var videoSrc = media.getAttribute('data-video-src');
    if(!videoSrc) return;
    var img = media.querySelector('img');
    var video = document.createElement('video');
    video.setAttribute('preload','none');
    video.setAttribute('playsinline','');
    video.setAttribute('muted','');
    video.setAttribute('loop','');
    video.className = 'w-full h-full object-cover';
    var source = document.createElement('source');
    source.src = videoSrc;
    source.type = 'video/mp4';
    video.appendChild(source);
    try { media.replaceChild(video, img); } catch(e){}
    try { video.load(); video.play().catch(function(){}); } catch(e){}
  };
  if('requestIdleCallback' in window){ requestIdleCallback(attach); } else { setTimeout(attach, 1); }
});

