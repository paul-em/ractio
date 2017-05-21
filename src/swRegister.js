function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i += 1) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

if ('serviceWorker' in navigator) {
  let swRegistration = null;

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then((registration) => {
        swRegistration = registration;
        return navigator.serviceWorker.ready;
      })
      .then(() => swRegistration.pushManager.getSubscription())
      .then((subscription) => {
        if (subscription) {
          console.log('existing push subscription');
          return subscription;
        }
        return fetch('/api/push-key')
          .then(res => res.text())
          .then(key => swRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlB64ToUint8Array(key),
          }))
          .then((newSubscription) => {
            console.log('new subscription', newSubscription);

            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            return fetch('/api/push-register', {
              method: 'POST',
              body: JSON.stringify(newSubscription),
              headers,
            });
          });
      })
      .then(() => swRegistration.sync.register('myFirstSync'))
      .catch((err) => {
        console.log('error register service worker', err);
      });
  });
}
