<template>
    <div class="box">
        <Particles id="tsparticles" :particlesInit="particlesInit" :options="options" />
        <div class="form-box">
            <p>企业门户网站管理系统</p>
            <el-form ref="ruleFormRef" :rules="loginFormRules" :model="loginFrom" status-icon  class="demo-ruleForm">
                <el-form-item label="username" prop="username">
                    <el-input v-model="loginFrom.username" autocomplete="off" />
                </el-form-item>
                <el-form-item label="password" prop="password">
                    <el-input v-model="loginFrom.password" type="password" autocomplete="off" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">Login</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { loadFull } from "tsparticles";
import { reactive, ref } from "vue";
import type {FormInstance} from 'element-plus';
import {useIndexStore} from '../stores/store'
import { useRouter } from "vue-router";
const particlesInit = async (engine: any) => {
    await loadFull(engine);
};

const store=useIndexStore()
const router=useRouter()
const ruleFormRef=ref<FormInstance>()

const loginFormRules={
    username:[
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    password:[
        { required: true, message: '请输入密码', trigger: 'blur' },
    ]
}

const loginFrom=reactive({
    username:'',
    password:''
})

const submitForm=()=>{
    //1.校验表单
    ruleFormRef.value?.validate((isValid)=>{
        if(isValid){
            //2.提交表单
            console.log(loginFrom)
            //3.设置token
            store.setToken('ad1wd4w54')
            router.push('/index')
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

.form-box{
    background-color: rgba(48, 47, 47, 0.322);
    width: 50%;
    padding: 10px;
    p{
        margin: 20px auto;
        text-align: center;
        color: white;
        font-size: 20px;
    }
}
/* deep选择器解决scope下 选择子组件类 */
:deep(.el-form-item__label){
    color: white;
}

:deep(.el-button){
    margin: 10px auto;
    width: 20%;
}

</style>