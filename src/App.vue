	<script setup>
	
		/* 皓竣 */
		//import { RouterLink, RouterView } from 'vue-router'
		//import newsbanner from './components/newsbanner.vue'

		/* 以下這一行，每次 push 前請打開，其它 import 請註解 */
		// import Header from './components/Header.vue';
		// import Footer from './components/Footer.vue';
		
		import Header from '@/components/Header.vue';
		import Footer from '@/components/Footer.vue';
		import StarryLoader from '@/components/common/StarryLoader.vue'
		import loaderKit from '@/composables/loaderState' 
		import axios from 'axios';
		import { useRoute } from "vue-router"
		import CursorStar from "@/components/CursorStar.vue"
		const { loader } = loaderKit 
		const route = useRoute()
		const defaultPalette = {                                  // 預設配色（未指定時使用）
			bg:'#050a18', star:'#cfe3ff',                           // 背景 / 星點
			accent:'#88aaff', accent2:'#8bf5ff',                    // 外環漸層兩端
			glass:'rgba(255,255,255,.06)',                          // 玻璃擬態
			glassBorder:'rgba(255,255,255,.12)',                    // 玻璃擬態邊線
			moon:'#e9f1ff',                                          // 月面色
			ring: '#6fa8ff',
			planet:'#6fa8ff'                                        
		}

		// -------會員-----------------------------------------
		// 只要重新整理或重新開啟網站，就能在一開始檢查會員狀態
		import { useRouter } from 'vue-router'
		import { onMounted,computed } from 'vue'
		import { useMemberStore } from './stores/member';
		const member = useMemberStore()
		const router = useRouter()
		const showCursor = computed(() => {
		return isDesktop.value && route.meta.layout !== "backend"
		})
			onMounted(async () => {
			// 每次進站先「補回」localStorage 裡的使用者資料
			member.hydrate()
				
			// 有 token 才向後端驗證；沒有 token 就維持未登入（不要亂登出）
			// if (member.token) {
			// 	const v = await member.verifyToken()
			// 	// 只有「明確 invalid/expired」才會在 verify 裡登出
			// 	// 網路錯誤 -> 不動作，等下次操作再驗證
			// 	if (v.ok === false && v.reason === 'invalid') {
			// 		router.replace('/loginfirst')
			// 	}
			// }


			/* try{
				const res = await axios.get(import.meta.env.VITE_AJAX_URL + 'Member/session_test.php', { withCredentials: true })
				console.log('Session 測試:', res.data)
			}catch (err) {
				console.log('Session 測試錯誤：'+ err)
			} */
		})
		
	</script>

	<template>
		<StarryLoader
		:active="loader.active"                               
		:progress="loader.progress"                           
		:palette="loader.palette || defaultPalette"           
		:features="loader.features || { pulsar:true, rings:true, moon:true }" 
		:logo-text="loader.logoText"                          
		/>
		<div v-show ="!loader.active" class="frontend-layout">
			<Header  v-if="$route.meta.layout !== 'backend' && $route.meta?.layout !== 'index'" />   <!--只要不是 backend 也不是 index，才顯示-->
			
			<router-view/>
			
			<Footer  v-if="$route.meta.layout !== 'backend' && $route.meta?.layout !== 'index'"/>  
		</div>
		<div class="custom-cursor" ref="cursor"></div>
		<CursorStar v-if="$route.meta.layout !== 'backend' || $route.name === 'AdminLoginPage'"/>
	</template>

	<style lang="scss">
	@import '@/assets/styles/main.scss';
/* 桌機前台：隱藏系統游標，只顯示假游標 */
		body:not(.admin-layout) {
		cursor: none !important; // 把系統游標徹底藏掉
		}

		/* 手機 ≤800px：恢復系統游標，隱藏假游標 */
		@include respond("md2") {
		body:not(.admin-layout) {
			cursor: auto !important; // 系統游標回來
		}

		.cursor {
			display: none; // 假游標隱藏
		}
		}

		/* 後台：永遠系統游標 */
		body.admin-layout {
		cursor: auto !important;
		}
	// body:not(.admin-layout) .frontend-layout,
	// body:not(.admin-layout) .frontend-layout * {
	// cursor: none !important;
	// }
	
	// @include respond("md2")  {
	// 	 	body:not(.admin-layout) .frontend-layout a,
	// 		body:not(.admin-layout) .frontend-layout button {
	// 			cursor: pointer !important;
	// 		}

	// 		body:not(.admin-layout) .frontend-layout input,
	// 		body:not(.admin-layout) .frontend-layout textarea {
	// 			cursor: text !important;
	// 		}

	// 		.cursor {
	// 			display: none;
	// 		}
	// 		}
	</style>