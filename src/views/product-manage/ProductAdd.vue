<template>
    <el-card>
        <template #header>
            <el-page-header icon="" title="产品管理">
                <template #content>
                    <span class="text-large font-600 mr-3">添加产品</span>
                </template>
            </el-page-header>
        </template>
        <!-- 表单 -->
        <el-form label-width="100px" ref="userFormRef" :model="userForm" :rules="rules" class="demo-ruleForm">
            <el-form-item label="产品名称" prop="title">
                <el-input v-model="userForm.title" />
            </el-form-item>
            <el-form-item label="简要描述" prop="description">
                <el-input type="textarea" v-model="userForm.description" />
            </el-form-item>
            <el-form-item label="详细描述" prop="detail">
                <el-input type="textarea" v-model="userForm.detail" />
            </el-form-item>
            <el-form-item label="产品图片" prop="cover">
                <UploadVue v-model:image-src="userForm.cover" @upload="onUpload"></UploadVue>
            </el-form-item>

            <el-form-item>
                <el-button @click="onSubmitUser" type="primary" class="user-form-submit">
                    添加产品
                </el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import { ElMessage, type FormInstance } from 'element-plus';
import { reactive, ref } from 'vue';
import UploadVue from '@/components/upload/Upload.vue'
import { useUploadImage } from '@/components/upload/uploadImage'
import { createProduct ,type Product} from '@/api'
import { useRouter } from 'vue-router';


const { onUpload, getUploadedImageUrl } = useUploadImage()

const userForm = reactive<Pick<Product,'cover'|'description'|'detail'|'title'>>({
    cover:'',
    description:'',
    detail:'',
    title:''
})
const userFormRef = ref<FormInstance>()
const rules = {
    title: [
        { required: true, message: '请输入标题', trigger: 'blur' }
    ],
    description: [
        { required: true, message: '请输入简要描述', trigger: 'blur' }
    ],
    detail: [
        { required: true, message: '请输入详细描述', trigger: 'blur' }
    ],
    cover: [
        { required: true, message: '请上传产品图片', trigger: 'blur' }
    ],
}
const router = useRouter()
//添加用户
const onSubmitUser = () => {
    userFormRef.value?.validate(async (isValid) => {
        if (isValid) {
            userForm.cover = (await getUploadedImageUrl())!
            const res = await createProduct(userForm)
            if (res.success) {
                //重置表单
                userFormRef.value?.resetFields()

                ElMessage.success('添加产品成功')
                router.push('/product-manage/productList')
            }
        }
    })
}

</script>

<style scoped>
.el-card {
    margin-top: 5px;
}

:deep(.avatar){
    width: 300px;
}
</style>