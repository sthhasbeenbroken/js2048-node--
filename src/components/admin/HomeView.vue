<template>
    <div class="admin">
        <div class="nag">
            <img src="@/assets/logo.png">
            <span>{{this.user.username}}</span>
            <el-button round size="small" @click="exit">退出</el-button>
        </div>
        <div class="main">
          <div class="search" @click="tosearch">
              查
          </div>
          <div class="insert">
              增
          </div>
          <div class="rank">
              排
          </div>

        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            user:{
                username:null,
                userid:null,
            }
        }
    },
    created() {
      this.getUserInfo()
    },
    methods:{
        getUserInfo() { //获取用户信息
        let userName = this.$cookies.get("cname")
        let userId = this.$cookies.get("cid")
        this.user.username = userName
        this.user.userid = userId
        //console.log(this.user);
        },
        tosearch(){
           this.$router.push({
               path:'/search'
           })
       },
        exit(){
        this.$router.push({
            path:'/'
        })
        }
    },
}
</script>
<style lang="scss" scoped>
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
        .insert{
             margin-right: 10px;
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
             background-image: linear-gradient(to right top,  #9B30FF, #6cdbeb);
        }
        .update{
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
           background-image: linear-gradient(to right top,  #9900CC,  #FFCCCC);
        }

        .delete{
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
            background-image: linear-gradient(to right top, #6cdbeb,#000066);
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