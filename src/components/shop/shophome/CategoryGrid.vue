<script setup>


</script>


<template>
    <section class="prod-cate">
        <p>商品分類</p>
        <div class="cate-grid">
            <div class="item item-main">
                <img src="@/assets/images/shop/shophome-telescope.jpg">
                <p>天文望遠鏡</p>
            </div>
            <div class="item item-sub">
                <img src="@/assets/images/shop/shophome-binoculars.jpg">
                <p>雙筒/單筒<br>望遠鏡</p>
            </div>
            <div class="item item-sub">
                <img src="https://placehold.co/220x220">
                <p>腳架</p>
            </div>
            <div class="item item-sub">
                <img src="https://placehold.co/220x220">
                <p>配件</p>
            </div>
            <div class="item item-sub">
                <img src="@/assets/images/shop/shophome-souvenirs.jpg">
                <p>書籍/小物</p>
            </div>
        </div>
        
    </section>
</template>


<style scoped lang="scss">
    @import '@/assets/styles/main.scss';

    .prod-cate {
        // border: 1px solid yellow;
        padding: 60px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: $FontColor-white;

        // 小標文字
        > p {
            font-size: $pcChFont-H1;
            font-weight: bold;
            margin-bottom: 40px;
        }

        // 商品圖片區
        .cate-grid {
            padding: 16px;
            display: grid;
            grid-template-columns: 360px 250px 250px;
            grid-auto-rows: 250px 250px;
            gap: 1.5em;

            .item-main {
                grid-row: span 2;
            }

            .item {
                position: relative;
                cursor: pointer;

                img {
                    border-radius: 16px;
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                    display: block;
                }
                
                // hover 分類文字出現效果
                p {
                    border-radius: 16px;
                    font-weight: bold;
                    line-height: 1.2;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    font-size: $pcChFont-H3;
                    position: absolute;
                    top: 0;
                    left: 0;
                    background-color: hsl(0, 0%, 0%, .6);
                    opacity: 0;
                    transition: all .8s;
                    
                }
                &:hover {
                    p {
                         opacity: 1;
                    }
                }
            }
        }
            
            
    }
</style>