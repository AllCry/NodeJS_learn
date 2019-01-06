var mysql      = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'wjdekdns',
  database : 'o2'
});

conn.connect();
//select 하는 방법
/*
var sql='select * from topic';
conn.query(sql, function(err, rows, fields){
    if(err){
        console.log(err);
    } else{
        for(var i=0;i<rows.length;i++){
            console.log(rows[i].title);
        }
        
    }

});
*/

//insert하는 방법 (params를 이용해서 치환적용해주면 보안상에도 좋다)
/*var sql='insert into topic(title, description, author) values(?,?,?)';
var params=['supervisor', 'watcher', 'graphittie']
conn.query(sql, params,  function(err, rows, fields){
    if(err){
        console.log(err);
    } else {
        console.log(rows);
    }
})*/

//update하는 방법
/*var sql='UPDATE topic SET title=?, description=? WHERE id=? ';
var params=['npm', 'niche', '2']
conn.query(sql, params,  function(err, rows, fields){
    if(err){
        console.log(err);
    } else {
        console.log(rows);
    }
})
*/

var sql='DELETE from topic WHERE id=? ';
var params=['2']
conn.query(sql, params,  function(err, rows, fields){
    if(err){
        console.log(err);
    } else {
        console.log(rows);
    }
})
conn.end();

// conn.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[1].solution);
//   });
  
//   conn.end();