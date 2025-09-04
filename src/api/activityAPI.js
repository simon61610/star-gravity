// src/api/activityAPI.js
import axios from 'axios'

// 依你的 MAMP / 後端路徑調整
const api = axios.create({
  baseURL: 'http://localhost:8888/your-project/api',
  headers: { 'Content-Type': 'application/json' }
})

export const activityAPI = {
  // 取得活動列表（支援 search）
  getAll: (params = {}) => api.get('/activities.php', { params }),

  // 新增活動
  create: (data) => api.post('/activities.php', data)
}