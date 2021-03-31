const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  user: "root",
  host: "127.0.0.1",
  password: "kroot2021",
  database: "employeeSYSDB",
});

//--------------API END POINTS-----------------------
//To create an API end point here (using express) we use app.post(), app.get()...etc....

app.post("/create", (req, res) => {
  const name = req.body.empName;
  const age = req.body.empAge;
  const country = req.body.empCountry;
  const position = req.body.empPosition;
  const year = req.body.empYear;

  db.query(
    "INSERT INTO Employee(empName,age,country,position,year) VALUES (?,?,?,?,?)",
    [name, age, country, position, year],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Employee saved sucessfully.!");
      }
    }
  );
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM Employee", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//Update the year of an employee
app.put("/update", (req, res) => {
  const id = req.body.employeeID;
  const newyear = req.body.empYear;

  console.log(id);
  console.log(newyear);
  db.query(
    "UPDATE Employee SET year=? WHERE employeeID =?",
    [newyear,id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//Delete an employee from DB
app.delete("/delete/:empID",(req,res)=>{
  console.log(req.params);
  const delempID = req.params.empID;
  
  db.query('DELETE FROM Employee WHERE employeeID=?',[delempID],(err,result)=>{
    if(err){
      console.log(err);
    }else{
      res.send(result);
    }
  });

});




app.listen(3001, () => {
  console.log("Server is running.");
});
