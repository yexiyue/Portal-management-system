<template>
    <div class="box">
        <Particles id="tsparticles" :particlesInit="particlesInit" :options="options" />
        <div class="form-box">
            <p>企业门户网站管理系统</p>
            <el-form ref="ruleFormRef" label-width="100px" :rules="loginFormRules" :model="loginFrom" status-icon class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginFrom.username" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginFrom.password" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                    <el-input v-model="loginFrom.code" autocomplete="off" />
                </el-form-item>
                <div class="imgCode">
                    <div v-html="imgCode"></div>
                    <el-button type="primary" @click="refreshImgCode">点击刷新</el-button>
                </div>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">Login</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { loadFull } from "tsparticles";
import {  reactive, ref } from "vue";
import type { FormInstance } from 'element-plus';
import { useIndexStore } from '../stores/store'
import { useRouter } from "vue-router";
import { useGetImgCode } from "@/hooks/getImgCode";
import { postLogin } from "@/api/userApi";
import { ElMessage } from 'element-plus'

const particlesInit = async (engine: any) => {
    await loadFull(engine);
};
const { imgCode, refreshImgCode } = useGetImgCode()

const store = useIndexStore()
const router = useRouter()
const ruleFormRef = ref<FormInstance>()

const loginFormRules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    code: [
        {     required: true, message: '请输入验证码', trigger: 'blur'}
    ]
}

const loginFrom = reactive({
    username: '',
    password: '',
    code: ''
})

const submitForm = () => {
    
    //1.校验表单
    ruleFormRef.value?.validate(async (isValid) => {
        if (isValid) {
            //2.提交表单
            const res=await postLogin(loginFrom)
            if(res.data.success){
                //登录成功提示信息
                ElMessage.success('登录成功')
                //重新加载路由（根据权限得重新加载一下）
                store.isGetterRouter=false
                //3.设置token,从响应头中获取token信息
                /* store.setToken(res.headers.authorization) */
                router.push('/index')
            }
            store.setUser(res.data.data)
        }
    })
}
//配置particles的
const options = {
    background: {
        color: {
            value: 'transparent'
        }
    },
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: 'push'
            },
            onHover: {
                enable: true,
                mode: 'repulse'
            },
            resize: true
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40
            },
            push: {
                quantity: 4
            },
            repulse: {
                distance: 200,
                duration: 0.4
            }
        }
    },
    particles: {
        color: {
            value: '#ffffff'
        },
        links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
        },
        collisions: {
            enable: true
        },
        move: {
            direction: 'none',
            enable: true,
            outModes: {
                default: 'bounce'
            },
            random: false,
            speed: 2,
            straight: false
        },
        number: {
            density: {
                enable: true,
                area: 800
            },
            value: 80
        },
        opacity: {
            value: 0.5
        },
        shape: {
            type: 'circle'
        },
        size: {
            value: { min: 1, max: 5 },
        }
    },
    detectRetina: true
}
</script>

<style scoped lang="less">
.box {
    height: 100%;
    background-image: url(../assets/2030824.jpg);
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
}

.form-box {
    background-color: rgba(48, 47, 47, 0.322);
    width: 50%;
    padding: 10px;

    p {
        margin: 20px auto;
        text-align: center;
        color: white;
        font-size: 20px;
    }
}

/* deep选择器解决scope下 选择子组件类 */
:deep(.el-form-item__label) {
    color: white;
}

:deep(.el-button) {
    margin: 10px auto;
    width: 20%;
}

.imgCode {
    display: flex;
    align-items: center;
    justify-content: center;
    :deep(.el-button) {
        width: 20%;
        margin: 0 20px;
    }

    div {
        margin-top: 10px;
    }
}</style>