<template>
  <div v-if="show" class="confirm-dialog-overlay" @click.self="handleCancel">
    <!-- ↓ 以下才是彈窗 -->
    <div class="confirm-dialog">
        <div class="confirm-dialog-header">
            <h3>{{ title }}</h3>
        </div>
        <div class="confirm-dialog-body">
            <p>{{ message }}</p>

            <!-- 使用 slot 由父組件自定義內容 -->
            <div class="confirm-details">
                <slot name="comment-details" v-if="$slots['comment-details']"></slot>     
                <slot name="member-details" v-if="$slots['member-details']"></slot>     
            </div>

        </div>

        <div class="confirm-dialog-footer">
                                                            <!-- ↓ 呼叫函示傳送emit給父組件 -->
            <button type="button" class="btn-confirm" @click="handleConfirm">
                {{ confirmText }}
            </button>
            <button type="button" class="btn-cancel" @click="handleCancel">
                {{ cancelText }}
            </button>
        </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: '確認操作' },
  message: { type: String, default: '確定要執行此操作嗎？' },
  details: { type: Object, default: null },
  confirmText: { type: String, default: '確認' },
  cancelText: { type: String, default: '取消' }
  //detailsConfig: { type: Array, default: () => [] } // 配置要顯示的欄位
})

const emit = defineEmits(['confirm', 'cancel'])

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<style scoped lang="scss">
.confirm-dialog-overlay {
  position: fixed;
  z-index: 10000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.confirm-dialog {
  background-color: white;
  border-radius: 12px;
  width: 450px;
  max-width: 90vw;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.confirm-dialog-header {
  background-color: #9187B9;
  color: white;
  padding: 20px 24px;
  border-radius: 12px 12px 0 0;
  
  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
  }
}

.confirm-dialog-body {
  padding: 24px;
  
  p {
    margin: 0 0 16px 0;
    font-size: 16px;
    color: #333;
    line-height: 1.5;
  }
}

.confirm-details {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 16px;

    display: flex;
    flex-direction: column;
    gap: 12px;
}

.confirm-dialog-footer {
  padding: 16px 24px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      transform: translateY(-1px);
    }
  }
  
  .btn-cancel {
    background-color: #6c757d;
    color: white;
    
    &:hover {
      background-color: #5a6268;
    }
  }
  
  .btn-confirm {
    background-color: #9187B9;
    color: white;
    
    &:hover {
      background-color: #7a6ea0;
    }
  }
}
</style>