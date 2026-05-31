import { slugify } from './slugify.js';

export const CATEGORIES = [
  {
    id: 'cat-1',
    name: 'Câini',
    slug: 'dogs',
    description: 'Tot ce are nevoie câinele tău',
    productCount: 8,
  },
  {
    id: 'cat-2',
    name: 'Pisici',
    slug: 'cats',
    description: 'Produse premium pentru feline',
    productCount: 7,
  },
  {
    id: 'cat-3',
    name: 'Păsări',
    slug: 'birds',
    description: 'Hrană și accesorii pentru păsări',
    productCount: 5,
  },
  {
    id: 'cat-4',
    name: 'Pești',
    slug: 'fish',
    description: 'Echipamente și hrană pentru acvarii',
    productCount: 5,
  },
  {
    id: 'cat-5',
    name: 'Animale Mici',
    slug: 'small-animals',
    description: 'Produse pentru animale mici',
    productCount: 5,
  },
];

export const PRODUCTS = [
  // Câini
  {
    id: 'prod-1',
    name: 'Royal Canin Maxi Adult',
    description:
      'Hrană uscată completă și echilibrată, special concepută pentru câinii de rasă mare adulți (26–44 kg), cu vârsta de peste 15 luni. Kibble adaptat ca formă și textură, cu o balanță precisă de nutrienți pentru menținerea masei musculare și a greutății ideale.',
    price: 499,
    image: 'https://picsum.photos/seed/rc-maxi-adult/600/600',
    category: 'dogs',
    subcategory: 'food',
    featured: true,
    bestseller: true,
    newArrival: false,
    stock: 45,
  },
  {
    id: 'prod-2',
    name: 'Purina Pro Plan Puppy',
    description:
      'Hrană de calitate superioară pentru căței cu pui real ca prim ingredient. Sprijină dezvoltarea sănătoasă în primul an de viață cu DHA din ulei de pește bogat în omega-3. Fără coloranți sau arome artificiale.',
    price: 429,
    image: 'https://picsum.photos/seed/purina-puppy/600/600',
    category: 'dogs',
    subcategory: 'food',
    featured: true,
    bestseller: false,
    newArrival: false,
    stock: 32,
  },
  {
    id: 'prod-3',
    name: 'Kong Classic Dog Toy',
    description:
      'Jucărie durabilă din cauciuc natural roșu, pentru câini cu obiceiul de a mesteca. Poate fi umplută cu recompense pentru distracție prelungită. Curăță dinții și gingiile și satisface instinctele naturale de mestecare.',
    price: 149,
    image: 'https://picsum.photos/seed/kong-classic/600/600',
    category: 'dogs',
    subcategory: 'toys',
    featured: false,
    bestseller: true,
    newArrival: false,
    stock: 78,
  },
  {
    id: 'prod-4',
    name: 'Ruffwear Front Range Harness',
    description:
      'Ham pentru câini pentru uz zilnic cu panouri moi căptușite pe piept și burtă, pentru confort pe toată ziua. Două puncte de atașare pentru lesă — inel frontal pentru dresaj și inel dorsal pentru plimbări zilnice.',
    price: 749,
    image: 'https://picsum.photos/seed/ruffwear-harness/600/600',
    category: 'dogs',
    subcategory: 'accessories',
    featured: false,
    bestseller: false,
    newArrival: false,
    stock: 23,
  },
  {
    id: 'prod-5',
    name: 'Benebone Wishbone Chew Toy',
    description:
      'Fabricat în SUA cu aromă reală de bacon integrată, nu doar pe suprafață. Design ergonomic care permite câinilor să mestece independent. Ideal pentru câini cu obiceiul agresiv de mestecare.',
    price: 199,
    image: 'https://picsum.photos/seed/benebone-wishbone/600/600',
    category: 'dogs',
    subcategory: 'toys',
    featured: false,
    bestseller: true,
    newArrival: false,
    stock: 56,
  },
  {
    id: 'prod-6',
    name: 'Blue Buffalo Life Protection',
    description:
      'Hrană naturală pentru câini cu pui adevărat și cereale sănătoase. Fără subproduse din pui, porumb, grâu sau soia. Biți LifeSource oferă o combinație precisă de antioxidanți, vitamine și minerale.',
    price: 459,
    image: 'https://picsum.photos/seed/blue-buffalo/600/600',
    category: 'dogs',
    subcategory: 'food',
    featured: false,
    bestseller: false,
    newArrival: false,
    stock: 29,
  },
  {
    id: 'prod-7',
    name: 'Outward Hound Hide-a-Squirrel',
    description:
      'Jucărie puzzle din pluș premiată. Câinii vânează veverițe cu sunet, ascunse într-un trunchi de copac. Satisface instinctele naturale de vânătoare și oferă stimulare mentală excelentă.',
    price: 129,
    image: 'https://picsum.photos/seed/hide-squirrel/600/600',
    category: 'dogs',
    subcategory: 'toys',
    featured: false,
    bestseller: false,
    newArrival: true,
    stock: 44,
  },
  {
    id: 'prod-8',
    name: 'Nulo Adult Grain-Free Dry Food',
    description:
      'Conținut ridicat de carne cu curcan real ca prim ingredient. Rețetă fără cereale cu ingrediente cu indice glicemic scăzut, pentru menținerea greutății sănătoase. Include probiotic BC30 pentru sănătatea digestivă.',
    price: 529,
    image: 'https://picsum.photos/seed/nulo-adult/600/600',
    category: 'dogs',
    subcategory: 'food',
    featured: false,
    bestseller: false,
    newArrival: true,
    stock: 18,
  },

  // Pisici
  {
    id: 'prod-9',
    name: 'Royal Canin Indoor Adult',
    description:
      'Formulat special pentru pisicile adulte care trăiesc exclusiv în interior. Ajută la menținerea greutății optime, reduce formarea ghemotoacelor de păr și controlează mirosul de la litieră. Nutriție completă și echilibrată.',
    price: 369,
    image: 'https://picsum.photos/seed/rc-indoor-cat/600/600',
    category: 'cats',
    subcategory: 'food',
    featured: true,
    bestseller: true,
    newArrival: false,
    stock: 52,
  },
  {
    id: 'prod-10',
    name: 'Whiskas Wet Food Variety Pack',
    description:
      'Douăsprezece pungi cu o combinație de gusturi cu carne în jeleu și sos. Nutriție 100% completă și echilibrată pentru a menține pisicile adulte sănătoase, fericite și satisfăcute pe tot parcursul zilei.',
    price: 179,
    image: 'https://picsum.photos/seed/whiskas-wet/600/600',
    category: 'cats',
    subcategory: 'food',
    featured: false,
    bestseller: false,
    newArrival: false,
    stock: 63,
  },
  {
    id: 'prod-11',
    name: 'PetFusion Ultimate Cat Scratcher',
    description:
      'Zgârietoare-pat reversibilă premiată, din carton reciclat. Design modern care dublează ca loc confortabil de somn. Pisicilor le place textura și curba acestui produs — încurajează comportamentul natural de zgâriere.',
    price: 429,
    image: 'https://picsum.photos/seed/petfusion-scratcher/600/600',
    category: 'cats',
    subcategory: 'accessories',
    featured: false,
    bestseller: true,
    newArrival: false,
    stock: 31,
  },
  {
    id: 'prod-12',
    name: 'Catit Flower Fountain',
    description:
      'Încurajează pisicile să bea mai multă apă cu un jet în formă de floare. Trei setări diferite de curgere pentru preferințele fiecărei pisici. Capacitate de 3 litri cu filtru cu acțiune triplă.',
    price: 329,
    image: 'https://picsum.photos/seed/catit-fountain/600/600',
    category: 'cats',
    subcategory: 'accessories',
    featured: true,
    bestseller: false,
    newArrival: false,
    stock: 27,
  },
  {
    id: 'prod-13',
    name: 'Da Bird Feather Teaser Wand',
    description:
      'Cea mai vândută jucărie cu baghetă pentru pisici. Penele unice creează sunete realiste de pasăre când sunt mișcate prin aer. Declanșează instinctele naturale de vânătoare și oferă exercițiu excelent.',
    price: 99,
    image: 'https://picsum.photos/seed/dabird-wand/600/600',
    category: 'cats',
    subcategory: 'toys',
    featured: false,
    bestseller: false,
    newArrival: false,
    stock: 89,
  },
  {
    id: 'prod-14',
    name: 'Orijen Cat & Kitten Formula',
    description:
      'Hrană biologic adecvată cu 90% ingrediente de calitate din carne. Pui și curcan crescuți liber, ouă proaspete și pește prins din sălbăticie. Fără cereale, acoperit cu ingrediente liofilizate.',
    price: 599,
    image: 'https://picsum.photos/seed/orijen-cat/600/600',
    category: 'cats',
    subcategory: 'food',
    featured: false,
    bestseller: false,
    newArrival: true,
    stock: 15,
  },
  {
    id: 'prod-15',
    name: 'SmartCat Pioneer Pet Scratcher',
    description:
      'Satisface impulsul natural al pisicilor de a zgâria cu sisal natural. Înălțimea ajustabilă se potrivește pisicilor de orice dimensiune. Baza solidă previne răsturnarea. Design reversibil extinde durata de viață.',
    price: 239,
    image: 'https://picsum.photos/seed/smartcat-sisal/600/600',
    category: 'cats',
    subcategory: 'accessories',
    featured: false,
    bestseller: false,
    newArrival: true,
    stock: 38,
  },

  // Păsări
  {
    id: 'prod-16',
    name: 'Versele-Laga Prestige Parakeet',
    description:
      'Amestec premium de semințe pentru perușii și budgerigari. Un amestec de cereale și semințe de înaltă calitate cu spice de mei. Foarte gustos și echilibrat nutrițional pentru penaj viu și sănătos.',
    price: 219,
    image: 'https://picsum.photos/seed/versele-parakeet/600/600',
    category: 'birds',
    subcategory: 'food',
    featured: true,
    bestseller: false,
    newArrival: false,
    stock: 42,
  },
  {
    id: 'prod-17',
    name: 'Penn Plax Bird Flight Cage',
    description:
      'Cușcă spațioasă potrivită pentru perușui, nimfe și finzi. Include 4 cotețe din plastic, 4 căni de hrănire și un tăvi inferior detașabil. Sârmă acoperită cu pudră durabilă pentru utilizare îndelungată.',
    price: 849,
    image: 'https://picsum.photos/seed/penn-birdcage/600/600',
    category: 'birds',
    subcategory: 'accessories',
    featured: false,
    bestseller: false,
    newArrival: false,
    stock: 12,
  },
  {
    id: 'prod-18',
    name: 'HARI Smart Pellets for Parakeets',
    description:
      'Pelete complete și echilibrate nutrițional, formulate specific pentru perușui. Fabricate cu ingrediente naturale fără coloranți sau conservanți artificiali. Susține penaj sănătos și culori vii.',
    price: 289,
    image: 'https://picsum.photos/seed/hari-pellets/600/600',
    category: 'birds',
    subcategory: 'food',
    featured: false,
    bestseller: false,
    newArrival: true,
    stock: 28,
  },
  {
    id: 'prod-19',
    name: 'JW Pet ActiviToy Disco Ball',
    description:
      'Jucărie colorată pentru păsări cu centru de disco ball metalic strălucitor și șnururi agățate. Inspiră exercițiu și joacă. Se atașează ușor la orice cușcă. Potrivit pentru perușui și păsări de dimensiuni similare.',
    price: 79,
    image: 'https://picsum.photos/seed/jw-disco-toy/600/600',
    category: 'birds',
    subcategory: 'toys',
    featured: false,
    bestseller: false,
    newArrival: false,
    stock: 67,
  },
  {
    id: 'prod-20',
    name: 'Prevue Hendryx Playpen Bird Gym',
    description:
      'Stativ de joacă liber stând pentru păsări, cu cotețe din lemn de esență tare, căni din oțel inoxidabil și jucării suspendate. Încurajează activitatea sănătoasă și socializarea în afara cuștii.',
    price: 569,
    image: 'https://picsum.photos/seed/prevue-gym/600/600',
    category: 'birds',
    subcategory: 'accessories',
    featured: false,
    bestseller: false,
    newArrival: false,
    stock: 9,
  },

  // Pești
  {
    id: 'prod-21',
    name: 'Tetra Goldfish Flakes',
    description:
      'Hrană completă și echilibrată pentru toți peștii aurii. Fulgi plutitori previn supraalimentarea și mențin apa curată. Îmbogățit cu formula ProCare pentru susținerea sistemului imunitar și sănătatea pe termen lung.',
    price: 89,
    image: 'https://picsum.photos/seed/tetra-goldfish/600/600',
    category: 'fish',
    subcategory: 'food',
    featured: true,
    bestseller: true,
    newArrival: false,
    stock: 92,
  },
  {
    id: 'prod-22',
    name: 'API Freshwater Master Test Kit',
    description:
      'Testează cei mai importanți parametri ai acvariului pentru a evita stresul peștilor. Include peste 800 de teste: pH, Amoniac, Nitrit și Nitrat. Card de instrucțiuni color-codat pentru citire ușoară.',
    price: 289,
    image: 'https://picsum.photos/seed/api-testkit/600/600',
    category: 'fish',
    subcategory: 'accessories',
    featured: false,
    bestseller: true,
    newArrival: false,
    stock: 55,
  },
  {
    id: 'prod-23',
    name: 'Fluval Flex 57L Aquarium Kit',
    description:
      'Panou frontal complet curbat cu sistem de iluminat LED multi-color puternic și filtru silențios cu mai multe etape. Kit complet pentru un acvariu de apă dulce spectaculos. Include telecomandă pentru iluminat.',
    price: 1399,
    image: 'https://picsum.photos/seed/fluval-flex/600/600',
    category: 'fish',
    subcategory: 'accessories',
    featured: false,
    bestseller: false,
    newArrival: true,
    stock: 7,
  },
  {
    id: 'prod-24',
    name: 'Hikari Cichlid Gold Pellets',
    description:
      'Hrană care îmbunătățește culorile la ciclide, în formă de pelete mini. Ingrediente ușor digerabile reduc deșeurile și mențin apa limpede. Dezvoltată pentru a evidenția frumusețea naturală a peștilor.',
    price: 129,
    image: 'https://picsum.photos/seed/hikari-cichlid/600/600',
    category: 'fish',
    subcategory: 'food',
    featured: false,
    bestseller: false,
    newArrival: false,
    stock: 43,
  },
  {
    id: 'prod-25',
    name: 'Marina 60 Aquarium Starter Kit',
    description:
      'Kit complet de acvariu pentru un bazin de 60 de litri. Include filtru Marina Slim, lumină Aqua-Glo, plasă de prins pești, termometru și supliment biologic. Kitul perfect pentru începătorii în acvaristică.',
    price: 699,
    image: 'https://picsum.photos/seed/marina-60/600/600',
    category: 'fish',
    subcategory: 'accessories',
    featured: false,
    bestseller: false,
    newArrival: false,
    stock: 14,
  },

  // Animale Mici
  {
    id: 'prod-26',
    name: 'Kaytee Natural Timothy Hay',
    description:
      'Fân de timoftei premium de prima tăietură pentru iepuri, cobai și chinchile. Bogat în fibre pentru a susține funcția digestivă sănătoasă. Cules proaspăt și uscat la soare pentru valoare nutrițională maximă.',
    price: 149,
    image: 'https://picsum.photos/seed/kaytee-hay/600/600',
    category: 'small-animals',
    subcategory: 'food',
    featured: true,
    bestseller: false,
    newArrival: false,
    stock: 68,
  },
  {
    id: 'prod-27',
    name: 'Vitakraft Hamster Emotion Mix',
    description:
      'Hrană specific adaptată speciei pentru hamsteri. Conține soiuri de cereale de înaltă calitate, legume uscate și componente bogate în proteine. Echilibrat nutrițional pentru hrănire zilnică completă.',
    price: 99,
    image: 'https://picsum.photos/seed/vitakraft-hamster/600/600',
    category: 'small-animals',
    subcategory: 'food',
    featured: false,
    bestseller: true,
    newArrival: false,
    stock: 74,
  },
  {
    id: 'prod-28',
    name: 'Living World Deluxe Habitat',
    description:
      'Habitat premium pentru animale mici cu cadru din sârmă și bază adâncă din plastic. Include balcon cu rampă de acces, bol de hrănire, sticlă de apă, suport pentru fân și adăpost pentru odihnă.',
    price: 849,
    image: 'https://picsum.photos/seed/living-world-habitat/600/600',
    category: 'small-animals',
    subcategory: 'accessories',
    featured: false,
    bestseller: false,
    newArrival: true,
    stock: 11,
  },
  {
    id: 'prod-29',
    name: 'Oxbow Garden Select Hamster Food',
    description:
      'Formulat cu plante botanice premium, ierburi și legume. Fără zaharuri adăugate, conservanți artificiali sau coloranți. O dietă zilnică sănătoasă și naturală pentru hamsteri și gerbili.',
    price: 119,
    image: 'https://picsum.photos/seed/oxbow-hamster/600/600',
    category: 'small-animals',
    subcategory: 'food',
    featured: false,
    bestseller: false,
    newArrival: false,
    stock: 36,
  },
  {
    id: 'prod-30',
    name: 'Niteangel Wooden Hamster Wheel',
    description:
      'Roată ultra-silențioasă cu rulmenți cu bile care funcționează fără zgomot. Construcție din lemn natural masiv, sigur pentru hamsteri și alte animale mici. Ușor de asamblat și detașat pentru curățare.',
    price: 239,
    image: 'https://picsum.photos/seed/niteangel-wheel/600/600',
    category: 'small-animals',
    subcategory: 'toys',
    featured: false,
    bestseller: false,
    newArrival: true,
    stock: 22,
  },

  // ── Produse reale din magazine moldovenești (zooroyal.md, friendsfood.md) ──

  // Păsări — hrană papagali
  {
    id: 'prod-31',
    name: 'Nutribird B15 Tropical',
    description:
      'Hrană completă sub formă de granule extrudate pentru papagali mari africani și din America de Sud: Amazoni, Ara, Jaco. Bogată în vitamine, minerale și aminoacizi esențiali. Recomandat de ornitologi veterinari.',
    price: 300,
    image: 'https://picsum.photos/seed/nutribird-b15/600/600',
    category: 'birds',
    subcategory: 'food',
    featured: true,
    bestseller: false,
    newArrival: false,
    stock: 28,
  },
  {
    id: 'prod-32',
    name: 'Versele-Laga Exotic Parrots Fruit',
    description:
      'Amestec premium de semințe și fructe uscate pentru papagali. Conține bucăți de banane, papaya, caise, ananas și semințe diverse de calitate superioară. Hrănitor, natural și irezistibil.',
    price: 170,
    image: 'https://picsum.photos/seed/exotic-parrots-fruit/600/600',
    category: 'birds',
    subcategory: 'food',
    featured: false,
    bestseller: true,
    newArrival: false,
    stock: 42,
  },
  {
    id: 'prod-33',
    name: 'Prestige Premium Budgies 1kg',
    description:
      'Hrană premium pentru perușui cu ingrediente selecționate. Amestec de mei galben, semințe de grâu, iarbă de canari și hrișcă. Fără coloranți artificiali sau conservanți. Garantat proaspăt.',
    price: 115,
    image: 'https://picsum.photos/seed/prestige-budgies/600/600',
    category: 'birds',
    subcategory: 'food',
    featured: false,
    bestseller: true,
    newArrival: false,
    stock: 55,
  },
  {
    id: 'prod-34',
    name: 'Prestige Canaries Mix 800g',
    description:
      'Hrană pentru canari selectată cu grijă. Conține semințe de navete, semințe de hrișcă, mei galben și alte semințe bogate în ulei. Ideal pentru sezonul de cântat și pentru penaj lucios.',
    price: 95,
    image: 'https://picsum.photos/seed/prestige-canaries/600/600',
    category: 'birds',
    subcategory: 'food',
    featured: false,
    bestseller: false,
    newArrival: true,
    stock: 38,
  },

  // Păsări — colivii
  {
    id: 'prod-35',
    name: 'Colivie VIOLA Premium',
    description:
      'Colivie elegantă pentru papagali de talie medie (nimfe, perușui mari). Bare din oțel vopsit în alb mat. Include 2 hrănitoare, 2 adapătoare și bețe din lemn natural. Dimensiuni: 75×45×90 cm.',
    price: 2500,
    image: 'https://picsum.photos/seed/colivie-viola/600/600',
    category: 'birds',
    subcategory: 'accessories',
    featured: false,
    bestseller: false,
    newArrival: false,
    stock: 8,
  },
  {
    id: 'prod-36',
    name: 'Colivie SONIA Standard',
    description:
      'Colivie spațioasă pentru perușui și nimfe. Design modern cu ușă frontală mare. Include 2 hrănitoare din plastic și 2 cotețe din lemn natural. Tavă inferioară detașabilă, ușor de curățat.',
    price: 1560,
    image: 'https://picsum.photos/seed/colivie-sonia/600/600',
    category: 'birds',
    subcategory: 'accessories',
    featured: false,
    bestseller: false,
    newArrival: true,
    stock: 14,
  },
  {
    id: 'prod-37',
    name: 'Cușcă Record 1 White-Lilac',
    description:
      'Colivie compactă ideală pentru perușui și canari. Construcție solidă din sârmă cu acoperire epoxidică albă. Include 2 hrănitoare din plastic, 2 cotețe din lemn și grătar detașabil pentru curățare.',
    price: 650,
    image: 'https://picsum.photos/seed/cusca-record-1/600/600',
    category: 'birds',
    subcategory: 'accessories',
    featured: false,
    bestseller: false,
    newArrival: true,
    stock: 19,
  },
  {
    id: 'prod-38',
    name: 'Lolo Line Chit Chat Supliment Papagali',
    description:
      'Supliment alimentar din os de sepie (cuttlefish) pentru papagali și perușui. Sursă naturală de calciu, esențial pentru oase puternice și penaj sănătos. Pachet 20g. Fără conservanți.',
    price: 14,
    image: 'https://picsum.photos/seed/lolo-chit-chat/600/600',
    category: 'birds',
    subcategory: 'accessories',
    featured: false,
    bestseller: false,
    newArrival: false,
    stock: 90,
  },

  // Pești — acvarii reale din Moldova
  {
    id: 'prod-39',
    name: 'Acvariu AQUAEL Leddy 75 Set D&N',
    description:
      'Acvariu complet echipat de 75 litri cu iluminare LED zi/noapte și filtru silențios AQUAEL Fan. Include pompă, încălzitor și substrat. Perfect pentru pești tropicali și acvarii plantate.',
    price: 2650,
    image: 'https://picsum.photos/seed/aquael-leddy-75/600/600',
    category: 'fish',
    subcategory: 'accessories',
    featured: true,
    bestseller: false,
    newArrival: true,
    stock: 5,
  },
  {
    id: 'prod-40',
    name: 'AQUAEL Classic Box Set 80',
    description:
      'Set acvariu complet dreptunghiular de 80 litri cu filtru intern Fan Mini Plus. Include heater 100W, termometru și capac. Sticlă de calitate superioară cu margini lustruite. Ideal pentru începători.',
    price: 2500,
    image: 'https://picsum.photos/seed/aquael-classic-80/600/600',
    category: 'fish',
    subcategory: 'accessories',
    featured: false,
    bestseller: false,
    newArrival: false,
    stock: 7,
  },
  {
    id: 'prod-41',
    name: 'Tonga 30 Acvariu Design',
    description:
      'Acvariu de design de 30 litri cu formă cubică elegantă și sticlă ultra-clară de 5mm. Ideal pentru nano-acvariu cu plante și creveți. Include pompă compactă și iluminare LED integrată în capac.',
    price: 2200,
    image: 'https://picsum.photos/seed/tonga-30-acvariu/600/600',
    category: 'fish',
    subcategory: 'accessories',
    featured: false,
    bestseller: false,
    newArrival: false,
    stock: 9,
  },
  {
    id: 'prod-42',
    name: 'Acvariu GEO MAXI 50L',
    description:
      'Acvariu clasic dreptunghiular de 50 litri din sticlă securizată. Cadru plastic negru rezistent. Potrivit pentru pești aurii, plăici și alte specii de apă rece. Ușor de montat fără instrumente.',
    price: 465,
    image: 'https://picsum.photos/seed/geo-maxi-acvariu/600/600',
    category: 'fish',
    subcategory: 'accessories',
    featured: false,
    bestseller: true,
    newArrival: false,
    stock: 23,
  },
  {
    id: 'prod-43',
    name: 'Ferplast Samoa 30 Acvariu Set',
    description:
      'Kit acvariu Ferplast de 25 litri cu design compact și modern. Include filtru intern, iluminat LED alb și capac transparent. Ușor de întreținut, ideal pentru primul acvariu al începătorilor.',
    price: 2560,
    image: 'https://picsum.photos/seed/ferplast-samoa/600/600',
    category: 'fish',
    subcategory: 'accessories',
    featured: false,
    bestseller: false,
    newArrival: false,
    stock: 6,
  },

  // Câini — produse reale
  {
    id: 'prod-44',
    name: 'BELCANDO Adult hrană rață 12.5kg',
    description:
      'Hrană uscată premium pentru câini adulți cu rață și cartofi dulci. Fără cereale, bogată în proteine animale de calitate. Susține digestia sănătoasă, energia zilnică și menținerea masei musculare.',
    price: 1750,
    image: 'https://picsum.photos/seed/belcando-adult/600/600',
    category: 'dogs',
    subcategory: 'food',
    featured: true,
    bestseller: false,
    newArrival: false,
    stock: 18,
  },
  {
    id: 'prod-45',
    name: '4DOG DELUXE Lesă-Rulou 5m',
    description:
      'Lesă retractabilă de 5 metri pentru câini de talie medie (până la 25 kg). Mecanism de blocare rapid cu un singur buton, carcasă ergonomică pentru mână. Cordon subțire din nailon rezistent.',
    price: 145,
    image: 'https://picsum.photos/seed/4dog-lesa/600/600',
    category: 'dogs',
    subcategory: 'accessories',
    featured: false,
    bestseller: false,
    newArrival: true,
    stock: 34,
  },
  {
    id: 'prod-46',
    name: 'Barry King Jucărie Rață Pluș 31cm',
    description:
      'Jucărie din pluș moale în formă de rață cu scâțâitor interior. Dimensiune 31 cm, potrivită pentru câini mici și mijlocii. Material lavabil la mașina de spălat, cusături duble rezistente.',
    price: 150,
    image: 'https://picsum.photos/seed/barry-king-rata/600/600',
    category: 'dogs',
    subcategory: 'toys',
    featured: false,
    bestseller: false,
    newArrival: true,
    stock: 47,
  },

  // Pisici — produse reale
  {
    id: 'prod-47',
    name: 'Purina Friskies hrană umedă vită 85g',
    description:
      'Hrană umedă completă pentru pisici adulte cu vită în sos apetisant. Bogată în proteine și umiditate pentru hidratarea optimă a pisicilor. Fiecare pungă de 85g este o porție perfectă per masă.',
    price: 10,
    image: 'https://picsum.photos/seed/friskies-pisica/600/600',
    category: 'cats',
    subcategory: 'food',
    featured: false,
    bestseller: true,
    newArrival: false,
    stock: 120,
  },
  {
    id: 'prod-48',
    name: 'MIAU MIAU Litieră Soia Aloe Vera 6L',
    description:
      'Litieră pe baza de soia cu extract de Aloe Vera. 100% naturală și complet biodegradabilă. Absorbție excelentă, control de lungă durată al mirosului. Se poate arunca direct la toaletă.',
    price: 145,
    image: 'https://picsum.photos/seed/miau-miau-litiera/600/600',
    category: 'cats',
    subcategory: 'accessories',
    featured: false,
    bestseller: false,
    newArrival: true,
    stock: 41,
  },
  {
    id: 'prod-49',
    name: 'Over Zoo Șampon Clorhexidină 250ml',
    description:
      'Șampon antiseptic pentru câini și pisici cu clorhexidină 0.05%. Previne infecțiile bacteriene și fungice ale pielii. Formulă blândă, fără parfum agresiv. Potrivit pentru piele sensibilă.',
    price: 210,
    image: 'https://picsum.photos/seed/over-zoo-sampon/600/600',
    category: 'dogs',
    subcategory: 'accessories',
    featured: false,
    bestseller: false,
    newArrival: true,
    stock: 26,
  },

  // Animale mici
  {
    id: 'prod-50',
    name: 'Lolo Pets Fân Natural Rozătoare 500g',
    description:
      'Fân natural uscat la soare pentru iepuri, cobai, șoareci de câmp și alte rozătoare. Bogat în fibre, stimulează digestia sănătoasă și uzura corectă a dinților. Fără aditivi sau conservanți.',
    price: 35,
    image: 'https://picsum.photos/seed/lolo-pets-fan/600/600',
    category: 'small-animals',
    subcategory: 'food',
    featured: false,
    bestseller: false,
    newArrival: true,
    stock: 63,
  },
];

PRODUCTS.forEach((p) => {
  p.slug = slugify(p.name);
});

// ── Imagini reale Unsplash per categorie (verificate 200) ──
const UNSPLASH = (id) => `https://images.unsplash.com/${id}?w=600&h=600&fit=crop&q=80`;

const CATEGORY_IMAGES = {
  dogs: [
    'photo-1530281700549-e82e7bf110d6',
    'photo-1552053831-71594a27632d',
    'photo-1561037404-61cd46aa615b',
  ],
  cats: [
    'photo-1514888286974-6c03e2ca1dba',
    'photo-1573865526739-10659fec78a5',
    'photo-1592194996308-7b43878e84a6',
  ],
  birds: [
    'photo-1452570053594-1b985d6ea890',
    'photo-1544923408-75c5cef46f14',
    'photo-1486365227551-f3f90034a57c',
    'photo-1518992028580-6d57bd80f2dd',
    'photo-1535083783855-76ae62b2914e',
    'photo-1574068468668-a05a11f871da',
    'photo-1572877183903-f6f33bbfa7c5',
  ],
  fish: [
    'photo-1625369708811-65ebfc5ca632',
    'photo-1592237163215-c97b487faeb5',
    'photo-1606136025851-3c3d10b29137',
    'photo-1646116926216-7368589dce9a',
    'photo-1592072467526-0506c6530493',
    'photo-1660142565022-ce58f55e1e03',
  ],
  'small-animals': [
    'photo-1425082661705-1834bfd09dca',
    'photo-1584553421349-3557471bed79',
    'photo-1676918555382-fcd06a483e25',
  ],
};

// Atribuie fiecărui produs o imagine din pool-ul categoriei sale (ciclic)
const _catCounter = {};
PRODUCTS.forEach((p) => {
  const pool = CATEGORY_IMAGES[p.category];
  if (pool && pool.length) {
    const i = _catCounter[p.category] ?? 0;
    p.image = UNSPLASH(pool[i % pool.length]);
    _catCounter[p.category] = i + 1;
  }
});

// Actualizează productCount dinamic pe baza produselor existente
CATEGORIES.forEach((cat) => {
  cat.productCount = PRODUCTS.filter((p) => p.category === cat.slug).length;
});
