<template>
    <el-upload @change="onChangeHandle" class="avatar-uploader" :auto-upload="false" :show-file-list="false">
        <img v-if="imageSrc" :src="imageSrc" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';
import type { UploadFile } from 'element-plus';
import { computed } from 'vue';

//利用v-model:image-src进行双向绑定
const props=defineProps<{
    imageSrc:string
}>()
const emit=defineEmits<{
    (event:'update:imageSrc',newValue:string):void,
    (event:'Upload',file:File):void
}>()
//利用计算属性简化操作
const value=computed({
    get(){
        return props.imageSrc
    },
    set(newValue){
        emit('update:imageSrc',newValue)
    }
})

//选择头像
const onChangeHandle = (file: UploadFile) => {
    const reader = new FileReader()
    reader.readAsDataURL(file.raw!)
    reader.onload = (ev) => {
        value.value = ev.target?.result as string
    }
    //通过事件把file值传回去
    emit('Upload',file.raw!)
}

</script>

<style scoped>
:deep(.el-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

:deep(.el-upload:hover) {
    border-color: var(--el-color-primary);
}

:deep(.el-icon.avatar-uploader-icon) {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    /* 通过object-fit设置图片裁剪 */
    object-fit: cover;
    /* 通过object-position设置图片位置 */
    object-position: center;
}
</style>