//sql
var sqlMap={
    user:{
        login:'select * from userinfo where userid=? and password=?',
        findAll:'select * from userinfo',
        insertuser:"",
        updateuser:"update userinfo set username=?,status=?,password=?,baned=? where userid=?",
        deleteuser:"delete from userinfo where userid = ?",
        searchuser:"select * from userinfo where userid=?",
        rank:"",
        updatescore:"update userinfo set score=? where userid=?",
    }
}
module.exports=sqlMap;