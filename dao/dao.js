let axios = require('axios');
let fs = require('fs');
let mysql =  require('mysql');
let somefunctions = require('../Controller/controller')
let getdatas = new somefunctions();

let uuid = require('uuid')


getdatas.deldata('userlist','blogs','473209e8-b9b8-4743-8f2e-1c337add30f6')