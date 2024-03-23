if ('serviceWorker' in navigator) {
  try {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service worker registration failed:', error);
      });
  } catch (error) {
    console.error('Service Worker registration failed with exception:', error);
  }
}