if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/sw-0.0.5.js', { scope: '/' })})}