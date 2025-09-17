//牡羊座
import ariesicon from '@/assets/images/games/GameSkyPage/zodiac-icon/gamesky_aries-icon.png'
import ariesimage from '@/assets/images/games/GameSkyPage/zodiac-cardPic/gmasky_card-aries.png'
import ariesbg from '@/assets/images/games/GameSkyPage/zodiac-sky/gamesky_aries.svg'
//摩羯座
import capricornicon from '@/assets/images/games/GameSkyPage/zodiac-icon/gamesky_capricorn-icon.png'
import capricornimage from '@/assets/images/games/GameSkyPage/zodiac-cardPic/gmasky_card-capricornus.png'
import capricornbg from '@/assets/images/games/GameSkyPage/zodiac-sky/gamesky_taurus.svg'
//水瓶座
import aquariusicon from '@/assets/images/games/GameSkyPage/zodiac-icon/gamesky_aquarius-icon.png'
import aquariusimage from '@/assets/images/games/GameSkyPage/zodiac-cardPic/gmasky_card-pisces.png'
import aquariusbg from '@/assets/images/games/GameSkyPage/zodiac-sky/gamesky_aquarius.svg'

//雙魚座
import piscesicon from '@/assets/images/games/GameSkyPage/zodiac-icon/gamesky_pisces-icon.png'
import piscesimage from '@/assets/images/games/GameSkyPage/zodiac-cardPic/gmasky_aquarius.png'
import piscesbg from '@/assets/images/games/GameSkyPage/zodiac-sky/gamesky_piscis.svg'


//金牛座
import taurusicon from '@/assets/images/games/GameSkyPage/zodiac-icon/gamesky_tauru-icon.png'
import taurusimage from '@/assets/images/games/GameSkyPage/zodiac-cardPic/gmasky_card-taurus.png'
import taurusbg from '@/assets/images/games/GameSkyPage/zodiac-sky/gamesky_taurus_1.svg'


//雙子座
import geminiicon from '@/assets/images/games/GameSkyPage/zodiac-icon/gamesky_gemini-icon.png'
import geminiimage from '@/assets/images/games/GameSkyPage/zodiac-cardPic/gmasky_card-gemini.png'
import geminibg from '@/assets/images/games/GameSkyPage/zodiac-sky/gamesky_gemini.svg'


//巨蠍座
import cancericon from '@/assets/images/games/GameSkyPage/zodiac-icon/gamesky_cancer-icon.png'
import cancerimage from '@/assets/images/games/GameSkyPage/zodiac-cardPic/gmasky_card-cancer.png'
import cancerbg from '@/assets/images/games/GameSkyPage/zodiac-sky/gamesky_cancer.svg'



//獅子座

import leoicon from '@/assets/images/games/GameSkyPage/zodiac-icon/gamesky_leo-icon.png'
import leoimage from '@/assets/images/games/GameSkyPage/zodiac-cardPic/gmasky_card-leo.png'
import leobg from '@/assets/images/games/GameSkyPage/zodiac-sky/gamesky_leo.svg'


//處女座
import virgoicon from '@/assets/images/games/GameSkyPage/zodiac-icon/gamesky_virgo-icon.png'
import virgoimage from '@/assets/images/games/GameSkyPage/zodiac-cardPic/gmasky_card-virgo.png'
import virgobg from '@/assets/images/games/GameSkyPage/zodiac-sky/gamesky_virgo.svg'


//天秤座
import libraicon from '@/assets/images/games/GameSkyPage/zodiac-icon/gamesky_libra-icon.png'
import libraimage from '@/assets/images/games/GameSkyPage/zodiac-cardPic/gmasky_card-libra.png'
import librabg from '@/assets/images/games/GameSkyPage/zodiac-sky/gamesky_libra.svg'



//天蠍座
import scorpioicon from '@/assets/images/games/GameSkyPage/zodiac-icon/gamesky_scorpio-icon.png'
import scorpioimage from '@/assets/images/games/GameSkyPage/zodiac-cardPic/gmasky_card-scorpius.png'
import scorpiobg from '@/assets/images/games/GameSkyPage/zodiac-sky/gamesky_scorpio.svg'


//射手座

import sagittariusicon from '@/assets/images/games/GameSkyPage/zodiac-icon/gamesky_sagitarius-icon.png'
import sagittariusimage from '@/assets/images/games/GameSkyPage/zodiac-cardPic/gmasky_card-sagittarius.png'
import sagittariusbg from '@/assets/images/games/GameSkyPage/zodiac-sky/gamesky_sagittarius.svg'



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
        id:'Taurus',
        name: '金牛座 Taurus',
        icon: taurusicon,
        image: taurusimage,
        bg: taurusbg,
        tabs: {
            intro: '金牛座位於春季夜空，太陽約於 4/20–5/20 經過。擁有 α 星「畢宿五」與昴宿星團，是最顯著的星座之一。金牛象徵力量與豐收，屬土象，由金星守護，代表穩定與享受。金牛座的人務實可靠，重視安全感。',
            position: {

                list:[

                { label: '赤經', value: '03h22m ~ 05h54m' },
                { label: '赤緯', value: '+15° ~ +30°' },
                { label: '象線', value: '由主要恆星：α Aldebaran、昴宿星團連成V字形' }

                ],
               desc: '金牛座橫跨牡羊與雙子之間，以紅色的畢宿五作為牛眼，並伴隨閃耀的昴宿星團。希臘神話中，它象徵宙斯化為白牛，背著腓尼基公主歐羅巴渡海，成為星空中永恆的圖像。'

            },
            myth: '宙斯化身為白牛，誘拐腓尼基公主歐羅巴，將她帶到克里特島並結婚，育有三子。為紀念這段愛情，宙斯將白牛升上天空，成為金牛座。'
        },
       stars:[
                { x: 25.56, y: 24.36 }, //星點0
                { x: 42.69, y: 38.83 }, //星點1
                { x: 47.69, y: 46.7 }, //星點2
                { x: 48.75, y: 40.11 }, //星點3
                { x: 56.52, y: 40.29 }, //星點4
                { x: 62.98, y: 34.43 }, //星點5
                { x: 70.88, y: 58.79 }, //星點6
                { x: 72.86, y: 65.93 }, //星點7
                { x: 74.18, y: 68.13 }, //星點8
                { x: 58.5, y: 76.19 }, //星點9
                { x: 69.17, y: 87.91 }, //星點10
                { x: 58.89, y: 60.62 }, //星點11
                { x: 50.99, y: 55.68 }, //星點12
                { x: 47.56, y: 54.03 }, //星點13
                { x: 43.35, y: 52.2 }, //星點14
                { x: 20.16, y: 40.84 }, //星點15
                { x: 49.93, y: 50.73 }, //星點16
                { x: 44.4, y: 62.09 }, //星點17
                { x: 45.19, y: 66.85 }, //星點18
                { x: 53.75, y: 69.78 }, //星點19
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
                [7,11],
                [11,12],
                [12,13],
                [12,16],
                [13,14],
                [14,15],
                [12,16],
                [11,17],
                [17,18],
                [18,19],
                ]
        
    },


    {
        id:'Pisces',
        name: '雙魚座 Pisces',
        icon: piscesicon,
        image: piscesimage,
        bg: piscesbg,
        tabs: {
            intro: '雙魚座太陽約於 2/19–3/20 經過。雖暗淡，但因春分點位於其中而重要。象徵夢想與靈性。屬水象，由海王星守護。雙魚座的人感性浪漫，富想像力。',
            position: {

                list:[

                { label: '赤經', value: '22h52m ~ 01h47m' },
                { label: '赤緯', value: '0° - +30°' },
                { label: '象線', value: '由主要恆星：η Alrescha 象線：兩魚相連' }

                ],
                desc: '雙魚座橫跨水瓶與牡羊之間，是黃道十二宮的終點。神話中，愛與美之神阿佛洛狄忒與兒子丘比特為躲避怪物堤豐，化為兩尾魚並以繩相連，象徵牽絆與守護。'

            },
            myth: '阿芙蘿黛蒂與兒子厄洛斯為躲避堤豐，化為兩條魚並以繩相連。宙斯將其升天，成為雙魚座，象徵愛與羈絆。'
        },
            stars:[
                { x: 31.23, y: 25.27 }, //星點0
                { x: 29.64, y: 30.95 }, //星點1
                { x: 31.62, y: 35.53 }, //星點2
                { x: 32.81, y: 42.12 }, //星點3
                { x: 27.8, y: 55.68 }, //星點4
                { x: 24.77, y: 65.93 }, //星點5
                { x: 18.58, y: 80.04 }, //星點6
                { x: 26.75, y: 72.53 }, //星點7
                { x: 30.3, y: 70.15 }, //星點8
                { x: 35.57, y: 66.3 }, //星點9
                { x: 39, y: 65.02 }, //星點10
                { x: 43.61, y: 63.92 }, //星點11
                { x: 48.62, y: 63.55 }, //星點12
                { x: 59.16, y: 60.81 }, //星點13
                { x: 65.88, y: 60.81 }, //星點14
                { x: 69.83, y: 58.97 }, //星點15
                { x: 72.73, y: 59.16 }, //星點16
                { x: 79.58, y: 60.44 }, //星點17
                { x: 74.97, y: 62.82 }, //星點18
                { x: 71.94, y: 67.22 }, //星點19
                { x: 66.53, y: 68.32 }, //星點20
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
            [14,15], //表示星點14連到15
            [15,16], //表示星點15連到16
            [16,17], //表示星點16連到17
            [17,18], //表示星點17連到18
            [18,19], //表示星點18連到19
            [19,20], //表示星點19連到20
            [20,14], //表示星點20連到14
            ]
        

    },

    {
        id:'Aquarius',
        name: '水瓶座 Aquarius',
        icon: aquariusicon,
        image: aquariusimage,
        bg: aquariusbg,
        tabs: {
            intro: '水瓶座範圍廣大，太陽約於 1/20–2/18 經過。雖星光暗淡，卻象徵創新與人道精神。屬風象，由天王星守護。水瓶座的人思想獨立，理想主義。',
            position: {

                list:[

                { label: '赤經', value: '21h38m ~ 23h56m' },
                { label: '赤緯', value: '約 -25° ~ -5°' },
                { label: '象線', value: 'β Sadalsuud、α Sadalmelik 連成持水人狀' }

                ],
               desc: '水瓶座橫跨摩羯與雙魚之間，星點雖暗卻代表生命之水。希臘神話中，它象徵宙斯選中的美少年伽倪墨得斯，擔任天上的斟酒侍者，為眾神奉上甘霖，象徵青春與希望。'

            },
            myth: '美少年伽倪墨得被宙斯帶至奧林帕斯，成為神的斟酒侍者。他倒出的水象徵生命之泉，後化為水瓶座。'
        },
            stars:[
                { x: 74.97, y: 60.62 }, //星點0
                { x: 62.45, y: 46.7 }, //星點1
                { x: 49.93, y: 60.26 }, //星點2
                { x: 58.37, y: 38.46 }, //星點3
                { x: 53.49, y: 31.32 }, //星點4
                { x: 48.35, y: 31.87 }, //星點5
                { x: 46.38, y: 28.21 }, //星點6
                { x: 47.96, y: 25.46 }, //星點7
                { x: 48.35, y: 45.79 }, //星點8
                { x: 43.35, y: 50.92 }, //星點9
                { x: 35.05, y: 60.07 }, //星點10
                { x: 43.35, y: 50.92 }, //星點11
                { x: 35.05, y: 60.07 }, //星點12
                { x: 44.27, y: 27.29 }, //星點13
                { x: 37.15, y: 41.94 }, //星點14
                { x: 29.64, y: 70.51 }, //星點15
                { x: 31.09, y: 90.29 }, //星點16
                { x: 24.51, y: 68.5 }, //星點17
                { x: 19.89, y: 53.66 }, //星點18
                { x: 28.59, y: 44.51 }, //星點19
                { x: 28.59, y: 43.22 }, //星點20
                { x: 29.78, y: 42.86 }, //星點21
                { x: 30.96, y: 36.26 }, //星點22
                ],

            lines:[
                [0,1], //表示星點0連到1
                [1,2], //表示星點1連到2
                [1,3], //表示星點2連到3
                [3,4], //表示星點3連到4
                [4,5], //表示星點4連到5
                [4,8],
                [8,9],
                [9,10],
                [5,6], //表示星點5連到6
                [6,7], //表示星點5連到6
                [13,14],
                [14,15],
                [15,16],
                [16,17],
                [17,18],
                [18,19],
                [19,20],
                [20,21],
                [21,22],
                [22,13],
                [13,6]
              
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
                { x: 72.2, y: 30.4 }, //星點0
                { x: 66.53, y: 38.83 }, //星點1
                { x: 66.4, y: 47.44 }, //星點2
                { x: 55.99, y: 70.51 }, //星點3
                { x: 52.96, y: 76.92 }, //星點4
                { x: 45.19, y: 69.96 }, //星點5
                { x: 34.78, y: 62.09 }, //星點6
                { x: 29.38, y: 53.3 }, //星點7
                { x: 27.14, y: 43.22 }, //星點8
                { x: 37.29, y: 43.41 }, //星點9
                { x: 45.45, y: 44.32 }, //星點10
                { x: 59.95, y: 36.81 }, //星點11
                { x: 20.82, y: 39.56 }, //星點12
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
                [11,1],//表示星點11連到1
                [8,12], //表示星點8連到12
                ]


    },

    {
        id:'Gemini',
        name: '雙子座 Gemini',
        icon: geminiicon,
        image: geminiimage,
        bg: geminibg,
        tabs: {
            intro: '雙子座太陽約於 5/21~6/21 經過。最著名的是「北河二」與「北河三」，並肩如孿生兄弟。象徵智慧、交流與靈活。屬風象，由水星守護，賦予思維敏捷與好奇心。雙子座的人聰明靈活，善於溝通。',
            position: {

                list:[

                { label: '赤經', value: '05h56m ~ 07h27m' },
                { label: '赤緯', value: '約 +10° ~ +35°' },
                { label: '象線', value: '由α Castor、β Pollux 雙星並列' }

                ],
                desc: '雙子座坐落於金牛與巨蟹之間,以並肩的雙子星——Pollux 與 Castor 為核心，象徵兄弟情誼與守護。在冬季夜空閃耀，與獵戶座、金牛座交相輝映。'

            },
            myth: '孿生兄弟卡斯托爾（凡人）與波魯克斯（神子）感情深厚。當卡斯托爾戰死，波魯克斯不願獨活，祈求與兄弟共享生命。宙斯遂將二人升天，化為雙子座，象徵兄弟情深。'
        },
            stars:[
                { x: 43.87, y: 19.96 }, //星點0
                { x: 43.61, y: 46.7 }, //星點1
                { x: 36.63, y: 59.89 }, //星點2
                { x: 47.69, y: 57.88 }, //星點3
                { x: 52.31, y: 79.3 }, //星點4
                { x: 45.19, y: 84.07 }, //星點5

                { x: 54.81, y: 18.5 }, //星點6
                { x: 58.5, y: 29.49 }, //星點7
                { x: 61.66, y: 55.68 }, //星點8
                { x: 66.4, y: 70.33 }, //星點9
                { x: 69.7, y: 74.54 }, //星點10
                { x: 75.49, y: 76.37 }, //星點11
                { x: 69.96, y: 26.92 }, //星點12
                ],
            lines:[
                [0,1], //表示星點0連到1
                [1,2], //表示星點1連到2
                [1,3], //表示星點1連到3
                [3,4], 
                [4,5], 
                [6,7],
                [7,12],
                [7,8],
                [8,9],
                [9,10],
                [10,11],
                ]





    },


    {
        id:'Cancer',
        name: '巨蠍座 Cancer',
        icon: cancericon,
        image: cancerimage,
        bg: cancerbg,
        tabs: {
            intro: '巨蟹座太陽約於 6/22–7/22 經過。星點暗淡，但擁有著名的蜂巢星團 M44。巨蟹象徵家庭、情感與守護。屬水象，由月亮守護，代表溫柔與歸屬感。巨蟹座的人感性細膩，重視安全。',
            position: {

                list:[

                { label: '赤經', value: '07h55m ~ 09h22m' },
                { label: '赤緯', value: '+6° ~ +33°' },
                { label: '象線', value: '主恆星 β Altarf、M44 蜂巢星團 象限分散如蟹' }

                ],
                desc: '巨蟹座位於雙子與獅子之間，雖然星光微弱卻象徵堅毅。希臘神話中，這隻巨蟹曾受女神赫拉派遣對抗海克力士，最終被升上天成為星座。'

            },
            myth: '赫拉派巨蟹偷襲赫拉克勒斯，雖被踩死，仍因忠誠被升上天空，化為巨蟹座，象徵犧牲與守護。'
        },
        stars:[
            { x: 72.73, y: 40.11 }, //星點0
            { x: 54.81, y: 46.7 }, //星點1
            { x: 53.49, y: 55.68 }, //星點2
            { x: 47.69, y: 57.33 }, //星點3
            { x: 46.64, y: 47.07 }, //星點4
            { x: 29.78, y: 39.19 }, //星點5
            { x: 27.4, y: 76.37 }, //星點6
            ],
        lines:[
            [0,1], //表示星點0連到1
            [1,2], //表示星點1連到2
            [2,3], //表示星點2連到3
            [3,4], //表示星點3連到4
            [3,6], //表示星點3連到6
            [4,1], //表示星點4連到1
            [4,5], //表示星點4連到5
            
            ]

    },

    {
        id:'Leo',
        name: '獅子座 Leo',
        icon: leoicon,
        image: leoimage,
        bg: leobg,
        tabs: {
            intro: '獅子座是夏季最明亮的星座之一，太陽約於 7/23–8/22 經過。最亮星「軒轅十四」(Regulus) 位於獅心，前端如倒問號。象徵榮耀與自信。屬火象，由太陽守護。獅子座的人外向熱情，具領導力。',
            position: {

                list:[

                { label: '赤經', value: '09h22m ~ 11h57m' },
                { label: '赤緯', value: '約 +6° ~ +33°' },
                { label: '象線', value: '由主星 α Regulus、β Denebola 連成, 象線：頭部問號，身軀延展' }

                ],
                desc: '獅子座坐落於巨蟹與室女之間,是夏季夜空最雄偉的星座。最亮的軒轅十四(Regulus)閃耀如心臟,傳說牠象徵海克力士十二試煉中的尼米亞獅，勇武不屈。'

            },
            myth: '涅墨亞獅刀槍不入，赫拉克勒斯以徒手將其勒死。宙斯為紀念這隻猛獸，將其升上天空，成為獅子座，象徵勇氣與力量。'
        },
        stars:[
                { x: 84.08, y: 25.17 }, //星點1
                { x: 77.68, y: 24.14 }, //星點2
                { x: 74.31, y: 19.48 }, //星點3
                { x: 65.38, y: 28.28 }, //星點4
                { x: 65.98, y: 43.97 }, //星點5
                { x: 41.74, y: 37.93 }, //星點6
                { x: 27.74, y: 52.93 }, //星點7
                { x: 41.86, y: 51.21 }, //星點8
                { x: 37.52, y: 64.14 }, //星點9
                { x: 39.57, y: 76.03 }, //星點10
                { x: 36.55, y: 85.34 }, //星點11
                { x: 65.98, y: 44.31 }, //星點12
                { x: 72.26, y: 50.69 }, //星點13
                { x: 73.22, y: 62.41 }, //星點14
                { x: 41.74, y: 51.38 }, //星點15
                
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
                [4,12],//表示星點5連到12
                [12,13], //表示星點0連到1
                [13,14], //表示星點1連到2
                ]
        

    },

    {
        id:'Virgo',
        name: '處女座 Virgo',
        icon: virgoicon,
        image: virgoimage,
        bg: virgobg,
        tabs: {
            intro: '處女座是黃道最大星座之一，太陽約於 8/23–9/22 經過。最亮星「角宿一」(Spica) 顯眼。象徵純潔與豐收。屬土象，由水星守護。處女座的人細心實際，追求完美。',
            position: {

                list:[

                { label: '赤經', value: '11h37m ~ 15h20m' },
                { label: '赤緯', value: '-22° ~ +14°' },
                { label: '象線', value: '由主星 α Spica 連成長形結構' }

                ],
                desc: '處女座橫跨獅子與天秤之間，是黃道帶中最廣闊的星座。明亮的角宿一（Spica）象徵少女手中的麥穗，寓意豐收與純潔'

            },
            myth: '農業女神得墨忒耳的女兒珀耳塞福涅被冥王掳走，造成四季變化。宙斯將她升上天空，化為處女座，象徵循環與成長。'
        },
        stars:[
                { x: 83.93, y: 26.92 }, //星點0
                { x: 75.76, y: 23.44 }, //星點1
                { x: 53.62, y: 21.79 }, //星點2
                { x: 57.05, y: 37.55 }, //星點3
                { x: 32.67, y: 45.05 }, //星點4
                { x: 14.89, y: 46.7 }, //星點5

                { x: 43.08, y: 48.35 }, //星點6

                { x: 82.61, y: 37.73 }, //星點7
                { x: 71.67, y: 44.51 }, //星點8
                { x: 62.98, y: 47.44 }, //星點9
                { x: 51.12, y: 58.06 }, //星點10

                { x: 28.59, y: 61.9 }, //星點11
                { x: 17.65, y: 63 }, //星點12

                { x: 30.43, y: 71.06 }, //星點13
                { x: 48.35, y: 70.15 }, //星點14
            ],


        lines:
        [
            [0,1], //表示星點0連到1
            [1,2], //表示星點1連到2
            [2,3], //表示星點2連到3
            [3,4], //表示星點3連到4
            [4,5], //表示星點4連到5
            [3,6], //表示星點3連到6
            [7,8], //表示星點7連到8
            [8,9], //表示星點8連到9
            [9,3], //表示星點9連到3
            [9,10], //表示星點9連到10
            [10,11],
            [11,12],
            [10,13],
            [10,14],
            ]
    },

    {
        id:'Libra',
        name: '天秤座 Libra',
        icon: libraicon,
        image: libraimage,
        bg: librabg,
        tabs: {
            intro: '天秤座是唯一以器物命名的黃道星座，太陽約於 9/23–10/23 經過。象徵公平、平衡與正義。屬風象，由金星守護。天秤座的人追求和諧，重視人際與合作。',
            position: {

                list:[

                { label: '赤經', value: '14h47m - 16h25m' },
                { label: '赤緯', value: ' -6° ~ -30°' },
                { label: '象線', value: '由主星 α Zubenelgenubi、β Zubeneschamali 連成秤形對稱' }

                ],
            desc: '天秤座坐落於處女與天蠍之間，是黃道十二宮中唯一的無生命象徵。古人以此為公平與平衡的象徵，最亮的ζ星（Zubenelgenubi）與β星構成天秤的兩端。希臘神話中，天秤常與正義女神阿斯特瑞亞相連，象徵公正與秩序。'

            },
            myth: '正義女神阿斯特雷雅在人間守護公正，後升上天空。她的天秤化為星座，象徵衡量善惡的正義。'
        },
       stars:[
                { x: 45.19, y: 34.25 }, //星點0
                { x: 63.9, y: 53.85 }, //星點1
                { x: 52.7, y: 69.78 }, //星點2
                { x: 36.36, y: 56.59 }, //星點3
                { x: 32.15, y: 60.81 }, //星點4
                { x: 26.48, y: 65.93 }, //星點5
                { x: 60.08, y: 87.91 }, //星點6
            ],
            lines:[
            [0,1], //表示星點0連到1
            [1,2], //表示星點1連到2
            [2,3], //表示星點2連到3
            [1,6], //表示星點2連到6
            [0,3], //表示星點0連到3
            [3,4], //表示星點3連到4
            [4,5], //表示星點4連到5

            ]
        

    },

    {
        id:'Scorpio',
        name: '天蠍座 Scorpio',
        icon: scorpioicon,
        image: scorpioimage,
        bg: scorpiobg,
        tabs: {
            intro: '天蠍座是夏季壯麗星座，太陽約於 10/24~11/22 經過。最亮星「心宿二」(Antares) 紅光閃耀。象徵熱情與堅毅。屬水象，由冥王星守護。天蠍座的人神祕深沉，情感強烈。',
            position: {

                list:[

                { label: '赤經', value: '16h25m ~ 17h59m' },
                { label: '赤緯', value: '約 -8° ~ -45°' },
                { label: '象線', value: '由主星 α Antares 等連成彎曲蠍尾' }

                ],
                desc: '天蠍座坐落於天秤與人馬之間，彎曲的蠍尾在夜空中清晰可見。紅色的心宿二（Antares）象徵蠍子的心臟，古人以其為死亡與守護的象徵。希臘神話中，牠是射殺獵人奧利翁的巨蠍'

            },
            myth: '奧里翁自誇要獵盡野獸，女神派蠍子刺殺他。宙斯將二者分別升天，使他們永不相遇，成為天蠍與獵戶。'
        },
       stars:[
                { x: 54.15, y: 33.7 }, //星點0
                { x: 55.99, y: 40.66 }, //星點1
                { x: 56.39, y: 48.35 }, //星點2
                { x: 56.65, y: 55.49 }, //星點3
                { x: 46.51, y: 47.44 }, //星點4
                { x: 42.56, y: 52.56 }, //星點5
                { x: 37.81, y: 66.67 }, //星點6
                { x: 37.42, y: 74.91 }, //星點7
                { x: 37.02, y: 83.33 }, //星點8
                { x: 31.62, y: 87.36 }, //星點9
                { x: 24.37, y: 88.28 }, //星點10
                { x: 20.42, y: 82.97 }, //星點11
                { x: 21.61, y: 80.04 }, //星點12
                { x: 24.11, y: 74.73 }, //星點13
                { x: 18.84, y: 75.82 }, //星點14
            ],

        lines:[
            [0,1], //表示星點0連到1
            [1,2], //表示星點1連到2
            [2,3], //表示星點2連到3
            [1,4], //表示星點3連到4
            [4,5], //表示星點4連到5
            [5,6], //表示星點5連到6
            [6,7], //表示星點6連到7
            [7,8], //表示星點7連到8
            [8,9], //表示星點8連到9
            [9,10], //表示星點9連到10
            [10,11], //表示星點10連到11
            [11,12], //表示星點11連到12
            [12,13],
            [13,14],
            ]
        

    },

    {
        id:'Sagittarius',
        name: '射手座 Sagittarius',
        icon: sagittariusicon,
        image: sagittariusimage,
        bg: sagittariusbg,
        tabs: {
            intro: '射手座位於銀河中心，太陽約於 11/23–12/21 經過。星群呈茶壺狀，銀河傾瀉而下。象徵自由與探索。屬火象，由木星守護。射手座的人樂觀熱情，喜愛冒險。',
            position: {

                list:[

                { label: '赤經', value: '17h43m ~ 20h28m' },
                { label: '赤緯', value: '-12° ~ -45°' },
                { label: '象線', value: '由主星 ε Kaus Australis 等連成弓箭狀' }

                ],
                desc: '射手座位於天蠍與摩羯之間，星群構成「茶壺」的輪廓，宛如弓箭指向前方。希臘神話中，它常被視為賢者半人馬喀戎的化身，象徵智慧與守護。朝向射手座的方向，正是銀河的中心，繁星雲集。'

            },
            myth: '半人馬凱隆智慧過人，誤中毒箭後自願犧牲，換取普羅米修斯自由。宙斯將他升天為射手座，象徵智慧與奉獻。'
        },
        stars:[
            { x: 85.64, y: 38.46 }, //星點0
            { x: 78.39, y: 40.48 }, //星點1
            { x: 80.37, y: 53.3 }, //星點2
            { x: 85.38, y: 58.24 }, //星點3

            { x: 71.94, y: 29.85 }, //星點4
            { x: 74.97, y: 14.47 }, //星點5

            { x: 65.74, y: 38.64 }, //星點6
            { x: 60.74, y: 39.01 }, //星點7
            { x: 52.7, y: 30.77 }, //星點8

            { x: 55.47, y: 26.19 }, //星點9
            { x: 49.8, y: 30.22 }, //星點10
            { x: 41.37, y: 25.64 }, //星點11

            { x: 57.31, y: 46.52 },//星點12

            { x: 61.4, y: 53.3 }, //星點13
            { x: 61.26, y: 79.12 }, //星點14

            { x: 53.49, y: 47.8 }, //星點15
            { x: 35.57, y: 58.42 }, //星點16
            { x: 37.55, y: 73.26 }, //星點17
                


            


            ],

        lines:[
            [0,1], //表示星點0連到1
            [1,2], //表示星點1連到2
            [2,3], //表示星點2連到3
            [1,4], //表示星點3連到0
            [5,4],
            [4,6],
            [6,7],
            [7,8],
            [8,9],
            [8,10],
            [10,11],
            [7,12],
            [12,13],
            [13,14],
            [12,15],
            [15,16],
            [16,17],

            ]
        

    },




















































































]