// Transcribed from public/assets/catalog/sonsuz-makina-katalog-v2.pdf.
// Deliberately excludes the catalogue's production-capacity figures.
export const catalogSource='Sonsuz Makina Makine Kataloğu';

export const catalogTables={
  'kuruyemis-kavurma-makineleri':[
    {model:'HT-15',dimensions:'1790 × 680 × 1150',heating:'Elektrik',min:'8 kW',max:'10 kW',average:'9 kW'},
    {model:'HT-30',dimensions:'2200 × 850 × 1460',heating:'Elektrik',min:'8,25 kW',max:'24,75 kW',average:'16,5 kW'},
    {model:'HT-75',dimensions:'2500 × 1550 × 1760',heating:'Gaz / motorin',min:'1,8 Nm³ / 5,4 L / 3 kW',max:'3,6 Nm³ / 10,7 L / 6 kW',average:'2,7 Nm³ / 8,1 L / 4 kW'},
    {model:'HT-150',dimensions:'3450 × 1700 × 1940',heating:'Gaz / motorin',min:'2,2 Nm³ / 6,2 L / 3 kW',max:'4,2 Nm³ / 11,4 L / 7 kW',average:'3 Nm³ / 9 L / 4 kW'},
    {model:'HT-500',dimensions:'5550 × 2700 × 2820',heating:'Gaz / motorin',min:'3,2 Nm³ / 9,5 L / 9 kW',max:'7 Nm³ / 21,3 L / 14 kW',average:'5,2 Nm³ / 15,4 L / 12 kW'},
    {model:'HT-750',dimensions:'7410 × 3060 × 2970',heating:'Gaz / motorin',min:'3,2 Nm³ / 9,5 L / 10 kW',max:'7 Nm³ / 21,3 L / 15 kW',average:'5,2 Nm³ / 15,4 L / 14 kW'},
    {model:'HT-1000',dimensions:'11600 × 3070 × 2970',heating:'Gaz / motorin',min:'3,2 Nm³ / 9,5 L / 14 kW',max:'7 Nm³ / 21,3 L / 20 kW',average:'5,2 Nm³ / 15,4 L / 16 kW'}
  ],
  'kilavuzlu-kavurma-makineleri':[
    {model:'HT-100',dimensions:'2460 × 2310 × 2030',heating:'Gaz / motorin',min:'1,2 Nm³ / 4,8 L / 1,5 kW',max:'3,4 Nm³ / 10,3 L / 1,5 kW',average:'2,8 Nm³ / 6,4 L / 1,5 kW'},
    {model:'HT-120',dimensions:'2830 × 2770 × 2210',heating:'Gaz / motorin',min:'1,6 Nm³ / 5,4 L / 1,5 kW',max:'4,4 Nm³ / 12 L / 1,5 kW',average:'3 Nm³ / 8,7 L / 1,5 kW'},
    {model:'HT-130',dimensions:'3200 × 2500 × 2200',heating:'Gaz / motorin',min:'3,1 Nm³ / 6,8 L / 1,5 kW',max:'8,5 Nm³ / 14,2 L / 1,5 kW',average:'5,8 Nm³ / 10,9 L / 1,5 kW'},
    {model:'HT-150',dimensions:'3500 × 3000 × 2600',heating:'Gaz / motorin',min:'4,2 Nm³ / 8,5 L / 1,5 kW',max:'11,6 Nm³ / 20 L / 1,5 kW',average:'6,1 Nm³ / 13 L / 1,5 kW'}
  ],
  'draje-kaplama-makineleri':[
    {model:'HTD60T',dimensions:'1000 × 600 × 1480',heating:'Gaz',min:'0,4 Nm³ / 0,50 kW',max:'1 Nm³ / 1 kW',average:'0,4 Nm³ / 0,75 kW'},
    {model:'HTD80T',dimensions:'1100 × 800 × 1480',heating:'Gaz',min:'0,6 Nm³ / 0,50 kW',max:'1,2 Nm³ / 1 kW',average:'1 Nm³ / 0,75 kW'},
    {model:'HTD90T',dimensions:'1130 × 900 × 1480',heating:'Gaz',min:'0,8 Nm³ / 0,50 kW',max:'1,4 Nm³ / 1 kW',average:'1,2 Nm³ / 0,75 kW'},
    {model:'HTD60Ç',dimensions:'1000 × 1300 × 1480',heating:'Gaz',min:'0,8 Nm³ / 0,50 kW',max:'2 Nm³ / 1 kW',average:'1,5 Nm³ / 0,75 kW'},
    {model:'HTD80Ç',dimensions:'1100 × 1800 × 1480',heating:'Gaz',min:'1,2 Nm³ / 0,50 kW',max:'2,4 Nm³ / 1 kW',average:'2 Nm³ / 0,75 kW'},
    {model:'HTD90Ç',dimensions:'1130 × 2000 × 1480',heating:'Gaz',min:'1,6 Nm³ / 0,50 kW',max:'2,8 Nm³ / 1 kW',average:'2,4 Nm³ / 0,75 kW'}
  ],
  'kuruyemis-tuzlama-ekipmanlari':[
    {model:'TM15',dimensions:'1000 × 400 × 1480',operation:'Manuel',min:'0,50 kW',max:'1 kW',average:'0,75 kW'},
    {model:'TM30',dimensions:'1100 × 600 × 1480',operation:'Manuel',min:'0,50 kW',max:'1 kW',average:'0,75 kW'},
    {model:'TM60',dimensions:'1100 × 800 × 1480',operation:'Manuel',min:'0,50 kW',max:'1 kW',average:'0,75 kW'},
    {model:'TM65',dimensions:'1300 × 800 × 1540',operation:'Manuel',min:'0,50 kW',max:'1 kW',average:'0,75 kW'},
    {model:'TO60',dimensions:'1850 × 1100 × 1880',operation:'Otomatik',min:'1 kW',max:'2 kW',average:'1,5 kW'},
    {model:'TO80',dimensions:'3000 × 2100 × 2300',operation:'Otomatik',min:'1,5 kW',max:'4,5 kW',average:'3 kW'},
    {model:'TO120',dimensions:'3100 × 2360 × 2490',operation:'Otomatik',min:'2 kW',max:'6 kW',average:'4 kW'}
  ],
  'kahve-kavurma-makineleri':[
    {model:'HT10CR',dimensions:'2320 × 1330 × 1920',min:'1 kW',max:'2 kW',average:'1,5 kW'},
    {model:'HT15CR',dimensions:'2500 × 1500 × 2100',min:'1 kW',max:'2 kW',average:'1,5 kW'},
    {model:'HT30CR',dimensions:'2800 × 3800 × 2550',min:'2 kW',max:'3 kW',average:'2,5 kW'},
    {model:'HT60CR',dimensions:'2760 × 1380 × 3400',min:'5 kW',max:'7 kW',average:'6 kW'},
    {model:'HT120CR',dimensions:'2860 × 1460 × 3600',min:'4 kW',max:'11 kW',average:'7 kW'}
  ],
  'leblebi-kizartma-makineleri':[
    {model:'HTL-5',dimensions:'840 × 490 × 380',heating:'Gaz',min:'0,37 kW',max:'0,37 kW',average:'0,37 kW'},
    {model:'HTL-10',dimensions:'1050 × 560 × 925',heating:'Gaz',min:'0,37 kW',max:'0,37 kW',average:'0,37 kW'},
    {model:'HTL-20',dimensions:'1000 × 600 × 1100',heating:'Gaz',min:'0,55 kW',max:'0,55 kW',average:'0,55 kW'},
    {model:'HTL-30',dimensions:'1100 × 710 × 1200',heating:'Gaz',min:'0,55 kW',max:'0,55 kW',average:'0,55 kW'},
    {model:'HTL-50',dimensions:'1100 × 710 × 1400',heating:'Gaz',min:'0,75 kW',max:'0,75 kW',average:'0,75 kW'},
    {model:'HTL-80',dimensions:'1250 × 950 × 1400',heating:'Gaz',min:'0,75 kW',max:'0,75 kW',average:'0,75 kW'},
    {model:'HTL-100',dimensions:'1400 × 1100 × 1500',heating:'Gaz',min:'1,1 kW',max:'1,1 kW',average:'1,1 kW'},
    {model:'HTL-120',dimensions:'1500 × 1200 × 1500',heating:'Gaz',min:'1,1 kW',max:'1,1 kW',average:'1,1 kW'}
  ],
  'fritoz-cips-uretim-makineleri':[
    {model:'FRP-6000',dimensions:'7500 × 1400 × 2100',min:'4 kW',max:'11 kW',average:'8 kW'},
    {model:'FRK-2000',dimensions:'2000 × 1750 × 3100',min:'2 kW',max:'3 kW',average:'2,5 kW'},
    {model:'FRY-1500',dimensions:'4125 × 2150 × 1600',min:'2 kW',max:'4 kW',average:'3 kW'}
  ]
};

const row=(model,dimensions,heating,min,max,average)=>({model,dimensions,heating,min,max,average});
export const productCatalogSpecs={
  'ht-15-kuruyemis-kavurma-makinesi':[row('HT-15','1790 × 680 × 1150','Elektrik','8 kW','10 kW','9 kW')],
  'ht-30-kuruyemis-kavurma-makinesi':[row('HT-30','2200 × 850 × 1460','Elektrik','8,25 kW','24,75 kW','16,5 kW')],
  'ht-75-kuruyemis-kavurma-makinesi':[row('HT-75','2500 × 1550 × 1760','Gaz / motorin','1,8 Nm³ / 5,4 L / 3 kW','3,6 Nm³ / 10,7 L / 6 kW','2,7 Nm³ / 8,1 L / 4 kW')],
  'ht-150-kavurma-kurutma-makinesi':[row('HT-150','3450 × 1700 × 1940','Gaz / motorin','2,2 Nm³ / 6,2 L / 3 kW','4,2 Nm³ / 11,4 L / 7 kW','3 Nm³ / 9 L / 4 kW')],
  'ht-500-kavurma-kurutma-makinesi':[row('HT-500','5550 × 2700 × 2820','Gaz / motorin','3,2 Nm³ / 9,5 L / 9 kW','7 Nm³ / 21,3 L / 14 kW','5,2 Nm³ / 15,4 L / 12 kW')],
  'ht-750-kuruyemis-kavurma-makinesi':[row('HT-750','7410 × 3060 × 2970','Gaz / motorin','3,2 Nm³ / 9,5 L / 10 kW','7 Nm³ / 21,3 L / 15 kW','5,2 Nm³ / 15,4 L / 14 kW')],
  'ht-1000-kuruyemis-kavurma-makinesi':[row('HT-1000','11600 × 3070 × 2970','Gaz / motorin','3,2 Nm³ / 9,5 L / 14 kW','7 Nm³ / 21,3 L / 20 kW','5,2 Nm³ / 15,4 L / 16 kW')],
  'ht-100-kilavuzlu-kavurma-firini':[row('HT-100','2460 × 2310 × 2030','Gaz / motorin','1,2 Nm³ / 4,8 L / 1,5 kW','3,4 Nm³ / 10,3 L / 1,5 kW','2,8 Nm³ / 6,4 L / 1,5 kW')],
  'ht-120-kilavuzlu-kavurma-firini':[row('HT-120','2830 × 2770 × 2210','Gaz / motorin','1,6 Nm³ / 5,4 L / 1,5 kW','4,4 Nm³ / 12 L / 1,5 kW','3 Nm³ / 8,7 L / 1,5 kW')],
  'ht-130-kilavuzlu-kavurma-firini':[row('HT-130','3200 × 2500 × 2200','Gaz / motorin','3,1 Nm³ / 6,8 L / 1,5 kW','8,5 Nm³ / 14,2 L / 1,5 kW','5,8 Nm³ / 10,9 L / 1,5 kW')],
  'ht-150-kilavuzlu-kavurma-firini':[row('HT-150','3500 × 3000 × 2600','Gaz / motorin','4,2 Nm³ / 8,5 L / 1,5 kW','11,6 Nm³ / 20 L / 1,5 kW','6,1 Nm³ / 13 L / 1,5 kW')]
};
