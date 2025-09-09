<!-- 
待新增字數限制功能
-->

<!-- console.log(import.meta.env.VITE_AJAX_URL); -->

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios';

// 組件
import AdminTable from '@/components/admin/AdminTable.vue';

const props = defineProps({
  search: { type: String, default: '' }
})

// ==========================================================

//欄位定義
const columns = [

    {label:'編號',prop:'ID'},
    {label:'商品類別',prop:'category_name'},
    {label:'名稱',prop:'name'},
    {label:'原價',prop:'original_price'},
    {label:'售價',prop:'sale_price' },
    {label:'庫存量',prop:'stock'},
    {label:'上下架',prop:'is_active', formatter: (row) => row.is_active == 1 ? '上架' : '下架'},
    {label:'編輯查看',prop:'actions', slot:'編輯', align:'right'},
]

const Shoptable = ref([]) // 準備用來放資料
const editingProduct = ref(null) // 放編輯中的商品資訊

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




// 從資料庫抓資料
const fetchProducts = async () => {
    const res = await axios.get(import.meta.env.VITE_AJAX_URL + "starshop/admin/product_get.php")
    // const res = await axios.get("pdo/starshop/admin/product_get.php") // 部屬前待修改路徑

    Shoptable.value = res.data

    console.log(Shoptable.value)
}

onMounted (() => {
    fetchProducts()
})

// ==========================================================

// 控制彈窗開關
const show = ref(false)

const openModal = () => {
    show.value = true
}

const close = () => {
    show.value = false
    resetForm()
    editingProduct.value = null // 關閉時，清空編輯中的商品資料
}

defineExpose({ openModal })

// ==========================================================

// 照片預覽
const imagesPreview = ref([null, null, null])
// 照片上傳
const imagesFiles = ref([null, null, null])
// 照片id
const image_ids = ref([])

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


// const name = ref('test') // 商品名稱
// const category_name = ref('test') //商品類別
// const description = ref('test') // 商品描述
// const promotion = ref('ss') // 全店優惠活動
// const original_price = ref('0') // 原價
// const discount = ref('100') // 折扣




const sale_price = computed(() => { //售價
    return parseInt(original_price.value * (discount.value / 100))
})
const stock = ref('0') // 庫存
const is_active = ref('0') // 上下架
const introduction = ref('') // 商品說明


// 把要編輯的商品資料放進表單
const handleEdit = (row, index) => {
    console.log(row)

    editingProduct.value = row
    name.value = row.name // 商品名稱
    category_name.value = row.category_name //商品類別
    description.value = row.description // 商品描述
    promotion.value = row.promotion // 全店優惠活動
    original_price.value = row.original_price // 原價
    discount.value = row.discount // 折扣
    stock.value = row.stock // 庫存
    is_active.value = row.is_active // 上下架
    introduction.value = row.introduction // 商品說明

    // 處理圖片預覽
    // console.log(row.images) // "/starshop/images/基礎入門型1-1.png,/starshop/images/基礎入門型1-2.png,/starshop/images/基礎入門型1-3.png" 用逗號隔開，要切割成陣列
    imagesPreview.value = row.images.split(',')
    // console.log(imagesPreview.value)

    // 若圖片小於 3 張，補 null
    while(imagesPreview.value.length < 3){
        imagesPreview.value.push(null)
    }

    // 處理圖片上傳
    // imagesFiles.value = [null, null, null]

    image_ids.value = row.image_ids.split(',')
    // console.log(image_ids.value) // ['1', '2', '3']

    openModal()
}



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

// 清空表單
const resetForm = () => {
    name.value = ''
    category_name.value = 'null'
    description.value = ''
    promotion.value = ''
    original_price.value = '0'
    discount.value = '100'
    stock.value = '0'
    is_active.value = '0'
    introduction.value = ''
    
    // 圖片預覽與檔案清空
    imagesPreview.value = [null, null, null]
    imagesFiles.value = [null, null, null]
}



const save = async () => {

    // 檢查是否都有輸入
    if( !name.value || category_name.value === 'null' || !description.value || !promotion.value || !original_price.value || !discount.value || !introduction.value){
        alert("請輸入完整商品資料")
        return
    }

    // 檢查至少一張圖片
    /* let hasImage = false
    for(let i = 0; i < imagesPreview.value.length; i++){
        if(imagesPreview.value[i] !== null){
            hasImage = true
            break
        }
    } */

    // 檢查圖片都要有
    let hasImage = true
    for(let i = 0; i < imagesPreview.value.length; i++){
        if(imagesPreview.value[i] === null){
            hasImage = false
            break
        }
    }

    if(!hasImage){
        alert('請上傳完整的三張商品照片')
        return
    }

    
    // 用 FormData 儲存
    const formData = new FormData()

    // 如果是編輯模式，先加上 ID
    if(editingProduct.value){
        formData.append("ID", editingProduct.value.ID)
    }
    
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

    // 第一版
    // 編輯商品時: 如果沒選新圖片，就不要 append images[]
    /* imagesFiles.value.forEach((file, i) => {
        if (file) {
            formData.append("images[]", file)
        }
    }) */

    // 有bug
    /* for(let i = 0; i < imagesFiles.value.length; i++){
        const file = imagesFiles.value[i]
        if (file) {
            formData.append("images[]", file)
        }
    }

    if(editingProduct.value){
        for(let i = 0; i < image_ids.value.length; i++){
            formData.append("image_ids[]", image_ids.value[i])
        }
    } */

    // 對應圖片ID與圖片路徑
        for(let i = 0; i < imagesFiles.value.length; i++ ){
            const file = imagesFiles.value[i]
            if (file) {
                formData.append(`images[${i}]`, file)
                formData.append(`image_ids[${i}]`, image_ids.value[i])
            }else{
                formData.append(`image_ids[${i}]`, image_ids.value[i])
            }
        }
    

    let response
    if (!editingProduct.value) {
        // 新增: 發送請求 product_add.php
        response = await axios.post(import.meta.env.VITE_AJAX_URL + 'starshop/admin/product_add.php' , formData)
        // const response = await axios.post('pdo/starshop/admin/product_add.php' , formData) // 部屬前待修改路徑
        
        // const response = await axios.post('http://localhost/pdo/starshop/admin/product_add.php' , product.value)
        // const response = await axios.post('pdo/starshop/admin/product_add.php' , product.value)
    } 
    else {
        /* alert("編輯功能尚未完成")
        return */
        // 編輯: 發送請求 product_update.php
        // formData.append("ID", editingProduct.value.ID)
        response = await axios.post(import.meta.env.VITE_AJAX_URL + 'starshop/admin/product_update.php', formData)
        // response = await axios.post('http://localhost/pdo/starshop/admin/product_update.php', formData)
        // const response = await axios.post('pdo/starshop/admin/product_update.php' , formData) // 部屬前待修改路徑
    }
    
    if(response.data.success){
        console.log(response.data)
        alert(response.data.message)
        resetForm()
        await fetchProducts() // 新增後，更新資料表
        close()
    }else {
        alert('新增失敗')
    }

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

    <div v-if="show" class="Admin-product-modal">
    <!-- <div class="Admin-product-modal"  @click.self="close"> -->

        <section class="prod-form">
            <header>
                {{ editingProduct ? "編輯商品" : "新增商品"}}
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
    