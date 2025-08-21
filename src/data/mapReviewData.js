import { ref } from 'vue'

export const mockReviews = ref([
    // 地點ID: 1 (南瀛天文館) - 2筆評論
    {
        id: 1,
        locationId: 1,                    // 地點ID
        會員名稱: 'StarGazer123',          // 會員名稱
        評論分數: 5,                      // 評論分數 (1-5分)
        評論內容: '新手友善，剛好是天文館，可以先在天文館學習新知後，留到晚上用天文望遠鏡看星星。設備很齊全！', // 評論內容
        圖片: '../../assets/images/map/map-reviewleft.jpg', // 圖片路徑
        時間: '2025/07/25'                // 時間
    },
    {
        id: 2,
        locationId: 1,                    // 地點ID: 1
        會員名稱: 'MoonHunter',
        評論分數: 4,
        評論內容: '很棒的天文教育場所，帶小朋友來學習天文知識很不錯。不過假日人比較多，建議平日來訪。',
        圖片: '',                         // 沒有圖片
        時間: '2025/07/20'
    },

    // 地點ID: 2 (陽明山) - 2筆評論
    {
        id: 3,
        locationId: 2,                    // 地點ID: 2
        會員名稱: 'MountainStar',
        評論分數: 5,
        評論內容: '台北最佳觀星地點！遠離了市區的光害，可以清楚看到銀河。山上風景也很美，白天晚上都適合來。',
        圖片: '../../assets/images/map/map-reviewleft.jpg',
        時間: '2025/07/22'
    },
    {
        id: 4,
        locationId: 2,                    // 地點ID: 2
        會員名稱: 'UrbanAstro',
        評論分數: 4,
        評論內容: '不錯的觀星體驗，但要注意保暖！山上晚上很冷，記得帶外套。開車上山要小心，山路比較彎曲。',
        圖片: '',
        時間: '2025/07/12'
    },

    // 地點ID: 3 (杉林溪) - 2筆評論
    {
        id: 5,
        locationId: 3,                    // 地點ID: 3
        會員名稱: 'ForestSky',
        評論分數: 5,
        評論內容: '高山觀星的絕佳選擇！海拔高、空氣清新，星空非常清晰。建議住一晚，可以體驗完整的夜空變化。',
        圖片: '../../assets/images/map/map-reviewleft.jpg',
        時間: '2025/07/05'
    },
    {
        id: 6,
        locationId: 3,                    // 地點ID: 3
        會員名稱: 'NatureLover',
        評論分數: 4,
        評論內容: '很棒的觀星地點，森林環境很舒服。住宿設施不錯，餐廳的食物也很好吃。就是交通比較不便。',
        圖片: '',
        時間: '2025/06/28'
    },

    // 地點ID: 4 (三仙台) - 2筆評論
    {
        id: 7,
        locationId: 4,                    // 地點ID: 4
        會員名稱: 'OceanStar',
        評論分數: 4,
        評論內容: '海邊觀星別有一番風味！聽著海浪聲看星星很浪漫。就是風比較大，要注意保暖和設備固定。',
        圖片: '../../assets/images/map/map-reviewleft.jpg',
        時間: '2025/07/01'
    },
    {
        id: 8,
        locationId: 4,                    // 地點ID: 4
        會員名稱: 'EastCoastFan',
        評論分數: 5,
        評論內容: '台東最美的觀星地點！海天一色的夜空真的很震撼。建議提早到，可以先看夕陽再等星星出現。',
        圖片: '',
        時間: '2025/06/25'
    },

    // 地點ID: 5 (蘭嶼) - 2筆評論
    {
        id: 9,
        locationId: 5,                    // 地點ID: 5
        會員名稱: 'IslandStar',
        評論分數: 5,
        評論內容: '台灣最棒的觀星地點沒有之一！完全沒有光害，銀河清晰可見。島上的原住民文化也很有趣。',
        圖片: '../../assets/images/map/map-reviewleft.jpg',
        時間: '2025/06/20'
    },
    {
        id: 10,
        locationId: 5,                    // 地點ID: 5
        會員名稱: 'RemoteExplorer',
        評論分數: 4,
        評論內容: '遠離塵囂的觀星天堂！不過交通比較不便，需要搭船。建議安排2-3天的行程比較充實。',
        圖片: '',
        時間: '2025/06/15'
    }
])

export const mockAPI = {
    // 根據地點ID取得評論 (模擬後端API)
    async getReviewsByLocationId(locationId) {
        // 模擬網路延遲
        return mockReviews.value.filter(review => review.locationId === locationId)
    },
    /*
    // 新增評論 (模擬後端新增)
    async addReview(newReviewData) {
        await new Promise(resolve => setTimeout(resolve, 800))  // 模擬網路延遲
        
        // 找到最大的ID來生成新ID
        const maxId = Math.max(...mockReviews.value.map(r => r.id))
        
        const newReview = {
            id: maxId + 1,                     // 新的ID
            locationId: newReviewData.locationId,  // 地點ID
            會員名稱: newReviewData.會員名稱,     // 會員名稱
            評論分數: newReviewData.評論分數,     // 評論分數
            評論內容: newReviewData.評論內容,     // 評論內容
            圖片: newReviewData.圖片 || '',      // 圖片 (可能為空)
            時間: new Date().toLocaleDateString('zh-TW', {  // 當前時間
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).replace(/\//g, '/')
        }
        
        // 加入到假資料陣列
        mockReviews.value.push(newReview)
        
        return {
            success: true,
            data: newReview,
            message: '評論新增成功'
        }
    }
    */
}