//DB와 연결되어진 통로 정보를 가지고 있는 파일

const mysql = require('mysql2')

const db_info = {
    //mysql 주소
    host : "localhost",
    user : "root",
    password : "12345",
    port : "3306",
    database : "node_study"
}


module.exports = mysql.createConnection(db_info)
