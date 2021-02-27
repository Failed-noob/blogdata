var express = require('express');
 var router = express.Router();
 let mysql =  require('mysql');
let somefunctions = require('../Controller/controller')
let uuid = require('uuid');
const { get } = require('.');
let getdatas = new somefunctions();


/* GET users listing. */
 router.post('/', function(req, res, next) {
    (async ()=>{
      let arr=[];
      let data = await getdatas.findAll('users');
      data.forEach(item=>{
      arr.push(item.username)
       if(item.username == req.query.uname&&item.password==req.query.pad) res.send({loginOK:true});
       else if(item.username == req.query.uname&&item.password!=req.query.pad) res.send({isRegister:true})
      })
     if(arr.indexOf(req.query.uname)==-1){
       getdatas.writeusersData('users',uuid.v4(),req.query.uname,req.query.pad)
     }
    })()
    
 });
router.get('/other',(req,res)=>{
   res.send('xxxxxx');
   res.end();
 })
 module.exports = router;
