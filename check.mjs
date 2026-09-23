import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist');
if(!fs.existsSync(root))throw Error('Önce node build.mjs çalıştırın.');
const pages=[];
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())walk(p);else if(entry.name==='index.html')pages.push(p)}}
walk(root);
const errors=[];
const titles=new Set();
for(const file of pages){const html=fs.readFileSync(file,'utf8');const route='/'+path.relative(root,path.dirname(file)).replaceAll('\\','/').replace(/^\.$/,'').replace(/\/$/,'');const title=html.match(/<title>(.*?)<\/title>/)?.[1];if(!title)errors.push(`${route}: başlık yok`);else if(titles.has(title))errors.push(`${route}: yinelenen başlık`);else titles.add(title);for(const re of [/name="description"/,/rel="canonical"/,/application\/ld\+json/,/<h1[ >]/])if(!re.test(html))errors.push(`${route}: ${re} yok`);for(const [,href] of html.matchAll(/href="(\/[^"?#]*)"/g)){if(href.startsWith('/assets/')||href==='/favicon.svg')continue;const target=path.join(root,href,'index.html');if(!fs.existsSync(target))errors.push(`${route}: kırık bağlantı ${href}`)}}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1}else console.log(`${pages.length} HTML sayfası: başlıklar, metalar, şema ve iç bağlantılar doğrulandı.`);
