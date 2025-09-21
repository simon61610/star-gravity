# 🌌 星引力觀星平台 (Star-Gravity)

星引力 (Star Gravity)— 為初學者打造的觀星資訊與社群平台

提供天文新聞、觀星活動、星圖地圖與觀星商城，幫助新手快速進入觀星世界。  

---

## 📌 目錄 (Table of Contents)
- [專案介紹 (About)](#-專案介紹-about)
- [功能特色 (Features)](#-功能特色-features)
- [使用技術 (Tech-Stack)](#-使用技術-tech-stack)
- [專案架構 (Project-Structure)](#-專案架構-project-structure)
- [安裝與使用 (Installation--Usage)](#-安裝與使用-installation--usage)
- [截圖展示 (Screenshots)](#-截圖展示-screenshots)
- [未來規劃 (Roadmap)](#-未來規劃-roadmap)
- [授權 (License)](#-授權-license)

---

## 📖 專案介紹 (About)

本專案為團隊協作作品，主要目標：  
- 提供 **互動式星空模組**，支援顯示星座與連線動畫。  
- 建立 **活動報名系統**，讓使用者能線上預約觀星活動。  
- 設計 **商城頁面**，販售望遠鏡、觀星器材與周邊。  
- 開發 **會員中心**，支援登入、收藏、點讚與留言互動。  
- 整合 **後台管理系統**，方便管理文章、標籤、活動與會員。  
- 練習團隊分工，涵蓋前端 UI/UX、後端 API、資料庫設計與 Git 版本控制。

---

## ✨ 功能特色 (Features)

- 🌟 **星空互動畫布**：Canvas + SVG 實現 12 星座切換與連線動畫。  
- 📅 **觀星活動報名**：支援日期選擇、報名截止設定與即時人數顯示。  
- 🛒 **星空商城**：器材販售頁面，支援購物車模擬流程。  
- 📝 **文章系統**：包含天文知識文章、標籤分類與點讚功能。  
- 🧑‍💻 **會員系統**：登入 / 註冊、收藏清單、個人資料管理。  
- 🛠  **後台管理**：文章管理、標籤管理、活動審核與會員管理。  
- 🎨 **UI/UX 動效**：GSAP 滾動特效、星空背景、互動式元件。  
- 🗺 **觀星地圖**：Leaflet API 載入地點資訊，支援互動標記。  
---

## 🛠 使用技術 (Tech Stack)

**前端技術**  
- Vue 3 (Vite)  
- Pinia (狀態管理)  
- Element Plus (UI 元件庫)  
- GSAP (動畫特效)  
- Axios (API 串接)
- 
**後端與資料庫**  
- PHP  
- MySQL (PDO, 多對多關聯, CRUD)
- 
**開發工具**  
- Figma (UI 設計稿)  
- GitHub (版本控制)  
- GitHub Pages (靜態部署)  

---

## 📂 專案架構 (Project Structure)

```bash
star-gravity/
  ├── public/ # 放置不需要打包的靜態資源
  │   ├── JSON_CSV_XML/ # 放 json、API
  │   |   ├── bookData.json 
  │   |   ├── ...
  ├── src/
  │   ├── assets/
	│   │   ├── icons/ # 放 icons
	│   │   ├── logos/ # 放 logo 圖檔
	│   │   ├── images/
	│   │   |   ├── backgrounds # 背景圖統一管理
	│   │   |   ├── home # 各自建立對應頁面的資料夾
	│   │   |   ├── news
	│   │   |   ├── shop
	│   │   |   ├── ...
  │   |   ├── styles/ # SCSS 樣式
  │   |   |   ├── base/ # 全域基礎樣式（reset、基本排版、全域顏色/字型設定）
  │   |   |   ├── components/ # 元件專屬樣式（按鈕、表單、卡片等可重複使用的元件）
  │   |   |   ├── layout/ # 版面（header、footer、grid、側邊欄等整體結構）
  │   |   |   ├── utils/ # 工具類（變數、函式、mixin 等）
  │   │   |   ├── main.scss
  │   ├── components/ # vue 檔組件
  │   |   ├── shop/ # 頁面的組件內容資料夾
  │   │   |   ├── xxx.vue
  │   |   ├── ...
  │   |   ├── Header.vue
  │   |   ├── Footer.vue
  │   ├── composables/ # 自訂的 Composition API
  │   |   ├── XXX.js
  │   |   ├── ...
  │   ├── data/ # 靜態資料檔，JS模組
  │   ├── router/ # vue router設定檔
  │   |   ├── index.js
  │   ├── stores/ # Pinia 狀態管理檔案
  │   |   ├── cart.js
  │   |   ├── products.js
  │   |   ├── ...
  │   ├── views/ # 頁面元件，每個檔案對應一個路由頁面
  │   │   ├── shop/ # 頁面組件資料夾
  │   │   |   ├── xxx.vue
  │   |   ├── HomePage.vue
  │   |   ├── ...
  │   ├── App.vue
  │   ├── main.js
  ├── .gitignore
  ├── index.html
  ├── jsconfig.json
  ├── package.json
  ├── README.md
  ├── vite.config.js
```

## 🚀 安裝與使用 (Installation & Usage)

### 方法一：直接線上瀏覽
👉 [GitHub Pages Demo](https://tibamef2e.com/tjd102/g1/)

### 方法二：本機開啟
```bash
# 下載專案
git clone <專案網址>

# 安裝套件
npm install # mac 要加 sudo

# 啟動開發伺服器
npm run dev
```
## 📷 截圖展示 (Screenshots)

### 首頁 (Mockup)
![首頁 Mockup]()

### 星視野 (Mockup)
![星視野 Mockup]()

### 星占卜 (Mockup)
![星占卜 Mockup]()

## 🗺 未來規劃 (Roadmap)
```bash
- [ ] 串接綠界 API 
- [ ] 串接第三方登入
- [ ] 多語系支援 (中文 / 日文 / 英文)
```

## 📜 授權 (License)
```bash
本專案僅供個人學習與作品展示使用。
```
