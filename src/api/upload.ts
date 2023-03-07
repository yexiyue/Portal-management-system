import axios from 'axios'

export const uploadImg=async (file:File)=>{
    const formData=new FormData()
    formData.set('file',file)
    return await axios.post('/upload',formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}