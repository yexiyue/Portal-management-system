<template>
    <div style="border: 1px solid #ccc">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" />
        <Editor style=" height:300px;overflow-y: hidden;" v-model="value"  @onCreated="handleCreated" />
    </div>
</template>

<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { computed, onBeforeUnmount, ref, shallowRef } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

//进行数据双向绑定
const props=defineProps<{
    modelValue:string
}>()
const emit=defineEmits<{
    (event:'update:modelValue',newValue:string)
}>()

const value=computed({
    get(){
        return props.modelValue
    },
    set(newValue){
        emit('update:modelValue',newValue)
    }
})
const editorRef = shallowRef()

//组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    editorRef.value?.destroy()
})

const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}
</script>

<style scoped></style>