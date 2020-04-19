require('dotenv').config();
const crypto = require('crypto');
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB
});


// 變數格式範例 : 
// table = membertable
// form = {
//   username : "dennis",
//   pwd : "1234"  
// }

function login (table, form, cb) {

  var user_name = form[0].user_name;
  var en_pwd = encryption( form[0].pwd ) ;

  connection.query("SELECT * FROM "+ table +" WHERE username = "+ user_name +" AND pwd =  " + en_pwd  , function (error, results, fields) {
      if (error) throw error;
      cb(undefined,results)
    });
  }

function create_member(table, form, cb) {

  var user_name = form[0].user_name;
  var en_pwd = encryption( form[0].pwd ) ;
  
  connection.query("INSERT INTO "+table+" ( Mem_Name , Mem_Pwd ) VALUES ("+ user_name +","+ en_pwd +")", function (error, results, fields) {
    if (error) { 
      throw error; 
    }else{
      var res = "success"
      cb(undefined, res)
    }
  });
}

function encryption  ( pwd )  {
    var text = JSON.stringify(pwd);
    const hash = crypto.createHash('md5').update(text).digest('hex');
    return hash;
}

//Test :
// console.log(encryption(123));

module.exports = {
    login,
    create_member
  }