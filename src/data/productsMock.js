// 商品頁面假資料：具名匯出，最後回傳 [ {}, {}, ... ]
export const makeProductsMock = ( count = 30 ) => { // count: 決定數量，預設 30 個
    return Array.from({ length: count }, ( _, i ) => { // 寫長度, (value, i) // value這邊用不到，故留空
        const imgSize = 200 // imgSize: 圖片大小
        return {
            id: i + 1,
            name: `基礎望遠鏡 ${String.fromCharCode( i + 65 )}`, // 從 A 開始
            price: 2000 + Math.floor(Math.random()*100),
            // https://picsum.photos/seed/picsum/200/200
            image: `https://picsum.photos/seed/${i}/${imgSize}/${imgSize}`,
        }
    })
}