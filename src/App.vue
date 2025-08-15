<script setup>

	/* 皓竣 */
	//import { RouterLink, RouterView } from 'vue-router'
	//import newsbanner from './components/newsbanner.vue'

	/* 以下這一行，每次 push 前請打開，其它 import 請註解 */
	// import Header from './components/Header.vue';
  	// import Footer from './components/Footer.vue';
	import Header from './components/Header.vue';
  	import Footer from './components/Footer.vue';
	
	
	
 // import ArticleDetailView from './views/ArticleDetailView.vue';
</script>

<template>
	<Header /> 
	<router-view />
  	<Footer /> 
</template>

<style>

</style>