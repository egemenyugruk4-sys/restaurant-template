export type MenuItem = {
  name: string;
  description?: string;
  price: number;
  badge?: string;
  featured?: boolean;
};

export type MenuCategory = {
  category: string;
  title: string;
  subtitle?: string;
  items: MenuItem[];
};

export type Restaurant = {
  name: string;
  shortName: string;
  location: string;

  hero: {
    titleFirst: string;
    titleSecond: string;
    titleThird: string;
    description: string;
    image: string;
  };

  about: {
    title: string;
    description: string;
  };

  contact: {
    phoneDisplay: string;
    phoneLink: string;
    whatsapp: string;
    address: string;
    workingHours: string;
    instagram: string;
    maps: string;
  };

  menu: MenuCategory[];
  gallery: string[];
};

export const restaurant: Restaurant = {
  name: "01 Adana Ocakbaşı",
  shortName: "01 ADANA",
  location: "KUŞADASI MARİNA",

  hero: {
    titleFirst: "GERÇEK",
    titleSecond: "KEBAP",
    titleThird: "LEZZETİ",
    description:
      "Ocakbaşı kültürünü modern ve güçlü bir sunumla Kuşadası'nda yaşayın.",
    image: "/images/hero.jpg",
  },

  about: {
    title: "Ateşin ve lezzetin buluştuğu yer",
    description:
      "01 Adana Ocakbaşı, geleneksel Adana mutfağının güçlü lezzetlerini Kuşadası Marina atmosferiyle bir araya getirir. Köz ateşinde özenle hazırlanan kebaplar, mezeler ve zengin sofralarla gerçek bir ocakbaşı deneyimi sunar.",
  },

  contact: {
    phoneDisplay: "+90 555 111 22 33",
    phoneLink: "tel:+905551112233",
    whatsapp: "https://wa.me/905551112233",
    address: "Kuşadası Marina, Kuşadası / Aydın",
    workingHours: "Her gün 12:00 - 00:00",
    instagram: "https://www.instagram.com/01adanamarina/",
    maps:
      "https://www.google.com/maps/dir/?api=1&destination=37.874760006393274%2C27.262825876440708&destination_place_id=ChIJA0SeZ2ypvhQRqC8nI8w0vuY",
  },

  menu: [
    {
      category: "Kebaplar",
      title: "Kebaplar",
      subtitle: "Köz ateşinde hazırlanan geleneksel lezzetler",
      items: [
        {
          name: "Adana Kebap",
          description:
            "Zırh kıyması, közlenmiş domates ve biber eşliğinde.",
          price: 0,
          badge: "Şefin Önerisi",
          featured: true,
        },
        {
          name: "Urfa Kebap",
          description:
            "Acısız zırh kıyması, közlenmiş domates ve biber eşliğinde.",
          price: 0,
        },
        {
          name: "Patlıcan Kebabı",
          description:
            "Patlıcan ve kebap eti, köz ateşinde birlikte pişirilir.",
          price: 0,
          badge: "Özel",
        },
        {
          name: "Kuşbaşı Kebap",
          description:
            "Marine edilmiş kuzu eti, közlenmiş sebzeler eşliğinde.",
          price: 0,
        },
        {
          name: "Beyti Kebap",
          description:
            "Lavaşla sarılmış kebap, yoğurt ve özel sos eşliğinde.",
          price: 0,
        },
        {
          name: "Karışık Kebap",
          description:
            "Seçili kebap ve ızgara çeşitlerinden oluşan karışık tabak.",
          price: 0,
          badge: "Popüler",
        },
      ],
    },

    {
      category: "Izgaralar",
      title: "Izgaralar",
      subtitle: "Ateşin üzerinde ustalıkla pişirilen lezzetler",
      items: [
        {
          name: "Izgara Tavuk",
          description:
            "Özel sosla marine edilmiş tavuk ve közlenmiş sebzeler.",
          price: 0,
        },
        {
          name: "Tavuk Şiş",
          description:
            "Marine edilmiş tavuk parçaları ve közlenmiş sebzeler.",
          price: 0,
        },
        {
          name: "Kuzu Şiş",
          description:
            "Özenle seçilmiş kuzu eti, köz ateşinde pişirilir.",
          price: 0,
          badge: "Önerilen",
        },
        {
          name: "Kuzu Pirzola",
          description:
            "Köz ateşinde pişirilmiş kuzu pirzola.",
          price: 0,
        },
        {
          name: "Karışık Izgara",
          description:
            "Kebap, şiş, pirzola ve tavuk çeşitlerinden oluşan tabak.",
          price: 0,
          badge: "Paylaşmalık",
        },
      ],
    },

    {
      category: "Dürümler",
      title: "Dürümler",
      subtitle: "Ocakbaşı lezzetlerinin lavaşla buluşması",
      items: [
        {
          name: "Adana Dürüm",
          description:
            "Adana kebap, sumaklı soğan ve közlenmiş sebzeler.",
          price: 0,
          badge: "Popüler",
        },
        {
          name: "Urfa Dürüm",
          description:
            "Urfa kebap, sumaklı soğan ve közlenmiş sebzeler.",
          price: 0,
        },
        {
          name: "Kuşbaşı Dürüm",
          description:
            "Kuşbaşı et, sumaklı soğan ve maydanoz.",
          price: 0,
        },
        {
          name: "Tavuk Dürüm",
          description:
            "Marine edilmiş tavuk ve közlenmiş sebzeler.",
          price: 0,
        },
      ],
    },

    {
      category: "Başlangıçlar",
      title: "Başlangıçlar",
      subtitle: "Sofranıza eşlik eden sıcak lezzetler",
      items: [
        {
          name: "İçli Köfte",
          description:
            "İnce bulgur hamuru ve baharatlı kıymalı iç harç.",
          price: 0,
          badge: "El Yapımı",
        },
        {
          name: "Fındık Lahmacun",
          description:
            "İnce hamur ve özel hazırlanmış kıymalı harç.",
          price: 0,
        },
        {
          name: "Çiğ Köfte",
          description:
            "Geleneksel baharatlarla hazırlanmış çiğ köfte.",
          price: 0,
        },
        {
          name: "Günün Çorbası",
          description:
            "Günlük olarak hazırlanan sıcak çorba.",
          price: 0,
        },
      ],
    },

    {
      category: "Mezeler",
      title: "Mezeler",
      subtitle: "Ocakbaşı sofralarının vazgeçilmezleri",
      items: [
        {
          name: "Acılı Ezme",
          description:
            "Domates, biber, baharat ve nar ekşisiyle hazırlanır.",
          price: 0,
          badge: "Acılı",
        },
        {
          name: "Haydari",
          description:
            "Süzme yoğurt, sarımsak ve özel baharatlarla hazırlanır.",
          price: 0,
        },
        {
          name: "Humus",
          description:
            "Nohut, tahin, limon ve zeytinyağıyla hazırlanır.",
          price: 0,
        },
        {
          name: "Şakşuka",
          description:
            "Kızartılmış sebzeler ve domates sosuyla hazırlanır.",
          price: 0,
        },
        {
          name: "Meze Tabağı",
          description:
            "Günün seçili mezelerinden oluşan paylaşım tabağı.",
          price: 0,
          badge: "Paylaşmalık",
        },
      ],
    },

    {
      category: "Salatalar",
      title: "Salatalar",
      subtitle: "Taze ve ferah eşlikçiler",
      items: [
        {
          name: "Gavurdağı Salatası",
          description:
            "Domates, salatalık, ceviz ve nar ekşisi.",
          price: 0,
          badge: "Önerilen",
        },
        {
          name: "Çoban Salata",
          description:
            "Domates, salatalık, biber, soğan ve maydanoz.",
          price: 0,
        },
        {
          name: "Mevsim Salata",
          description:
            "Mevsim yeşillikleri ve özel salata sosu.",
          price: 0,
        },
      ],
    },

    {
      category: "Tatlılar",
      title: "Tatlılar",
      subtitle: "Yemeğinizi tamamlayan geleneksel tatlar",
      items: [
        {
          name: "Künefe",
          description:
            "Tel kadayıf, peynir ve şerbetle sıcak servis edilir.",
          price: 0,
          badge: "Sıcak Servis",
        },
        {
          name: "Katmer",
          description:
            "İnce hamur, Antep fıstığı ve kaymakla hazırlanır.",
          price: 0,
        },
        {
          name: "Günün Tatlısı",
          description:
            "Günlük hazırlanan tatlı seçeneği.",
          price: 0,
        },
      ],
    },

    {
      category: "İçecekler",
      title: "İçecekler",
      subtitle: "Sofranıza eşlik eden içecekler",
      items: [
        {
          name: "Ayran",
          price: 0,
        },
        {
          name: "Şalgam",
          price: 0,
          badge: "Adana Klasiği",
        },
        {
          name: "Kutu İçecekler",
          price: 0,
        },
        {
          name: "Su",
          price: 0,
        },
        {
          name: "Türk Kahvesi",
          price: 0,
        },
        {
          name: "Çay",
          price: 0,
        },
      ],
    },
  ],

  gallery: [
    "/gallery/gallery-01.jpg.png",
    "/gallery/gallery-02.jpg.png",
    "/gallery/gallery-03.jpg.png",
    "/gallery/gallery-04.jpg.png",
    "/gallery/gallery-05.jpg.png",
    "/gallery/gallery-06.jpg.png",
    "/gallery/gallery-07.jpg.png",
  ],
};