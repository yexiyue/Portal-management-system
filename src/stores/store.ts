import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useIndexStore=defineStore('index',()=>{
    const isGetterRouter=ref(false)
    const token=ref(localStorage.getItem('token'))
    
    const setToken=(data:string)=>{
        localStorage.setItem('token',data)
        token.value=data
    }
    return {
        isGetterRouter,
        setToken
    }
})