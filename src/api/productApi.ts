import axios from 'axios'

export type Product={
    id:number
    title:string
    description:string
    detail:string
    updateTime:string
    cover:string
}

export const createProduct=async (data:any)=>{
    return (await axios.post('/product',data)).data
}

export const getProduct=async ()=>{
    return (await axios.get('/product')).data
}
export const getProductById=async (id:number)=>{
    return (await axios.get('/product/'+id)).data
}
export const updateProduct=async (id:number,data:Partial<Product>)=>{
    return (await axios.patch('/product/'+id,data)).data
}

export const deleteProduct=async (id:number)=>{
    return (await axios.delete('/product/'+id)).data
}