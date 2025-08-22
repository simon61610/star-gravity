import ariesicon from '@/assets/images/games/GameSkyPage/zodiac-icon/gamesky_aries-icon.png'
import ariesimage from '@/assets/images/games/GameSkyPage/zodiac-cardPic/gmasky_card-aries.png'
import ariesbg from '@/assets/images/games/GameSkyPage/zodiac-sky/gamesky_aries.png'
import capricornicon from '@/assets/images/games/GameSkyPage/zodiac-icon/gamesky_capricorn-icon.png'
import capricornimage from '@/assets/images/games/GameSkyPage/zodiac-cardPic/gmasky_card-capricornus.png'
import capricornbg from '@/assets/images/games/GameSkyPage/zodiac-sky/gamesky_taurus_1.png'
export const swtichstars = [
    {
        id:'Aries',
        name: '牡羊座 Aries',
        icon: ariesicon,
        image: ariesimage,
        bg: ariesbg,
        tabs: {
            intro: '很久很久以前的遙遠國度，國王和皇后離婚了。國王很快娶了一名為新皇后，新皇后嫉妒國王疼愛前妻生的一對兄妹，於是想出了一條惡計想殺死這對孩子',
            position: {

                list:[

                { label: '赤經', value: '約 2h40m' },
                { label: '赤緯', value: '約 +20°' },
                { label: '象線', value: '由主星 α（異兒座α）等連成典型羊角形' }

                ],
                desc:'位於雙魚座與金牛座之間，為黃道帶第一個星座。'
            },
            myth: '傳說金羊毛能庇佑孩童平安，眾神派出會飛的公羊拯救兄妹穿越大海，其後化作天上的牡羊座，守護勇氣與新開始。'
        }
        

    },
    {
        id:'Capricorn',
        name: '摩羯座 Capricorn',
        icon: capricornicon,
        image: capricornimage,
        bg: capricornbg,
        tabs: {
            intro: '摩羯座太陽約於 12/22–1/19 經過。形象為半羊半魚，象徵堅毅與適應。屬土象，由土星守護。摩羯座的人重視紀律，務實耐心，具責任感。',
            position: {

                list:[

                { label: '赤經', value: '約 20h05m' },
                { label: '赤緯', value: '約 -28°' },
                { label: '象線', value: '由 恆星 δ Deneb Algedi組成三角形結構' }

                ],
                desc:'位於射手座與水瓶座之間，為黃道十二宮的第十個星座。'
            },
            myth: '牧神潘為逃堤豐跳入河中，上半身為羊，下半身為魚。宙斯嘉獎其智慧，將其升上天空，成為摩羯座。'
        }
        

    },
































































































]