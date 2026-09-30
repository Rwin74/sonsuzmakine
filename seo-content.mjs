// Editorial targeting map only; these are not displayed as keyword lists on product pages.

export function productTopics(product){
  const specific=product.name.toLocaleLowerCase('tr-TR');
  const model=product.model.toLocaleLowerCase('tr-TR');
  if(product.category==='kuruyemis-kavurma-makineleri')return [specific,`${model} bantlı kavurma makinesi`,`${model} kavurma fırını ölçüleri`,`${model} kuruyemiş kavurma teknik özellikleri`,`${model} kavurma makinesi fiyat teklifi`];
  if(product.category==='kilavuzlu-kavurma-makineleri')return [specific,`${model} dönerli kılavuzlu kavurma fırını`,`${model} dönerli kavurma makinesi`,`${model} kavurma fırını teknik bilgileri`,`${model} kılavuzlu kavurma fırını teklifi`];
  return [specific,`${specific} üreticisi`,`${specific} teknik bilgileri`,`${specific} sipariş üzerine imalat`,`${specific} için fiyat teklifi`];
}

export function productGuidance(product){return `İşlenecek ürün, istenen kavurma veya işleme sonucu, reçete ve tesis koşullarını paylaşın. Makine konfigürasyonu bu ihtiyaçlara göre birlikte belirlenip isteğe göre üretilir.`}

const guideImageMap={
  'kuruyemis-paketleme-makinesi-gramaj-secimi':'dort-kefeli-otomatik-paketleme-makinesi.webp',
  'leblebi-uretim-hatti-makineleri':'leblebi-kavurma-makinesi.webp',
  'draje-kaplama-makinesi-secimi':'draje-kaplama-sistemi.webp',
  'kahve-kavurma-makinesi-secimi':'ht-30-kahve.webp',
  'kuruyemis-kavurma-makinesi-teknik-cizim-kontrolu':'ht-100-kilavuzlu-kavurma-firini.webp'
};

export function guideImage(slug){return guideImageMap[slug]||'ht-150.webp'}
