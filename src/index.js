const express = require('express')
const mysql = require('mysql');

const app = express()
const port = 3000
const cors = require('cors');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Class'
  })
  

app.use(cors(),express.json(),express.urlencoded({extended:false}))
app.get('/',   (req, res) => res.send('Hello World!'))

app.get("/users",(req,res)=>{
    const qurey = "SELECT * FROM `Student`";
    const createTableQuery = "CREATE TABLE Student (id int NOT NULL AUTO_INCREMENT,name varchar(255),age int(3),clas varchar(10),  PRIMARY KEY (id)  )";
    const createUserQuery = `INSERT INTO Student VALUES (NULL,'Goutom','25','CSE');`
    db.query(qurey,(err,data)=>{
        if(err) return res.status(404).json({
            status: false,
            err: err});
        return res.status(200).json({
            status: true,
            students: data});
    })

})

app.post("/user",express.json(),express.urlencoded({extended:false}),(req,res)=>{
const name = req.body["name"];
const age = req.body["age"];
const cls = req.body["class"];


const createUserQuery = `INSERT INTO Student VALUES (NULL,"${name}",'${age}','${cls}')`;
// if(name&&age&&cls){
 
    db.query(createUserQuery,(err,data)=>{
        if(err) return res.status(404).json({
            status: false,
            err: err});
        return res.status(200).json({
            status: true,
            students: data});
    });
// }
// else{
//     res.json({status:false,data:"error"})
// }

})
app.listen(port, () => console.log(`http://localhost:${port}!`))