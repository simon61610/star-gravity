<script setup>

</script>

<template>
    <nav class="breadcrumb">
        <!-- 先做個假的 -->
        <ol>
            <li>全部商品</li>
            <li>天文望遠鏡</li>
            <li>基礎入門型</li>
        </ol>
    </nav>
    
</template>

<style scoped lang="scss">
    @import '@/assets/styles/main.scss';

    .breadcrumb {
        background-color: #39394A;
        ol {
            color: white;
            max-width: 1200px;
            padding: 16px;
            margin: 0 auto;

            display: flex;
            gap: 12px;

            li {
                cursor: pointer;

                &:hover {
                    text-decoration: underline;
                }

                // 中間的箭頭
                &:not(:last-child)::after {
                    content: "";
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-top: 1px solid white;
                    border-right: 1px solid white;
                    color: white;
                    transform: translateY(-1px) rotate(45deg);
                    margin-left: 8px;
                }
            }
        }
    }
</style>