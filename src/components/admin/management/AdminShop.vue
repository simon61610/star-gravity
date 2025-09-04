<!-- 
待新增字數限制功能
-->

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios';

// 組件
import AdminTable from '@/components/admin/AdminTable.vue';

const props = defineProps({
  search: { type: String, default: '' }
})

// ==========================================================

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

const Shoptable = ref([]) // 暫時給的，待刪除

/* const Shoptable = ref([ 
    {
        id: '01',
        category: '天文望遠鏡',
        name: '聖文版望遠鏡',
        price: '天價',
        salePrice:'10',
        stock:'1000',
        status:'上架',
    } ,
]) */

// ==========================================================

// 控制彈窗開關
const show = ref(false)

const openModal = () => {
    show.value = true
}

const close = () => {
    show.value = false
}

defineExpose({ openModal })

// ==========================================================

// 照片預覽
const imagesPreview = ref([null, null, null])
// 照片上傳
const imagesFiles = ref([null, null, null])



const fileChange = (e, index) => {
    const file = e.target.files[0]
    // console.log(file)

    // 儲存 File 物件，之後用 formData
    imagesFiles.value[index] = file

    const readFile = new FileReader()
    readFile.readAsDataURL(file)

    readFile.addEventListener('load', () => {
        imagesPreview.value[index] = readFile.result // 圖片顯示
        // console.log(readFile.result)

        // 處理base64字串，傳到後端
        /* 
        const imageBase64 = readFile.result
        images.value[index] = {
            name: file.name,
            type: file.type,
            data:  imageBase64.split(',')[1]
        } 
        */
    })

    // console.log(images.value)
}

// ==========================================================
// 表單物件
const name = ref('') // 商品名稱
const category_name = ref('null') //商品類別
const description = ref('') // 商品描述
const promotion = ref('') // 全店優惠活動
const original_price = ref('0') // 原價
const discount = ref('100') // 折扣
const sale_price = computed(() => { //售價
    return original_price.value * (discount.value / 100)
})
const stock = ref('0') // 庫存
const is_active = ref('0') // 上下架
const introduction = ref('') // 商品說明


// ==========================================================

// 先用一個物件存放資料

/* 
const product = computed(() => ({
    name: name.value,
    category_name: category_name.value,
    original_price: original_price.value,
    discount: discount.value,
    sale_price: sale_price.value,
    promotion: promotion.value,
    description: description.value,
    introduction: introduction.value,
    stock: stock.value,
    is_active: is_active.value,
    images: images.value // Array
})) 


const save = async () => {
    // console.log(product.value)
    const res = await axios.post('http://localhost/starshop/admin/product_add.php' , product.value)
    // const res = await axios.post('pdo/starshop/admin/product_add.php' , product.value)

    console.log(res.data)
    alert(res.data.message)

    close()
} 
*/

const save = async () => {

    // 用 FormData 儲存
    const formData = new FormData()

    formData.append("name", name.value)
    formData.append("category_name", category_name.value)
    formData.append("original_price", original_price.value)
    formData.append("discount", discount.value)
    formData.append("sale_price", sale_price.value)
    formData.append("promotion", promotion.value)
    formData.append("description", description.value)
    formData.append("introduction", introduction.value)
    formData.append("stock", stock.value)
    formData.append("is_active", is_active.value)

    imagesFiles.value.forEach((file, i) => {
        if (file) {
            formData.append("images[]", file)
        }
    })

    // console.log(product.value)
    const res = await axios.post('http://localhost/starshop/admin/product_add.php' , formData)
    // const res = await axios.post('pdo/starshop/admin/product_add.php' , formData)
    // const res = await axios.post('http://localhost/starshop/admin/product_add.php' , product.value)
    // const res = await axios.post('pdo/starshop/admin/product_add.php' , product.value)

    console.log(res.data)
    alert(res.data.message)

    close()
} 


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
    <!-- <div class="Admin-product-modal"  @click.self="close"> -->

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
                        <input name="name" v-model="name">
                    </div>

                    <!-- -------------------------- -->
                    <div class="prod-category input-box">
                        <h2 class="label-name">商品類別</h2>
                        <div class="category-box">
                            <div class="radio-box">
                                <h3>天文望遠鏡</h3>
                                <label><input type="radio" v-model="category_name" value="基礎入門型">基礎入門型</label>
                                <label><input type="radio" v-model="category_name" value="進階專業型">進階專業型</label>
                            </div>
                            <div class="radio-box">
                                <h3>雙筒/單筒望遠鏡</h3>
                                <label><input type="radio" v-model="category_name" value="單筒望遠鏡">單筒望遠鏡</label>
                                <label><input type="radio" v-model="category_name" value="雙筒望遠鏡">雙筒望遠鏡</label>
                            </div>
                            <div class="radio-box">
                                <h3>腳架</h3>
                                <label><input type="radio" v-model="category_name" value="一般三腳架">一般三腳架</label>
                                <label><input type="radio" v-model="category_name" value="天文三腳架">天文三腳架</label>
                            </div>
                            <div class="radio-box">
                                <h3>配件</h3>
                                <label><input type="radio" v-model="category_name" value="星座盤">星座盤</label>
                                <label><input type="radio" v-model="category_name" value="指北針">指北針</label>
                                <label><input type="radio" v-model="category_name" value="紅光手電筒">紅光手電筒</label>
                            </div>
                            <div class="radio-box">
                                <h3>書籍/小物</h3>
                                <label><input type="radio" v-model="category_name" value="觀星教學書籍">觀星教學書籍</label>
                                <label><input type="radio" v-model="category_name" value="星空小物">星空小物</label>
                            </div>
                        </div>
                    </div>

                    <!-- -------------------------- -->
                    <div class="prod-desc input-box">
                        <h2 class="label-name">商品描述</h2>
                        <textarea v-model="description" rows="5"></textarea>
                    </div>

                    <!-- -------------------------- -->
                    <div class="prod-desc input-box">
                        <h2 class="label-name">全店優惠活動</h2>
                        <textarea v-model="promotion" rows="5"></textarea>
                    </div>

                    <!-- -------------------------- -->
                    <div class="prod-original-price input-box">
                        <h2 class="label-name">原價</h2>
                        <input v-model.number.lazy="original_price">
                    </div>

                    <!-- -------------------------- -->
                    <div class="prod-discount input-box">
                        <h2 class="label-name">商品折扣</h2>
                        <input class="discount-input" v-model.number.lazy="discount">%
                    </div>
                    
                    <!-- -------------------------- -->
                    <div class="prod-sale-price input-box">
                        <h2 class="label-name">售價</h2>
                        <input name="sale_price" v-model.number.lazy="sale_price" disabled>
                    </div>

                    <!-- -------------------------- -->
                    <div class="prod-stock input-box">
                        <h2 class="label-name">庫存數量</h2>
                        <input v-model.number.lazy="stock">
                    </div>

                    <!-- -------------------------- -->
                    <div class="active input-box">
                        <h2 class="label-name">上下架</h2>
                        <select v-model="is_active">
                            <option :value="1">上架</option>
                            <option :value="0">下架</option>
                        </select>
                    </div>

                    <!-- -------------------------- -->

                    <div class="img-boxes">
                        <div class="img-box" v-for="(image, index) in imagesPreview">
                            <div class="add" v-if="!image">+</div>
                            <img :src="image" alt="" v-if="image">
                            <input type="file" class="the-file" @change="(e) => fileChange(e, index)">
                        </div>
                    </div>
                </div>
            </div>

            <!-- =================================================== -->

            <div class="prod-text">
                <h1 class="title">商品說明</h1>
                <textarea v-model="introduction" rows="5"></textarea>
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
                        // height: 100px;
                        padding: 8px 12px;
                        font-size: 16px;
                    }

                    .discount-input {
                        width: 28px;
                        margin-right: 4px;
                        text-align: center;
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
                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
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
    