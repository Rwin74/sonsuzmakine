# Sonsuz Makina web sitesi

Bağımlılıksız, statik ve Vercel uyumlu site. `node build.mjs` komutu `dist/` klasörünü üretir. Vercel'de bu klasörü çıktı olarak seçin; `vercel.json` ayarları bunu otomatik yapar.

## İçerik ve görseller

Ürünler, kategoriler ve makaleler `content.mjs` içindedir. Mevcut sitedeki orijinal logo, 32 ürün görseli, 14 kategori görseli, seçilmiş galeri ve referans görselleri yerel olarak taşınmıştır. Yeni ürün fotoğraflarını `public/assets/products/` klasörüne, ilgili `image` alanındaki dosya adıyla ekleyin.

Ana bölümde firmanın kendi MP4 videosu özel oynatıcıyla kullanılır. Video kaynağı kullanıcı oynat düğmesine basmadan yüklenmez. Kapak görseli `public/assets/hero/uretim-video.jpg`, video dosyası `public/assets/hero/sonsuz-makina-uretim.mp4` yolundadır.

E-katalog `public/assets/catalog/sonsuz-makina-katalog.pdf` yolundadır; yaklaşık 50 MB olduğu için yalnızca kullanıcı açtığında indirilir.

## Yayın öncesi

- Marka, teknik ölçü ve ürün model listesini üreticiyle doğrulayın. Doğrulanmamış kapasite ve fiyat eklenmedi.
- Search Console'a `https://sonsuzmakina.com/sitemap.xml` gönderin.
- Eski WordPress URL listesini dışa aktarıp `vercel.json` yönlendirmelerini tamamlayın.
- Galeri, referans ve katalog sayfalarındaki içeriklerin güncelliğini firma ile doğrulayın.
- Kapasite, enerji tüketimi, ölçüler, vaka çalışmaları ve servis koşulları için üretici onaylı teknik verileri ekleyin. Sitede tahmini fiyat veya doğrulanmamış performans iddiası yoktur.
- Alan adı Vercel'e taşınınca Lighthouse ve gerçek kullanıcı Core Web Vitals ölçümü yapın. 0,2 saniye her kullanıcı ve ağ için garanti edilemez.

Sitede talep formu yerine doğrudan telefon/e-posta bağlantıları kullanılır; sunucu veya API anahtarı gerekmez.
