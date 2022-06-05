<template>
    <div>
        <div class="nag">
             <div class="back" @click="$router.back()">
            <span class="iconfont icon-jiantou_xiangzuo"></span>
            <span class="ranklist">排行榜</span>
             </div>        
        </div>
         <div class="main">
            <el-table class="tbl" :data="Data">
             <el-table-column label="账号" prop="userid" ></el-table-column>
             <el-table-column label="名称" prop="username"></el-table-column>
             <el-table-column label="分数" prop="score"></el-table-column>
            </el-table>
         </div>
    </div>
</template>
<style lang="scss" scoped>
  .nag{
        padding: 7px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 0.8rem;
        border-bottom: 1px solid #ccc;
       img{
           border-radius: 50%;
           border: 1px solid #ccc;
           height: 0.8rem;
       }
       span{
           font-weight: 600;
           font-size: 20px;
       }
    }
  .ranklist {
    margin-left: 150px;
    font-size: 28px;
    font-weight: bold;
    padding-top: 20px;
  }
</style>