<template>
    <el-card>
        <template #header>
            <el-page-header @back="router.back()"  title="新闻管理">
                <template #content>
                    <span class="text-large font-600 mr-3">新闻编辑</span>
                </template>
            </el-page-header>
        </template>
        <el-form label-width="100px" ref="newsFormRef" :model="newsForm" :rules="rules" class="demo-ruleForm">
            <el-form-item label="标题" prop="title">
                <el-input v-model="newsForm.title" />
            </el-form-item>
            
            <el-form-item label="内容" prop="content">
                <editor v-model="newsForm.content" ></editor>
            </el-form-item>
            <el-form-item label="分类" prop="category">
                <el-select style="width:100%;" v-model="newsForm.category">
                    <el-option :value="1" label="最新动态"></el-option>
                    <el-option :value="2" label="典型案例"></el-option>
                    <el-option :value="3" label="通知公告"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="封面" prop="cover">
                <UploadVue v-model:image-src="newsForm.cover" @upload="onUpload"></UploadVue>
            </el-form-item>
            <el-form-item >
                <el-button style="margin: 0 auto;width:150px;" type="primary" @click="onHandleAddNews" >更新新闻</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import { ElMessage, type FormInstance } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import UploadVue from '@/components/upload/Upload.vue'
import { useUploadImage } from '@/components/upload/uploadImage'
import Editor from '@/components/editor/Editor.vue'
import { useRoute, useRouter } from 'vue-router';
import { getNewsById, updateNews } from '@/api';
import { useIndexStore } from '@/stores/store';
const { onUpload, getUploadedImageUrl } = useUploadImage()
const store=useIndexStore()
const route=useRoute()
const newsForm = reactive({
    title: '',
    content: '',
    category: 1,//1 最新动态 2典型案例 3通知公告
    cover: '',
})

onMounted(async ()=>{
    const res=await getNewsById(+route.params.id)
    Object.assign(newsForm,res.data,{User:undefined})
})
const newsFormRef = ref<FormInstance>()

const rules = {
    title: [
        { required: true, message: '请输入标题', trigger: 'blur' }
    ],
    content: [
        { required: true, message: '请输入内容', trigger: 'blur' }
    ],
    category: [
        { required: true, message: '请选择分类', trigger: 'blur' }
    ],
    cover: [
        { required: true, message: '上传封面', trigger: 'blur' }
    ],
}


const router = useRouter()
//添加新闻
const onHandleAddNews = () => {
    newsFormRef.value?.validate(async (isValid) => {
        if (isValid) {
            newsForm.cover = (await getUploadedImageUrl())!
            const res = await updateNews(+route.params.id,newsForm)
            if (res.success) {
                //重置表单
                newsFormRef.value?.resetFields()

                ElMessage.success('更新新闻成功')
                router.push('/news-manage/newsList')
            }
        }
    })
}
</script>

<style scoped>
:deep(.avatar){
    width: 300px;
}

.el-card {
    margin-top: 5px;
}
</style>