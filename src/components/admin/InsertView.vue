<!-- 添加教师 -->
<template>
<div>
    <div class="nag">
             <div class="back" @click="$router.back()">
            <span class="iconfont icon-jiantou_xiangzuo"></span>
             </div>        
    </div>
  <section class="add">
    <el-form ref="form" :model="form" label-width="70px">
      <el-form-item label="账号">
            <el-input v-model="form.userid"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="用户等级">
            <el-input v-model="form.status" placeholder="admin or user"></el-input>
          </el-form-item>
          <el-form-item label="初始密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="封禁">
            <el-input v-model="form.baned" placeholder="true or false"></el-input>
          </el-form-item>
          <el-form-item label="分数">
            <el-input v-model="form.score" placeholder="0"></el-input>
          </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">确定</el-button>
        <el-button type="text" @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</div>
</template>

<script>
export default {
  data() {
    return {
      form: { //表单数据初始化
        userid:'',
        username:'',
        password:'',
        status:'',
        baned:'',
        score:'',
      }
    };
  },
  methods: {
    onSubmit() {
        console.log(this.form.userid) 
    this.$axios({
        url:`/api/searchuser/${this.form.userid}`,
        method:'get',
                params:{
                id:this.form.userid
            }
        }).then(res1=>{//数据提交
       if(res1.data.data.length!=0){
        this.$message({
            message: '已存在账号，请修改',
            type: 'error'
          })
       }

      else{
          this.$axios({
        url: '/api/insert',
        method: 'post',
        data: {
          ...this.form
        }
      }).then(res => {
          console.log(res.data)
        if(res.data.affectedRows) {
          this.$message({
            message: '用户添加成功',
            type: 'success'
          })
          this.$router.push({path: '/admin'})
          } 
          })
        }
     })
     
    },
    cancel() { //取消按钮
      this.form = {}
    },
    
  }
};
</script>
<style lang="scss" scoped>
.add {
    width: 370px;
   height: calc(88%); //动态计算长度值
   overflow-y:scroll;
   overflow-x:scroll;
 margin-left: 16px;
 margin-right: 16px;
 margin-top: 26px;
 .el-input{
   width: 260px;
 }
}
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

