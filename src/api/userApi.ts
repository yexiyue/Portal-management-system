import axios from 'axios'

export async function getImgCode(){
    const res=await axios.get('/user/code')
    return res.data
}

export async function postLogin(params:{username:string,password:string,code:string}) {
    const res=await axios.post('/user/login',params,{
        withCredentials:true
    })
    return res
}

export async function updateUser(id:number,data:any){
    return await axios.patch('/user/'+id,data)
}

export async function createUser(data:any){
    return (await axios.post('/user',data)).data
}

export async function getUsers(){
    return (await axios.get('/user')).data
}

export async function deleteUsers(id:number){
    return (await axios.delete('/user/'+id)).data
}

export async function getUsersById(id:number){
    return (await axios.get('/user/'+id)).data
}