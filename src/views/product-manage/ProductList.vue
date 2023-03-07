<template>
    <el-card>
        <template #header>
            <el-page-header icon="" title="新闻管理">
                <template #content>
                    <span class="text-large font-600 mr-3">新闻列表</span>
                </template>
            </el-page-header>
        </template>

        <!-- 表格部分 -->
        <el-table style="width:100%;" :data="data">
            <el-table-column class="my-title" label="标题" prop="title"></el-table-column>
            <el-table-column label="简要描述" prop="description">

            </el-table-column>
            <el-table-column width="180" label="更新时间">
                <template #default="colData">
                    {{ formatTime(colData.row.updateTime) }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template #default="colData">
                    <el-button type="primary" @click="handleEditorNews(colData.row.id)" :icon="Edit" circle />
                    <el-popconfirm confirm-button-type="danger" @confirm="deleteNewsHandler(colData.row.id)"
                        title="确定要删除该新闻吗?">
                        <template #reference>
                            <el-button type="danger" :icon="Delete" circle />
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script setup lang="ts">
import { deleteProduct, getProduct, type Product } from '@/api';
import { Delete, Edit, } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue';
import { formatTime } from '@/hooks/formatTime'
import { ElMessage } from 'element-plus';
import router from '@/router';

const data = ref<Product[]>([])

onMounted(async () => {
    data.value = (await getProduct()).data
})



//删除新闻
const deleteNewsHandler = async (id: number) => {
    const res = await deleteProduct(id)
    if (res.success) {
        data.value.splice(data.value.findIndex(item => item.id === id), 1)
        ElMessage.success('删除成功')
    }
}



//编辑新闻，跳转到新闻编辑页面进行处理
const handleEditorNews = (id: number) => {
    router.push('/product-manage/productEditor/' + id)
}
</script>

<style scoped>
/* 单行文本省略 */
:deep(.el-table td.el-table__cell div) {
    overflow: hidden;
    text-overflow: ellipsis;
    /* white-space: nowrap; */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

:deep(.indentContent img) {
    width: 100%;
}
</style>