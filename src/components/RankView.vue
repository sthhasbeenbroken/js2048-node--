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
            <el-table-column  type="index" align="center" :resizable="false" label="名次" width="80">
                <template slot-scope="scope">
                      <span v-if="scope.$index+1 ==1"><img class="manImg" src="../assets/champion.png" style="width:48px;height:48px"></span>
                      <span v-else-if="scope.$index+1 ==2"><img class="manImg" src="../assets/runner-up2.png" style="width:48px;height:48px"> </span>
                      <span v-else-if="scope.$index+1 ==3"><img class="manImg" src="../assets/thrid.png" style="width:48px;height:48px"> </span>
                      <span v-else class="no">{{scope.$index+1}} </span>
                  </template>
            </el-table-column> 
             <el-table-column label="头像" class="photo">
            <template slot-scope="scope">
          <img class="manImg" :src=scope.row.profilephoto style="width:48px;height:48px;border-radius:50%">
            </template>
            </el-table-column>
             <el-table-column label="账号" prop="userid" ></el-table-column>
             <el-table-column label="名称" prop="username"></el-table-column>
             <el-table-column label="分数" prop="score"></el-table-column>
            </el-table>
         </div>
    </div>
</template>
<script>
export default {
     data(){
        return{
            Data:[],
            dialogVisible: false,
        }
    },
    created(){
           this.getUserInfo();
       }

    ,
    methods:{
        getUserInfo(){
            this.$axios({
               url:`/api/rank`,
               method:'get',
               data:{
                   ...this.Data
               }
           }).then(res=>{               
               let resData = res.data
               //for(let i=0;i<resData.msg.length;i++)
               this.Data=(resData.msg)
           // console.log(this.Data)
           }).catch(function(err){
               console.log("连接失败",err)
           })
        },
}
}
</script>
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