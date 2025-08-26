import advanced from '@/assets/images/shop/fake/1-advanced.png'
import begginer from '@/assets/images/shop/fake/1-begginer.png'
import binoculars from '@/assets/images/shop/fake/2-binoculars.png'
import monocular from '@/assets/images/shop/fake/2-monocular.png'
import normalTripod from '@/assets/images/shop/fake/3-normalTripod.png'
import telescopeTripod from '@/assets/images/shop/fake/3-telescopeTripod.png'
import compass from '@/assets/images/shop/fake/4-compass.png'
import constellationDisk from '@/assets/images/shop/fake/4-constellationDisk.png'
import flashLight from '@/assets/images/shop/fake/4-flashLight.png'
import books from '@/assets/images/shop/fake/5-books.png'
import stuff from '@/assets/images/shop/fake/5-stuff.png'


const products = [
  {
    id: 1,
    name: "基礎入門型 商品 1",
    price: 14000,
    specialPrice: 11900,
    pic: begginer,
    desc: "專業級設計，支援長時間觀測與攝影。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 85 折優惠",
    stock: 23,
    category: {
      main: "天文望遠鏡",
      sub: "基礎入門型"
    }
  },
  {
    id: 2,
    name: "進階專業型 商品 2",
    price: 10500,
    specialPrice: 9450,
    pic: advanced,
    desc: "支援手機拍攝功能，記錄夜空之美。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 9 折優惠",
    stock: 38,
    category: {
      main: "天文望遠鏡",
      sub: "進階專業型"
    }
  },
  {
    id: 3,
    name: "進階專業型 商品 3",
    price: 6000,
    specialPrice: 5100,
    pic: advanced,
    desc: "專業級設計，支援長時間觀測與攝影。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 85 折優惠",
    stock: 50,
    category: {
      main: "天文望遠鏡",
      sub: "進階專業型"
    }
  },
  {
    id: 4,
    name: "基礎入門型 商品 4",
    price: 9500,
    specialPrice: 8075,
    pic: begginer,
    desc: "專業級設計，支援長時間觀測與攝影。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 85 折優惠",
    stock: 31,
    category: {
      main: "天文望遠鏡",
      sub: "基礎入門型"
    }
  },
  {
    id: 5,
    name: "進階專業型 商品 5",
    price: 7000,
    specialPrice: 4900,
    pic: advanced,
    desc: "支援手機拍攝功能，記錄夜空之美。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 7 折優惠",
    stock: 6,
    category: {
      main: "天文望遠鏡",
      sub: "進階專業型"
    }
  },
  {
    id: 6,
    name: "基礎入門型 商品 6",
    price: 15000,
    specialPrice: 12000,
    pic: begginer,
    desc: "支援手機拍攝功能，記錄夜空之美。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 8 折優惠",
    stock: 5,
    category: {
      main: "天文望遠鏡",
      sub: "基礎入門型"
    }
  },
  {
    id: 7,
    name: "基礎入門型 商品 7",
    price: 15000,
    specialPrice: 12750,
    pic: begginer,
    desc: "適合初學者的觀星望遠鏡，輕巧好上手。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 85 折優惠",
    stock: 36,
    category: {
      main: "天文望遠鏡",
      sub: "基礎入門型"
    }
  },
  {
    id: 8,
    name: "進階專業型 商品 8",
    price: 15000,
    specialPrice: 12000,
    pic: advanced,
    desc: "適合初學者的觀星望遠鏡，輕巧好上手。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 8 折優惠",
    stock: 40,
    category: {
      main: "天文望遠鏡",
      sub: "進階專業型"
    }
  },
  {
    id: 9,
    name: "基礎入門型 商品 9",
    price: 5500,
    specialPrice: 4400,
    pic: begginer,
    desc: "專業級設計，支援長時間觀測與攝影。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 8 折優惠",
    stock: 33,
    category: {
      main: "天文望遠鏡",
      sub: "基礎入門型"
    }
  },
  {
    id: 10,
    name: "基礎入門型 商品 10",
    price: 15000,
    specialPrice: 12750,
    pic: begginer,
    desc: "適合初學者的觀星望遠鏡，輕巧好上手。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 85 折優惠",
    stock: 36,
    category: {
      main: "天文望遠鏡",
      sub: "基礎入門型"
    }
  },
  {
    id: 11,
    name: "基礎入門型 商品 11",
    price: 15000,
    specialPrice: 13500,
    pic: begginer,
    desc: "適合初學者的觀星望遠鏡，輕巧好上手。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 9 折優惠",
    stock: 24,
    category: {
      main: "天文望遠鏡",
      sub: "基礎入門型"
    }
  },
  {
    id: 12,
    name: "基礎入門型 商品 12",
    price: 10000,
    specialPrice: 7000,
    pic: begginer,
    desc: "適合初學者的觀星望遠鏡，輕巧好上手。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 7 折優惠",
    stock: 13,
    category: {
      main: "天文望遠鏡",
      sub: "基礎入門型"
    }
  },
  {
    id: 13,
    name: "進階專業型 商品 13",
    price: 6500,
    specialPrice: 4550,
    pic: advanced,
    desc: "支援手機拍攝功能，記錄夜空之美。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 7 折優惠",
    stock: 44,
    category: {
      main: "天文望遠鏡",
      sub: "進階專業型"
    }
  },
  {
    id: 14,
    name: "基礎入門型 商品 14",
    price: 15000,
    specialPrice: 10500,
    pic: begginer,
    desc: "支援手機拍攝功能，記錄夜空之美。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 7 折優惠",
    stock: 17,
    category: {
      main: "天文望遠鏡",
      sub: "基礎入門型"
    }
  },
  {
    id: 15,
    name: "進階專業型 商品 15",
    price: 11000,
    specialPrice: 7700,
    pic: advanced,
    desc: "支援手機拍攝功能，記錄夜空之美。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 7 折優惠",
    stock: 6,
    category: {
      main: "天文望遠鏡",
      sub: "進階專業型"
    }
  },
  {
    id: 16,
    name: "基礎入門型 商品 16",
    price: 6500,
    specialPrice: 5850,
    pic: begginer,
    desc: "專業級設計，支援長時間觀測與攝影。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 9 折優惠",
    stock: 26,
    category: {
      main: "天文望遠鏡",
      sub: "基礎入門型"
    }
  },
  {
    id: 17,
    name: "基礎入門型 商品 17",
    price: 15000,
    specialPrice: 13500,
    pic: begginer,
    desc: "適合初學者的觀星望遠鏡，輕巧好上手。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 9 折優惠",
    stock: 5,
    category: {
      main: "天文望遠鏡",
      sub: "基礎入門型"
    }
  },
  {
    id: 18,
    name: "基礎入門型 商品 18",
    price: 5500,
    specialPrice: 4950,
    pic: begginer,
    desc: "適合初學者的觀星望遠鏡，輕巧好上手。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 9 折優惠",
    stock: 29,
    category: {
      main: "天文望遠鏡",
      sub: "基礎入門型"
    }
  },
  {
    id: 19,
    name: "進階專業型 商品 19",
    price: 5000,
    specialPrice: 4500,
    pic: advanced,
    desc: "支援手機拍攝功能，記錄夜空之美。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 9 折優惠",
    stock: 15,
    category: {
      main: "天文望遠鏡",
      sub: "進階專業型"
    }
  },
  {
    id: 20,
    name: "進階專業型 商品 20",
    price: 7000,
    specialPrice: 5600,
    pic: advanced,
    desc: "適合初學者的觀星望遠鏡，輕巧好上手。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 8 折優惠",
    stock: 29,
    category: {
      main: "天文望遠鏡",
      sub: "進階專業型"
    }
  },
  {
    id: 21,
    name: "進階專業型 商品 21",
    price: 2500,
    specialPrice: 2125,
    pic: advanced,
    desc: "支援手機拍攝功能，記錄夜空之美。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 85 折優惠",
    stock: 43,
    category: {
      main: "天文望遠鏡",
      sub: "進階專業型"
    }
  },
  {
    id: 22,
    name: "進階專業型 商品 22",
    price: 6000,
    specialPrice: 4800,
    pic: advanced,
    desc: "支援手機拍攝功能，記錄夜空之美。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 8 折優惠",
    stock: 45,
    category: {
      main: "天文望遠鏡",
      sub: "進階專業型"
    }
  },
  {
    id: 23,
    name: "進階專業型 商品 23",
    price: 3000,
    specialPrice: 2400,
    pic: advanced,
    desc: "適合初學者的觀星望遠鏡，輕巧好上手。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 8 折優惠",
    stock: 43,
    category: {
      main: "天文望遠鏡",
      sub: "進階專業型"
    }
  },
  {
    id: 24,
    name: "基礎入門型 商品 24",
    price: 15000,
    specialPrice: 10500,
    pic: begginer,
    desc: "專業級設計，支援長時間觀測與攝影。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 7 折優惠",
    stock: 42,
    category: {
      main: "天文望遠鏡",
      sub: "基礎入門型"
    }
  },
  {
    id: 25,
    name: "進階專業型 商品 25",
    price: 15000,
    specialPrice: 13500,
    pic: advanced,
    desc: "支援手機拍攝功能，記錄夜空之美。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 9 折優惠",
    stock: 48,
    category: {
      main: "天文望遠鏡",
      sub: "進階專業型"
    }
  },
  {
    id: 26,
    name: "基礎入門型 商品 26",
    price: 3000,
    specialPrice: 2100,
    pic: begginer,
    desc: "專業級設計，支援長時間觀測與攝影。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 7 折優惠",
    stock: 18,
    category: {
      main: "天文望遠鏡",
      sub: "基礎入門型"
    }
  },
  {
    id: 27,
    name: "基礎入門型 商品 27",
    price: 2500,
    specialPrice: 2125,
    pic: begginer,
    desc: "專業級設計，支援長時間觀測與攝影。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 85 折優惠",
    stock: 30,
    category: {
      main: "天文望遠鏡",
      sub: "基礎入門型"
    }
  },
  {
    id: 28,
    name: "進階專業型 商品 28",
    price: 4000,
    specialPrice: 2800,
    pic: advanced,
    desc: "支援手機拍攝功能，記錄夜空之美。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 7 折優惠",
    stock: 45,
    category: {
      main: "天文望遠鏡",
      sub: "進階專業型"
    }
  },
  {
    id: 29,
    name: "進階專業型 商品 29",
    price: 11500,
    specialPrice: 10350,
    pic: advanced,
    desc: "專業級設計，支援長時間觀測與攝影。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 9 折優惠",
    stock: 48,
    category: {
      main: "天文望遠鏡",
      sub: "進階專業型"
    }
  },
  {
    id: 30,
    name: "進階專業型 商品 30",
    price: 12000,
    specialPrice: 10800,
    pic: advanced,
    desc: "專業級設計，支援長時間觀測與攝影。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 9 折優惠",
    stock: 37,
    category: {
      main: "天文望遠鏡",
      sub: "進階專業型"
    }
  },
  {
    id: 31,
    name: "基礎入門型 商品 31",
    price: 8000,
    specialPrice: 5600,
    pic: begginer,
    desc: "適合初學者的觀星望遠鏡，輕巧好上手。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 7 折優惠",
    stock: 50,
    category: {
      main: "天文望遠鏡",
      sub: "基礎入門型"
    }
  },
  {
    id: 32,
    name: "進階專業型 商品 32",
    price: 8000,
    specialPrice: 5600,
    pic: advanced,
    desc: "專業級設計，支援長時間觀測與攝影。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 7 折優惠",
    stock: 47,
    category: {
      main: "天文望遠鏡",
      sub: "進階專業型"
    }
  },
  {
    id: 33,
    name: "基礎入門型 商品 33",
    price: 3500,
    specialPrice: 2975,
    pic: begginer,
    desc: "專業級設計，支援長時間觀測與攝影。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 85 折優惠",
    stock: 5,
    category: {
      main: "天文望遠鏡",
      sub: "基礎入門型"
    }
  },
  {
    id: 34,
    name: "進階專業型 商品 34",
    price: 5000,
    specialPrice: 4500,
    pic: advanced,
    desc: "支援手機拍攝功能，記錄夜空之美。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 9 折優惠",
    stock: 20,
    category: {
      main: "天文望遠鏡",
      sub: "進階專業型"
    }
  },
  {
    id: 35,
    name: "基礎入門型 商品 35",
    price: 4000,
    specialPrice: 3400,
    pic: begginer,
    desc: "支援手機拍攝功能，記錄夜空之美。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 85 折優惠",
    stock: 5,
    category: {
      main: "天文望遠鏡",
      sub: "基礎入門型"
    }
  },
  {
    id: 36,
    name: "基礎入門型 商品 36",
    price: 15000,
    specialPrice: 10500,
    pic: begginer,
    desc: "適合初學者的觀星望遠鏡，輕巧好上手。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 7 折優惠",
    stock: 11,
    category: {
      main: "天文望遠鏡",
      sub: "基礎入門型"
    }
  },
  {
    id: 37,
    name: "進階專業型 商品 37",
    price: 13500,
    specialPrice: 12150,
    pic: advanced,
    desc: "支援手機拍攝功能，記錄夜空之美。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 9 折優惠",
    stock: 41,
    category: {
      main: "天文望遠鏡",
      sub: "進階專業型"
    }
  },
  {
    id: 38,
    name: "進階專業型 商品 38",
    price: 3500,
    specialPrice: 3150,
    pic: advanced,
    desc: "專業級設計，支援長時間觀測與攝影。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 9 折優惠",
    stock: 27,
    category: {
      main: "天文望遠鏡",
      sub: "進階專業型"
    }
  },
  {
    id: 39,
    name: "進階專業型 商品 39",
    price: 7000,
    specialPrice: 5950,
    pic: advanced,
    desc: "專業級設計，支援長時間觀測與攝影。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 85 折優惠",
    stock: 19,
    category: {
      main: "天文望遠鏡",
      sub: "進階專業型"
    }
  },
  {
    id: 40,
    name: "基礎入門型 商品 40",
    price: 14000,
    specialPrice: 11200,
    pic: begginer,
    desc: "專業級設計，支援長時間觀測與攝影。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 8 折優惠",
    stock: 36,
    category: {
      main: "天文望遠鏡",
      sub: "基礎入門型"
    }
  },
  {
    id: 41,
    name: "進階專業型 商品 41",
    price: 15000,
    specialPrice: 13500,
    pic: advanced,
    desc: "支援手機拍攝功能，記錄夜空之美。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 9 折優惠",
    stock: 46,
    category: {
      main: "天文望遠鏡",
      sub: "進階專業型"
    }
  },
  {
    id: 42,
    name: "進階專業型 商品 42",
    price: 8000,
    specialPrice: 5600,
    pic: advanced,
    desc: "適合初學者的觀星望遠鏡，輕巧好上手。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 7 折優惠",
    stock: 5,
    category: {
      main: "天文望遠鏡",
      sub: "進階專業型"
    }
  },
  {
    id: 43,
    name: "單筒望遠鏡 商品 43",
    price: 7500,
    specialPrice: 6000,
    pic: monocular,
    desc: "小巧便攜，適合旅行與戶外觀測。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 8 折優惠",
    stock: 9,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "單筒望遠鏡"
    }
  },
  {
    id: 44,
    name: "雙筒望遠鏡 商品 44",
    price: 5500,
    specialPrice: 4675,
    pic: binoculars,
    desc: "成像清晰，觀鳥與觀星兩用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 85 折優惠",
    stock: 33,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "雙筒望遠鏡"
    }
  },
  {
    id: 45,
    name: "單筒望遠鏡 商品 45",
    price: 2000,
    specialPrice: 1800,
    pic: monocular,
    desc: "耐用設計，適合長時間使用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 9 折優惠",
    stock: 42,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "單筒望遠鏡"
    }
  },
  {
    id: 46,
    name: "單筒望遠鏡 商品 46",
    price: 5500,
    specialPrice: 4950,
    pic: monocular,
    desc: "耐用設計，適合長時間使用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 9 折優惠",
    stock: 42,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "單筒望遠鏡"
    }
  },
  {
    id: 47,
    name: "雙筒望遠鏡 商品 47",
    price: 7500,
    specialPrice: 6000,
    pic: binoculars,
    desc: "小巧便攜，適合旅行與戶外觀測。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 8 折優惠",
    stock: 15,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "雙筒望遠鏡"
    }
  },
  {
    id: 48,
    name: "單筒望遠鏡 商品 48",
    price: 8500,
    specialPrice: 5950,
    pic: monocular,
    desc: "小巧便攜，適合旅行與戶外觀測。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 7 折優惠",
    stock: 5,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "單筒望遠鏡"
    }
  },
  {
    id: 49,
    name: "雙筒望遠鏡 商品 49",
    price: 7000,
    specialPrice: 6300,
    pic: binoculars,
    desc: "成像清晰，觀鳥與觀星兩用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 9 折優惠",
    stock: 32,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "雙筒望遠鏡"
    }
  },
  {
    id: 50,
    name: "雙筒望遠鏡 商品 50",
    price: 2000,
    specialPrice: 1600,
    pic: binoculars,
    desc: "小巧便攜，適合旅行與戶外觀測。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 8 折優惠",
    stock: 30,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "雙筒望遠鏡"
    }
  },
  {
    id: 51,
    name: "雙筒望遠鏡 商品 51",
    price: 7500,
    specialPrice: 6750,
    pic: binoculars,
    desc: "小巧便攜，適合旅行與戶外觀測。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 9 折優惠",
    stock: 46,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "雙筒望遠鏡"
    }
  },
  {
    id: 52,
    name: "單筒望遠鏡 商品 52",
    price: 3000,
    specialPrice: 2550,
    pic: monocular,
    desc: "耐用設計，適合長時間使用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 85 折優惠",
    stock: 50,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "單筒望遠鏡"
    }
  },
  {
    id: 53,
    name: "單筒望遠鏡 商品 53",
    price: 5000,
    specialPrice: 4000,
    pic: monocular,
    desc: "耐用設計，適合長時間使用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 8 折優惠",
    stock: 8,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "單筒望遠鏡"
    }
  },
  {
    id: 54,
    name: "單筒望遠鏡 商品 54",
    price: 6500,
    specialPrice: 4550,
    pic: monocular,
    desc: "小巧便攜，適合旅行與戶外觀測。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 7 折優惠",
    stock: 10,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "單筒望遠鏡"
    }
  },
  {
    id: 55,
    name: "單筒望遠鏡 商品 55",
    price: 10000,
    specialPrice: 9000,
    pic: monocular,
    desc: "耐用設計，適合長時間使用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 9 折優惠",
    stock: 29,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "單筒望遠鏡"
    }
  },
  {
    id: 56,
    name: "雙筒望遠鏡 商品 56",
    price: 3500,
    specialPrice: 3150,
    pic: binoculars,
    desc: "耐用設計，適合長時間使用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 9 折優惠",
    stock: 36,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "雙筒望遠鏡"
    }
  },
  {
    id: 57,
    name: "單筒望遠鏡 商品 57",
    price: 3000,
    specialPrice: 2100,
    pic: monocular,
    desc: "耐用設計，適合長時間使用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 7 折優惠",
    stock: 46,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "單筒望遠鏡"
    }
  },
  {
    id: 58,
    name: "雙筒望遠鏡 商品 58",
    price: 8500,
    specialPrice: 6800,
    pic: binoculars,
    desc: "耐用設計，適合長時間使用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 8 折優惠",
    stock: 24,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "雙筒望遠鏡"
    }
  },
  {
    id: 59,
    name: "雙筒望遠鏡 商品 59",
    price: 7000,
    specialPrice: 5950,
    pic: binoculars,
    desc: "成像清晰，觀鳥與觀星兩用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 85 折優惠",
    stock: 43,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "雙筒望遠鏡"
    }
  },
  {
    id: 60,
    name: "雙筒望遠鏡 商品 60",
    price: 2000,
    specialPrice: 1800,
    pic: binoculars,
    desc: "耐用設計，適合長時間使用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 9 折優惠",
    stock: 48,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "雙筒望遠鏡"
    }
  },
  {
    id: 61,
    name: "雙筒望遠鏡 商品 61",
    price: 6000,
    specialPrice: 5400,
    pic: binoculars,
    desc: "小巧便攜，適合旅行與戶外觀測。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 9 折優惠",
    stock: 30,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "雙筒望遠鏡"
    }
  },
  {
    id: 62,
    name: "雙筒望遠鏡 商品 62",
    price: 9500,
    specialPrice: 6650,
    pic: binoculars,
    desc: "耐用設計，適合長時間使用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 7 折優惠",
    stock: 16,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "雙筒望遠鏡"
    }
  },
  {
    id: 63,
    name: "雙筒望遠鏡 商品 63",
    price: 2000,
    specialPrice: 1600,
    pic: binoculars,
    desc: "成像清晰，觀鳥與觀星兩用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 8 折優惠",
    stock: 43,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "雙筒望遠鏡"
    }
  },
  {
    id: 64,
    name: "單筒望遠鏡 商品 64",
    price: 8000,
    specialPrice: 5600,
    pic: monocular,
    desc: "小巧便攜，適合旅行與戶外觀測。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 7 折優惠",
    stock: 25,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "單筒望遠鏡"
    }
  },
  {
    id: 65,
    name: "單筒望遠鏡 商品 65",
    price: 3500,
    specialPrice: 2800,
    pic: monocular,
    desc: "耐用設計，適合長時間使用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 8 折優惠",
    stock: 44,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "單筒望遠鏡"
    }
  },
  {
    id: 66,
    name: "雙筒望遠鏡 商品 66",
    price: 7500,
    specialPrice: 6375,
    pic: binoculars,
    desc: "成像清晰，觀鳥與觀星兩用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 85 折優惠",
    stock: 5,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "雙筒望遠鏡"
    }
  },
  {
    id: 67,
    name: "雙筒望遠鏡 商品 67",
    price: 2000,
    specialPrice: 1700,
    pic: binoculars,
    desc: "小巧便攜，適合旅行與戶外觀測。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 85 折優惠",
    stock: 49,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "雙筒望遠鏡"
    }
  },
  {
    id: 68,
    name: "單筒望遠鏡 商品 68",
    price: 3500,
    specialPrice: 2800,
    pic: monocular,
    desc: "小巧便攜，適合旅行與戶外觀測。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 8 折優惠",
    stock: 22,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "單筒望遠鏡"
    }
  },
  {
    id: 69,
    name: "雙筒望遠鏡 商品 69",
    price: 9500,
    specialPrice: 6650,
    pic: binoculars,
    desc: "成像清晰，觀鳥與觀星兩用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 7 折優惠",
    stock: 18,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "雙筒望遠鏡"
    }
  },
  {
    id: 70,
    name: "單筒望遠鏡 商品 70",
    price: 3500,
    specialPrice: 2450,
    pic: monocular,
    desc: "小巧便攜，適合旅行與戶外觀測。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 7 折優惠",
    stock: 32,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "單筒望遠鏡"
    }
  },
  {
    id: 71,
    name: "雙筒望遠鏡 商品 71",
    price: 5500,
    specialPrice: 4950,
    pic: binoculars,
    desc: "小巧便攜，適合旅行與戶外觀測。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 9 折優惠",
    stock: 15,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "雙筒望遠鏡"
    }
  },
  {
    id: 72,
    name: "單筒望遠鏡 商品 72",
    price: 10000,
    specialPrice: 8500,
    pic: monocular,
    desc: "小巧便攜，適合旅行與戶外觀測。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 85 折優惠",
    stock: 7,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "單筒望遠鏡"
    }
  },
  {
    id: 73,
    name: "雙筒望遠鏡 商品 73",
    price: 4500,
    specialPrice: 3150,
    pic: binoculars,
    desc: "成像清晰，觀鳥與觀星兩用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 7 折優惠",
    stock: 42,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "雙筒望遠鏡"
    }
  },
  {
    id: 74,
    name: "雙筒望遠鏡 商品 74",
    price: 3000,
    specialPrice: 2550,
    pic: binoculars,
    desc: "耐用設計，適合長時間使用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 85 折優惠",
    stock: 34,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "雙筒望遠鏡"
    }
  },
  {
    id: 75,
    name: "單筒望遠鏡 商品 75",
    price: 8000,
    specialPrice: 6800,
    pic: monocular,
    desc: "耐用設計，適合長時間使用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 85 折優惠",
    stock: 27,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "單筒望遠鏡"
    }
  },
  {
    id: 76,
    name: "單筒望遠鏡 商品 76",
    price: 9500,
    specialPrice: 6650,
    pic: monocular,
    desc: "耐用設計，適合長時間使用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 7 折優惠",
    stock: 29,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "單筒望遠鏡"
    }
  },
  {
    id: 77,
    name: "單筒望遠鏡 商品 77",
    price: 5000,
    specialPrice: 3500,
    pic: monocular,
    desc: "成像清晰，觀鳥與觀星兩用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 7 折優惠",
    stock: 22,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "單筒望遠鏡"
    }
  },
  {
    id: 78,
    name: "單筒望遠鏡 商品 78",
    price: 8500,
    specialPrice: 5950,
    pic: monocular,
    desc: "小巧便攜，適合旅行與戶外觀測。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 7 折優惠",
    stock: 15,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "單筒望遠鏡"
    }
  },
  {
    id: 79,
    name: "雙筒望遠鏡 商品 79",
    price: 7500,
    specialPrice: 5250,
    pic: binoculars,
    desc: "成像清晰，觀鳥與觀星兩用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 7 折優惠",
    stock: 27,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "雙筒望遠鏡"
    }
  },
  {
    id: 80,
    name: "雙筒望遠鏡 商品 80",
    price: 3500,
    specialPrice: 2975,
    pic: binoculars,
    desc: "成像清晰，觀鳥與觀星兩用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 85 折優惠",
    stock: 42,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "雙筒望遠鏡"
    }
  },
  {
    id: 81,
    name: "雙筒望遠鏡 商品 81",
    price: 3500,
    specialPrice: 2800,
    pic: binoculars,
    desc: "小巧便攜，適合旅行與戶外觀測。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 8 折優惠",
    stock: 25,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "雙筒望遠鏡"
    }
  },
  {
    id: 82,
    name: "雙筒望遠鏡 商品 82",
    price: 3500,
    specialPrice: 2800,
    pic: binoculars,
    desc: "小巧便攜，適合旅行與戶外觀測。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 8 折優惠",
    stock: 41,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "雙筒望遠鏡"
    }
  },
  {
    id: 83,
    name: "單筒望遠鏡 商品 83",
    price: 8500,
    specialPrice: 6800,
    pic: monocular,
    desc: "小巧便攜，適合旅行與戶外觀測。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 8 折優惠",
    stock: 6,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "單筒望遠鏡"
    }
  },
  {
    id: 84,
    name: "單筒望遠鏡 商品 84",
    price: 6000,
    specialPrice: 5100,
    pic: monocular,
    desc: "耐用設計，適合長時間使用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 85 折優惠",
    stock: 39,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "單筒望遠鏡"
    }
  },
  {
    id: 85,
    name: "單筒望遠鏡 商品 85",
    price: 4000,
    specialPrice: 2800,
    pic: monocular,
    desc: "耐用設計，適合長時間使用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 7 折優惠",
    stock: 36,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "單筒望遠鏡"
    }
  },
  {
    id: 86,
    name: "雙筒望遠鏡 商品 86",
    price: 9000,
    specialPrice: 8100,
    pic: binoculars,
    desc: "耐用設計，適合長時間使用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "現享 9 折優惠",
    stock: 9,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "雙筒望遠鏡"
    }
  },
  {
    id: 87,
    name: "雙筒望遠鏡 商品 87",
    price: 9500,
    specialPrice: 8075,
    pic: binoculars,
    desc: "小巧便攜，適合旅行與戶外觀測。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 85 折優惠",
    stock: 20,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "雙筒望遠鏡"
    }
  },
  {
    id: 88,
    name: "單筒望遠鏡 商品 88",
    price: 5500,
    specialPrice: 4675,
    pic: monocular,
    desc: "小巧便攜，適合旅行與戶外觀測。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 85 折優惠",
    stock: 39,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "單筒望遠鏡"
    }
  },
  {
    id: 89,
    name: "單筒望遠鏡 商品 89",
    price: 7500,
    specialPrice: 6375,
    pic: monocular,
    desc: "耐用設計，適合長時間使用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 85 折優惠",
    stock: 23,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "單筒望遠鏡"
    }
  },
  {
    id: 90,
    name: "單筒望遠鏡 商品 90",
    price: 3500,
    specialPrice: 2975,
    pic: monocular,
    desc: "耐用設計，適合長時間使用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 85 折優惠",
    stock: 34,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "單筒望遠鏡"
    }
  },
  {
    id: 91,
    name: "單筒望遠鏡 商品 91",
    price: 6000,
    specialPrice: 4200,
    pic: monocular,
    desc: "耐用設計，適合長時間使用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 7 折優惠",
    stock: 37,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "單筒望遠鏡"
    }
  },
  {
    id: 92,
    name: "雙筒望遠鏡 商品 92",
    price: 4000,
    specialPrice: 3400,
    pic: binoculars,
    desc: "成像清晰，觀鳥與觀星兩用。",
    promotion: "全館望遠鏡皆享保固內免費清潔服務。",
    marketing: "限時 85 折優惠",
    stock: 15,
    category: {
      main: "雙筒/單筒望遠鏡",
      sub: "雙筒望遠鏡"
    }
  },
  {
    id: 93,
    name: "一般三腳架 商品 93",
    price: 2500,
    specialPrice: 2250,
    pic: normalTripod,
    desc: "加強穩定性，專為天文望遠鏡設計。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "現享 9 折優惠",
    stock: 13,
    category: {
      main: "腳架",
      sub: "一般三腳架"
    }
  },
  {
    id: 94,
    name: "一般三腳架 商品 94",
    price: 1000,
    specialPrice: 900,
    pic: normalTripod,
    desc: "加強穩定性，專為天文望遠鏡設計。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "現享 9 折優惠",
    stock: 44,
    category: {
      main: "腳架",
      sub: "一般三腳架"
    }
  },
  {
    id: 95,
    name: "天文三腳架 商品 95",
    price: 5000,
    specialPrice: 4500,
    pic: telescopeTripod,
    desc: "加強穩定性，專為天文望遠鏡設計。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "現享 9 折優惠",
    stock: 37,
    category: {
      main: "腳架",
      sub: "天文三腳架"
    }
  },
  {
    id: 96,
    name: "一般三腳架 商品 96",
    price: 3500,
    specialPrice: 3150,
    pic: normalTripod,
    desc: "加強穩定性，專為天文望遠鏡設計。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "現享 9 折優惠",
    stock: 45,
    category: {
      main: "腳架",
      sub: "一般三腳架"
    }
  },
  {
    id: 97,
    name: "天文三腳架 商品 97",
    price: 5000,
    specialPrice: 4250,
    pic: telescopeTripod,
    desc: "高度可調，靈活應用。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "限時 85 折優惠",
    stock: 24,
    category: {
      main: "腳架",
      sub: "天文三腳架"
    }
  },
  {
    id: 98,
    name: "天文三腳架 商品 98",
    price: 5000,
    specialPrice: 4250,
    pic: telescopeTripod,
    desc: "高度可調，靈活應用。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "限時 85 折優惠",
    stock: 23,
    category: {
      main: "腳架",
      sub: "天文三腳架"
    }
  },
  {
    id: 99,
    name: "天文三腳架 商品 99",
    price: 5500,
    specialPrice: 4400,
    pic: telescopeTripod,
    desc: "加強穩定性，專為天文望遠鏡設計。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "現享 8 折優惠",
    stock: 5,
    category: {
      main: "腳架",
      sub: "天文三腳架"
    }
  },
  {
    id: 100,
    name: "天文三腳架 商品 100",
    price: 1500,
    specialPrice: 1050,
    pic: telescopeTripod,
    desc: "加強穩定性，專為天文望遠鏡設計。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "限時 7 折優惠",
    stock: 24,
    category: {
      main: "腳架",
      sub: "天文三腳架"
    }
  },
  {
    id: 101,
    name: "天文三腳架 商品 101",
    price: 3500,
    specialPrice: 2800,
    pic: telescopeTripod,
    desc: "加強穩定性，專為天文望遠鏡設計。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "現享 8 折優惠",
    stock: 38,
    category: {
      main: "腳架",
      sub: "天文三腳架"
    }
  },
  {
    id: 102,
    name: "天文三腳架 商品 102",
    price: 3500,
    specialPrice: 2800,
    pic: telescopeTripod,
    desc: "輕便設計，適合一般觀測需求。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "現享 8 折優惠",
    stock: 15,
    category: {
      main: "腳架",
      sub: "天文三腳架"
    }
  },
  {
    id: 103,
    name: "天文三腳架 商品 103",
    price: 3500,
    specialPrice: 2450,
    pic: telescopeTripod,
    desc: "加強穩定性，專為天文望遠鏡設計。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "限時 7 折優惠",
    stock: 9,
    category: {
      main: "腳架",
      sub: "天文三腳架"
    }
  },
  {
    id: 104,
    name: "天文三腳架 商品 104",
    price: 5500,
    specialPrice: 4950,
    pic: telescopeTripod,
    desc: "高度可調，靈活應用。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "現享 9 折優惠",
    stock: 47,
    category: {
      main: "腳架",
      sub: "天文三腳架"
    }
  },
  {
    id: 105,
    name: "一般三腳架 商品 105",
    price: 6000,
    specialPrice: 4200,
    pic: normalTripod,
    desc: "輕便設計，適合一般觀測需求。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "限時 7 折優惠",
    stock: 33,
    category: {
      main: "腳架",
      sub: "一般三腳架"
    }
  },
  {
    id: 106,
    name: "天文三腳架 商品 106",
    price: 3000,
    specialPrice: 2550,
    pic: telescopeTripod,
    desc: "高度可調，靈活應用。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "限時 85 折優惠",
    stock: 20,
    category: {
      main: "腳架",
      sub: "天文三腳架"
    }
  },
  {
    id: 107,
    name: "一般三腳架 商品 107",
    price: 2500,
    specialPrice: 1750,
    pic: normalTripod,
    desc: "輕便設計，適合一般觀測需求。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "限時 7 折優惠",
    stock: 6,
    category: {
      main: "腳架",
      sub: "一般三腳架"
    }
  },
  {
    id: 108,
    name: "天文三腳架 商品 108",
    price: 3000,
    specialPrice: 2400,
    pic: telescopeTripod,
    desc: "高度可調，靈活應用。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "現享 8 折優惠",
    stock: 33,
    category: {
      main: "腳架",
      sub: "天文三腳架"
    }
  },
  {
    id: 109,
    name: "一般三腳架 商品 109",
    price: 4500,
    specialPrice: 3150,
    pic: normalTripod,
    desc: "輕便設計，適合一般觀測需求。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "限時 7 折優惠",
    stock: 49,
    category: {
      main: "腳架",
      sub: "一般三腳架"
    }
  },
  {
    id: 110,
    name: "天文三腳架 商品 110",
    price: 4000,
    specialPrice: 3200,
    pic: telescopeTripod,
    desc: "加強穩定性，專為天文望遠鏡設計。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "現享 8 折優惠",
    stock: 34,
    category: {
      main: "腳架",
      sub: "天文三腳架"
    }
  },
  {
    id: 111,
    name: "一般三腳架 商品 111",
    price: 5000,
    specialPrice: 4000,
    pic: normalTripod,
    desc: "輕便設計，適合一般觀測需求。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "現享 8 折優惠",
    stock: 5,
    category: {
      main: "腳架",
      sub: "一般三腳架"
    }
  },
  {
    id: 112,
    name: "天文三腳架 商品 112",
    price: 3000,
    specialPrice: 2100,
    pic: telescopeTripod,
    desc: "高度可調，靈活應用。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "限時 7 折優惠",
    stock: 49,
    category: {
      main: "腳架",
      sub: "天文三腳架"
    }
  },
  {
    id: 113,
    name: "一般三腳架 商品 113",
    price: 5500,
    specialPrice: 4950,
    pic: normalTripod,
    desc: "高度可調，靈活應用。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "現享 9 折優惠",
    stock: 9,
    category: {
      main: "腳架",
      sub: "一般三腳架"
    }
  },
  {
    id: 114,
    name: "天文三腳架 商品 114",
    price: 3500,
    specialPrice: 2800,
    pic: telescopeTripod,
    desc: "加強穩定性，專為天文望遠鏡設計。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "現享 8 折優惠",
    stock: 49,
    category: {
      main: "腳架",
      sub: "天文三腳架"
    }
  },
  {
    id: 115,
    name: "天文三腳架 商品 115",
    price: 5500,
    specialPrice: 4950,
    pic: telescopeTripod,
    desc: "輕便設計，適合一般觀測需求。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "現享 9 折優惠",
    stock: 43,
    category: {
      main: "腳架",
      sub: "天文三腳架"
    }
  },
  {
    id: 116,
    name: "一般三腳架 商品 116",
    price: 3500,
    specialPrice: 3150,
    pic: normalTripod,
    desc: "高度可調，靈活應用。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "現享 9 折優惠",
    stock: 46,
    category: {
      main: "腳架",
      sub: "一般三腳架"
    }
  },
  {
    id: 117,
    name: "一般三腳架 商品 117",
    price: 4000,
    specialPrice: 3400,
    pic: normalTripod,
    desc: "加強穩定性，專為天文望遠鏡設計。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "限時 85 折優惠",
    stock: 40,
    category: {
      main: "腳架",
      sub: "一般三腳架"
    }
  },
  {
    id: 118,
    name: "天文三腳架 商品 118",
    price: 3000,
    specialPrice: 2550,
    pic: telescopeTripod,
    desc: "高度可調，靈活應用。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "限時 85 折優惠",
    stock: 16,
    category: {
      main: "腳架",
      sub: "天文三腳架"
    }
  },
  {
    id: 119,
    name: "一般三腳架 商品 119",
    price: 6000,
    specialPrice: 5400,
    pic: normalTripod,
    desc: "高度可調，靈活應用。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "現享 9 折優惠",
    stock: 27,
    category: {
      main: "腳架",
      sub: "一般三腳架"
    }
  },
  {
    id: 120,
    name: "一般三腳架 商品 120",
    price: 5000,
    specialPrice: 3500,
    pic: normalTripod,
    desc: "高度可調，靈活應用。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "限時 7 折優惠",
    stock: 48,
    category: {
      main: "腳架",
      sub: "一般三腳架"
    }
  },
  {
    id: 121,
    name: "天文三腳架 商品 121",
    price: 5000,
    specialPrice: 4500,
    pic: telescopeTripod,
    desc: "輕便設計，適合一般觀測需求。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "現享 9 折優惠",
    stock: 26,
    category: {
      main: "腳架",
      sub: "天文三腳架"
    }
  },
  {
    id: 122,
    name: "一般三腳架 商品 122",
    price: 3500,
    specialPrice: 2800,
    pic: normalTripod,
    desc: "輕便設計，適合一般觀測需求。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "現享 8 折優惠",
    stock: 27,
    category: {
      main: "腳架",
      sub: "一般三腳架"
    }
  },
  {
    id: 123,
    name: "一般三腳架 商品 123",
    price: 1000,
    specialPrice: 800,
    pic: normalTripod,
    desc: "高度可調，靈活應用。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "現享 8 折優惠",
    stock: 6,
    category: {
      main: "腳架",
      sub: "一般三腳架"
    }
  },
  {
    id: 124,
    name: "天文三腳架 商品 124",
    price: 1500,
    specialPrice: 1275,
    pic: telescopeTripod,
    desc: "高度可調，靈活應用。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "限時 85 折優惠",
    stock: 14,
    category: {
      main: "腳架",
      sub: "天文三腳架"
    }
  },
  {
    id: 125,
    name: "天文三腳架 商品 125",
    price: 1000,
    specialPrice: 850,
    pic: telescopeTripod,
    desc: "高度可調，靈活應用。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "限時 85 折優惠",
    stock: 47,
    category: {
      main: "腳架",
      sub: "天文三腳架"
    }
  },
  {
    id: 126,
    name: "一般三腳架 商品 126",
    price: 2000,
    specialPrice: 1800,
    pic: normalTripod,
    desc: "加強穩定性，專為天文望遠鏡設計。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "現享 9 折優惠",
    stock: 16,
    category: {
      main: "腳架",
      sub: "一般三腳架"
    }
  },
  {
    id: 127,
    name: "一般三腳架 商品 127",
    price: 2000,
    specialPrice: 1600,
    pic: normalTripod,
    desc: "輕便設計，適合一般觀測需求。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "現享 8 折優惠",
    stock: 44,
    category: {
      main: "腳架",
      sub: "一般三腳架"
    }
  },
  {
    id: 128,
    name: "天文三腳架 商品 128",
    price: 5000,
    specialPrice: 3500,
    pic: telescopeTripod,
    desc: "高度可調，靈活應用。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "限時 7 折優惠",
    stock: 14,
    category: {
      main: "腳架",
      sub: "天文三腳架"
    }
  },
  {
    id: 129,
    name: "星座盤 商品 129",
    price: 500,
    specialPrice: 350,
    pic: constellationDisk,
    desc: "觀星必備的小工具，方便又實用。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "限時 7 折優惠",
    stock: 42,
    category: {
      main: "配件",
      sub: "星座盤"
    }
  },
  {
    id: 130,
    name: "指北針 商品 130",
    price: 900,
    specialPrice: 630,
    pic: compass,
    desc: "耐用材質，長時間使用不易損壞。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "限時 7 折優惠",
    stock: 12,
    category: {
      main: "配件",
      sub: "指北針"
    }
  },
  {
    id: 131,
    name: "紅光手電筒 商品 131",
    price: 800,
    specialPrice: 560,
    pic: flashLight,
    desc: "觀星必備的小工具，方便又實用。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "限時 7 折優惠",
    stock: 47,
    category: {
      main: "配件",
      sub: "紅光手電筒"
    }
  },
  {
    id: 132,
    name: "星座盤 商品 132",
    price: 900,
    specialPrice: 810,
    pic: constellationDisk,
    desc: "觀星必備的小工具，方便又實用。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "現享 9 折優惠",
    stock: 7,
    category: {
      main: "配件",
      sub: "星座盤"
    }
  },
  {
    id: 133,
    name: "紅光手電筒 商品 133",
    price: 500,
    specialPrice: 450,
    pic: flashLight,
    desc: "耐用材質，長時間使用不易損壞。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "現享 9 折優惠",
    stock: 5,
    category: {
      main: "配件",
      sub: "紅光手電筒"
    }
  },
  {
    id: 134,
    name: "指北針 商品 134",
    price: 500,
    specialPrice: 425,
    pic: compass,
    desc: "輕巧設計，適合攜帶出門。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "限時 85 折優惠",
    stock: 49,
    category: {
      main: "配件",
      sub: "指北針"
    }
  },
  {
    id: 135,
    name: "星座盤 商品 135",
    price: 800,
    specialPrice: 560,
    pic: constellationDisk,
    desc: "耐用材質，長時間使用不易損壞。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "限時 7 折優惠",
    stock: 38,
    category: {
      main: "配件",
      sub: "星座盤"
    }
  },
  {
    id: 136,
    name: "紅光手電筒 商品 136",
    price: 500,
    specialPrice: 350,
    pic: flashLight,
    desc: "輕巧設計，適合攜帶出門。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "限時 7 折優惠",
    stock: 40,
    category: {
      main: "配件",
      sub: "紅光手電筒"
    }
  },
  {
    id: 137,
    name: "紅光手電筒 商品 137",
    price: 600,
    specialPrice: 510,
    pic: flashLight,
    desc: "耐用材質，長時間使用不易損壞。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "限時 85 折優惠",
    stock: 42,
    category: {
      main: "配件",
      sub: "紅光手電筒"
    }
  },
  {
    id: 138,
    name: "指北針 商品 138",
    price: 600,
    specialPrice: 510,
    pic: compass,
    desc: "觀星必備的小工具，方便又實用。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "限時 85 折優惠",
    stock: 41,
    category: {
      main: "配件",
      sub: "指北針"
    }
  },
  {
    id: 139,
    name: "指北針 商品 139",
    price: 500,
    specialPrice: 400,
    pic: compass,
    desc: "觀星必備的小工具，方便又實用。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "現享 8 折優惠",
    stock: 29,
    category: {
      main: "配件",
      sub: "指北針"
    }
  },
  {
    id: 140,
    name: "紅光手電筒 商品 140",
    price: 800,
    specialPrice: 680,
    pic: flashLight,
    desc: "耐用材質，長時間使用不易損壞。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "限時 85 折優惠",
    stock: 33,
    category: {
      main: "配件",
      sub: "紅光手電筒"
    }
  },
  {
    id: 141,
    name: "星座盤 商品 141",
    price: 600,
    specialPrice: 480,
    pic: constellationDisk,
    desc: "耐用材質，長時間使用不易損壞。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "現享 8 折優惠",
    stock: 19,
    category: {
      main: "配件",
      sub: "星座盤"
    }
  },
  {
    id: 142,
    name: "紅光手電筒 商品 142",
    price: 800,
    specialPrice: 560,
    pic: flashLight,
    desc: "耐用材質，長時間使用不易損壞。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "限時 7 折優惠",
    stock: 15,
    category: {
      main: "配件",
      sub: "紅光手電筒"
    }
  },
  {
    id: 143,
    name: "指北針 商品 143",
    price: 500,
    specialPrice: 400,
    pic: compass,
    desc: "觀星必備的小工具，方便又實用。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "現享 8 折優惠",
    stock: 43,
    category: {
      main: "配件",
      sub: "指北針"
    }
  },
  {
    id: 144,
    name: "星座盤 商品 144",
    price: 500,
    specialPrice: 425,
    pic: constellationDisk,
    desc: "輕巧設計，適合攜帶出門。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "限時 85 折優惠",
    stock: 11,
    category: {
      main: "配件",
      sub: "星座盤"
    }
  },
  {
    id: 145,
    name: "星座盤 商品 145",
    price: 700,
    specialPrice: 630,
    pic: constellationDisk,
    desc: "觀星必備的小工具，方便又實用。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "現享 9 折優惠",
    stock: 15,
    category: {
      main: "配件",
      sub: "星座盤"
    }
  },
  {
    id: 146,
    name: "紅光手電筒 商品 146",
    price: 1000,
    specialPrice: 900,
    pic: flashLight,
    desc: "耐用材質，長時間使用不易損壞。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "現享 9 折優惠",
    stock: 40,
    category: {
      main: "配件",
      sub: "紅光手電筒"
    }
  },
  {
    id: 147,
    name: "紅光手電筒 商品 147",
    price: 900,
    specialPrice: 720,
    pic: flashLight,
    desc: "輕巧設計，適合攜帶出門。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "現享 8 折優惠",
    stock: 6,
    category: {
      main: "配件",
      sub: "紅光手電筒"
    }
  },
  {
    id: 148,
    name: "紅光手電筒 商品 148",
    price: 500,
    specialPrice: 425,
    pic: flashLight,
    desc: "觀星必備的小工具，方便又實用。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "限時 85 折優惠",
    stock: 48,
    category: {
      main: "配件",
      sub: "紅光手電筒"
    }
  },
  {
    id: 149,
    name: "紅光手電筒 商品 149",
    price: 500,
    specialPrice: 450,
    pic: flashLight,
    desc: "耐用材質，長時間使用不易損壞。",
    promotion: "腳架與配件皆提供基本保固服務。",
    marketing: "現享 9 折優惠",
    stock: 13,
    category: {
      main: "配件",
      sub: "紅光手電筒"
    }
  },
  {
    id: 150,
    name: "星空小物 商品 150",
    price: 1000,
    specialPrice: 800,
    pic: stuff,
    desc: "附插圖與圖解，幫助快速認識星座。",
    promotion: "購買書籍與小物皆附贈精美書籤。",
    marketing: "現享 8 折優惠",
    stock: 24,
    category: {
      main: "書籍/小物",
      sub: "星空小物"
    }
  },
  {
    id: 151,
    name: "觀星教學書籍 商品 151",
    price: 1500,
    specialPrice: 1050,
    pic: books,
    desc: "附插圖與圖解，幫助快速認識星座。",
    promotion: "購買書籍與小物皆附贈精美書籤。",
    marketing: "限時 7 折優惠",
    stock: 29,
    category: {
      main: "書籍/小物",
      sub: "觀星教學書籍"
    }
  },
  {
    id: 152,
    name: "觀星教學書籍 商品 152",
    price: 1500,
    specialPrice: 1050,
    pic: books,
    desc: "淺顯易懂的觀星指南，適合初學者。",
    promotion: "購買書籍與小物皆附贈精美書籤。",
    marketing: "限時 7 折優惠",
    stock: 50,
    category: {
      main: "書籍/小物",
      sub: "觀星教學書籍"
    }
  },
  {
    id: 153,
    name: "星空小物 商品 153",
    price: 600,
    specialPrice: 420,
    pic: stuff,
    desc: "附插圖與圖解，幫助快速認識星座。",
    promotion: "購買書籍與小物皆附贈精美書籤。",
    marketing: "限時 7 折優惠",
    stock: 46,
    category: {
      main: "書籍/小物",
      sub: "星空小物"
    }
  },
  {
    id: 154,
    name: "觀星教學書籍 商品 154",
    price: 1000,
    specialPrice: 850,
    pic: books,
    desc: "附插圖與圖解，幫助快速認識星座。",
    promotion: "購買書籍與小物皆附贈精美書籤。",
    marketing: "限時 85 折優惠",
    stock: 38,
    category: {
      main: "書籍/小物",
      sub: "觀星教學書籍"
    }
  },
  {
    id: 155,
    name: "星空小物 商品 155",
    price: 600,
    specialPrice: 420,
    pic: stuff,
    desc: "淺顯易懂的觀星指南，適合初學者。",
    promotion: "購買書籍與小物皆附贈精美書籤。",
    marketing: "限時 7 折優惠",
    stock: 43,
    category: {
      main: "書籍/小物",
      sub: "星空小物"
    }
  },
  {
    id: 156,
    name: "星空小物 商品 156",
    price: 700,
    specialPrice: 595,
    pic: stuff,
    desc: "淺顯易懂的觀星指南，適合初學者。",
    promotion: "購買書籍與小物皆附贈精美書籤。",
    marketing: "限時 85 折優惠",
    stock: 30,
    category: {
      main: "書籍/小物",
      sub: "星空小物"
    }
  },
  {
    id: 157,
    name: "星空小物 商品 157",
    price: 900,
    specialPrice: 720,
    pic: stuff,
    desc: "內容詳盡，介紹四季星空與觀測技巧。",
    promotion: "購買書籍與小物皆附贈精美書籤。",
    marketing: "現享 8 折優惠",
    stock: 20,
    category: {
      main: "書籍/小物",
      sub: "星空小物"
    }
  },
  {
    id: 158,
    name: "星空小物 商品 158",
    price: 1500,
    specialPrice: 1050,
    pic: stuff,
    desc: "內容詳盡，介紹四季星空與觀測技巧。",
    promotion: "購買書籍與小物皆附贈精美書籤。",
    marketing: "限時 7 折優惠",
    stock: 11,
    category: {
      main: "書籍/小物",
      sub: "星空小物"
    }
  },
  {
    id: 159,
    name: "星空小物 商品 159",
    price: 800,
    specialPrice: 720,
    pic: stuff,
    desc: "內容詳盡，介紹四季星空與觀測技巧。",
    promotion: "購買書籍與小物皆附贈精美書籤。",
    marketing: "現享 9 折優惠",
    stock: 7,
    category: {
      main: "書籍/小物",
      sub: "星空小物"
    }
  },
  {
    id: 160,
    name: "星空小物 商品 160",
    price: 1000,
    specialPrice: 900,
    pic: stuff,
    desc: "淺顯易懂的觀星指南，適合初學者。",
    promotion: "購買書籍與小物皆附贈精美書籤。",
    marketing: "現享 9 折優惠",
    stock: 19,
    category: {
      main: "書籍/小物",
      sub: "星空小物"
    }
  },
  {
    id: 161,
    name: "星空小物 商品 161",
    price: 1000,
    specialPrice: 800,
    pic: stuff,
    desc: "淺顯易懂的觀星指南，適合初學者。",
    promotion: "購買書籍與小物皆附贈精美書籤。",
    marketing: "現享 8 折優惠",
    stock: 36,
    category: {
      main: "書籍/小物",
      sub: "星空小物"
    }
  },
  {
    id: 162,
    name: "觀星教學書籍 商品 162",
    price: 1000,
    specialPrice: 800,
    pic: books,
    desc: "淺顯易懂的觀星指南，適合初學者。",
    promotion: "購買書籍與小物皆附贈精美書籤。",
    marketing: "現享 8 折優惠",
    stock: 7,
    category: {
      main: "書籍/小物",
      sub: "觀星教學書籍"
    }
  },
  {
    id: 163,
    name: "星空小物 商品 163",
    price: 1000,
    specialPrice: 900,
    pic: stuff,
    desc: "淺顯易懂的觀星指南，適合初學者。",
    promotion: "購買書籍與小物皆附贈精美書籤。",
    marketing: "現享 9 折優惠",
    stock: 16,
    category: {
      main: "書籍/小物",
      sub: "星空小物"
    }
  },
  {
    id: 164,
    name: "觀星教學書籍 商品 164",
    price: 700,
    specialPrice: 630,
    pic: books,
    desc: "內容詳盡，介紹四季星空與觀測技巧。",
    promotion: "購買書籍與小物皆附贈精美書籤。",
    marketing: "現享 9 折優惠",
    stock: 42,
    category: {
      main: "書籍/小物",
      sub: "觀星教學書籍"
    }
  },
  {
    id: 165,
    name: "觀星教學書籍 商品 165",
    price: 600,
    specialPrice: 540,
    pic: books,
    desc: "內容詳盡，介紹四季星空與觀測技巧。",
    promotion: "購買書籍與小物皆附贈精美書籤。",
    marketing: "現享 9 折優惠",
    stock: 33,
    category: {
      main: "書籍/小物",
      sub: "觀星教學書籍"
    }
  },
  {
    id: 166,
    name: "星空小物 商品 166",
    price: 1000,
    specialPrice: 900,
    pic: stuff,
    desc: "附插圖與圖解，幫助快速認識星座。",
    promotion: "購買書籍與小物皆附贈精美書籤。",
    marketing: "現享 9 折優惠",
    stock: 15,
    category: {
      main: "書籍/小物",
      sub: "星空小物"
    }
  },
  {
    id: 167,
    name: "觀星教學書籍 商品 167",
    price: 1500,
    specialPrice: 1200,
    pic: books,
    desc: "淺顯易懂的觀星指南，適合初學者。",
    promotion: "購買書籍與小物皆附贈精美書籤。",
    marketing: "現享 8 折優惠",
    stock: 13,
    category: {
      main: "書籍/小物",
      sub: "觀星教學書籍"
    }
  },
  {
    id: 168,
    name: "觀星教學書籍 商品 168",
    price: 800,
    specialPrice: 640,
    pic: books,
    desc: "內容詳盡，介紹四季星空與觀測技巧。",
    promotion: "購買書籍與小物皆附贈精美書籤。",
    marketing: "現享 8 折優惠",
    stock: 25,
    category: {
      main: "書籍/小物",
      sub: "觀星教學書籍"
    }
  },
  {
    id: 169,
    name: "星空小物 商品 169",
    price: 1000,
    specialPrice: 800,
    pic: stuff,
    desc: "內容詳盡，介紹四季星空與觀測技巧。",
    promotion: "購買書籍與小物皆附贈精美書籤。",
    marketing: "現享 8 折優惠",
    stock: 36,
    category: {
      main: "書籍/小物",
      sub: "星空小物"
    }
  },
  {
    id: 170,
    name: "星空小物 商品 170",
    price: 1000,
    specialPrice: 850,
    pic: stuff,
    desc: "附插圖與圖解，幫助快速認識星座。",
    promotion: "購買書籍與小物皆附贈精美書籤。",
    marketing: "限時 85 折優惠",
    stock: 33,
    category: {
      main: "書籍/小物",
      sub: "星空小物"
    }
  },
  {
    id: 171,
    name: "觀星教學書籍 商品 171",
    price: 500,
    specialPrice: 350,
    pic: books,
    desc: "附插圖與圖解，幫助快速認識星座。",
    promotion: "購買書籍與小物皆附贈精美書籤。",
    marketing: "限時 7 折優惠",
    stock: 37,
    category: {
      main: "書籍/小物",
      sub: "觀星教學書籍"
    }
  },
  {
    id: 172,
    name: "觀星教學書籍 商品 172",
    price: 600,
    specialPrice: 420,
    pic: books,
    desc: "淺顯易懂的觀星指南，適合初學者。",
    promotion: "購買書籍與小物皆附贈精美書籤。",
    marketing: "限時 7 折優惠",
    stock: 24,
    category: {
      main: "書籍/小物",
      sub: "觀星教學書籍"
    }
  },
  {
    id: 173,
    name: "星空小物 商品 173",
    price: 1000,
    specialPrice: 900,
    pic: stuff,
    desc: "附插圖與圖解，幫助快速認識星座。",
    promotion: "購買書籍與小物皆附贈精美書籤。",
    marketing: "現享 9 折優惠",
    stock: 34,
    category: {
      main: "書籍/小物",
      sub: "星空小物"
    }
  },
  {
    id: 174,
    name: "星空小物 商品 174",
    price: 600,
    specialPrice: 510,
    pic: stuff,
    desc: "淺顯易懂的觀星指南，適合初學者。",
    promotion: "購買書籍與小物皆附贈精美書籤。",
    marketing: "限時 85 折優惠",
    stock: 14,
    category: {
      main: "書籍/小物",
      sub: "星空小物"
    }
  }
]

export default products;