// 쉬운청약 Service Worker
const CACHE_NAME = 'chengyak-v1';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim());
});

// 푸시 알림 수신
self.addEventListener('push', (e) => {
  if (!e.data) return;
  const data = e.data.json();
  e.waitUntil(
    self.registration.showNotification(data.title || '쉬운청약', {
      body: data.body || '',
      icon: '/icon.png',
      badge: '/icon.png',
      tag: data.tag || 'chengyak',
      data: data.data || {}
    })
  );
});

// 알림 클릭 시 앱 열기
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow('/');
    })
  );
});
