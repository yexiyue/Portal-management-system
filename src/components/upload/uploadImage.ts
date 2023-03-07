import { ref } from "vue"
import { uploadImg } from '@/api';
export const useUploadImage=()=>{
    const imageFile=ref<File>()
    const onUpload=(e?:File)=>{
        imageFile.value=e
    }

    const getUploadedImageUrl=async()=>{
        if(imageFile.value){
            const imgRes = await uploadImg(imageFile.value)
            return '/images/' + imgRes.data.data
        }
    }

    return {
        onUpload,
        getUploadedImageUrl
    }
}