// src/loaderState.js -----------------------------------------------------------
// 目標：只匯出一個「工具物件」，內含狀態與方法，使用端再自行解構。
// 優點：import 寫法更乾淨；你看到的 export 數量也變少。

import { reactive } from 'vue'                           // 匯入 reactive，讓物件具備響應式

const loader = reactive({                                // 全域狀態（單例）
  active: false,                                         // 是否顯示 Loader
  progress: 0,                                           // 0~100 進度
  palette: null,                                         // 自訂配色（null = 用預設）
  features: null,                                        // 特效開關（null = 用預設）
  logoText: 'ASTRA',                                     // 徽章文字
}) 

function show(opt = {}) {                                // 顯示 Loader
  loader.active = true                                   // 開啟覆蓋層
  loader.progress = opt.progress ?? 10                   // 設定初始進度（預設 10）
  if (opt.palette)  loader.palette  = opt.palette        // 套用自訂配色（若有）
  if (opt.features) loader.features = opt.features       // 套用特效開關（若有）
  if (opt.logoText) loader.logoText = opt.logoText       // 套用徽章文字（若有）
} 

function set(p) {                                        // 更新進度
  loader.progress = Math.max(0, Math.min(100, p | 0))    // 夾在 0~100 並取整
}

function hide() {                                        // 隱藏 Loader
  loader.active = false                                  // 關閉覆蓋層
}

// ★ 重點：只做「一個 default 匯出」物件 ---------------------------------------
export default {                                         // 匯出一個工具包物件
  loader,                                                // 狀態本體（給 App.vue 綁定）
  show,                                                  // 顯示方法（給 router /頁面呼叫）
  set,                                                   // 設定進度（給 router /頁面呼叫）
  hide,                                                  // 關閉方法（給 router /頁面呼叫）
}
