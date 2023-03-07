<template>
    <el-page-header icon="" title="企业门户管理系统">
        <template #content>
            <span class="text-large font-600 mr-3">个人中心</span>
        </template>
    </el-page-header>
    <el-row :gutter="20">
        <el-col :span="8">
            <el-card class="box-card">
                <!-- 头像组件 -->
                <el-avatar :size="100"
                    :src="store.user.avatar ?? 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'">
                </el-avatar>
                <h3>{{ store.user.username }}</h3>
                <h5>{{ store.user.role === 1 ? '管理员' : '编辑' }}</h5>
            </el-card>
        </el-col>
        <el-col :span="15">
            <el-card>
                <template #header>
                    个人信息
                </template>
                <!-- 表单 -->
                <el-form label-width="100px" ref="userFormRef" :model="userForm" :rules="rules" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="userForm.username" />
                    </el-form-item>
                    <el-form-item label="性别" prop="gender">
                        <el-select style="width: 100%;" v-model="userForm.gender">
                            <el-option label="保秘" :value="0"></el-option>
                            <el-option label="男" :value="1"></el-option>
                            <el-option label="女" :value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="简介" prop="introduction">
                        <el-input type="textarea" v-model="userForm.introduction" />
                    </el-form-item>
                    <el-form-item label="头像" prop="avatar">
                        <UploadVue v-model:image-src="userForm.avatar" @upload="onUpload" ></UploadVue>
                    </el-form-item>

                    <el-form-item>
                        <el-button @click="updateUserInfo" type="primary" class="user-form-submit">
                            更新
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { useIndexStore,type User } from '@/stores/store';
import { reactive, ref } from 'vue';
import { ElMessage, type FormInstance } from 'element-plus';
import {  updateUser } from '@/api';
import UploadVue from '@/components/upload/Upload.vue'
import {useUploadImage} from '@/components/upload/uploadImage'
const store = useIndexStore()
const userForm = reactive<User>({
    ...store.user,
})
const userFormRef = ref<FormInstance>()
const rules = {
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' }
    ],
    gender: [
        { required: true, message: '请选择性别', trigger: 'blur' }
    ],
    introduction: [
        { required: true, message: '请输入简介', trigger: 'blur' }
    ],
    avatar: [
        { required: true, message: '请上传头像', trigger: 'blur' }
    ],
}

//导入和Upload组件配合使用的hooks
const {onUpload,getUploadedImageUrl}=useUploadImage()

//更新个人信息
const updateUserInfo = () => {
    userFormRef.value?.validate(async (isValid) => {
        if (isValid) {
            let avatarUrl=await getUploadedImageUrl()

            const res = await updateUser(userForm.id, {
                avatar: avatarUrl,
                username: userForm.username,
                gender: userForm.gender,
                introduction: userForm.introduction
            })

            if (res.data.success) {
                ElMessage.success('更新成功')
                store.setUser(res.data.data)
            }
        }
    })
}
</script>

<style scoped>
.el-row {
    margin-top: 20px;
}

.box-card {
    text-align: center;
}

.user-form-submit {
    width: 50%;
    margin: auto;
}
</style>