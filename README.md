# React Projelerim

Bu depo, React, Vite ve Tailwind CSS kullanılarak geliştirilmiş kişisel takip uygulamalarını içermektedir. Projeler, verileri tarayıcının yerel depolama alanında (LocalStorage) tutarak oturumlar arası veri kalıcılığı sağlar.

## İçindeki Projeler

### 1. 📚 Dijital Kütüphanem (`book-tracker-app`)
Okuduğunuz veya okumayı planladığınız kitapları takip edebileceğiniz bir dijital kütüphane uygulaması.

**🔗 Canlı Demo:** https://react-projelerim.vercel.app/

<img width="1850" height="960" alt="Screenshot" src="https://github.com/user-attachments/assets/53de0fa0-2301-4458-9647-1cc93e7975bb" />


- **Özellikler:**
  - Yeni kitap ekleme (Kitap Adı, Yazar, Yayınevi, Sayfa Sayısı).
  - Kitap durumlarını güncelleme (Okunması Planlanıyor, Okunuyor, Bitti).
  - Başlangıç ve bitiş tarihlerini otomatik takip etme.
  - Kitaplar arasında arama yapma.
  - Okuma durumlarına göre otomatik dağılım grafiği.

---

### 2. 💼 İş Başvurusu Takip Sistemi (`job-tracker`)
İş arama sürecinizi kolaylaştırmak ve yaptığınız başvuruları düzenli bir şekilde takip edebilmek için tasarlanmış uygulama.

**🔗 Canlı Demo:** https://react-projelerim-mfyh.vercel.app

<img width="1847" height="967" alt="screenshot" src="https://github.com/user-attachments/assets/499cdd99-9613-4027-9204-6a988794f1ec" />


- **Özellikler:**
  - Yeni iş başvurusu ekleme (Şirket, Pozisyon, Başvuru Tarihi).
  - Başvuru durumlarını anlık güncelleme (Bekliyor, Mülakat Sürecinde, Reddedildi, Kabul Edildi).
  - Şirket veya pozisyon bazlı arama yapma yeteneği.
  - Başvuru sonuçlarının pasta grafik üzerinde istatistiksel dağılımı.
  - Hızlı ekleme ve silme işlemleri.

---

## Teknolojiler

Her iki proje de modern web geliştirme standartlarına uygun olarak aşağıdaki teknolojilerle oluşturulmuştur:

- **[React](https://react.dev/)**: Kullanıcı arayüzü kütüphanesi.
- **[Vite](https://vitejs.dev/)**: Hızlı ve modern frontend derleme aracı.
- **[Tailwind CSS](https://tailwindcss.com/)**: Hızlı ve esnek stil yazımı için utility-first CSS framework'ü.
- **LocalStorage API**: Veritabanı gerektirmeden verilerin tarayıcı üzerinde kalıcı olarak saklanması.

---

## Kurulum ve Çalıştırma

Projeleri kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz.

1. Depoyu bilgisayarınıza indirin veya klonlayın.
2. Terminal üzerinden çalıştırmak istediğiniz projenin klasörüne girin:
   ```bash
   # Dijital Kütüphane için:
   cd book-tracker-app
   
   # veya İş Başvurusu Takip Sistemi için:
   cd job-tracker
   ```
3. Gerekli bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
4. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```
5. Terminalde beliren yerel bağlantı adresine (genellikle `http://localhost:5173`) tıklayarak uygulamayı tarayıcınızda açın.

---

## Veri Gizliliği ve Güvenliği

Bu uygulamalar, **tamamen yerel çalışacak şekilde** tasarlanmıştır. Verilerinizin gizliliği ve güvenliği şu prensiplere dayanır:
- **Yerel Depolama (Local Storage):** Eklediğiniz tüm kitaplar ve iş başvuruları yalnızca kendi cihazınızın (telefon veya bilgisayar) tarayıcı belleğinde saklanır.
- **Sunucu Bağlantısı Yoktur:** Verileriniz hiçbir şekilde uzak bir sunucuya, veritabanına veya üçüncü parti bir bulut hizmetine aktarılmaz. 
- **Tam Kontrol:** Tarayıcı geçmişinizi veya site verilerinizi temizlediğinizde, uygulamaya girdiğiniz veriler de tamamen silinir.
- **Güvenlik:** Veriler sadece cihazınıza fiziksel erişimi olan ve aynı tarayıcıyı kullanan kişiler tarafından görüntülünebilir. Kişisel verilerinizin başkaları tarafından internet üzerinden erişilmesi mümkün değildir.

---
