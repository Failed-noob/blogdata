let axios =require('axios');
let mysql =  require('mysql');
let uuid = require('uuid')
module.exports=somefunctions = class  {
  constructor(){
    //连接数据库
    this.db = mysql.createConnection({
      host:"localhost",
      user:"root",
      password:"123456",
      database:"userList"
    });
    this.table = 'users'
    this.random = uuid.v4();
    this.queryData = `SELECT * FROM ${this.table}`;
    this.insertData = `INSERT INTO ${this.table} SET id='${this.random}',username="hello",password="456123"`;
  };
//上面constructor中的内容在继承的时候 

  //创建数据库
// let sql = "CREATE DATABASE nodetest";
// db.query(sql,(err,result)=>{
  // if(err)console.log(err,"<----- error");
  // else console.log(result,'<---result','create successfully!!');
// })
  createDatabase(databaseName){
    return new Promise((resolve,reject)=>{
      this.db.query(`CREATE DATABASE ${databaseName}`,(err,result)=>{
        if(err)console.log(err,"<----- error");
        else console.log(result,'<---result','create successfully!!');
      })
    })
  };
  //获取数据
  getdata(url,mode){
    return new Promise((resolve, reject) => {
      resolve(axios({
        method:mode,
        url,
      }));
      reject('失败')
    })
  };
   //判断数据库是否连接
   judegeConnectStatus(){
    this.db.connect((err,result)=>{
      if(err) throw err;
      else console.log(result,'<---result','connect successfully!!');
    })
  };

  //updateSql = 'UPDATE user set name= ? where id = ?';
  //SELECT * FROM ${TABLENAME limit 3,4 ---> 代表的是从索引为3 即第四个开始 检索四个并返回
  //查找所有数据
  findAll(TABLENAME){
    return new Promise((resolve, reject) => {
       this.db.query(`SELECT * FROM ${TABLENAME} `,(err,result)=>{
        if(err) throw err;
        else resolve(result);
      });
    })
   
  }
  //插入数据
  writeusersData(table,id,username,password){
    //两种插入方式都可以;
    // let sql = `INSERT INTO ${table} (id,username,password) VALUES ('${id}','${username}','${password}')`;
    let sql = `INSERT INTO ${table} SET id='${id}',username='${username}',password='${password}'`;
    this.db.query(sql,(err,result)=>{
      if(err) console.log(err);
      else console.log(result,'<---result','insert successfully!!');
    })
    // console.log(`--'${table}'---'${id}'---'${username}'----'${password}'`,this);
  };
  //插入blog数据
  writeblogData(table,id,theme,context){
    let sql = `INSERT INTO ${table} SET id='${id}',theme='${theme}',context='${context}',datetime='${new Date().toLocaleTimeString()}'`;
    this.db.query(sql,(err,result)=>{
      if(err) console.log(err);
      else console.log(result,'<---result','insert successfully!!');
    })
  };
  //删除数据
  deldata(DATABASENAME,TABLENAME,id){
    return new Promise((resolve, reject) => {
      this.db.query(`DELETE FROM ${DATABASENAME}.${TABLENAME} WHERE id='${id}'`,(err,result)=>{
        if(err) console.log(err);
        else console.log(result,'<---result','delete successfully!!');
      })
    })  
  }
}
