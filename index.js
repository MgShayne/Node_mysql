const mysql = require('mysql')
const express = require('express')
const app = express()
const bodyparser = require('body-parser')

app.use(bodyparser.json())

let mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mgshein1101995',
    database: 'EmployeeDB',
    multipleStatements: true // enables multiple query statements
})

mysqlConnection.connect((err)=>{
    if(!err) console.log('DB connection succeeded.')
    else console.log('DB connection failed\n Error: '+JSON.stringify(err,undefined,2))
})

// run following query in mysql workbench to connect with node
// query======ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
// root = username
// password = db_password

app.listen(3000,()=>console.log('Express server is running at port no : 3000'))

//get All employees
app.get('/api/employees',(req,res)=>{
    mysqlConnection.query('Select * from employee',(err,rows,fields)=>{
        if(!err) res.send(rows)
        else console.log(err)
    })
})

//get an employee
app.get('/api/employees/:id',(req,res) =>{
    mysqlConnection.query('Select * from employee where EmpID = ?',[req.params.id],(err,row,fields) =>{
        if(!err) res.send(row)
        else console.log(err)
    })
})

//delete an employee
app.delete('/api/employees/:id',(req,res) =>{
    mysqlConnection.query('Delete from Employee where EmpID=?',[req.params.id],(err,row,fields) =>{
        if(!err) res.send('Deleted successfully')
        else console.log(err)
    })
})

//insert an employee with store procedure
// app.post('/api/employees',(req,res) =>{
//     let emp= req.body
//     var sql = "Set @EmpID = ?;Set @Name = ?;Set @EmpCode = ?;Set @Salary=?;\
//     Call EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);"
//     mysqlConnection.query(sql,[emp.EmpID,emp.Name,emp.EmpCode,emp.Salary],(err,rows,fields) =>{
//         if(!err) 
//             rows.forEach(element => {
//                 if(element.constructor == Array)
//                 res.send('Inserted employee id: '+element[0].EmpID)
//             })
//         else console.log(err)
//     })
// })

//insert an employee 
app.post('/api/employees',(req,res) =>{
    let emp = req.body
    let sql = "Insert into Employee values (?,?,?,?)"
    mysqlConnection.query(sql,[emp.EmpID,emp.Name,emp.EmpCode,emp.Salary],(err,rows,fields)=>{
        if(!err){
            res.send('Successfully inserted')
        }
        else console.log(err)
    })
})

//update an employee
app.put('/api/employees',(req,res) =>{
    let emp= req.body
    var sql = "Set @EmpID = ?;Set @Name = ?;Set @EmpCode = ?;Set @Salary=?;\
    Call EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);"
    mysqlConnection.query(sql,[emp.EmpID,emp.Name,emp.EmpCode,emp.Salary],(err,rows,fields) =>{
        if(!err) 
            res.send('Updated successfully')
        else console.log(err)
    })
})