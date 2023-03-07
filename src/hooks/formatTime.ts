export const formatTime=(time:string)=>{
    return (new Date(time)).toLocaleString('zh-cn',{
        month:'long',
        day:'numeric',
        year:'numeric',
        hour:'2-digit',
        minute:'2-digit'
    })
}