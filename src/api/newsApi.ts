import axios from 'axios'
export type News={
    id:number
    title: string
    content: string
    category: number
    cover: string
    userId:number
    createTime:string
    isPublish:number
    updateTime:string
}
export const createNews=async (data:any)=>{
    return (await axios.post('/news',data)).data
}

export const getNews=async (userId:number)=>{
    return (await axios.get('/news?userId='+userId)).data
}
export const getNewsById=async (id:number)=>{
    return (await axios.get('/news/'+id)).data
}
export const updateNews=async (id:number,data:Partial<News>)=>{
    return (await axios.patch('/news/'+id,data)).data
}

export const deleteNews=async (id:number)=>{
    return (await axios.delete('/news/'+id)).data
}