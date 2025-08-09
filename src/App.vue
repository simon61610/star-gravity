<script setup>
//import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue';
//import newsbanner from './components/newsbanner.vue'
</script>

<template>
<Header />
<router-view />
</template>

<style>
#app{
  background-image: url('./assets/images/BGC.png');
  background-size: cover;           /* 讓圖片填滿且保持比例 */
  background-position: center;      /* 水平、垂直都置中 */
  background-repeat: no-repeat;
  box-sizing: border-box;
  min-height: 100vh;                /* 至少跟螢幕一樣高 */
  width: 100vw;            
}
</style>


















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
