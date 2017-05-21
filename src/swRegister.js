if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then((registration) => {
        console.log('service worker registration successful', registration);
      })
      .catch((err) => {
        console.log('error register service worker', err);
      });
  });
}
