import { getImgCode } from "@/api/userApi";
import { onMounted, ref } from "vue";

export const useGetImgCode=()=>{
    const imgCode=ref()
    const refreshImgCode=async ()=>{
        const res=await getImgCode()
        imgCode.value=res
    }

    onMounted(async ()=>{
        await refreshImgCode()
    })

    return {
        imgCode,
        refreshImgCode
    }
}