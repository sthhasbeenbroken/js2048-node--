<template>
    <div class="login">
    <el-form  class="contain" style="margin-left:29px;margin-top:50px">
        <div class="top" style="font-size:24px">登录</div>
        <el-form-item label="账号" label-width="60px">
        <el-input name="id" style="width:240px" placeholder="请输入账号" v-model="loginData.userid" type="text">
        </el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="60px">
        <el-input name="pwd" style="width:240px" placeholder="请输入密码" type="password" v-model="loginData.password">
        </el-input>
        </el-form-item>
        <el-button class="btn" @click="Login" type="primary">Login</el-button>
    </el-form>
    <div v-for="(item,index) in arr" :key="index">{{item}}</div>
    </div>
</template>
<script>
export default {
   data(){
       return{
           loginData:{
               userid:'',
               password:'',
           },
           regData:{

           },
           arr:[],
       }
   },
   methods:{
       Login:function(){
           this.$axios({
               url:`/api/login`,
               method:'post',
               data:{
                   ...this.loginData
               }
           }).then(res=>{               
               let resData = res.data
               if(resData.msg.length!=0){
                   console.log(resData.msg[0].status)
                   switch(resData.msg[0].status){
                      case "admin":
                        this.$cookies.set("cname", resData.msg[0].username)
                        this.$cookies.set("cid", resData.msg[0].userid)
                        this.$cookies.set("role",resData.msg[0].status)
                        this.$router.push({
                        path:'/admin'})
                      break
                      case "user":
                        this.$cookies.set("cname", resData.msg[0].username)
                        this.$cookies.set("cid", resData.msg[0].userid)
                        this.$cookies.set("role",resData.msg[0].status)
                        this.$cookies.set('score',resData.msg[0].score)
                        this.$router.push({
                        path:'/user'})
                      break

                   }              
                   console.log("连接成功")
               }else{
                   this.$message({
                       showClose:true,
                       type:'error',
                       message:'请检查您的用户名与密码',
                   })
               }
            console.log(resData)
           }).catch(function(err){
               console.log("连接失败",err)

           })
       }
   },
   
}
</script>
<style lang="scss" scoped>
    .login{
        padding: 0;
        align-items: center;
        display: flex;
        .contain{
            width: 100%;
            .top{
                margin-left: 140px;
               margin-bottom: 35px;
            }
            .btn{
                margin-left: 120px;
            }

        }
    }
</style>