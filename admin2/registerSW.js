if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/VitePackage/vite-vue3/admin/sw.js', { scope: '/VitePackage/vite-vue3/admin/' })})}