import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface User{
    id:number,
    introduction:string,
    avatar:string,
    username:string,
    password:string,
    role:number,
    gender:number
}
export const useIndexStore=defineStore('index',()=>{
    const isGetterRouter=ref(false)
    const token=ref(localStorage.getItem('token'))

    const setToken=(data:string)=>{
        localStorage.setItem('token',data)
        token.value=data
    }

    const isCollapse=ref(localStorage.getItem('isCollapsed')==='false'?false:true)
    
    const user=ref<User>(JSON.parse(localStorage.getItem('user') ?? '{}'))

    const setUser=(data:User)=>{
        user.value=data
        localStorage.setItem('user',JSON.stringify(user.value))
    }
    return {
        token,
        isGetterRouter,
        setToken,
        isCollapse,
        user,
        setUser
    }
})