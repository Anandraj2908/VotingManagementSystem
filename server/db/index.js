import mysql from "mysql";

const db= mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'',
    database:'plantsdb'
})

db.connect(function(err) {
    if(err) {
        console.log("connection error")
    } else {
        console.log("Connected")
    }
})

export default db;