# Sonsuz Makina web sitesi

Bağımlılıksız, statik ve Vercel uyumlu site. `node build.mjs` komutu `dist/` klasörünü üretir. Vercel'de bu klasörü çıktı olarak seçin; `vercel.json` ayarları bunu otomatik yapar.

## İçerik ve görseller

Ürünler, kategoriler ve makaleler `content.mjs` içindedir. Ürün fotoğraflarını `public/assets/products/` klasörüne, her ürünün `image` alanındaki dosya adıyla ekleyin. Fotoğraf eklenene kadar ürün yerleşimi teknik çizimle çalışır; kırık görsel göstermez. Görselleri WebP/AVIF, uygun çözünürlük ve mümkünse 100–250 KB aralığında hazırlayın. Ana bölümde firmanın mevcut YouTube videosunun yerel kapak görseli kullanılır; oynatıcı yalnızca kullanıcı tıklayınca açılır.

## Yayın öncesi

- Marka, teknik ölçü ve ürün model listesini üreticiyle doğrulayın. Doğrulanmamış kapasite ve fiyat eklenmedi.
- Search Console'a `https://sonsuzmakina.com/sitemap.xml` gönderin.
- Eski WordPress URL listesini dışa aktarıp `vercel.json` yönlendirmelerini tamamlayın.
- Eski `/galeri/`, `/referanslar/` ve `/e-katalog/` sayfaları şimdilik ilgili üst sayfalara yönlenir. Gerçek galeri, referans ve katalog içeriği gelince bu sayfalar ayrı hazırlanmalı.
- Gerçek ürün fotoğrafları, vaka çalışmaları ve üretici onaylı teknik verileri ekleyin.
- Alan adı Vercel'e taşınınca Lighthouse ve gerçek kullanıcı Core Web Vitals ölçümü yapın. 0,2 saniye her kullanıcı ve ağ için garanti edilemez.

Sitede talep formu yerine doğrudan telefon/e-posta bağlantıları kullanılır; sunucu veya API anahtarı gerekmez.
