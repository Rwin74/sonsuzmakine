// Search phrases are editorial topics, not a meta-keywords tag. Keep these tied to the visible product content.
const topics = {
  'kuruyemis-kavurma-makineleri':['kuruyemiş kavurma makinesi','bantlı kavurma fırını','leblebi kavurma makinesi','fıstık kavurma fırını','otomatik tuzlamalı kavurma makinesi','endüstriyel kuruyemiş kavurma','kuruyemiş kurutma makinesi','kavurma üretim hattı'],
  'kilavuzlu-kavurma-makineleri':['dönerli kavurma makinesi','kılavuzlu kavurma fırını','parti tipi kavurma fırını','kuruyemiş kavurma fırını'],
  'kuruyemis-tuzlama-ekipmanlari':['kuruyemiş tuzlama makinesi','kavurma sonrası tuzlama','kuruyemiş baharatlama ekipmanı','tuzlama üretim hattı'],
  'kahve-kavurma-makineleri':['kahve kavurma makinesi','kahve çekirdeği kavurma','endüstriyel kahve kavurma','kahve kavurma ekipmanı'],
  'isitma-yakit-sistemleri':['prina yakıt makinesi','kavurma hattı ısıtma','endüstriyel yakıt sistemi','kuruyemiş fırını ısıtma'],
  'kuruyemis-paketleme-makineleri':['kuruyemiş paketleme makinesi','çok kefeli dolum makinesi','kuruyemiş tartım dolum','otomatik paketleme hattı'],
  'elekler':['ay çekirdeği eleği','kuruyemiş eleği','ayıklama konveyörü','seçme bandı','kuruyemiş eleme makinesi','ürün sınıflandırma ekipmanı','kuruyemiş ayırma hattı'],
  'leblebi-kizartma-makineleri':['leblebi kavurma makinesi','nohut kavurma makinesi','leblebi üretim hattı','endüstriyel leblebi kavurma'],
  'cekmeli-kuruyemis-firinlari':['katlı kurutma fırını','meyve sebze kurutma makinesi','çekmeli kuruyemiş fırını','çekmeceli kavurma fırını','tepsili kuruyemiş fırını','parti tipi kuruyemiş fırını'],
  'leblebi-seker-makineleri':['leblebi şeker makinesi','nohut sulama makinesi','bandırma nohut makinesi','draje kazanı'],
  'sari-leblebi-imalat-makineleri':['sarı leblebi imalat makinesi','nohut ısıtma makinesi','sarı nohut işleme','leblebi imalat hattı'],
  'secme-bantlari':['ayıklama konveyörü','seçme bandı','kuruyemiş seçme bandı','ürün ayıklama bandı','kuruyemiş kalite kontrol bandı','seçme konveyörü'],
  'draje-kaplama-makineleri':['draje kaplama makinesi','kuruyemiş draje makinesi','draje kaplama hattı','şekerleme kaplama ekipmanı'],
  'fritoz-cips-uretim-makineleri':['cips üretim makinesi','endüstriyel fritöz','cips kızartma hattı','gıda kızartma makinesi']
};

const questions = {
  'kuruyemis-kavurma-makineleri':'Kavurulacak ürünün türü, başlangıç nemi ve hedeflenen son ürün profili seçim görüşmesinin temelini oluşturur.',
  'kilavuzlu-kavurma-makineleri':'Parti büyüklüğü, ürün değişim sıklığı ve fırın yerleşimi birlikte değerlendirilmelidir.',
  'kuruyemis-paketleme-makineleri':'Paket gramajı, ürünün akış davranışı ve hattın önceki aşamalarından gelen hız bilgisi önemlidir.',
  'leblebi-kizartma-makineleri':'Nohut türü ve kavurma öncesi hazırlık adımları, uygun makine ve proses görüşmesini belirler.',
  'kahve-kavurma-makineleri':'Çekirdek türü, hedef kavurma profili ve parti planı teknik seçime yön verir.'
};

export function productTopics(product){
  const base=topics[product.category] || [];
  const model=product.model.toLocaleLowerCase('tr-TR');
  const specific=`${product.name.toLocaleLowerCase('tr-TR')} ${/makinesi|fırını|sistemi|bandı|eleği|kazanı/.test(product.name.toLocaleLowerCase('tr-TR'))?'':'modeli'}`.trim();
  return [...new Set([specific,...base.filter(s=>!s.includes(model)),`${specific} için teklif`,`${model} makine modeli`])].slice(0,5);
}

export function productGuidance(product){return questions[product.category] || 'İşlenecek ürün, tesis yerleşimi ve üretim hedefi teknik seçim görüşmesinde birlikte ele alınır.'}
