import axios from "axios";

export const getPageView=async(day:number=7)=>{
    return (await axios.get('/sdk/page-view?day='+day)).data
}

export const getNewsCount=async()=>{
    return (await axios.get('/sdk/news/category')).data
}

export const getEveryPageView=async(day:number=7)=>{
    return (await axios.get('/sdk/every-page-view?day='+day)).data
}

export const getUserPageView=async(day:number=7)=>{
    return (await axios.get('/sdk/user-page-view?day='+day)).data
}

export const getPerformanceTarget=async()=>{
    return (await axios.get('/sdk/performance-target')).data
}