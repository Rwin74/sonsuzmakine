const toggle=document.querySelector('.menu-toggle');
const menu=document.querySelector('.mobile-nav');
if(toggle&&menu)toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Menüyü kapat':'Menüyü aç')});
const play=document.querySelector('.video-play');
if(play){
  const frame=play.closest('.video-frame');
  let video;
  const toggle=frame.querySelector('.video-toggle');
  const mute=frame.querySelector('.video-mute');
  const progress=frame.querySelector('.video-progress');
  const time=frame.querySelector('.video-time');
  const duration=frame.querySelector('.video-duration');
  const format=s=>`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;
  function createVideo(){
    video=document.createElement('video');
    video.className='brand-video';
    video.playsInline=true;
    video.preload='metadata';
    video.poster='/assets/hero/uretim-video.jpg';
    const slot=frame.querySelector('.video-slot');
    video.src=matchMedia('(max-width: 680px)').matches?slot.dataset.mobileSrc:slot.dataset.src;
    video.setAttribute('aria-label','Sonsuz Makina üretim filmi');
    slot.replaceWith(video);
    video.addEventListener('play',()=>{toggle.textContent='Ⅱ';toggle.setAttribute('aria-label','Videoyu duraklat')});
    video.addEventListener('waiting',()=>frame.classList.add('is-buffering'));
    video.addEventListener('playing',()=>{frame.classList.remove('is-buffering');frame.classList.add('is-playing')});
    video.addEventListener('canplay',()=>frame.classList.remove('is-buffering'));
    video.addEventListener('pause',()=>{toggle.textContent='▶';toggle.setAttribute('aria-label','Videoyu oynat')});
    video.addEventListener('loadedmetadata',()=>{duration.textContent=format(video.duration)});
    video.addEventListener('timeupdate',()=>{time.textContent=format(video.currentTime);progress.value=video.duration?Math.round(video.currentTime/video.duration*100):0});
    video.addEventListener('ended',()=>{frame.classList.remove('is-playing');play.setAttribute('aria-label','Videoyu yeniden oynat')});
    video.addEventListener('error',()=>{frame.classList.remove('is-buffering');frame.classList.add('video-error')});
  }
  play.addEventListener('click',async()=>{
    if(!video)createVideo();
    frame.classList.add('is-buffering');
    try{await video.play();frame.classList.add('is-playing')}catch{frame.classList.remove('is-buffering');frame.classList.add('video-error')}
  });
  toggle.addEventListener('click',()=>video.paused?video.play():video.pause());
  progress.addEventListener('input',()=>{if(video.duration)video.currentTime=Number(progress.value)/100*video.duration});
  mute.addEventListener('click',()=>{video.muted=!video.muted;mute.textContent=video.muted?'◖×':'◖))';mute.setAttribute('aria-label',video.muted?'Sesi aç':'Sesi kapat')});
  frame.querySelector('.video-fullscreen').addEventListener('click',()=>{if(document.fullscreenElement)document.exitFullscreen();else frame.requestFullscreen?.()});
}
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observed=document.querySelectorAll('.section-heading,.category-card,.product-card,.article-card,.split,.steps>div,.contact-panel,.contact-guide');const io=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target)}},{threshold:.12,rootMargin:'0px 0px 40px 0px'});observed.forEach((el,i)=>{el.classList.add('reveal');el.style.transitionDelay=`${Math.min(i%3,2)*80}ms`;io.observe(el)})}
const search=document.querySelector('#catalog-search');
if(search){
  const cards=[...document.querySelectorAll('.catalog-grid .product-card')];
  const buttons=[...document.querySelectorAll('.catalog-filters button')];
  const count=document.querySelector('.catalog-count');
  const empty=document.querySelector('.catalog-empty');
  let selected='all';
  const normalize=s=>s.toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replaceAll('ı','i');
  function update(){
    const term=normalize(search.value.trim());let visible=0;
    for(const card of cards){const matches=(selected==='all'||card.dataset.category===selected)&&normalize(card.dataset.search).includes(term);card.hidden=!matches;if(matches)visible++}
    count.textContent=`${visible} model gösteriliyor`;
    empty.hidden=visible!==0;
  }
  search.addEventListener('input',update);
  buttons.forEach(button=>button.addEventListener('click',()=>{selected=button.dataset.filter;buttons.forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});update()}));
  const initialQuery=new URLSearchParams(location.search).get('q');
  if(initialQuery){search.value=initialQuery;update()}
  const heroSearch=document.querySelector('.hero-catalog-search');
  if(heroSearch)heroSearch.addEventListener('submit',event=>{event.preventDefault();search.value=heroSearch.querySelector('input').value;buttons[0].click();history.replaceState(null,'',`/urunler/${search.value?`?q=${encodeURIComponent(search.value)}`:''}#modeller`);search.scrollIntoView({behavior:'smooth',block:'center'});search.focus({preventScroll:true})});
}
const gallery=document.querySelector('.gallery-dialog');
if(gallery){document.querySelectorAll('[data-gallery-src]').forEach(button=>button.addEventListener('click',()=>{gallery.querySelector('img').src=button.dataset.gallerySrc;gallery.showModal()}));gallery.querySelector('.gallery-close').addEventListener('click',()=>gallery.close());gallery.addEventListener('click',event=>{if(event.target===gallery)gallery.close()})}
