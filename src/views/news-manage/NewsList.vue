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
        <el-table style="width:100%;" :data="data"  >
            <el-table-column class="my-title" label="标题" prop="title"></el-table-column>
            <el-table-column label="分类">
                <template #default="colData">
                    <el-tag type="success">
                        {{ categoryFormat(colData.row.category) }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="作者">
                <template #default="colData">
                    <el-tag>
                        {{ colData.row.User.username }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="是否发布">
                <template #default="colData">
                    <el-switch :active-value="1" :inactive-value="0"
                        @change="publishNews(colData.row.id, colData.row.isPublish)" v-model="colData.row.isPublish" />
                </template>
            </el-table-column>
            <el-table-column width="180" label="更新时间">
                <template #default="colData">
                    {{ formatTime(colData.row.updateTime) }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template #default="colData">
                    <el-button type="warning" @click="handlePreviewNews(colData.row)" :icon="Star" circle />
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

    <!-- 新闻预览 -->
    <el-dialog v-model="dialogVisible" title="预览新闻" width="50%">
        <div>
            <h2  style="text-align: center;">{{ previewNews?.title }}</h2>
            <p style="font-size: 12px; color:#1296db;">
                {{ formatTime(previewNews?.updateTime!) }}
            </p>
            <el-divider>
                <el-icon><star-filled /></el-icon>
            </el-divider>
            <div class="indentContent" v-html="previewNews?.content" >
            </div>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import { deleteNews, getNews, updateNews, type News } from '@/api';
import { Delete, Edit, Star,StarFilled } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue';
import { formatTime } from '@/hooks/formatTime'
import { ElMessage } from 'element-plus';
import router from '@/router';
import { useIndexStore } from '@/stores/store';
const data = ref<News[]>([])
const dialogVisible = ref(false)
const store=useIndexStore()
onMounted(async () => {
    data.value = (await getNews(store.user.id)).data
})

//格式化分类信息
const categoryFormat = (category: number) => {
    switch (category) {
        case 1:
            return '最新动态'
        case 2:
            return '典型案例'
        case 3:
            return '通知公告'
        default:
            return '其他'
    }
}

//删除新闻
const deleteNewsHandler = async (id: number) => {
    const res = await deleteNews(id)
    if (res.success) {
        data.value.splice(data.value.findIndex(item => item.id === id), 1)
        ElMessage.success('删除成功')
    }
}

//发布新闻
const publishNews = async (id: number, isPublish: number) => {
    const res = await updateNews(id, {
        isPublish
    })
    data.value = (await getNews(store.user.id)).data
    if (res.success) {
        ElMessage.success('更新发布信息成功')
    }
}

const previewNews = ref<News>()
//预览新闻
const handlePreviewNews = (news: News) => {
    dialogVisible.value = true
    previewNews.value = news
}

//编辑新闻，跳转到新闻编辑页面进行处理
const handleEditorNews=(id:number)=>{
    router.push('/news-manage/newsEditor/'+id)
}
</script>

<style scoped>
/* 单行文本省略 */
:deep(.el-table td.el-table__cell div){
    overflow: hidden;
    text-overflow: ellipsis;
    /* white-space: nowrap; */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

:deep(.indentContent img){
    width: 100%;
}
</style>