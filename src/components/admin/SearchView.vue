<template>
    <div>
        <div class="nag">
             <div class="back" @click="$router.back()">
            <span class="iconfont icon-jiantou_xiangzuo"></span>
             </div>        
        </div>
        <div class="main">
            <el-table class="tbl" :data="Data">
             <el-table-column label="编号" prop="userid" ></el-table-column>
             <el-table-column label="名称" prop="username"></el-table-column>
             <el-table-column label="身份" prop="status"></el-table-column>
             <el-table-column label="封禁" prop="baned"></el-table-column>
             <el-table-column label="编辑" > 
                <template slot-scope="scope">
                  <el-button @click="edit(scope.row.userid)" type="primary" size="mini">编辑</el-button>                      
                </template>
              </el-table-column>
            <el-table-column label="删除" > 
                <template slot-scope="scope">
                 <el-button @click="deleteRecord(scope.row.userid)" type="danger" size="mini">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
    <el-dialog
      title="编辑用户信息"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="80%">
      <section class="update">
        <el-form ref="form" :model="form" label-width="40px">
          <el-form-item label="名称">
            <el-input  name="name" v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input  name="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="身份">
            <el-input  name="status" v-model="form.status"></el-input>
          </el-form-item>
          <el-form-item label="封禁">
            <el-input  name="banded" v-model="form.baned"></el-input>
          </el-form-item>
        </el-form>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
    </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    inject:['reload'],
    data(){
        return{
            Data:[],
            form:{
                username:'',
                password:'',
                status:'',
                userid:'',
                baned:'',
            },
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
               url:`/api/findAll`,
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
    //退出
        exit(){
        this.$router.push({
            path:'/'
        })
        },
    //编辑
        edit(id){
            this.dialogVisible=true;
            this.$axios({
                url:`/api/searchuser/${id}`,
                method:'get',
                params:{
                id:id
            }
            }).then(res=>{
               // console.log(res);
                if(res.status==200){
                    this.form=res.data.data[0];
                   // console.log(this.form)
                }
            }) 
        },
    submit() { //提交修改后的用户信息
      this.dialogVisible = false
     // console.log(this.form)
      this.$axios({
        url: '/api/updateuser',
        method: 'put',
        data: {
          ...this.form
        }
         }).then(res => {
        if(res.status==200){
          this.$message({ //成功修改提示
            message: '更新成功',
            type: 'success'
          })
        }
        this.getUserInfo()
         })
        },
        handleClose(done) { //关闭提醒
      this.$confirm('确认关闭？',{
          customClass:"del-model",
      })
        .then(()=> {
          done();
        }).catch(()=> {});
        },

        deleteRecord(id){
            this.$confirm("确定删除?","删除提示",{
            confirmButtonText: '确定删除',
            cancelButtonText: '不删除',
            customClass:"del-model",
            type: 'danger'
        }).then(()=> { //确认删除
            this.$axios({
            url: `/api/delete/${id}`,
            method: 'delete',
            params:{
                id:id
            }
            }).then((res)=>{
            console.log(res)
            this.getUserInfo();
            this.reload()  
            })
        }).catch(() => {

        })
        },
    }
}
</script>
<style lang="scss">
.del-model {
  width: 80%;
  position: fixed;
  top:30%;
  left:12%;
}
</style>
<style lang="scss" scoped>
.nag{
        padding: 7px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 1.0rem;
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
        .iconfont{
                font-size: 00.6rem;
        }
    }
    .main{
       margin: 5px;

    }

</style>