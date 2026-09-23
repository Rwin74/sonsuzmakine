import fs from 'node:fs';
import path from 'node:path';
import {products} from './content.mjs';
import {productTopics} from './seo-content.mjs';
const root=path.resolve('dist');
if(!fs.existsSync(root))throw Error('Önce node build.mjs çalıştırın.');
const pages=[];
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())walk(p);else if(entry.name==='index.html')pages.push(p)}}
walk(root);
const errors=[];
const titles=new Set();
for(const file of pages){const html=fs.readFileSync(file,'utf8');const route='/'+path.relative(root,path.dirname(file)).replaceAll('\\','/').replace(/^\.$/,'').replace(/\/$/,'');const title=html.match(/<title>(.*?)<\/title>/)?.[1];if(!title)errors.push(`${route}: başlık yok`);else if(titles.has(title))errors.push(`${route}: yinelenen başlık`);else titles.add(title);for(const re of [/name="description"/,/rel="canonical"/,/application\/ld\+json/,/<h1[ >]/])if(!re.test(html))errors.push(`${route}: ${re} yok`);if((html.match(/<h1[ >]/g)||[]).length!==1)errors.push(`${route}: H1 sayısı bir değil`);for(const [,json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){try{JSON.parse(json)}catch{errors.push(`${route}: geçersiz yapılandırılmış veri`)}}for(const [,href] of html.matchAll(/href="(\/[^"?#]*)"/g)){if(href.startsWith('/assets/')||href==='/favicon.svg'||href==='/favicon.png')continue;const target=path.join(root,href,'index.html');if(!fs.existsSync(target))errors.push(`${route}: kırık bağlantı ${href}`)}for(const [,src] of html.matchAll(/<img[^>]+src="(\/[^"?#]*)"/g)){if(!fs.existsSync(path.join(root,src)))errors.push(`${route}: eksik görsel ${src}`)}}
const config=JSON.parse(fs.readFileSync('vercel.json','utf8'));
const sources=new Set();
for(const redirect of config.redirects){if(sources.has(redirect.source))errors.push(`Yinelenen yönlendirme: ${redirect.source}`);sources.add(redirect.source);if(!fs.existsSync(path.join(root,redirect.destination,'index.html')))errors.push(`Yönlendirme hedefi eksik: ${redirect.destination}`)}
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const pattern of [/href="(\/assets\/app-[a-f0-9]{10}\.css)"/,/src="(\/assets\/site-[a-f0-9]{10}\.js)"/]){
  const asset=home.match(pattern)?.[1];
  if(!asset||!fs.existsSync(path.join(root,asset)))errors.push('Sürümlü CSS veya JS dosyası eksik.');
}
const expectedSite=(process.env.SITE_URL || 'https://sonsuzmakine.vercel.app').replace(/\/$/,'');
const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
const robots=fs.readFileSync(path.join(root,'robots.txt'),'utf8');
if(!home.includes(`<link rel="canonical" href="${expectedSite}/">`))errors.push('Ana sayfa canonical adresi yayın adresiyle eşleşmiyor.');
if(!sitemap.includes(`<loc>${expectedSite}/</loc>`)||!robots.includes(`Sitemap: ${expectedSite}/sitemap.xml`))errors.push('Site haritası ve robots.txt yayın adresiyle eşleşmiyor.');
for(const product of products){
  const html=fs.readFileSync(path.join(root,'urunler',product.slug,'index.html'),'utf8');
  const topics=productTopics(product);
  if(topics.length!==5||new Set(topics).size!==5)errors.push(`${product.slug}: beş benzersiz arama niyeti yok.`);
  for(const topic of topics)if(!html.includes(topic.replaceAll('&','&amp;')))errors.push(`${product.slug}: görünür terim eksik: ${topic}`);
}
for(const asset of ['assets/sonsuz-logo.svg','assets/hero/uretim-video.jpg','assets/hero/sonsuz-makina-uretim-v2.mp4','assets/catalog/sonsuz-makina-katalog-v2.pdf'])if(!fs.existsSync(path.join(root,asset)))errors.push(`Temel varlık eksik: ${asset}`);
if(!home.includes('class="video-slot"')||home.includes('<iframe'))errors.push('Ana sayfa videosu ilk yüklemede harici oynatıcıya bağlı.');
if(!fs.readFileSync(path.join(root,'sitemap.xml'),'utf8').includes('<video:video>'))errors.push('Video sitemap girdisi eksik.');
if(errors.length){console.error(errors.join('\n'));process.exitCode=1}else console.log(`${pages.length} HTML sayfası: başlıklar, metalar, şema ve iç bağlantılar doğrulandı.`);
