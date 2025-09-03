<!-- 待新增字數限制功能 -->



<script setup>
import {ref} from 'vue'
import AdminTable from '@/components/admin/AdminTable.vue';

const props = defineProps({
  search: { type: String, default: '' }
})

//欄位定義
const columns = [

    {label:'編號',prop:'id'},
    {label:'商品類別',prop:'category'},
    {label:'名稱',prop:'name'},
    {label:'原價',prop:'price'},
    {label:'售價',prop:'salePrice' },
    {label:'庫存量',prop:'stock'},
    {label:'上下架',prop:'status'},
    {label:'編輯查看',prop:'actions', slot:'編輯', align:'right'},
]

const Shoptable = ref([ 
    {
        id: '01',
        category: '天文望遠鏡',
        name: '聖文版望遠鏡',
        price: '天價',
        salePrice:'10',
        stock:'1000',
        status:'上架',
    } ,
])


// 控制彈窗開關
const show = ref(false)

const openModal = () => {
    show.value = true
}

const close = () => {
    show.value = false
}

defineExpose({ openModal })

</script>


<template>
    <AdminTable :columns="columns" :data="Shoptable" :search="props.search">
        <template #編輯="{ row, $index }">
            <el-button size="small" @click="handleEdit(row, $index)"> 
            編輯查看
            </el-button> 
        </template>
    </AdminTable>

    <div v-if="show" class="Admin-product-modal"  @click.self="close">

        <section class="prod-form">
            <header>
                新增商品
            </header>

            <!-- =================================================== -->

            <div class="prod-info">
                <h1 class="title">商品介紹</h1>

                <div class="input-boxes">
                    <!-- 系統自動產生商品編號 -->
                    <!-- <label class="prod-id">
                        商品編號 <input name="ID">
                    </label> -->

                    <!-- -------------------------- -->
                    <div class="prod-name input-box">
                        <h2 class="label-name">商品名稱</h2>
                        <input name="name">
                    </div>

                    <!-- -------------------------- -->
                    <div class="prod-category input-box">
                        <h2 class="label-name">商品類別</h2>
                        <div class="category-box">
                            <div class="radio-box">
                                <h3>天文望遠鏡</h3>
                                <label><input type="radio" name="category_name">基礎入門型</label>
                                <label><input type="radio" name="category_name">進階專業型</label>
                            </div>
                            <div class="radio-box">
                                <h3>雙筒/單筒望遠鏡</h3>
                                <label><input type="radio" name="category_name">單筒望遠鏡</label>
                                <label><input type="radio" name="category_name">雙筒望遠鏡</label>
                            </div>
                            <div class="radio-box">
                                <h3>腳架</h3>
                                <label><input type="radio" name="category_name">一般三腳架</label>
                                <label><input type="radio" name="category_name">天文三腳架</label>
                            </div>
                            <div class="radio-box">
                                <h3>配件</h3>
                                <label><input type="radio" name="category_name">星座盤</label>
                                <label><input type="radio" name="category_name">指北針</label>
                                <label><input type="radio" name="category_name">紅光手電筒</label>
                            </div>
                            <div class="radio-box">
                                <h3>書籍/小物</h3>
                                <label><input type="radio" name="category_name">觀星教學書籍</label>
                                <label><input type="radio" name="category_name">星空小物</label>
                            </div>
                        </div>
                    </div>

                    <!-- -------------------------- -->
                    <div class="prod-desc input-box">
                        <h2 class="label-name">商品描述</h2>
                        <textarea name="description"></textarea>
                    </div>

                    <!-- -------------------------- -->
                    <div class="prod-desc input-box">
                        <h2 class="label-name">全店優惠活動</h2>
                        <textarea name="promotion"></textarea>
                    </div>

                    
                    <!-- -------------------------- -->
                    <div class="prod-discount input-box">
                        <h2 class="label-name">商品折扣</h2>
                        <input name="discount">
                    </div>
                    
                    <!-- -------------------------- -->
                    <div class="prod-original-price input-box">
                        <h2 class="label-name">原價</h2>
                        <input name="original_price">
                    </div>

                    <!-- -------------------------- -->
                    <div class="prod-sale-price input-box">
                        <h2 class="label-name">售價</h2>
                        <input name="sale_price" disabled>
                    </div>

                    <!-- -------------------------- -->
                    <div class="prod-stock input-box">
                        <h2 class="label-name">庫存數量</h2>
                        <input name="stock">
                    </div>

                    <!-- -------------------------- -->
                    <div class="active input-box">
                        <h2 class="label-name">上下架</h2>
                        <select name="is_active">
                            <option>上架</option>
                            <option>下架</option>
                        </select>
                    </div>

                    <!-- -------------------------- -->

                    <div class="img-boxes">
                        <div class="img-box" v-for="box in 3">
                            <div class="add">+</div>
                            <input type="file" class="the-file">
                        </div>
                    </div>
                </div>
            </div>

            <!-- =================================================== -->

            <div class="prod-text">
                <h1 class="title">商品說明</h1>
                <textarea name="introduction"></textarea>
            </div>

            <!-- =================================================== -->
            
            <div class='Admin-product-button'>
                <button @click="close" >關閉</button>
                <button @click="save">儲存</button> <!-- save 事件待定義 -->
            </div>
        </section>
    </div>

</template>

<style scoped lang="scss">

    // ------------------- 上架功能 -------------------
    .prod-form{
        // width: 820px;
        height: 600px;

        background-color: white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 18px;
        // margin-bottom: 250px;
        border-radius: 10px;
        // width: 750px;
        // height: 350px;
        overflow-y: scroll;

        header {
            padding: 20px 24px;
            background-color: #9187B9;
            color: white;
            font-weight: bold;
            margin-bottom: 12px;
        }

        // <<<<<<<<<< 商品介紹 >>>>>>>>>>
        .prod-info {
            // border: 1px solid blue;
            padding: 24px;

            .title {
                padding-bottom: 20px;
                border-bottom: 1px solid #ccc;
                margin-bottom: 20px;
                font-weight: bold;
            }

            .input-boxes {
                display: flex;
                flex-direction: column;
                gap: 12px;

                // 共用
                .input-box {
                    // border: 1px solid green;
                    display: flex;
                    align-items: center;
                    h2 {
                        // border: 1px solid red;
                        flex-basis: 120px;
                        flex-shrink: 0;
                        margin-right: 20px;
                        text-align: center;
                    }
                    input {
                        width: 100%;
                        padding: 8px 12px;
                        font-size: 16px;
                    }
                    textarea {
                        width: 100%;
                        resize: none;
                        height: 100px;
                        padding: 8px 12px;
                        font-size: 16px;
                    }
                }

                // 商品類別
                .prod-category {
                    .category-box{
                        // border: 1px solid purple;
                        display: flex;
                        flex-wrap: wrap;
                        gap: 20px;
                        
                        .radio-box {
                            flex-basis: 160px;
                            // border: 1px solid orange;
                            display: flex;
                            flex-direction: column;
                            gap: 12px;

                            h3 {
                                font-weight: bold;
                            }
                            label{
                                input {
                                    width: auto;
                                }
                            }
                        }  
                    } 
                }

                .active {
                    select {
                        font-size: 16px;
                        padding: 8px 12px;
                    }
    
                }

                .img-boxes {
                    margin-top: 20px;
                    display: flex;
                    gap: 20px;
                    .img-box {
                        border: 8px dashed #ccc;
                        width: 240px;
                        height: 240px;
                        text-align: center;

                        position: relative;
                        .add {
                            font: bold 100px Tahoma;
                            color: #ccc;

                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                        }
                        input {
                            width: 100%;
                            height: 100%;
                            cursor: pointer;

                            position: absolute;
                            top: 0;
                            left: 0;

                            opacity: 0;
                        }
                    }
                }
            }
        }

        // <<<<<<<<<< 商品說明 >>>>>>>>>>
        .prod-text {
            padding: 24px;
            // border: 1px solid red;

            .title {
                padding-bottom: 20px;
                border-bottom: 1px solid #ccc;
                margin-bottom: 20px;
                font-weight: bold;
            }
            textarea {
                box-sizing: border-box;
                width: 100%;
                resize: none;
                height: 160px;
                padding: 8px 12px;
                font-size: 16px;
            }
        }

        // <<<<<<<<<< 按鈕 >>>>>>>>>>
        .Admin-product-button{
            // margin-top: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            margin-bottom: 12px;
            button{
                border: none;
                border-radius: 20px;
                width: 120px;
                height: 40px;
                cursor: pointer;
                &:hover{
                    background-color: gray;
                    color: white;
                }
            }
        }
    }

    // ------------------- 彈出視窗 -------------------
    .Admin-product-modal{
        position: fixed;
        z-index: 9999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
    }



</style>
    