var express=require('express');
var bodyParser = require('body-parser');
var routers=express.Router();
const { query } = require('./mysql');
var connection=require('./mysql');
var $sql=require('./sqlMap')
/**登录 */
routers.post("/login",(req,res)=>{
      let id = req.body.userid;
      let password = req.body.password;
      let sql=$sql.user.login;
      console.log(req.body)
      //console.log(sql);
      connection.query(sql,[id,password],(err,result,filed)=>{
          if(err){
              return "Fail";
          }else{
          var dataString = JSON.stringify(result);
          var data=JSON.parse(dataString);
          console.log(data)
          res.json({
              msg:data
          })
          }
      })
  })
//   查询全员
routers.get("/findAll",(req,res)=>{
  let sql =$sql.user.findAll;
  //console.log(sql);
  connection.query(sql,(err,result,filed)=>{
      if(err){
          return "Fail";
      }else{
      var dataString = JSON.stringify(result);
      var data=JSON.parse(dataString);
      res.json({
          msg:data
      })
      }
  })
})
//查询
routers.get("/searchuser/:id",(req,res)=>{
    let sql =$sql.user.searchuser;
    let id=req.params.id
    console.log(id)
    connection.query(sql,[id],(err,result,filed)=>{
        if(err){
            return "Fail";
        }else{
        var dataString = JSON.stringify(result);
        var data=JSON.parse(dataString);
        res.json({
            data:data
        })
        }
    })
  })
//新增
routers.post(`/insert`,(req,res)=>{
    let sql =$sql.user.insertuser;
    let id =req.body.userid
    let name=req.body.username
    let password = req.body.password
    let status=req.body.status
    let baned=req.body.baned
    let score =req.body.score
    console.log(req.body)
    connection.query(sql,[id,name,password,status,baned,score],(err,result,filed)=>{
        if(err){
            return 'insert Fail'
        }
        else{
            res.json(result)
        }
    })
  })
// 删除
routers.delete(`/delete/:id`,(req,res)=>{
    let id=req.params.id;
    //console.log(id)
    let sql =$sql.user.deleteuser;
    connection.query(sql,id,(err,result,filed)=>{
        if(err){
            return "Fail";
        }
        else{
            //console.log(result)
            res.json(result)
        }

    })
})
//修改
routers.put(`/updateuser`,(req,res)=>{
    let id =req.body.userid
    let name=req.body.username
    let password = req.body.password
    let status=req.body.status
    let baned=req.body.baned
    console.log(req.body)
    let sql = $sql.user.updateuser;
    console.log(sql)
    connection.query(sql,[name,status,password,baned,id],(err,result,filed)=>{
        if(err){
            return 'update Fail'
        }
        else{
            res.json(result)
        }
    })
})
//更新分数
routers.put(`/updatescore`,(req,res)=>{
    let id =req.body.id;
    let score=req.body.score;
    let sql = $sql.user.updatescore;
    console.log(req.body)
    connection.query(sql,[score,id],(err,result,filed)=>{
        if(err){
            return 'update Fail'
        }
        else{
            res.json(result)
        }
    })
})
//换头像
routers.post(`/updateimg`,(req,res)=>{
    let id =req.body.userid;
    let profilephoto=req.body.profilephoto;
    let sql = $sql.user.updateimg;
    console.log(req.body)
    console.log(id)
    console.log(profilephoto)
    connection.query(sql,[profilephoto,id],(err,result,filed)=>{
        if(err){
            return 'update Fail'
        }
        else{
            res.json(result)
        }
    })
})
//rank
routers.get(`/rank`,(req,res)=>{
    let sql = $sql.user.rank;
    connection.query(sql,(err,result,filed)=>{
       // console.log(result)
        if(err){
            return "RankFail";
        }else{
        var dataString = JSON.stringify(result);
        var data=JSON.parse(dataString);
        
        res.json({
            msg:data
        })
        }
    })
})
module.exports=routers;