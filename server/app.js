var express=require('express')
var app=express();
var connection=require("./mysql")
var router=require("./routers");
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/',router);

connection.connect((err)=>{
    if(err)throw err;
    console.log("--[connected to database successfully]--")
});
app.listen(8888,()=>{
    console.log("--[Server started successfully] at port: 8888--")
})

