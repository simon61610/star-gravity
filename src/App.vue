<!-- 
	App.vue 規範
	1. 各自的組件寫在各自的註解下面。
	2. 每次要 push 前，請把自己的組件註解掉，僅留以下兩項並打開註解
		<Header />
		<router-view />
	3. 等 router 大家都會後，再改成用 router (要盡快學會)
-->

<script setup>
	/* 聖文 */

	/* 阿尼 */

	/* 靜雅 */

	/* 偵瑜 */

	/* 皓竣 */
	//import { RouterLink, RouterView } from 'vue-router'
	//import newsbanner from './components/newsbanner.vue'

	/* 以下這一行，每次 push 前請打開，其它 import 請註解 */
	import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';
 // import ArticleDetailView from './views/ArticleDetailView.vue';
</script>

<template>
	<!-- 聖文 -->

	<!-- 阿尼 -->

	<!-- 靜雅 -->

	<!-- 偵瑜 -->

	<!-- 皓竣 -->

	<!-- 以下每次 push 前請打開，其它 import 請註解 -->
	<Header />
	<router-view />
  <Footer />
</template>

<style>
	/* 全頁面共用背景圖：待討論如何處理個別頁面不同背景圖 */

  /*找到解法了 這個我先註解掉 會影響全局app 後面就可以刪了不需要 */
  /*	#app{
	background-image: url('./assets/images/BGC.png');
	background-size: cover;        
  background-position: center;     
	background-repeat: no-repeat;
	box-sizing: border-box;
	min-height: 100vh;               
	width: 100vw;            
	}*/
</style>




<!------------------------ 以下勿動，最後會刪除 ------------------------>





<!------<template>
	<Test></Test>
</template>

<script setup>
	import Test from './components/Test.vue';
</script>-------->






<!-- <script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->
