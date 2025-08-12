<script setup>
</script>

<template>
    <aside class="cate-list">
        <h2>分類</h2>
        <div class="cate-products">
            <div>
                <h3>天文望遠鏡</h3>
                <transition>
                    <div>
                        <p>基礎入門型</p>
                        <p>進階專業型</p>
                    </div>
                </transition>
            </div>
            <div>
                <h3>雙筒/單筒望遠鏡</h3>
                <transition>
                    <div>
                        <p>單筒望遠鏡</p>
                        <p>雙筒望遠鏡</p>
                    </div>
                </transition>
            </div>
            <div>
                <h3>腳架</h3>
                <transition>
                    <div>
                        <p>一般三腳架</p>
                        <p>天文三腳架</p>
                    </div>
                </transition>
            </div>
            <div>
                <h3>配件</h3>
                <transition>
                    <div>
                        <p>星座盤</p>
                        <p>指北針</p>
                        <p>紅光手電筒</p>
                    </div>
                </transition>
            </div>
            <div>
                <h3>書籍/小物</h3>
                <transition>
                    <div>
                        <p>觀星教學書籍</p>
                        <p>星空小物</p>
                    </div>
                </transition>
            </div>
        </div>
    </aside>

</template>

<style scoped lang="scss">
    @import '@/assets/styles/main.scss';

    .cate-list {
        width: 176px; // 暫定，要刪除
        color: $FontColor-white;

        h2 {
            font-weight: bold;
            font-size: $pcChFont-H4;
            padding: 20px 0;
            text-align: center;
            border-bottom: 3px solid $primaryColor-100;
            margin-bottom: 20px;
        }
    }


</style>