<template>
    <div class="admin">
        <div class="nag">
            <img :src="this.user.profilephoto" @click="showSetting()">
                        
            <transition name="fade">
            <div class="out" ref="out" v-show="login_flag">
                    
                <el-upload class="avatar-uploader"
                 action="#"
                :show-file-list="false" :on-success="handleAvatarSuccess" 
                name="img"
                 :http-request="uploadImage">
                <el-button type="primary" @click="teainfo">修改头像</el-button>
                </el-upload>
                    
              
            </div>

          </transition>
            <span>{{this.user.username}}</span>
            <el-button round size="small" @click="exit">退出</el-button>
        </div>
        <div class="main">
          <div class="search" @click="to2048">
              2048
          </div>
          <div class="rank" @click="torank">
              排
          </div>
          <!-- <div class="other">
              無
          </div> -->
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            upload_name:'',
            upload_url:'',
            user:{
                username:null,
                userid:null,
                profilephoto:'',
            },
            login_flag: false,
        }
    },
    created() {
      this.getUserInfo()
    },
    methods:{
        getUserInfo() { //获取用户信息
        let userName = this.$cookies.get("cname")
        let userId = this.$cookies.get("cid")
        let profilephoto=this.$cookies.get("profilephoto")
        this.user.username = userName
        this.user.userid = userId
        this.user.profilephoto=profilephoto
        console.log(this.user.profilephoto);
        },
        to2048(){
           this.$router.push({
               path:'/2048'
           })
       },
       torank(){
           this.$router.push({
               path:'/rank'
           })
       },
       showSetting() {
      this.login_flag = !this.login_flag
       },
        exit(){
        this.$router.push({
            path:'/'
        })
        },
        // 上传图片方法
    uploadImage(param){
      //const formData = new FormData()
     // formData.append('file', param.file)
      console.log(param.file)
      this.user.profilephoto=param.file.name;
      console.log(this.user.profilephoto)
      this.$axios({
               url:`/api/updateimg`,
               method:'post',
               data:{
                   ...this.user
               }
         }).then(response => {
             console.log(response)
        console.log('上传图片成功')
      })
    },
     
        teainfo(){
            this.$axios({
               url:`/api/updateimg`,
               method:'post',
               data:{
                   ...this.user
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
        handleAvatarSuccess(res) {
            console.log(res);
            this.profilephoto=res.data.path
        this.$message({
          showClose: true,
          message: '修改成功',
          type:"success"
        });
        setTimeout(() => {
          location.reload()
        }, 2000);
      },
      
    },
}
</script>
<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.admin{
    height: 7.5rem;
    margin: 0;
    width: 100%;
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
       .out{
           padding: 10px 0px 10px 10px;
           width: 70px;
           height: 20px;
           display: flex;
           left: 10px;
           top: 64px;
           position: fixed;
           border: solid 1px #eee;
           color: white;
           border-radius: 30%;
       }
    }
    .main{
        margin-top: 30px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-wrap: wrap;
        text-align: center;
        .search{
            margin-left: 10px;
            display: flex;
            text-align: center;
            justify-content: center;
            flex-direction: column;
            margin-top: 10px;
            width: 35%;
            height: 130px;
            font-size: 26px;
            font-weight: 600;
            color: white;
            border-radius: 20%;
            background-image: linear-gradient(to right top, #63B8FF,#9966CC);
        }
        .rank{
            margin-left: 10px;
            display: flex;
            text-align: center;
            justify-content: center;
            flex-direction: column;            
             margin-top: 20px;
             width: 35%;
             height: 130px;
             font-size: 26px;
            font-weight: 600;
            color: white;
            border-radius: 20%;
            background-image: linear-gradient(to right top,#54FF9F,#FFFF99);
        }
        .other{
            margin-right: 10px;
            display: flex;
            text-align: center;
            justify-content: center;
            flex-direction: column;            
             margin-top: 20px;
             width: 35%;
             height: 130px;
             font-size: 26px;
            font-weight: 600;
            color: white;
            border-radius: 20%;
            background-image: linear-gradient(to right top, #6cdbeb,#FF66CC);
        }

    }
}

</style>
