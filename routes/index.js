var express = require('express');
var router = express.Router();
let mysql =  require('mysql');
let uuid = require('uuid')
let axios =require('axios');
let somefunctions = require('../Controller/controller');
const { query } = require('express');
let getdatas = new somefunctions();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{title:'node'})


});

router.post('/addblog',(req,res)=>{
  getdatas.writeblogData('blogs',uuid.v4(),req.query.theme,req.query.context);
  res.send({addOK:true})
  res.end();
})
router.get('/blogs',(req,res)=>{
  (async ()=>{
    let data =await getdatas.findAll('blogs');
    data= JSON.stringify(data);
    res.send(data);
    res.end();
  })()
})
router.get('/delblog',(req,res)=>{
  (async ()=>{
    getdatas.deldata('userlist','blogs',req.query.id)
    let data =await getdatas.findAll('blogs');
    data= JSON.stringify(data);
    res.send(data);
    res.end();
  })()
})
module.exports = router;
