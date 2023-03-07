import axios, { AxiosError } from "axios";
import { ElMessage } from 'element-plus'
import { useIndexStore } from "@/stores/store";
import { pinia } from "@/stores";

const store=useIndexStore(pinia)

axios.defaults.baseURL='/adminapi'

axios.interceptors.request.use((config)=>{
    //请求拦截器设置authorization
    const token=store.token
    token && (config.headers.Authorization=token)
    return config
})

axios.interceptors.response.use((value)=>{
    //响应拦截器获取token
    if(value.headers.authorization){
        store.setToken(value.headers.authorization)
    }
    return value
},(error:AxiosError)=>{
    //错误信息报错
    ElMessage.error((error.response!.data as any).message)

    if((error.response?.data as any).status==401){
        //登录过期重新登录
        location.replace('#/login')
        localStorage.removeItem('token')
    }
})