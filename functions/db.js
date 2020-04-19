require('dotenv').config();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB
});

// connection.connect();
// connection.end();

// var form = [{col:"name",value:"dennis"},{col:"age",value:2}]

function select_data(table,cb){
  // connection.connect();
  connection.query('SELECT * FROM ' + table, function (error, results, fields) {
    if (error) throw error;
    // console.log(results);
    cb(undefined,results)
  });
  // connection.end();
}

function insert_data(table, form, cb) {

  var res = sqlstr_insert(form);
  console.log(res);
  var str_col = res[0].str_col;
  var str_val = res[0].str_val;

  // connection.connect();
  connection.query("INSERT INTO "+table+" ("+ str_col +") VALUES ("+ str_val +")", function (error, results, fields) {
    if (error) { 
      throw error; 
    }else{
      var res = "success"
      cb(undefined, res)
    }
  });
  // connection.end();
}

function update_data(table, col_id , id, form , cb) {

  var str_val = sqlstr_update(form);

  // connection.connect();
  connection.query("UPDATE " + table +" SET "+ str_val +"  WHERE "+ col_id +" = " + id, function (error, results, fields) {
    if (error) { 
      throw error; 
    }else{
      var res = "success"
      cb(undefined, res)
    }
  });
  // connection.end();
}

function delete_data(table, col , id ,cb) {
  // connection.connect();
  connection.query("DELETE FROM " + table + " WHERE "+ col +"='" + id + "'", function (error, results, fields) {
    if (error) { 
      throw error; 
    }else{
      var res = "success"
      cb(undefined, res)
    }
  });
  // connection.end();
}



function sqlstr_insert( form ){
  var str_col = "";
  var str_val = "";
  for (let i = 0; i < form.length; i++) {
    var col = form[i].col;
    var value = form[i].value;
    var str_col = str_col + "," + col;
    var str_val = str_val + ",'" + value + "'";
  }
  var str_col = str_col.substr(1);
  var str_val = str_val.substr(1);

  return [{"str_col" : str_col , "str_val" : str_val}];
};

function sqlstr_update(form){
  var str_val = "";
  for (let i = 0; i < form.length; i++) {
    var col = form[i].col;
    var value = form[i].value;
    var str_val = str_val + ", "+ col +" = '" + value + "'";
  }
  var str_val = str_val.substr(1);
  // console.log(str_val.substr(1))
  return str_val;

}

module.exports = {
  select_data,
  insert_data,
  update_data,
  delete_data
}