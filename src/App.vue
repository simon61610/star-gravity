<script setup>

	/* 皓竣 */
	//import { RouterLink, RouterView } from 'vue-router'
	//import newsbanner from './components/newsbanner.vue'

	/* 以下這一行，每次 push 前請打開，其它 import 請註解 */
	// import Header from './components/Header.vue';
  	// import Footer from './components/Footer.vue';
	import Header from './components/Header.vue';
  	import Footer from './components/Footer.vue';
	import StarryLoader from '@/components/common/StarryLoader.vue'
	import loaderKit from '@/composables/loaderState' 
	const { loader } = loaderKit 
	const defaultPalette = {                                  // 預設配色（未指定時使用）
		bg:'#050a18', star:'#cfe3ff',                           // 背景 / 星點
		accent:'#88aaff', accent2:'#8bf5ff',                    // 外環漸層兩端
		glass:'rgba(255,255,255,.06)',                          // 玻璃擬態
		glassBorder:'rgba(255,255,255,.12)',                    // 玻璃擬態邊線
		moon:'#e9f1ff',                                          // 月面色
		ring: '#6fa8ff',
		planet:'#6fa8ff'                                        
	}
	
</script>

<template>
	<StarryLoader
    :active="loader.active"                               
    :progress="loader.progress"                           
    :palette="loader.palette || defaultPalette"           
    :features="loader.features || { pulsar:true, rings:true, moon:true }" 
    :logo-text="loader.logoText"                          
  	/>

	<Header  v-if:="$route.meta.layout !== 'backend'"/>   
	<router-view /> 
  	<Footer  v-if:="$route.meta.layout !== 'backend'"/>  
</template>

<style>

</style>