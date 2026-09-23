# Sonsuz Makina web sitesi

Bağımlılıksız, statik ve Vercel uyumlu site. `node build.mjs` komutu `dist/` klasörünü üretir. Vercel'de bu klasörü çıktı olarak seçin; `vercel.json` ayarları bunu otomatik yapar.

## İçerik ve görseller

Ürünler, kategoriler ve makaleler `content.mjs` içindedir. Mevcut sitedeki orijinal logo, 32 ürün görseli, 14 kategori görseli, seçilmiş galeri ve referans görselleri yerel olarak taşınmıştır. Yeni ürün fotoğraflarını `public/assets/products/` klasörüne, ilgili `image` alanındaki dosya adıyla ekleyin.

Ana bölümde firmanın kendi MP4 videosu özel oynatıcıyla kullanılır. Video kaynağı kullanıcı oynat düğmesine basmadan yüklenmez. Kapak görseli `public/assets/hero/uretim-video.jpg`, masaüstü videosu `public/assets/hero/sonsuz-makina-uretim-v2.mp4` (4,7 MB) ve mobil videosu `public/assets/hero/sonsuz-makina-uretim-mobil.mp4` (2,3 MB) yolundadır. Her iki MP4 de hızlı başlangıç için optimize edilmiştir.

E-katalog `public/assets/catalog/sonsuz-makina-katalog-v2.pdf` yolundadır. Firmanın önceki sitedeki 12 sayfalık kataloğunun görselleri sıkıştırılmış yerel kopyasıdır; 7,7 MB olduğu için yalnızca kullanıcı açtığında indirilir.

## Yayın adresi ve SEO

Varsayılan yayın adresi `https://www.sonsuzmakina.com` olarak ayarlanmıştır. Canonical adresler, sosyal paylaşım URL'leri, yapılandırılmış veriler, `robots.txt` ve `sitemap.xml` bu adrese göre derlenir. Vercel projesinde `SITE_URL` ortam değişkeni tanımlıysa aynı adresi (`https://www.sonsuzmakina.com`) kullanın; farklı bir değer varsayılanı geçersiz kılar. Ana alan adı Vercel'de `www` adresine 308 ile yönlendirilir.

32 ürün sayfasının her birinde model ve ürün grubuyla ilişkili beş arama konusu, görünür ürün seçimi içeriğinde yer alır. Google sıralama için `meta keywords` etiketini kullanmadığından bu etiket eklenmedi. Teknik kapasite, fiyat ve performans rakamları firma doğrulaması olmadan yayımlanmadı.

## Yayın öncesi

- Marka, teknik ölçü ve ürün model listesini üreticiyle doğrulayın. Doğrulanmamış kapasite ve fiyat eklenmedi.
- Search Console'da `sonsuzmakina.com` alan adı mülkünü doğrulayın ve `https://www.sonsuzmakina.com/sitemap.xml` adresini gönderin.
- Eski WordPress URL listesini dışa aktarıp `vercel.json` yönlendirmelerini tamamlayın.
- Galeri, referans ve katalog sayfalarındaki içeriklerin güncelliğini firma ile doğrulayın.
- Kapasite, enerji tüketimi, ölçüler, vaka çalışmaları ve servis koşulları için üretici onaylı teknik verileri ekleyin. Sitede tahmini fiyat veya doğrulanmamış performans iddiası yoktur.
- Alan adı Vercel'e taşınınca Lighthouse ve gerçek kullanıcı Core Web Vitals ölçümü yapın. 0,2 saniye her kullanıcı ve ağ için garanti edilemez.

Sitede talep formu yerine doğrudan telefon/e-posta bağlantıları kullanılır; sunucu veya API anahtarı gerekmez.
