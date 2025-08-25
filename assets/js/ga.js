window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
(function(cb) {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(cb);
  } else {
    setTimeout(cb, 1);
  }
})(() => {
  gtag('js', new Date());
  gtag('config', 'G-3W997HDC19', {
    page_title: document.title,
    page_location: window.location.href,
  });
});
