<template> 
    <div class="test-box">這是測試元件</div>
	<input type="text">這是input
</template> 


<script setup>//放js

</script>

<style scoped lang="scss">//放css
@import '@/assets/styles/main';

.test-box {
	color: $secondaryColor-orange;
}
input {
	border: 1px solid $inputColor-border;
}
input:focus {
	outline: 1px solid $inputColor-focus;
}
</style>
