// 分類圖
import binoculars from '@/assets/images/shop/shophome-binoculars.jpg'
import souvenirs from '@/assets/images/shop/shophome-souvenirs.jpg'
import telescope from '@/assets/images/shop/shophome-telescope.jpg'
import tripod from '@/assets/images/shop/shophome-tripod.png'
import accessory from '@/assets/images/shop/shophome-accessory.png'

// 商品分類
export const productsCate = [
		{
            name: '天文望遠鏡',
            param: 'telescope',
            img: telescope,
            items: ['基礎入門型', '進階專業型']
        },
		{
            name: '雙筒/單筒望遠鏡',
            param: 'binoculars',
            img: binoculars,
            items: ['單筒望遠鏡', '雙筒望遠鏡']
        },
		{
            name: '腳架',
            param: 'tripod',
            img: tripod,
            items: ['一般三腳架', '天文三腳架']
        },
		{
            name: '配件',
            param: 'accessory',
            img: accessory,
            items: ['星座盤', '指北針', '紅光手電筒']
        },
		{
            name: '書籍/小物',
            param: 'souvenirs',
            img: souvenirs,
            items: ['觀星教學書籍', '星空小物']
        },
	]

// 建立 main 篩選 sub 的物件
// 初始值給空物件
export const cateList = productsCate.reduce((list, cate) => {
    list[cate.name] = cate.items
    return list
}, {})

// 會變成下面這樣
/* const categoryList = {
        // cate.name  // cate.items
        '天文望遠鏡': ['基礎入門型', '進階專業型'],
        '雙筒/單筒望遠鏡': ['單筒望遠鏡', '雙筒望遠鏡'],
        '腳架': ['一般三腳架', '天文三腳架'],
        '配件': ['星座盤', '指北針', '紅光手電筒'],
        '書籍/小物': ['觀星教學書籍', '星空小物'],
    } */