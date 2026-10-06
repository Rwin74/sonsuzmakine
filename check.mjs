import fs from 'node:fs';
import path from 'node:path';
import {products,articles} from './content.mjs';
import {productTopics} from './seo-content.mjs';
import {localizedGuides} from './localized-guides.mjs';
import {categoryEditorial} from './category-editorial.mjs';
import {expandedGuides,newGuides} from './guides.mjs';
const root=path.resolve('dist');
if(!fs.existsSync(root))throw Error('Önce node build.mjs çalıştırın.');
const pages=[];
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())walk(p);else if(entry.name==='index.html')pages.push(p)}}
walk(root);
const errors=[];
const titles=new Set();
for(const file of pages){const html=fs.readFileSync(file,'utf8');const route='/'+path.relative(root,path.dirname(file)).replaceAll('\\','/').replace(/^\.$/,'').replace(/\/$/,'');const title=html.match(/<title>(.*?)<\/title>/)?.[1];if(!title)errors.push(`${route}: başlık yok`);else if(titles.has(title))errors.push(`${route}: yinelenen başlık`);else titles.add(title);for(const re of [/name="description"/,/rel="canonical"/,/application\/ld\+json/,/<h1[ >]/])if(!re.test(html))errors.push(`${route}: ${re} yok`);if((html.match(/<h1[ >]/g)||[]).length!==1)errors.push(`${route}: H1 sayısı bir değil`);if(!html.includes('7133')||html.includes('Saraylar Mah.'))errors.push(`${route}: adres güncel değil`);for(const [,json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){try{JSON.parse(json)}catch{errors.push(`${route}: geçersiz yapılandırılmış veri`)}}for(const [,href] of html.matchAll(/href="(\/[^"?#]*)"/g)){if(href.startsWith('/assets/')||href==='/favicon.svg'||href==='/favicon.png')continue;const target=path.join(root,href,'index.html');if(!fs.existsSync(target))errors.push(`${route}: kırık bağlantı ${href}`)}for(const [,src] of html.matchAll(/<img[^>]+src="(\/[^"?#]*)"/g)){if(!fs.existsSync(path.join(root,src)))errors.push(`${route}: eksik görsel ${src}`)}}
const config=JSON.parse(fs.readFileSync('vercel.json','utf8'));
const globalHeaders=config.headers.find(rule=>rule.source==='/(.*)')?.headers||[];
const securityHeaders=new Map(globalHeaders.map(header=>[header.key.toLowerCase(),header.value]));
for(const name of ['content-security-policy','x-frame-options','permissions-policy','cross-origin-opener-policy','strict-transport-security'])if(!securityHeaders.has(name))errors.push(`Vercel güvenlik başlığı eksik: ${name}`);
if(!securityHeaders.get('content-security-policy')?.includes("frame-ancestors 'none'")||!securityHeaders.get('content-security-policy')?.includes("script-src 'self'"))errors.push('Content-Security-Policy temel korumaları eksik.');
if(securityHeaders.get('strict-transport-security')!=='max-age=31536000')errors.push('HSTS değeri beklenen HTTPS politikasına uymuyor.');
const sources=new Set();
for(const redirect of config.redirects){if(sources.has(redirect.source))errors.push(`Yinelenen yönlendirme: ${redirect.source}`);sources.add(redirect.source);if(!fs.existsSync(path.join(root,redirect.destination,'index.html')))errors.push(`Yönlendirme hedefi eksik: ${redirect.destination}`)}
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const pattern of [/href="(\/assets\/app-[a-f0-9]{10}\.css)"/,/src="(\/assets\/site-[a-f0-9]{10}\.js)"/]){
  const asset=home.match(pattern)?.[1];
  if(!asset||!fs.existsSync(path.join(root,asset)))errors.push('Sürümlü CSS veya JS dosyası eksik.');
}
const expectedSite=(process.env.SITE_URL || 'https://www.sonsuzmakina.com').replace(/\/$/,'');
const verification='googleee526f6a32479162.html';
if(!fs.existsSync(path.join(root,verification))||fs.readFileSync(path.join(root,verification),'utf8')!==fs.readFileSync(verification,'utf8'))errors.push('Google alan adı doğrulama dosyası yayın kökünde eksik veya değişmiş.');
const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
const robots=fs.readFileSync(path.join(root,'robots.txt'),'utf8');
const notFound=fs.readFileSync(path.join(root,'404.html'),'utf8');
if(!notFound.includes('<meta name="robots" content="noindex, nofollow">')||/rel="canonical"/.test(notFound))errors.push('404 sayfası noindex değil veya ana sayfaya canonical veriyor.');
for(const [locale,prefix] of [['tr',''],['en','en/'],['ar','ar/']]){
  const file=path.join(root,prefix,'urunler','kuruyemis-kavurma-makineleri','index.html');
  const html=fs.readFileSync(file,'utf8');
  const editorial=categoryEditorial['kuruyemis-kavurma-makineleri'][locale];
  if(!html.includes(editorial.heading)||editorial.sections.some(([heading])=>!html.includes(heading))||editorial.faq.some(([question])=>!html.includes(question)))errors.push(`${locale}: kavurma makinesi kategori içeriği eksik.`);
  if(!html.includes('hreflang="tr"')||!html.includes('hreflang="en"')||!html.includes('hreflang="ar"'))errors.push(`${locale}: kategori sayfası dil alternatifleri eksik.`);
  if(locale==='en'&&(!html.includes('Electric')||!html.includes('Gas / diesel')||html.includes('>Elektrik<')||html.includes('>Gaz / motorin<')))errors.push('en: katalog ısıtma değerleri çevrilmemiş.');
  if(locale==='ar'&&(!html.includes('كهرباء')||!html.includes('غاز / ديزل')||html.includes('>Elektrik<')||html.includes('>Gaz / motorin<')))errors.push('ar: katalog ısıtma değerleri çevrilmemiş.');
}
if(!home.includes(`<link rel="canonical" href="${expectedSite}/">`))errors.push('Ana sayfa canonical adresi yayın adresiyle eşleşmiyor.');
if(!sitemap.includes(`<loc>${expectedSite}/</loc>`)||!robots.includes(`Sitemap: ${expectedSite}/sitemap.xml`))errors.push('Site haritası ve robots.txt yayın adresiyle eşleşmiyor.');
for(const product of products){
  const html=fs.readFileSync(path.join(root,'urunler',product.slug,'index.html'),'utf8');
  const topics=productTopics(product);
  if(topics.length!==5||new Set(topics).size!==5)errors.push(`${product.slug}: beş benzersiz arama niyeti yok.`);
  if(!html.includes(product.name))errors.push(`${product.slug}: ürün adı sayfa içeriğinde görünmüyor.`);
  if(html.includes('isteğe göre üretilen')||html.includes('özel üretim')&&html.includes('<ul>'))errors.push(`${product.slug}: tekrar eden anahtar kelime listesi kullanıcı metnine taşmış.`);
}
for(const article of [...articles.map(a=>({...a,...expandedGuides[a.slug]})),...newGuides])for(const locale of ['tr','en','ar']){
  const prefix=locale==='tr'?'':`${locale}/`;
  const html=fs.readFileSync(path.join(root,prefix,'bilgi-merkezi',article.slug,'index.html'),'utf8');
  const schemas=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(([,raw])=>JSON.parse(raw));
  const organization=schemas.find(x=>x['@type']==='Organization');
  const structuredArticle=schemas.find(x=>x['@type']==='Article');
  if(!organization?.sameAs?.includes('https://www.instagram.com/makinasonsuz/')||!organization?.sameAs?.includes('https://www.youtube.com/@sonsuzmakina')||!organization?.sameAs?.includes('https://www.linkedin.com/in/sonsuzmakina/'))errors.push(`${locale}/${article.slug}: Organization sameAs profilleri eksik.`);
  if(!structuredArticle?.datePublished||!structuredArticle?.dateModified||structuredArticle.author?.['@id']!=='https://www.sonsuzmakina.com/#organization')errors.push(`${locale}/${article.slug}: Article yazarı veya tarih işaretlemesi eksik.`);
  if(!html.includes('class="article-byline"')||!html.includes(`datetime="${article.date}"`)||!html.includes('editorial-basis'))errors.push(`${locale}/${article.slug}: görünür yazar, yayın tarihi veya hazırlama yöntemi eksik.`);
  if(locale!=='tr'){
    const translated=localizedGuides[locale][article.slug];
    if(!translated||translated.sections.length!==article.sections.length)errors.push(`${locale}/${article.slug}: tam rehber çevirisi eksik.`);
    else for(const [heading,body] of translated.sections)if(!html.includes(heading)||!html.includes(body))errors.push(`${locale}/${article.slug}: çevrilmiş rehber bölümü eksik: ${heading}`);
  }
}
for(const locale of ['en','ar']){
 const slug='bantli-donerli-kavurma-makinesi-secimi';
 const html=fs.readFileSync(path.join(root,locale,'bilgi-merkezi',slug,'index.html'),'utf8');
 const guide=localizedGuides[locale][slug];
 if(!guide||guide.sections.length!==5)errors.push(`${locale}/${slug}: eksiksiz çeviri eksik.`);
 else for(const [heading,body] of guide.sections)if(!html.includes(heading)||!html.includes(body))errors.push(`${locale}/${slug}: tam çevrilmiş bölüm eksik: ${heading}`);
}
for(const locale of ['en','ar'])for(const [slug,guide] of Object.entries(localizedGuides[locale])){
  const html=fs.readFileSync(path.join(root,locale,'bilgi-merkezi',slug,'index.html'),'utf8');
  if(guide.sections.length!==5)errors.push(`${locale}/${slug}: rehber beş bölüm içermiyor.`);
  for(const [heading,body] of guide.sections){if(!html.includes(heading)||!html.includes(body))errors.push(`${locale}/${slug}: tam çevrilmiş bölüm eksik: ${heading}`)}
  const videoStyle=html.match(/<style>([\s\S]*?)<\/style>/)?.[1]||'';
  if(!videoStyle.includes('aspect-ratio:16/10')||!videoStyle.includes('position:absolute'))errors.push(`${locale}/${slug}: video çerçevesi uyarlaması eksik`);
}
for(const slug of ['kuruyemis-kavurma-makinesi-teklif-talebi','kuruyemis-kavurma-makinesi-teknik-cizim-kontrolu'])for(const locale of ['tr','en','ar']){
  const prefix=locale==='tr'?'':`${locale}/`;
  const file=path.join(root,prefix,'bilgi-merkezi',slug,'index.html');
  const html=fs.readFileSync(file,'utf8');
  const article=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(([,raw])=>JSON.parse(raw)).find(x=>x['@type']==='Article');
  if(!article?.image?.length)errors.push(`${locale}/${slug}: Article schema görseli eksik.`);
  else {const imagePath=decodeURIComponent(new URL(article.image[0]).pathname).replace(/^\//,'');if(!fs.existsSync(path.join(root,imagePath)))errors.push(`${locale}/${slug}: Article schema görseli dosyada yok.`)}
  if(!html.includes('property="og:image"'))errors.push(`${locale}/${slug}: paylaşım görseli eksik.`);
}
const roastCategory=fs.readFileSync(path.join(root,'urunler','kuruyemis-kavurma-makineleri','index.html'),'utf8');
for(const slug of ['kuruyemis-kavurma-makinesi-teklif-talebi','kuruyemis-kavurma-makinesi-teknik-cizim-kontrolu']){
  if(!home.includes(`/bilgi-merkezi/${slug}/`))errors.push(`Ana sayfada öne çıkan rehber bağlantısı eksik: ${slug}`);
  if(!roastCategory.includes(`/bilgi-merkezi/${slug}/`))errors.push(`Kavurma kategorisinde ilgili rehber bağlantısı eksik: ${slug}`);
}
for(const asset of ['assets/sonsuz-logo.svg','assets/hero/uretim-video.jpg','assets/hero/sonsuz-makina-uretim-v2.mp4','assets/catalog/sonsuz-makina-katalog-v2.pdf'])if(!fs.existsSync(path.join(root,asset)))errors.push(`Temel varlık eksik: ${asset}`);
if(!home.includes('class="video-slot"')||home.includes('<iframe'))errors.push('Ana sayfa videosu ilk yüklemede harici oynatıcıya bağlı.');
if(!fs.readFileSync(path.join(root,'sitemap.xml'),'utf8').includes('<video:video>'))errors.push('Video sitemap girdisi eksik.');
if(errors.length){console.error(errors.join('\n'));process.exitCode=1}else console.log(`${pages.length} HTML sayfası: başlıklar, metalar, şema ve iç bağlantılar doğrulandı.`);
