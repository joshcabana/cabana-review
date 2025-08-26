// Load GA only on production domain, and always defer to idle
(function(){
  var isProd = /cabanacollections\.com\.au$/.test(location.hostname);
  if(!isProd) return;
  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  function init(){
    var s=document.createElement('script');
    s.async=true; s.src='https://www.googletagmanager.com/gtag/js?id=G-3W997HDC19';
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', 'G-3W997HDC19', { page_title: document.title, page_location: window.location.href });
    // expose minimal api
    window.gtag = gtag;
  }
  if('requestIdleCallback' in window){ requestIdleCallback(init); }
  else { window.addEventListener('load', function(){ setTimeout(init, 1); }); }
})();
