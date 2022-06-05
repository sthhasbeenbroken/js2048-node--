//sql
var sqlMap={
    user:{
        login:'select * from userinfo where userid=? and password=?',
        findAll:'select * from userinfo',
        insertuser:"insert into userinfo (userid,username,password,status,baned,score) values(?,?,?,?,?,?)",
        updateuser:"update userinfo set username=?,status=?,password=?,baned=? where userid=?",
        deleteuser:"delete from userinfo where userid = ?",
        searchuser:"select * from userinfo where userid=?",
        rank:"SELECT * FROM userinfo WHERE status= 'user' ORDER BY score",
        updatescore:"update userinfo set score=? where userid=?",
    }
}
module.exports=sqlMap;