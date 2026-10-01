// public/sw.js
// Bu dosya sitemiz kapansa bile arka planda nöbet tutan işçimizdir.

// Sunucudan (veya test aracından) gelen "PUSH" sinyalini dinliyoruz
self.addEventListener('push', function(event) {
  const options = {
    body: 'Merhaba! Bugün sayfalar arasında kaybolmaya ne dersin? Kaldığın yerden devam etmek için tıkla ✨',
    icon: 'https://cdn-icons-png.flaticon.com/512/2232/2232688.png',
    vibrate: [200, 100, 200],
    data: {
      url: 'http://localhost:5173'
    }
  };

  event.waitUntil(
    self.registration.showNotification('📚 Okuma Saati Geldi!', options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
