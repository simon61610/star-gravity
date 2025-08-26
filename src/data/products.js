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
    "id": 1,
    "name": "基礎入門型 商品 1",
    "price": 13884,
    "specialPrice": 9718,
    "pic": begginer,
    "desc": "專業級設計，支援長時間觀測與攝影。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 85 折優惠",
    "stock": 23,
    "category": {
      "main": "天文望遠鏡",
      "sub": "基礎入門型"
    }
  },
  {
    "id": 2,
    "name": "進階專業型 商品 2",
    "price": 10731,
    "specialPrice": 9121,
    "pic": advanced,
    "desc": "支援手機拍攝功能，記錄夜空之美。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 9 折優惠",
    "stock": 38,
    "category": {
      "main": "天文望遠鏡",
      "sub": "進階專業型"
    }
  },
  {
    "id": 3,
    "name": "進階專業型 商品 3",
    "price": 5906,
    "specialPrice": 4134,
    "pic": advanced,
    "desc": "專業級設計，支援長時間觀測與攝影。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 85 折優惠",
    "stock": 50,
    "category": {
      "main": "天文望遠鏡",
      "sub": "進階專業型"
    }
  },
  {
    "id": 4,
    "name": "基礎入門型 商品 4",
    "price": 9624,
    "specialPrice": 8180,
    "pic": begginer,
    "desc": "專業級設計，支援長時間觀測與攝影。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 85 折優惠",
    "stock": 31,
    "category": {
      "main": "天文望遠鏡",
      "sub": "基礎入門型"
    }
  },
  {
    "id": 5,
    "name": "進階專業型 商品 5",
    "price": 6987,
    "specialPrice": 5589,
    "pic": advanced,
    "desc": "支援手機拍攝功能，記錄夜空之美。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 7 折優惠",
    "stock": 6,
    "category": {
      "main": "天文望遠鏡",
      "sub": "進階專業型"
    }
  },
  {
    "id": 6,
    "name": "基礎入門型 商品 6",
    "price": 15251,
    "specialPrice": 12963,
    "pic": begginer,
    "desc": "支援手機拍攝功能，記錄夜空之美。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 8 折優惠",
    "stock": 5,
    "category": {
      "main": "天文望遠鏡",
      "sub": "基礎入門型"
    }
  },
  {
    "id": 7,
    "name": "基礎入門型 商品 7",
    "price": 15533,
    "specialPrice": 13203,
    "pic": begginer,
    "desc": "適合初學者的觀星望遠鏡，輕巧好上手。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 85 折優惠",
    "stock": 36,
    "category": {
      "main": "天文望遠鏡",
      "sub": "基礎入門型"
    }
  },
  {
    "id": 8,
    "name": "進階專業型 商品 8",
    "price": 18426,
    "specialPrice": 14740,
    "pic": advanced,
    "desc": "適合初學者的觀星望遠鏡，輕巧好上手。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 8 折優惠",
    "stock": 40,
    "category": {
      "main": "天文望遠鏡",
      "sub": "進階專業型"
    }
  },
  {
    "id": 9,
    "name": "基礎入門型 商品 9",
    "price": 5300,
    "specialPrice": 3709,
    "pic": begginer,
    "desc": "專業級設計，支援長時間觀測與攝影。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 8 折優惠",
    "stock": 33,
    "category": {
      "main": "天文望遠鏡",
      "sub": "基礎入門型"
    }
  },
  {
    "id": 10,
    "name": "基礎入門型 商品 10",
    "price": 18300,
    "specialPrice": 12810,
    "pic": begginer,
    "desc": "適合初學者的觀星望遠鏡，輕巧好上手。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 85 折優惠",
    "stock": 36,
    "category": {
      "main": "天文望遠鏡",
      "sub": "基礎入門型"
    }
  },
  {
    "id": 11,
    "name": "基礎入門型 商品 11",
    "price": 16217,
    "specialPrice": 13784,
    "pic": begginer,
    "desc": "適合初學者的觀星望遠鏡，輕巧好上手。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 9 折優惠",
    "stock": 24,
    "category": {
      "main": "天文望遠鏡",
      "sub": "基礎入門型"
    }
  },
  {
    "id": 12,
    "name": "基礎入門型 商品 12",
    "price": 10227,
    "specialPrice": 9204,
    "pic": begginer,
    "desc": "適合初學者的觀星望遠鏡，輕巧好上手。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 7 折優惠",
    "stock": 13,
    "category": {
      "main": "天文望遠鏡",
      "sub": "基礎入門型"
    }
  },
  {
    "id": 13,
    "name": "進階專業型 商品 13",
    "price": 6491,
    "specialPrice": 5192,
    "pic": advanced,
    "desc": "支援手機拍攝功能，記錄夜空之美。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 7 折優惠",
    "stock": 44,
    "category": {
      "main": "天文望遠鏡",
      "sub": "進階專業型"
    }
  },
  {
    "id": 14,
    "name": "基礎入門型 商品 14",
    "price": 15838,
    "specialPrice": 11086,
    "pic": begginer,
    "desc": "支援手機拍攝功能，記錄夜空之美。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 7 折優惠",
    "stock": 17,
    "category": {
      "main": "天文望遠鏡",
      "sub": "基礎入門型"
    }
  },
  {
    "id": 15,
    "name": "進階專業型 商品 15",
    "price": 11178,
    "specialPrice": 9501,
    "pic": advanced,
    "desc": "支援手機拍攝功能，記錄夜空之美。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 7 折優惠",
    "stock": 6,
    "category": {
      "main": "天文望遠鏡",
      "sub": "進階專業型"
    }
  },
  {
    "id": 16,
    "name": "基礎入門型 商品 16",
    "price": 6667,
    "specialPrice": 5333,
    "pic": begginer,
    "desc": "專業級設計，支援長時間觀測與攝影。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 9 折優惠",
    "stock": 26,
    "category": {
      "main": "天文望遠鏡",
      "sub": "基礎入門型"
    }
  },
  {
    "id": 17,
    "name": "基礎入門型 商品 17",
    "price": 18102,
    "specialPrice": 16291,
    "pic": begginer,
    "desc": "適合初學者的觀星望遠鏡，輕巧好上手。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 9 折優惠",
    "stock": 5,
    "category": {
      "main": "天文望遠鏡",
      "sub": "基礎入門型"
    }
  },
  {
    "id": 18,
    "name": "基礎入門型 商品 18",
    "price": 5396,
    "specialPrice": 4316,
    "pic": begginer,
    "desc": "適合初學者的觀星望遠鏡，輕巧好上手。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 9 折優惠",
    "stock": 29,
    "category": {
      "main": "天文望遠鏡",
      "sub": "基礎入門型"
    }
  },
  {
    "id": 19,
    "name": "進階專業型 商品 19",
    "price": 4866,
    "specialPrice": 3406,
    "pic": advanced,
    "desc": "支援手機拍攝功能，記錄夜空之美。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 9 折優惠",
    "stock": 15,
    "category": {
      "main": "天文望遠鏡",
      "sub": "進階專業型"
    }
  },
  {
    "id": 20,
    "name": "進階專業型 商品 20",
    "price": 7136,
    "specialPrice": 5708,
    "pic": advanced,
    "desc": "適合初學者的觀星望遠鏡，輕巧好上手。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 8 折優惠",
    "stock": 29,
    "category": {
      "main": "天文望遠鏡",
      "sub": "進階專業型"
    }
  },
  {
    "id": 21,
    "name": "進階專業型 商品 21",
    "price": 2340,
    "specialPrice": 1989,
    "pic": advanced,
    "desc": "支援手機拍攝功能，記錄夜空之美。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 85 折優惠",
    "stock": 43,
    "category": {
      "main": "天文望遠鏡",
      "sub": "進階專業型"
    }
  },
  {
    "id": 22,
    "name": "進階專業型 商品 22",
    "price": 6143,
    "specialPrice": 5528,
    "pic": advanced,
    "desc": "支援手機拍攝功能，記錄夜空之美。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 8 折優惠",
    "stock": 45,
    "category": {
      "main": "天文望遠鏡",
      "sub": "進階專業型"
    }
  },
  {
    "id": 23,
    "name": "進階專業型 商品 23",
    "price": 2917,
    "specialPrice": 2479,
    "pic": advanced,
    "desc": "適合初學者的觀星望遠鏡，輕巧好上手。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 8 折優惠",
    "stock": 43,
    "category": {
      "main": "天文望遠鏡",
      "sub": "進階專業型"
    }
  },
  {
    "id": 24,
    "name": "基礎入門型 商品 24",
    "price": 16609,
    "specialPrice": 14948,
    "pic": begginer,
    "desc": "專業級設計，支援長時間觀測與攝影。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 7 折優惠",
    "stock": 42,
    "category": {
      "main": "天文望遠鏡",
      "sub": "基礎入門型"
    }
  },
  {
    "id": 25,
    "name": "進階專業型 商品 25",
    "price": 14863,
    "specialPrice": 11890,
    "pic": advanced,
    "desc": "支援手機拍攝功能，記錄夜空之美。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 9 折優惠",
    "stock": 48,
    "category": {
      "main": "天文望遠鏡",
      "sub": "進階專業型"
    }
  },
  {
    "id": 26,
    "name": "基礎入門型 商品 26",
    "price": 3040,
    "specialPrice": 2584,
    "pic": begginer,
    "desc": "專業級設計，支援長時間觀測與攝影。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 7 折優惠",
    "stock": 18,
    "category": {
      "main": "天文望遠鏡",
      "sub": "基礎入門型"
    }
  },
  {
    "id": 27,
    "name": "基礎入門型 商品 27",
    "price": 2514,
    "specialPrice": 2011,
    "pic": begginer,
    "desc": "專業級設計，支援長時間觀測與攝影。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 85 折優惠",
    "stock": 30,
    "category": {
      "main": "天文望遠鏡",
      "sub": "基礎入門型"
    }
  },
  {
    "id": 28,
    "name": "進階專業型 商品 28",
    "price": 3750,
    "specialPrice": 3187,
    "pic": advanced,
    "desc": "支援手機拍攝功能，記錄夜空之美。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 7 折優惠",
    "stock": 45,
    "category": {
      "main": "天文望遠鏡",
      "sub": "進階專業型"
    }
  },
  {
    "id": 29,
    "name": "進階專業型 商品 29",
    "price": 11532,
    "specialPrice": 8072,
    "pic": advanced,
    "desc": "專業級設計，支援長時間觀測與攝影。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 9 折優惠",
    "stock": 48,
    "category": {
      "main": "天文望遠鏡",
      "sub": "進階專業型"
    }
  },
  {
    "id": 30,
    "name": "進階專業型 商品 30",
    "price": 11954,
    "specialPrice": 10160,
    "pic": advanced,
    "desc": "專業級設計，支援長時間觀測與攝影。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 9 折優惠",
    "stock": 37,
    "category": {
      "main": "天文望遠鏡",
      "sub": "進階專業型"
    }
  },
  {
    "id": 31,
    "name": "基礎入門型 商品 31",
    "price": 8219,
    "specialPrice": 5753,
    "pic": begginer,
    "desc": "適合初學者的觀星望遠鏡，輕巧好上手。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 7 折優惠",
    "stock": 50,
    "category": {
      "main": "天文望遠鏡",
      "sub": "基礎入門型"
    }
  },
  {
    "id": 32,
    "name": "進階專業型 商品 32",
    "price": 7955,
    "specialPrice": 6364,
    "pic": advanced,
    "desc": "專業級設計，支援長時間觀測與攝影。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 7 折優惠",
    "stock": 47,
    "category": {
      "main": "天文望遠鏡",
      "sub": "進階專業型"
    }
  },
  {
    "id": 33,
    "name": "基礎入門型 商品 33",
    "price": 3712,
    "specialPrice": 2969,
    "pic": begginer,
    "desc": "專業級設計，支援長時間觀測與攝影。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 85 折優惠",
    "stock": 5,
    "category": {
      "main": "天文望遠鏡",
      "sub": "基礎入門型"
    }
  },
  {
    "id": 34,
    "name": "進階專業型 商品 34",
    "price": 4888,
    "specialPrice": 3910,
    "pic": advanced,
    "desc": "支援手機拍攝功能，記錄夜空之美。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 9 折優惠",
    "stock": 20,
    "category": {
      "main": "天文望遠鏡",
      "sub": "進階專業型"
    }
  },
  {
    "id": 35,
    "name": "基礎入門型 商品 35",
    "price": 3900,
    "specialPrice": 2730,
    "pic": begginer,
    "desc": "支援手機拍攝功能，記錄夜空之美。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 85 折優惠",
    "stock": 5,
    "category": {
      "main": "天文望遠鏡",
      "sub": "基礎入門型"
    }
  },
  {
    "id": 36,
    "name": "基礎入門型 商品 36",
    "price": 18462,
    "specialPrice": 12923,
    "pic": begginer,
    "desc": "適合初學者的觀星望遠鏡，輕巧好上手。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 7 折優惠",
    "stock": 11,
    "category": {
      "main": "天文望遠鏡",
      "sub": "基礎入門型"
    }
  },
  {
    "id": 37,
    "name": "進階專業型 商品 37",
    "price": 13414,
    "specialPrice": 9389,
    "pic": advanced,
    "desc": "支援手機拍攝功能，記錄夜空之美。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 9 折優惠",
    "stock": 41,
    "category": {
      "main": "天文望遠鏡",
      "sub": "進階專業型"
    }
  },
  {
    "id": 38,
    "name": "進階專業型 商品 38",
    "price": 3477,
    "specialPrice": 2433,
    "pic": advanced,
    "desc": "專業級設計，支援長時間觀測與攝影。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 9 折優惠",
    "stock": 27,
    "category": {
      "main": "天文望遠鏡",
      "sub": "進階專業型"
    }
  },
  {
    "id": 39,
    "name": "進階專業型 商品 39",
    "price": 6823,
    "specialPrice": 6140,
    "pic": advanced,
    "desc": "專業級設計，支援長時間觀測與攝影。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 85 折優惠",
    "stock": 19,
    "category": {
      "main": "天文望遠鏡",
      "sub": "進階專業型"
    }
  },
  {
    "id": 40,
    "name": "基礎入門型 商品 40",
    "price": 14114,
    "specialPrice": 11291,
    "pic": begginer,
    "desc": "專業級設計，支援長時間觀測與攝影。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 8 折優惠",
    "stock": 36,
    "category": {
      "main": "天文望遠鏡",
      "sub": "基礎入門型"
    }
  },
  {
    "id": 41,
    "name": "進階專業型 商品 41",
    "price": 19044,
    "specialPrice": 13330,
    "pic": advanced,
    "desc": "支援手機拍攝功能，記錄夜空之美。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 9 折優惠",
    "stock": 46,
    "category": {
      "main": "天文望遠鏡",
      "sub": "進階專業型"
    }
  },
  {
    "id": 42,
    "name": "進階專業型 商品 42",
    "price": 8004,
    "specialPrice": 6403,
    "pic": advanced,
    "desc": "適合初學者的觀星望遠鏡，輕巧好上手。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 7 折優惠",
    "stock": 5,
    "category": {
      "main": "天文望遠鏡",
      "sub": "進階專業型"
    }
  },
  {
    "id": 43,
    "name": "單筒望遠鏡 商品 43",
    "price": 7362,
    "specialPrice": 5889,
    "pic": monocular,
    "desc": "小巧便攜，適合旅行與戶外觀測。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 8 折優惠",
    "stock": 9,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "單筒望遠鏡"
    }
  },
  {
    "id": 44,
    "name": "雙筒望遠鏡 商品 44",
    "price": 5629,
    "specialPrice": 5066,
    "pic": binoculars,
    "desc": "成像清晰，觀鳥與觀星兩用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 85 折優惠",
    "stock": 33,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "雙筒望遠鏡"
    }
  },
  {
    "id": 45,
    "name": "單筒望遠鏡 商品 45",
    "price": 1838,
    "specialPrice": 1286,
    "pic": monocular,
    "desc": "耐用設計，適合長時間使用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 9 折優惠",
    "stock": 42,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "單筒望遠鏡"
    }
  },
  {
    "id": 46,
    "name": "單筒望遠鏡 商品 46",
    "price": 5669,
    "specialPrice": 3968,
    "pic": monocular,
    "desc": "耐用設計，適合長時間使用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 9 折優惠",
    "stock": 42,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "單筒望遠鏡"
    }
  },
  {
    "id": 47,
    "name": "雙筒望遠鏡 商品 47",
    "price": 7673,
    "specialPrice": 5371,
    "pic": binoculars,
    "desc": "小巧便攜，適合旅行與戶外觀測。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 8 折優惠",
    "stock": 15,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "雙筒望遠鏡"
    }
  },
  {
    "id": 48,
    "name": "單筒望遠鏡 商品 48",
    "price": 8341,
    "specialPrice": 7506,
    "pic": monocular,
    "desc": "小巧便攜，適合旅行與戶外觀測。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 7 折優惠",
    "stock": 5,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "單筒望遠鏡"
    }
  },
  {
    "id": 49,
    "name": "雙筒望遠鏡 商品 49",
    "price": 6811,
    "specialPrice": 5448,
    "pic": binoculars,
    "desc": "成像清晰，觀鳥與觀星兩用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 9 折優惠",
    "stock": 32,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "雙筒望遠鏡"
    }
  },
  {
    "id": 50,
    "name": "雙筒望遠鏡 商品 50",
    "price": 2125,
    "specialPrice": 1487,
    "pic": binoculars,
    "desc": "小巧便攜，適合旅行與戶外觀測。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 8 折優惠",
    "stock": 30,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "雙筒望遠鏡"
    }
  },
  {
    "id": 51,
    "name": "雙筒望遠鏡 商品 51",
    "price": 7280,
    "specialPrice": 5824,
    "pic": binoculars,
    "desc": "小巧便攜，適合旅行與戶外觀測。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 9 折優惠",
    "stock": 46,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "雙筒望遠鏡"
    }
  },
  {
    "id": 52,
    "name": "單筒望遠鏡 商品 52",
    "price": 2870,
    "specialPrice": 2583,
    "pic": monocular,
    "desc": "耐用設計，適合長時間使用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 85 折優惠",
    "stock": 50,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "單筒望遠鏡"
    }
  },
  {
    "id": 53,
    "name": "單筒望遠鏡 商品 53",
    "price": 5223,
    "specialPrice": 4178,
    "pic": monocular,
    "desc": "耐用設計，適合長時間使用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 8 折優惠",
    "stock": 8,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "單筒望遠鏡"
    }
  },
  {
    "id": 54,
    "name": "單筒望遠鏡 商品 54",
    "price": 6396,
    "specialPrice": 5756,
    "pic": monocular,
    "desc": "小巧便攜，適合旅行與戶外觀測。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 7 折優惠",
    "stock": 10,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "單筒望遠鏡"
    }
  },
  {
    "id": 55,
    "name": "單筒望遠鏡 商品 55",
    "price": 9805,
    "specialPrice": 8824,
    "pic": monocular,
    "desc": "耐用設計，適合長時間使用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 9 折優惠",
    "stock": 29,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "單筒望遠鏡"
    }
  },
  {
    "id": 56,
    "name": "雙筒望遠鏡 商品 56",
    "price": 3449,
    "specialPrice": 2931,
    "pic": binoculars,
    "desc": "耐用設計，適合長時間使用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 9 折優惠",
    "stock": 36,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "雙筒望遠鏡"
    }
  },
  {
    "id": 57,
    "name": "單筒望遠鏡 商品 57",
    "price": 2755,
    "specialPrice": 2341,
    "pic": monocular,
    "desc": "耐用設計，適合長時間使用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 7 折優惠",
    "stock": 46,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "單筒望遠鏡"
    }
  },
  {
    "id": 58,
    "name": "雙筒望遠鏡 商品 58",
    "price": 8537,
    "specialPrice": 5975,
    "pic": binoculars,
    "desc": "耐用設計，適合長時間使用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 8 折優惠",
    "stock": 24,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "雙筒望遠鏡"
    }
  },
  {
    "id": 59,
    "name": "雙筒望遠鏡 商品 59",
    "price": 6781,
    "specialPrice": 4746,
    "pic": binoculars,
    "desc": "成像清晰，觀鳥與觀星兩用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 85 折優惠",
    "stock": 43,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "雙筒望遠鏡"
    }
  },
  {
    "id": 60,
    "name": "雙筒望遠鏡 商品 60",
    "price": 1821,
    "specialPrice": 1456,
    "pic": binoculars,
    "desc": "耐用設計，適合長時間使用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 9 折優惠",
    "stock": 48,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "雙筒望遠鏡"
    }
  },
  {
    "id": 61,
    "name": "雙筒望遠鏡 商品 61",
    "price": 6106,
    "specialPrice": 4274,
    "pic": binoculars,
    "desc": "小巧便攜，適合旅行與戶外觀測。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 9 折優惠",
    "stock": 30,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "雙筒望遠鏡"
    }
  },
  {
    "id": 62,
    "name": "雙筒望遠鏡 商品 62",
    "price": 9574,
    "specialPrice": 7659,
    "pic": binoculars,
    "desc": "耐用設計，適合長時間使用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 7 折優惠",
    "stock": 16,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "雙筒望遠鏡"
    }
  },
  {
    "id": 63,
    "name": "雙筒望遠鏡 商品 63",
    "price": 2190,
    "specialPrice": 1971,
    "pic": binoculars,
    "desc": "成像清晰，觀鳥與觀星兩用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 8 折優惠",
    "stock": 43,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "雙筒望遠鏡"
    }
  },
  {
    "id": 64,
    "name": "單筒望遠鏡 商品 64",
    "price": 8081,
    "specialPrice": 7272,
    "pic": monocular,
    "desc": "小巧便攜，適合旅行與戶外觀測。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 7 折優惠",
    "stock": 25,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "單筒望遠鏡"
    }
  },
  {
    "id": 65,
    "name": "單筒望遠鏡 商品 65",
    "price": 3700,
    "specialPrice": 2960,
    "pic": monocular,
    "desc": "耐用設計，適合長時間使用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 8 折優惠",
    "stock": 44,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "單筒望遠鏡"
    }
  },
  {
    "id": 66,
    "name": "雙筒望遠鏡 商品 66",
    "price": 7560,
    "specialPrice": 5292,
    "pic": binoculars,
    "desc": "成像清晰，觀鳥與觀星兩用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 85 折優惠",
    "stock": 5,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "雙筒望遠鏡"
    }
  },
  {
    "id": 67,
    "name": "雙筒望遠鏡 商品 67",
    "price": 1896,
    "specialPrice": 1706,
    "pic": binoculars,
    "desc": "小巧便攜，適合旅行與戶外觀測。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 85 折優惠",
    "stock": 49,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "雙筒望遠鏡"
    }
  },
  {
    "id": 68,
    "name": "單筒望遠鏡 商品 68",
    "price": 3306,
    "specialPrice": 2314,
    "pic": monocular,
    "desc": "小巧便攜，適合旅行與戶外觀測。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 8 折優惠",
    "stock": 22,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "單筒望遠鏡"
    }
  },
  {
    "id": 69,
    "name": "雙筒望遠鏡 商品 69",
    "price": 9283,
    "specialPrice": 8354,
    "pic": binoculars,
    "desc": "成像清晰，觀鳥與觀星兩用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 7 折優惠",
    "stock": 18,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "雙筒望遠鏡"
    }
  },
  {
    "id": 70,
    "name": "單筒望遠鏡 商品 70",
    "price": 3478,
    "specialPrice": 2782,
    "pic": monocular,
    "desc": "小巧便攜，適合旅行與戶外觀測。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 7 折優惠",
    "stock": 32,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "單筒望遠鏡"
    }
  },
  {
    "id": 71,
    "name": "雙筒望遠鏡 商品 71",
    "price": 5723,
    "specialPrice": 5150,
    "pic": binoculars,
    "desc": "小巧便攜，適合旅行與戶外觀測。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 9 折優惠",
    "stock": 15,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "雙筒望遠鏡"
    }
  },
  {
    "id": 72,
    "name": "單筒望遠鏡 商品 72",
    "price": 9864,
    "specialPrice": 8877,
    "pic": monocular,
    "desc": "小巧便攜，適合旅行與戶外觀測。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 85 折優惠",
    "stock": 7,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "單筒望遠鏡"
    }
  },
  {
    "id": 73,
    "name": "雙筒望遠鏡 商品 73",
    "price": 4598,
    "specialPrice": 3218,
    "pic": binoculars,
    "desc": "成像清晰，觀鳥與觀星兩用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 7 折優惠",
    "stock": 42,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "雙筒望遠鏡"
    }
  },
  {
    "id": 74,
    "name": "雙筒望遠鏡 商品 74",
    "price": 2868,
    "specialPrice": 2437,
    "pic": binoculars,
    "desc": "耐用設計，適合長時間使用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 85 折優惠",
    "stock": 34,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "雙筒望遠鏡"
    }
  },
  {
    "id": 75,
    "name": "單筒望遠鏡 商品 75",
    "price": 7856,
    "specialPrice": 6284,
    "pic": monocular,
    "desc": "耐用設計，適合長時間使用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 85 折優惠",
    "stock": 27,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "單筒望遠鏡"
    }
  },
  {
    "id": 76,
    "name": "單筒望遠鏡 商品 76",
    "price": 9368,
    "specialPrice": 8431,
    "pic": monocular,
    "desc": "耐用設計，適合長時間使用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 7 折優惠",
    "stock": 29,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "單筒望遠鏡"
    }
  },
  {
    "id": 77,
    "name": "單筒望遠鏡 商品 77",
    "price": 4878,
    "specialPrice": 4390,
    "pic": monocular,
    "desc": "成像清晰，觀鳥與觀星兩用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 7 折優惠",
    "stock": 22,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "單筒望遠鏡"
    }
  },
  {
    "id": 78,
    "name": "單筒望遠鏡 商品 78",
    "price": 8590,
    "specialPrice": 6013,
    "pic": monocular,
    "desc": "小巧便攜，適合旅行與戶外觀測。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 7 折優惠",
    "stock": 15,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "單筒望遠鏡"
    }
  },
  {
    "id": 79,
    "name": "雙筒望遠鏡 商品 79",
    "price": 7392,
    "specialPrice": 5174,
    "pic": binoculars,
    "desc": "成像清晰，觀鳥與觀星兩用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 7 折優惠",
    "stock": 27,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "雙筒望遠鏡"
    }
  },
  {
    "id": 80,
    "name": "雙筒望遠鏡 商品 80",
    "price": 3297,
    "specialPrice": 2307,
    "pic": binoculars,
    "desc": "成像清晰，觀鳥與觀星兩用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 85 折優惠",
    "stock": 42,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "雙筒望遠鏡"
    }
  },
  {
    "id": 81,
    "name": "雙筒望遠鏡 商品 81",
    "price": 3399,
    "specialPrice": 2889,
    "pic": binoculars,
    "desc": "小巧便攜，適合旅行與戶外觀測。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 8 折優惠",
    "stock": 25,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "雙筒望遠鏡"
    }
  },
  {
    "id": 82,
    "name": "雙筒望遠鏡 商品 82",
    "price": 3351,
    "specialPrice": 3015,
    "pic": binoculars,
    "desc": "小巧便攜，適合旅行與戶外觀測。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 8 折優惠",
    "stock": 41,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "雙筒望遠鏡"
    }
  },
  {
    "id": 83,
    "name": "單筒望遠鏡 商品 83",
    "price": 8640,
    "specialPrice": 6048,
    "pic": monocular,
    "desc": "小巧便攜，適合旅行與戶外觀測。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 8 折優惠",
    "stock": 6,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "單筒望遠鏡"
    }
  },
  {
    "id": 84,
    "name": "單筒望遠鏡 商品 84",
    "price": 5986,
    "specialPrice": 4190,
    "pic": monocular,
    "desc": "耐用設計，適合長時間使用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 85 折優惠",
    "stock": 39,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "單筒望遠鏡"
    }
  },
  {
    "id": 85,
    "name": "單筒望遠鏡 商品 85",
    "price": 4215,
    "specialPrice": 3372,
    "pic": monocular,
    "desc": "耐用設計，適合長時間使用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 7 折優惠",
    "stock": 36,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "單筒望遠鏡"
    }
  },
  {
    "id": 86,
    "name": "雙筒望遠鏡 商品 86",
    "price": 8802,
    "specialPrice": 7921,
    "pic": binoculars,
    "desc": "耐用設計，適合長時間使用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "現享 9 折優惠",
    "stock": 9,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "雙筒望遠鏡"
    }
  },
  {
    "id": 87,
    "name": "雙筒望遠鏡 商品 87",
    "price": 9539,
    "specialPrice": 8108,
    "pic": binoculars,
    "desc": "小巧便攜，適合旅行與戶外觀測。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 85 折優惠",
    "stock": 20,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "雙筒望遠鏡"
    }
  },
  {
    "id": 88,
    "name": "單筒望遠鏡 商品 88",
    "price": 5359,
    "specialPrice": 4555,
    "pic": monocular,
    "desc": "小巧便攜，適合旅行與戶外觀測。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 85 折優惠",
    "stock": 39,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "單筒望遠鏡"
    }
  },
  {
    "id": 89,
    "name": "單筒望遠鏡 商品 89",
    "price": 7402,
    "specialPrice": 5181,
    "pic": monocular,
    "desc": "耐用設計，適合長時間使用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 85 折優惠",
    "stock": 23,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "單筒望遠鏡"
    }
  },
  {
    "id": 90,
    "name": "單筒望遠鏡 商品 90",
    "price": 3630,
    "specialPrice": 3085,
    "pic": monocular,
    "desc": "耐用設計，適合長時間使用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 85 折優惠",
    "stock": 34,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "單筒望遠鏡"
    }
  },
  {
    "id": 91,
    "name": "單筒望遠鏡 商品 91",
    "price": 6206,
    "specialPrice": 4344,
    "pic": monocular,
    "desc": "耐用設計，適合長時間使用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 7 折優惠",
    "stock": 37,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "單筒望遠鏡"
    }
  },
  {
    "id": 92,
    "name": "雙筒望遠鏡 商品 92",
    "price": 3983,
    "specialPrice": 2788,
    "pic": binoculars,
    "desc": "成像清晰，觀鳥與觀星兩用。",
    "promotion": "全館望遠鏡皆享保固內免費清潔服務。",
    "marketing": "限時 85 折優惠",
    "stock": 15,
    "category": {
      "main": "雙筒/單筒望遠鏡",
      "sub": "雙筒望遠鏡"
    }
  },
  {
    "id": 93,
    "name": "一般三腳架 商品 93",
    "price": 2522,
    "specialPrice": 2143,
    "pic": normalTripod,
    "desc": "加強穩定性，專為天文望遠鏡設計。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "現享 9 折優惠",
    "stock": 13,
    "category": {
      "main": "腳架",
      "sub": "一般三腳架"
    }
  },
  {
    "id": 94,
    "name": "一般三腳架 商品 94",
    "price": 1050,
    "specialPrice": 892,
    "pic": normalTripod,
    "desc": "加強穩定性，專為天文望遠鏡設計。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "現享 9 折優惠",
    "stock": 44,
    "category": {
      "main": "腳架",
      "sub": "一般三腳架"
    }
  },
  {
    "id": 95,
    "name": "天文三腳架 商品 95",
    "price": 5092,
    "specialPrice": 4582,
    "pic": telescopeTripod,
    "desc": "加強穩定性，專為天文望遠鏡設計。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "現享 9 折優惠",
    "stock": 37,
    "category": {
      "main": "腳架",
      "sub": "天文三腳架"
    }
  },
  {
    "id": 96,
    "name": "一般三腳架 商品 96",
    "price": 3303,
    "specialPrice": 2807,
    "pic": normalTripod,
    "desc": "加強穩定性，專為天文望遠鏡設計。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "現享 9 折優惠",
    "stock": 45,
    "category": {
      "main": "腳架",
      "sub": "一般三腳架"
    }
  },
  {
    "id": 97,
    "name": "天文三腳架 商品 97",
    "price": 4947,
    "specialPrice": 3462,
    "pic": telescopeTripod,
    "desc": "高度可調，靈活應用。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "限時 85 折優惠",
    "stock": 24,
    "category": {
      "main": "腳架",
      "sub": "天文三腳架"
    }
  },
  {
    "id": 98,
    "name": "天文三腳架 商品 98",
    "price": 5192,
    "specialPrice": 4672,
    "pic": telescopeTripod,
    "desc": "高度可調，靈活應用。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "限時 85 折優惠",
    "stock": 23,
    "category": {
      "main": "腳架",
      "sub": "天文三腳架"
    }
  },
  {
    "id": 99,
    "name": "天文三腳架 商品 99",
    "price": 5356,
    "specialPrice": 4820,
    "pic": telescopeTripod,
    "desc": "加強穩定性，專為天文望遠鏡設計。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "現享 8 折優惠",
    "stock": 5,
    "category": {
      "main": "腳架",
      "sub": "天文三腳架"
    }
  },
  {
    "id": 100,
    "name": "天文三腳架 商品 100",
    "price": 1506,
    "specialPrice": 1054,
    "pic": telescopeTripod,
    "desc": "加強穩定性，專為天文望遠鏡設計。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "限時 7 折優惠",
    "stock": 24,
    "category": {
      "main": "腳架",
      "sub": "天文三腳架"
    }
  },
  {
    "id": 101,
    "name": "天文三腳架 商品 101",
    "price": 3733,
    "specialPrice": 3173,
    "pic": telescopeTripod,
    "desc": "加強穩定性，專為天文望遠鏡設計。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "現享 8 折優惠",
    "stock": 38,
    "category": {
      "main": "腳架",
      "sub": "天文三腳架"
    }
  },
  {
    "id": 102,
    "name": "天文三腳架 商品 102",
    "price": 3519,
    "specialPrice": 2991,
    "pic": telescopeTripod,
    "desc": "輕便設計，適合一般觀測需求。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "現享 8 折優惠",
    "stock": 15,
    "category": {
      "main": "腳架",
      "sub": "天文三腳架"
    }
  },
  {
    "id": 103,
    "name": "天文三腳架 商品 103",
    "price": 3644,
    "specialPrice": 2915,
    "pic": telescopeTripod,
    "desc": "加強穩定性，專為天文望遠鏡設計。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "限時 7 折優惠",
    "stock": 9,
    "category": {
      "main": "腳架",
      "sub": "天文三腳架"
    }
  },
  {
    "id": 104,
    "name": "天文三腳架 商品 104",
    "price": 5542,
    "specialPrice": 4433,
    "pic": telescopeTripod,
    "desc": "高度可調，靈活應用。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "現享 9 折優惠",
    "stock": 47,
    "category": {
      "main": "腳架",
      "sub": "天文三腳架"
    }
  },
  {
    "id": 105,
    "name": "一般三腳架 商品 105",
    "price": 5800,
    "specialPrice": 5220,
    "pic": normalTripod,
    "desc": "輕便設計，適合一般觀測需求。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "限時 7 折優惠",
    "stock": 33,
    "category": {
      "main": "腳架",
      "sub": "一般三腳架"
    }
  },
  {
    "id": 106,
    "name": "天文三腳架 商品 106",
    "price": 3015,
    "specialPrice": 2713,
    "pic": telescopeTripod,
    "desc": "高度可調，靈活應用。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "限時 85 折優惠",
    "stock": 20,
    "category": {
      "main": "腳架",
      "sub": "天文三腳架"
    }
  },
  {
    "id": 107,
    "name": "一般三腳架 商品 107",
    "price": 2465,
    "specialPrice": 2218,
    "pic": normalTripod,
    "desc": "輕便設計，適合一般觀測需求。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "限時 7 折優惠",
    "stock": 6,
    "category": {
      "main": "腳架",
      "sub": "一般三腳架"
    }
  },
  {
    "id": 108,
    "name": "天文三腳架 商品 108",
    "price": 2832,
    "specialPrice": 2265,
    "pic": telescopeTripod,
    "desc": "高度可調，靈活應用。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "現享 8 折優惠",
    "stock": 33,
    "category": {
      "main": "腳架",
      "sub": "天文三腳架"
    }
  },
  {
    "id": 109,
    "name": "一般三腳架 商品 109",
    "price": 4619,
    "specialPrice": 3695,
    "pic": normalTripod,
    "desc": "輕便設計，適合一般觀測需求。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "限時 7 折優惠",
    "stock": 49,
    "category": {
      "main": "腳架",
      "sub": "一般三腳架"
    }
  },
  {
    "id": 110,
    "name": "天文三腳架 商品 110",
    "price": 3933,
    "specialPrice": 2753,
    "pic": telescopeTripod,
    "desc": "加強穩定性，專為天文望遠鏡設計。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "現享 8 折優惠",
    "stock": 34,
    "category": {
      "main": "腳架",
      "sub": "天文三腳架"
    }
  },
  {
    "id": 111,
    "name": "一般三腳架 商品 111",
    "price": 5174,
    "specialPrice": 4656,
    "pic": normalTripod,
    "desc": "輕便設計，適合一般觀測需求。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "現享 8 折優惠",
    "stock": 5,
    "category": {
      "main": "腳架",
      "sub": "一般三腳架"
    }
  },
  {
    "id": 112,
    "name": "天文三腳架 商品 112",
    "price": 3238,
    "specialPrice": 2590,
    "pic": telescopeTripod,
    "desc": "高度可調，靈活應用。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "限時 7 折優惠",
    "stock": 49,
    "category": {
      "main": "腳架",
      "sub": "天文三腳架"
    }
  },
  {
    "id": 113,
    "name": "一般三腳架 商品 113",
    "price": 5262,
    "specialPrice": 3683,
    "pic": normalTripod,
    "desc": "高度可調，靈活應用。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "現享 9 折優惠",
    "stock": 9,
    "category": {
      "main": "腳架",
      "sub": "一般三腳架"
    }
  },
  {
    "id": 114,
    "name": "天文三腳架 商品 114",
    "price": 3262,
    "specialPrice": 2609,
    "pic": telescopeTripod,
    "desc": "加強穩定性，專為天文望遠鏡設計。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "現享 8 折優惠",
    "stock": 49,
    "category": {
      "main": "腳架",
      "sub": "天文三腳架"
    }
  },
  {
    "id": 115,
    "name": "天文三腳架 商品 115",
    "price": 5396,
    "specialPrice": 4316,
    "pic": telescopeTripod,
    "desc": "輕便設計，適合一般觀測需求。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "現享 9 折優惠",
    "stock": 43,
    "category": {
      "main": "腳架",
      "sub": "天文三腳架"
    }
  },
  {
    "id": 116,
    "name": "一般三腳架 商品 116",
    "price": 3256,
    "specialPrice": 2930,
    "pic": normalTripod,
    "desc": "高度可調，靈活應用。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "現享 9 折優惠",
    "stock": 46,
    "category": {
      "main": "腳架",
      "sub": "一般三腳架"
    }
  },
  {
    "id": 117,
    "name": "一般三腳架 商品 117",
    "price": 3995,
    "specialPrice": 3595,
    "pic": normalTripod,
    "desc": "加強穩定性，專為天文望遠鏡設計。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "限時 85 折優惠",
    "stock": 40,
    "category": {
      "main": "腳架",
      "sub": "一般三腳架"
    }
  },
  {
    "id": 118,
    "name": "天文三腳架 商品 118",
    "price": 2947,
    "specialPrice": 2652,
    "pic": telescopeTripod,
    "desc": "高度可調，靈活應用。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "限時 85 折優惠",
    "stock": 16,
    "category": {
      "main": "腳架",
      "sub": "天文三腳架"
    }
  },
  {
    "id": 119,
    "name": "一般三腳架 商品 119",
    "price": 5836,
    "specialPrice": 4085,
    "pic": normalTripod,
    "desc": "高度可調，靈活應用。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "現享 9 折優惠",
    "stock": 27,
    "category": {
      "main": "腳架",
      "sub": "一般三腳架"
    }
  },
  {
    "id": 120,
    "name": "一般三腳架 商品 120",
    "price": 4946,
    "specialPrice": 3462,
    "pic": normalTripod,
    "desc": "高度可調，靈活應用。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "限時 7 折優惠",
    "stock": 48,
    "category": {
      "main": "腳架",
      "sub": "一般三腳架"
    }
  },
  {
    "id": 121,
    "name": "天文三腳架 商品 121",
    "price": 5182,
    "specialPrice": 3627,
    "pic": telescopeTripod,
    "desc": "輕便設計，適合一般觀測需求。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "現享 9 折優惠",
    "stock": 26,
    "category": {
      "main": "腳架",
      "sub": "天文三腳架"
    }
  },
  {
    "id": 122,
    "name": "一般三腳架 商品 122",
    "price": 3263,
    "specialPrice": 2773,
    "pic": normalTripod,
    "desc": "輕便設計，適合一般觀測需求。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "現享 8 折優惠",
    "stock": 27,
    "category": {
      "main": "腳架",
      "sub": "一般三腳架"
    }
  },
  {
    "id": 123,
    "name": "一般三腳架 商品 123",
    "price": 1053,
    "specialPrice": 842,
    "pic": normalTripod,
    "desc": "高度可調，靈活應用。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "現享 8 折優惠",
    "stock": 6,
    "category": {
      "main": "腳架",
      "sub": "一般三腳架"
    }
  },
  {
    "id": 124,
    "name": "天文三腳架 商品 124",
    "price": 1275,
    "specialPrice": 1020,
    "pic": telescopeTripod,
    "desc": "高度可調，靈活應用。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "限時 85 折優惠",
    "stock": 14,
    "category": {
      "main": "腳架",
      "sub": "天文三腳架"
    }
  },
  {
    "id": 125,
    "name": "天文三腳架 商品 125",
    "price": 1070,
    "specialPrice": 856,
    "pic": telescopeTripod,
    "desc": "高度可調，靈活應用。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "限時 85 折優惠",
    "stock": 47,
    "category": {
      "main": "腳架",
      "sub": "天文三腳架"
    }
  },
  {
    "id": 126,
    "name": "一般三腳架 商品 126",
    "price": 2042,
    "specialPrice": 1429,
    "pic": normalTripod,
    "desc": "加強穩定性，專為天文望遠鏡設計。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "現享 9 折優惠",
    "stock": 16,
    "category": {
      "main": "腳架",
      "sub": "一般三腳架"
    }
  },
  {
    "id": 127,
    "name": "一般三腳架 商品 127",
    "price": 1970,
    "specialPrice": 1674,
    "pic": normalTripod,
    "desc": "輕便設計，適合一般觀測需求。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "現享 8 折優惠",
    "stock": 44,
    "category": {
      "main": "腳架",
      "sub": "一般三腳架"
    }
  },
  {
    "id": 128,
    "name": "天文三腳架 商品 128",
    "price": 5176,
    "specialPrice": 3623,
    "pic": telescopeTripod,
    "desc": "高度可調，靈活應用。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "限時 7 折優惠",
    "stock": 14,
    "category": {
      "main": "腳架",
      "sub": "天文三腳架"
    }
  },
  {
    "id": 129,
    "name": "星座盤 商品 129",
    "price": 408,
    "specialPrice": 346,
    "pic": constellationDisk,
    "desc": "觀星必備的小工具，方便又實用。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "限時 7 折優惠",
    "stock": 42,
    "category": {
      "main": "配件",
      "sub": "星座盤"
    }
  },
  {
    "id": 130,
    "name": "指北針 商品 130",
    "price": 876,
    "specialPrice": 744,
    "pic": compass,
    "desc": "耐用材質，長時間使用不易損壞。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "限時 7 折優惠",
    "stock": 12,
    "category": {
      "main": "配件",
      "sub": "指北針"
    }
  },
  {
    "id": 131,
    "name": "紅光手電筒 商品 131",
    "price": 755,
    "specialPrice": 528,
    "pic": flashLight,
    "desc": "觀星必備的小工具，方便又實用。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "限時 7 折優惠",
    "stock": 47,
    "category": {
      "main": "配件",
      "sub": "紅光手電筒"
    }
  },
  {
    "id": 132,
    "name": "星座盤 商品 132",
    "price": 899,
    "specialPrice": 764,
    "pic": constellationDisk,
    "desc": "觀星必備的小工具，方便又實用。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "現享 9 折優惠",
    "stock": 7,
    "category": {
      "main": "配件",
      "sub": "星座盤"
    }
  },
  {
    "id": 133,
    "name": "紅光手電筒 商品 133",
    "price": 422,
    "specialPrice": 337,
    "pic": flashLight,
    "desc": "耐用材質，長時間使用不易損壞。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "現享 9 折優惠",
    "stock": 5,
    "category": {
      "main": "配件",
      "sub": "紅光手電筒"
    }
  },
  {
    "id": 134,
    "name": "指北針 商品 134",
    "price": 339,
    "specialPrice": 288,
    "pic": compass,
    "desc": "輕巧設計，適合攜帶出門。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "限時 85 折優惠",
    "stock": 49,
    "category": {
      "main": "配件",
      "sub": "指北針"
    }
  },
  {
    "id": 135,
    "name": "星座盤 商品 135",
    "price": 758,
    "specialPrice": 530,
    "pic": constellationDisk,
    "desc": "耐用材質，長時間使用不易損壞。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "限時 7 折優惠",
    "stock": 38,
    "category": {
      "main": "配件",
      "sub": "星座盤"
    }
  },
  {
    "id": 136,
    "name": "紅光手電筒 商品 136",
    "price": 349,
    "specialPrice": 244,
    "pic": flashLight,
    "desc": "輕巧設計，適合攜帶出門。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "限時 7 折優惠",
    "stock": 40,
    "category": {
      "main": "配件",
      "sub": "紅光手電筒"
    }
  },
  {
    "id": 137,
    "name": "紅光手電筒 商品 137",
    "price": 591,
    "specialPrice": 472,
    "pic": flashLight,
    "desc": "耐用材質，長時間使用不易損壞。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "限時 85 折優惠",
    "stock": 42,
    "category": {
      "main": "配件",
      "sub": "紅光手電筒"
    }
  },
  {
    "id": 138,
    "name": "指北針 商品 138",
    "price": 625,
    "specialPrice": 500,
    "pic": compass,
    "desc": "觀星必備的小工具，方便又實用。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "限時 85 折優惠",
    "stock": 41,
    "category": {
      "main": "配件",
      "sub": "指北針"
    }
  },
  {
    "id": 139,
    "name": "指北針 商品 139",
    "price": 415,
    "specialPrice": 290,
    "pic": compass,
    "desc": "觀星必備的小工具，方便又實用。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "現享 8 折優惠",
    "stock": 29,
    "category": {
      "main": "配件",
      "sub": "指北針"
    }
  },
  {
    "id": 140,
    "name": "紅光手電筒 商品 140",
    "price": 807,
    "specialPrice": 564,
    "pic": flashLight,
    "desc": "耐用材質，長時間使用不易損壞。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "限時 85 折優惠",
    "stock": 33,
    "category": {
      "main": "配件",
      "sub": "紅光手電筒"
    }
  },
  {
    "id": 141,
    "name": "星座盤 商品 141",
    "price": 575,
    "specialPrice": 402,
    "pic": constellationDisk,
    "desc": "耐用材質，長時間使用不易損壞。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "現享 8 折優惠",
    "stock": 19,
    "category": {
      "main": "配件",
      "sub": "星座盤"
    }
  },
  {
    "id": 142,
    "name": "紅光手電筒 商品 142",
    "price": 762,
    "specialPrice": 609,
    "pic": flashLight,
    "desc": "耐用材質，長時間使用不易損壞。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "限時 7 折優惠",
    "stock": 15,
    "category": {
      "main": "配件",
      "sub": "紅光手電筒"
    }
  },
  {
    "id": 143,
    "name": "指北針 商品 143",
    "price": 378,
    "specialPrice": 321,
    "pic": compass,
    "desc": "觀星必備的小工具，方便又實用。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "現享 8 折優惠",
    "stock": 43,
    "category": {
      "main": "配件",
      "sub": "指北針"
    }
  },
  {
    "id": 144,
    "name": "星座盤 商品 144",
    "price": 473,
    "specialPrice": 331,
    "pic": constellationDisk,
    "desc": "輕巧設計，適合攜帶出門。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "限時 85 折優惠",
    "stock": 11,
    "category": {
      "main": "配件",
      "sub": "星座盤"
    }
  },
  {
    "id": 145,
    "name": "星座盤 商品 145",
    "price": 695,
    "specialPrice": 556,
    "pic": constellationDisk,
    "desc": "觀星必備的小工具，方便又實用。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "現享 9 折優惠",
    "stock": 15,
    "category": {
      "main": "配件",
      "sub": "星座盤"
    }
  },
  {
    "id": 146,
    "name": "紅光手電筒 商品 146",
    "price": 962,
    "specialPrice": 673,
    "pic": flashLight,
    "desc": "耐用材質，長時間使用不易損壞。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "現享 9 折優惠",
    "stock": 40,
    "category": {
      "main": "配件",
      "sub": "紅光手電筒"
    }
  },
  {
    "id": 147,
    "name": "紅光手電筒 商品 147",
    "price": 881,
    "specialPrice": 704,
    "pic": flashLight,
    "desc": "輕巧設計，適合攜帶出門。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "現享 8 折優惠",
    "stock": 6,
    "category": {
      "main": "配件",
      "sub": "紅光手電筒"
    }
  },
  {
    "id": 148,
    "name": "紅光手電筒 商品 148",
    "price": 489,
    "specialPrice": 391,
    "pic": flashLight,
    "desc": "觀星必備的小工具，方便又實用。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "限時 85 折優惠",
    "stock": 48,
    "category": {
      "main": "配件",
      "sub": "紅光手電筒"
    }
  },
  {
    "id": 149,
    "name": "紅光手電筒 商品 149",
    "price": 540,
    "specialPrice": 378,
    "pic": flashLight,
    "desc": "耐用材質，長時間使用不易損壞。",
    "promotion": "腳架與配件皆提供基本保固服務。",
    "marketing": "現享 9 折優惠",
    "stock": 13,
    "category": {
      "main": "配件",
      "sub": "紅光手電筒"
    }
  },
  {
    "id": 150,
    "name": "星空小物 商品 150",
    "price": 1232,
    "specialPrice": 862,
    "pic": stuff,
    "desc": "附插圖與圖解，幫助快速認識星座。",
    "promotion": "購買書籍與小物皆附贈精美書籤。",
    "marketing": "現享 8 折優惠",
    "stock": 24,
    "category": {
      "main": "書籍/小物",
      "sub": "星空小物"
    }
  },
  {
    "id": 151,
    "name": "觀星教學書籍 商品 151",
    "price": 1300,
    "specialPrice": 1040,
    "pic": books,
    "desc": "附插圖與圖解，幫助快速認識星座。",
    "promotion": "購買書籍與小物皆附贈精美書籤。",
    "marketing": "限時 7 折優惠",
    "stock": 29,
    "category": {
      "main": "書籍/小物",
      "sub": "觀星教學書籍"
    }
  },
  {
    "id": 152,
    "name": "觀星教學書籍 商品 152",
    "price": 1375,
    "specialPrice": 1168,
    "pic": books,
    "desc": "淺顯易懂的觀星指南，適合初學者。",
    "promotion": "購買書籍與小物皆附贈精美書籤。",
    "marketing": "限時 7 折優惠",
    "stock": 50,
    "category": {
      "main": "書籍/小物",
      "sub": "觀星教學書籍"
    }
  },
  {
    "id": 153,
    "name": "星空小物 商品 153",
    "price": 553,
    "specialPrice": 442,
    "pic": stuff,
    "desc": "附插圖與圖解，幫助快速認識星座。",
    "promotion": "購買書籍與小物皆附贈精美書籤。",
    "marketing": "限時 7 折優惠",
    "stock": 46,
    "category": {
      "main": "書籍/小物",
      "sub": "星空小物"
    }
  },
  {
    "id": 154,
    "name": "觀星教學書籍 商品 154",
    "price": 1168,
    "specialPrice": 934,
    "pic": books,
    "desc": "附插圖與圖解，幫助快速認識星座。",
    "promotion": "購買書籍與小物皆附贈精美書籤。",
    "marketing": "限時 85 折優惠",
    "stock": 38,
    "category": {
      "main": "書籍/小物",
      "sub": "觀星教學書籍"
    }
  },
  {
    "id": 155,
    "name": "星空小物 商品 155",
    "price": 563,
    "specialPrice": 478,
    "pic": stuff,
    "desc": "淺顯易懂的觀星指南，適合初學者。",
    "promotion": "購買書籍與小物皆附贈精美書籤。",
    "marketing": "限時 7 折優惠",
    "stock": 43,
    "category": {
      "main": "書籍/小物",
      "sub": "星空小物"
    }
  },
  {
    "id": 156,
    "name": "星空小物 商品 156",
    "price": 740,
    "specialPrice": 518,
    "pic": stuff,
    "desc": "淺顯易懂的觀星指南，適合初學者。",
    "promotion": "購買書籍與小物皆附贈精美書籤。",
    "marketing": "限時 85 折優惠",
    "stock": 30,
    "category": {
      "main": "書籍/小物",
      "sub": "星空小物"
    }
  },
  {
    "id": 157,
    "name": "星空小物 商品 157",
    "price": 918,
    "specialPrice": 780,
    "pic": stuff,
    "desc": "內容詳盡，介紹四季星空與觀測技巧。",
    "promotion": "購買書籍與小物皆附贈精美書籤。",
    "marketing": "現享 8 折優惠",
    "stock": 20,
    "category": {
      "main": "書籍/小物",
      "sub": "星空小物"
    }
  },
  {
    "id": 158,
    "name": "星空小物 商品 158",
    "price": 1272,
    "specialPrice": 1144,
    "pic": stuff,
    "desc": "內容詳盡，介紹四季星空與觀測技巧。",
    "promotion": "購買書籍與小物皆附贈精美書籤。",
    "marketing": "限時 7 折優惠",
    "stock": 11,
    "category": {
      "main": "書籍/小物",
      "sub": "星空小物"
    }
  },
  {
    "id": 159,
    "name": "星空小物 商品 159",
    "price": 766,
    "specialPrice": 651,
    "pic": stuff,
    "desc": "內容詳盡，介紹四季星空與觀測技巧。",
    "promotion": "購買書籍與小物皆附贈精美書籤。",
    "marketing": "現享 9 折優惠",
    "stock": 7,
    "category": {
      "main": "書籍/小物",
      "sub": "星空小物"
    }
  },
  {
    "id": 160,
    "name": "星空小物 商品 160",
    "price": 1079,
    "specialPrice": 755,
    "pic": stuff,
    "desc": "淺顯易懂的觀星指南，適合初學者。",
    "promotion": "購買書籍與小物皆附贈精美書籤。",
    "marketing": "現享 9 折優惠",
    "stock": 19,
    "category": {
      "main": "書籍/小物",
      "sub": "星空小物"
    }
  },
  {
    "id": 161,
    "name": "星空小物 商品 161",
    "price": 1001,
    "specialPrice": 800,
    "pic": stuff,
    "desc": "淺顯易懂的觀星指南，適合初學者。",
    "promotion": "購買書籍與小物皆附贈精美書籤。",
    "marketing": "現享 8 折優惠",
    "stock": 36,
    "category": {
      "main": "書籍/小物",
      "sub": "星空小物"
    }
  },
  {
    "id": 162,
    "name": "觀星教學書籍 商品 162",
    "price": 1175,
    "specialPrice": 1057,
    "pic": books,
    "desc": "淺顯易懂的觀星指南，適合初學者。",
    "promotion": "購買書籍與小物皆附贈精美書籤。",
    "marketing": "現享 8 折優惠",
    "stock": 7,
    "category": {
      "main": "書籍/小物",
      "sub": "觀星教學書籍"
    }
  },
  {
    "id": 163,
    "name": "星空小物 商品 163",
    "price": 1016,
    "specialPrice": 914,
    "pic": stuff,
    "desc": "淺顯易懂的觀星指南，適合初學者。",
    "promotion": "購買書籍與小物皆附贈精美書籤。",
    "marketing": "現享 9 折優惠",
    "stock": 16,
    "category": {
      "main": "書籍/小物",
      "sub": "星空小物"
    }
  },
  {
    "id": 164,
    "name": "觀星教學書籍 商品 164",
    "price": 662,
    "specialPrice": 463,
    "pic": books,
    "desc": "內容詳盡，介紹四季星空與觀測技巧。",
    "promotion": "購買書籍與小物皆附贈精美書籤。",
    "marketing": "現享 9 折優惠",
    "stock": 42,
    "category": {
      "main": "書籍/小物",
      "sub": "觀星教學書籍"
    }
  },
  {
    "id": 165,
    "name": "觀星教學書籍 商品 165",
    "price": 558,
    "specialPrice": 390,
    "pic": books,
    "desc": "內容詳盡，介紹四季星空與觀測技巧。",
    "promotion": "購買書籍與小物皆附贈精美書籤。",
    "marketing": "現享 9 折優惠",
    "stock": 33,
    "category": {
      "main": "書籍/小物",
      "sub": "觀星教學書籍"
    }
  },
  {
    "id": 166,
    "name": "星空小物 商品 166",
    "price": 1248,
    "specialPrice": 998,
    "pic": stuff,
    "desc": "附插圖與圖解，幫助快速認識星座。",
    "promotion": "購買書籍與小物皆附贈精美書籤。",
    "marketing": "現享 9 折優惠",
    "stock": 15,
    "category": {
      "main": "書籍/小物",
      "sub": "星空小物"
    }
  },
  {
    "id": 167,
    "name": "觀星教學書籍 商品 167",
    "price": 1308,
    "specialPrice": 915,
    "pic": books,
    "desc": "淺顯易懂的觀星指南，適合初學者。",
    "promotion": "購買書籍與小物皆附贈精美書籤。",
    "marketing": "現享 8 折優惠",
    "stock": 13,
    "category": {
      "main": "書籍/小物",
      "sub": "觀星教學書籍"
    }
  },
  {
    "id": 168,
    "name": "觀星教學書籍 商品 168",
    "price": 810,
    "specialPrice": 567,
    "pic": books,
    "desc": "內容詳盡，介紹四季星空與觀測技巧。",
    "promotion": "購買書籍與小物皆附贈精美書籤。",
    "marketing": "現享 8 折優惠",
    "stock": 25,
    "category": {
      "main": "書籍/小物",
      "sub": "觀星教學書籍"
    }
  },
  {
    "id": 169,
    "name": "星空小物 商品 169",
    "price": 1019,
    "specialPrice": 917,
    "pic": stuff,
    "desc": "內容詳盡，介紹四季星空與觀測技巧。",
    "promotion": "購買書籍與小物皆附贈精美書籤。",
    "marketing": "現享 8 折優惠",
    "stock": 36,
    "category": {
      "main": "書籍/小物",
      "sub": "星空小物"
    }
  },
  {
    "id": 170,
    "name": "星空小物 商品 170",
    "price": 1038,
    "specialPrice": 830,
    "pic": stuff,
    "desc": "附插圖與圖解，幫助快速認識星座。",
    "promotion": "購買書籍與小物皆附贈精美書籤。",
    "marketing": "限時 85 折優惠",
    "stock": 33,
    "category": {
      "main": "書籍/小物",
      "sub": "星空小物"
    }
  },
  {
    "id": 171,
    "name": "觀星教學書籍 商品 171",
    "price": 529,
    "specialPrice": 476,
    "pic": books,
    "desc": "附插圖與圖解，幫助快速認識星座。",
    "promotion": "購買書籍與小物皆附贈精美書籤。",
    "marketing": "限時 7 折優惠",
    "stock": 37,
    "category": {
      "main": "書籍/小物",
      "sub": "觀星教學書籍"
    }
  },
  {
    "id": 172,
    "name": "觀星教學書籍 商品 172",
    "price": 647,
    "specialPrice": 517,
    "pic": books,
    "desc": "淺顯易懂的觀星指南，適合初學者。",
    "promotion": "購買書籍與小物皆附贈精美書籤。",
    "marketing": "限時 7 折優惠",
    "stock": 24,
    "category": {
      "main": "書籍/小物",
      "sub": "觀星教學書籍"
    }
  },
  {
    "id": 173,
    "name": "星空小物 商品 173",
    "price": 1088,
    "specialPrice": 924,
    "pic": stuff,
    "desc": "附插圖與圖解，幫助快速認識星座。",
    "promotion": "購買書籍與小物皆附贈精美書籤。",
    "marketing": "現享 9 折優惠",
    "stock": 34,
    "category": {
      "main": "書籍/小物",
      "sub": "星空小物"
    }
  },
  {
    "id": 174,
    "name": "星空小物 商品 174",
    "price": 639,
    "specialPrice": 543,
    "pic": stuff,
    "desc": "淺顯易懂的觀星指南，適合初學者。",
    "promotion": "購買書籍與小物皆附贈精美書籤。",
    "marketing": "限時 85 折優惠",
    "stock": 14,
    "category": {
      "main": "書籍/小物",
      "sub": "星空小物"
    }
  }
]

export default products;