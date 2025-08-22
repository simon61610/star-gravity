import ariesicon from '@/assets/images/games/GameSkyPage/zodiac-icon/gamesky_aries-icon.png'
import ariesimage from '@/assets/images/games/GameSkyPage/zodiac-cardPic/gmasky_card-aries.png'
import ariesbg from '@/assets/images/games/GameSkyPage/gamesky_aries.svg'
import capricornicon from '@/assets/images/games/GameSkyPage/zodiac-icon/gamesky_capricorn-icon.png'
import capricornimage from '@/assets/images/games/GameSkyPage/zodiac-cardPic/gmasky_card-capricornus.png'
import capricornbg from '@/assets/images/games/GameSkyPage/zodiac-sky/gamesky_taurus.png'
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
        },
        stars:[ { x: 63.64 , y: 33.52}, //星點0
                { x: 71.94 , y: 41.58}, //星點1
                { x: 73.39 , y: 47.07}, //星點2
                { x: 27.14 , y: 55.31}  //星點3

        ],
        lines:[
            [0,1],  //表示星點0連到1
            [1,2], //表示星點1連到2
            [2,3]
        ] 
        

    },
    
    {
        id:'Capricorn',
        name: '摩羯座 Capricorn',
        icon: capricornicon,
        image: capricornimage,
        bg: capricornbg,
        tabs: {
            intro: '摩羯座太陽約於 12/22~1/19 經過。形象為半羊半魚，象徵堅毅與適應。屬土象，由土星守護。摩羯座的人重視紀律，務實耐心，具責任感。',
            position: {

                list:[

                { label: '赤經', value: '約 20h05m' },
                { label: '赤緯', value: '約 -28°' },
                { label: '象線', value: '由 恆星 δ Deneb Algedi組成三角形結構' }

                ],
                desc:'位於射手座與水瓶座之間，為黃道十二宮的第十個星座。'
            },
            myth: '牧神潘為逃堤豐跳入河中，上半身為羊，下半身為魚。宙斯嘉獎其智慧，將其升上天空，成為摩羯座。'
        },
       stars:[
                { x: 72.33, y: 30.22 }, //星點1
                { x: 66.53, y: 39.01 }, //星點2
                { x: 66.53, y: 47.8 }, //星點3
                { x: 55.6, y: 71.43 }, //星點4
                { x: 52.7, y: 76.92 }, //星點5
                { x: 45.19, y: 70.51 }, //星點6
                { x: 34.91, y: 62.64 }, //星點7
                { x: 29.12, y: 52.56 }, //星點8
                { x: 26.61, y: 43.96 }, //星點9
                { x: 20.42, y: 39.93 }, //星點10
                { x: 27.14, y: 42.67 }, //星點11
                { x: 36.63, y: 43.41 }, //星點12
                { x: 45.45, y: 44.32 }, //星點13
                { x: 59.95, y: 36.45 }, //星點14
                { x: 66.53, y: 40.11 }, //星點15
            ],

        lines:[

                [0,1], //表示星點0連到1
                [1,2], //表示星點1連到2
                [2,3], //表示星點2連到3
                [3,4], //表示星點3連到4
                [4,5], //表示星點4連到5
                [5,6], //表示星點5連到6
                [6,7], //表示星點6連到7
                [7,8], //表示星點7連到8
                [8,9], //表示星點8連到9
                [9,10], //表示星點9連到10
                [10,11], //表示星點10連到11
                [11,12], //表示星點11連到12
                [12,13], //表示星點12連到13
                [13,14], //表示星點13連到14
                [14,0], //表示星點14連到0
            ]
        

    },
































































































]