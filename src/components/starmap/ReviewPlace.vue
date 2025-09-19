<script setup>
import { ref, defineEmits, computed} from 'vue'
import filledStar from '@/assets/icons/icon-filledStar.svg'
import borderStar from '@/assets/icons/icon-borderStar.svg'
import axios from 'axios'
import { useMemberStore } from '@/stores/member'
import { showToast } from '@/composables/useToast';

// 引用useMemberStore
const memberStore = useMemberStore()

//建立響應式變數
const emit = defineEmits(['cencelReview', 'getNewReviews'])
const { selectedLocationId } = defineProps(["selectedLocationId"])
const score = ref(0)
const reviewText =ref('')
const file = ref('')
const photoPreview = ref('')  //base64
const memberName = computed(()=>{
    if( memberStore.isAuthed ){
        return memberStore.user.name
    }
})

const limitWord = computed(()=>{       
    return reviewText.value.length
})

//事件監聽
// 1. 打分數
function fillStar(index){
    score.value = index + 1
}
function isStarFilled(index){
   return index < score.value
}
function uploadPhoto(e){
  file.value = e.target.files[0]  
  console.log(file.value);
  console.log(selectedLocationId);
  
  
  if(file){
    const reader = new FileReader()
    reader.onload = () => {
      photoPreview.value = reader.result  
    //   console.log(photoPreview.value);
    }
    reader.readAsDataURL(file.value)
  }
}
function removePhoto(){
    file.value = ''
    photoPreview.value = ''
}

const insertReview = async ()=>{
    // console.log(file.value);
    // 創一個new FormData, php才能正常接收file
    const formData = new FormData()
    formData.append("score", score.value)
    formData.append("content", reviewText.value)
    formData.append("created_ms",  Date.now())
    formData.append("location_id", selectedLocationId)
    formData.append("member_id", memberStore.user.ID)
    formData.append("image", file.value)

    try{
        const res = await axios.post(
            import.meta.env.VITE_AJAX_URL + "map/postReview.php",
            formData
        )
        // console.log(res.data);
        
        if( res.data.status === "success"){
            cencelReview()
            alert(res.data['message'])
            //要補上接收新的評論 給mapDetail 和 review 去換locationReviews
            // 通知父組件重新載入評論
            emit("getNewReviews")
        }else if( res.data.status === "error" ){
            cencelReview()
            alert(res.data['message'])
        }
    }catch( error ){
        console.error('上傳錯誤:', error)
        console.error('錯誤回應:', error.response)
    }
}


//取消評論

function cencelReview(){   //這邊要判斷是不是會員
    fillStar(-1)
    file.value = ''
    reviewText.value = ''
    photoPreview.value = ''
    emit("cencelReview")
}

//送出評論
function submit(){
    if( score === 0 || reviewText.value.length ===0){
        alert('評論與評分不能為空白')
    }else{
        insertReview()       
    }
}



</script>

<template>
    <!-- 評論攔 -->
    <div class="mapreview-writePlace">
        <h3>{{memberName}}</h3>
        <div class="review-writePlace-score">
            <img class="starScore" 
                v-for="(star, index) in 5"  
                :key="index"
                :src="isStarFilled(index)? filledStar: borderStar"
                @click="fillStar(index)"
            >
        </div>


        <div class="review-writePlace-text">
            <h5><span>*</span>說出你的想法：</h5>
            <textarea name="" id="" maxlength='300' v-model="reviewText"></textarea>
            <p>字數限制：{{limitWord}}/300</p>
        </div>
        <div class="review-writePlace-photo">
            <!-- <h5>上傳照片：</h5> -->
            <div class="review-photo-input">
                <div class="photo-inputtitle">
                    <img src="../../assets/icons/icon-map-photoadd.svg" alt="">
                    <p>點擊新增照片</p>
                </div>
                <input type="file" name="photo" accept="image/*" @change="uploadPhoto">
            </div>
            <!-- 照片預覽 -->
            <img class="userPhotoShow" :src="photoPreview"></img>
            <button v-if="photoPreview!=''" @click="removePhoto">取消照片</button>
            
        </div>
        <div class="review-writePlace-button">
            <button class="cancel" @click="cencelReview">取消</button>
            <button class="submit" @click="submit">張貼</button>
        </div>
    </div>

    
</template>

<style scoped lang="scss">
@import '../../assets/styles/main.scss';


.mapreview-writePlace{
    width: 430px;
    height: min(90%, 640px) ;
    max-height: 90%;
    border: 2px solid $primaryColor-100;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    // justify-content:center;
    gap: 36px;
    align-items: center;
    padding: 30px;
    box-sizing: border-box;

    font-family: $chFont;
    background-color: $FontColor-white;

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 300;

    overflow-y: auto;

    &::-webkit-scrollbar {
            width: 8px;
        }
        &::-webkit-scrollbar-thumb {
            background: $primaryColor-500;
            border-radius: 10px;
            /* 重點：加邊框讓滾軸往內縮 */
            border: 1px solid transparent;
            background-clip: content-box;
        }

}
.mapreview-writePlace h3{
    font-size: $pcChFont-H3;
}
.review-writePlace-score{
    display: flex;
    gap: 20px;

}
.review-writePlace-score img{
    width: 36px;
}
    //文字評論區
.review-writePlace-text{
    width: 100%;
    display: flex;
    flex-direction: column;
}
.review-writePlace-text h5{
    font-size: $pcChFont-p ;
    margin-bottom: 8px;
}
.review-writePlace-text h5 span{
    color: red;
}
.review-writePlace-text textarea{
    width: 100%;
    height: 100px;
    resize: none;
    padding: 8px;
    box-sizing: border-box;
    font-size: $pcChFont-p;
}
.review-writePlace-text p {
    font-size:$pcChFont-small ;
    align-self: flex-end;
}
    //照片上傳區
.review-writePlace-photo{
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.review-writePlace-photo h5{
    font-size: $pcChFont-p;
}
.review-photo-input{
    width: 350px;
    height: 48px;
    align-self: center;

    border: 1px solid $FontColor-black;
    border-radius: 5px;

    position: relative;
}
.review-photo-input input{
    width: 100%;
    height: 100%;
    opacity: 0;
}
.photo-inputtitle{
    display:flex;
    gap: 8px;
    align-items: center;

    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
}
.photo-inputtitle p{
    font-size:$pcChFont-p ;
}
.photo-inputtitle img{
    width: 36px;
}

.userPhotoShow{
    display: block;
    margin: 12px auto;
    width: 100%;
}

    //按鈕
.review-writePlace-button{
    display: flex;
    gap: 8px;
}
.review-writePlace-button button{
    width: 96px;
    height: 54px;
    font-size: $pcChFont-H4;
    border-radius: 5px;
}

.review-writePlace-button .cancel{
    background-color: #ffffff;
    color: $primaryColor-800;
    border: 1px solid $primaryColor-800;
}
.review-writePlace-button .submit{
    border: 1px solid $primaryColor-500;
    background-color: $primaryColor-500;
    color: #ffffff;
}

.review-writePlace-button button:hover{
    background-color: $primaryColor-800;
    border: 1px solid $primaryColor-800;
    color: #ffffff;
}

@media screen and (max-width:430px) {
    .mapreview-writePlace{
        max-width: 398px;
    }
}


</style>

