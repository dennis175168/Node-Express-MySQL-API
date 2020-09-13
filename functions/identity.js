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

  var user_name = form[0].username;
  var en_pwd = encryption( form[0].pwd ) ;

  connection.query("SELECT * FROM "+ table +" WHERE Company_Name = '"+ user_name +"' AND Password =  '" + en_pwd +"'" , function (error, results, fields) {
      if (error) {
        // throw error;
        cb(undefined, { error: error });
      } else {
        cb(undefined, results);
      }
    });
  }

function create_member(table, form, cb) {

  var user_name = form[0].username;
  var en_pwd = encryption( form[0].pwd ) ;
  
  connection.query("INSERT INTO " + table +" ( Company_Name , Password ) VALUES ('"+ user_name +"','"+ en_pwd +"')", function (error, results, fields) {
    if (error) { 
      // throw error;
      cb(undefined, { error: error });
    }else{
      var res = "success"
      cb(undefined, res)
    }
  });
}

function login_admin(table, form, cb) {

  var user_name = form[0].username;
  var en_pwd = encryption(form[0].pwd);

  connection.query("SELECT * FROM " + table + " WHERE Admin_Name = '" + user_name + "' AND Password =  '" + en_pwd + "'", function (error, results, fields) {
    if (error) {
      // throw error;
      cb(undefined, { error: error });
    } else {
      cb(undefined, results);
    }
  });
}

function create_admin(table, form, cb) {

  var user_name = form[0].username;
  var en_pwd = encryption(form[0].pwd);
  var user_mail = form[0].mail;

  connection.query("INSERT INTO " + table + " ( Admin_Name ,Admin_Email , Password ,Global_Admin) VALUES ('" + user_name + "','" + user_mail +"','" + en_pwd + "','"+ "Yes" +"')", function (error, results, fields) {
    if (error) {
      // throw error;
      cb(undefined, { error: error });
    } else {
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
    create_member,
    create_admin,
    login_admin
  }