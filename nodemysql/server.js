const express = require('express')
const bodyParser = require('body-parser')
const server = express()
const mysql = require("mysql");
server.use(bodyParser.json());
const cors = require('cors');
//Establish the database connection
server.use(cors());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "anglrcrud",
    port: 4000, // Update to match your configuration
});
  db.connect(function (error) {
    if (error) {
        console.error("Error Connecting to DB:", error.code, "-", error.message); // Log error details
    } else {
        console.log("Successfully Connected to DB");
    }
});
//Establish the Port
server.listen(8085,function check(error) {
    if (error) 
    {
        console.log("Error....dddd!!!!");
    }
    else 
    {
        console.log("Started....!!!! 8085");
    }
});

//Create the Records http://localhost:8085/api/student/add
server.post("/api/student/add", (req, res) => {
    let details = {
      sname: req.body.sname,
      course: req.body.course,
      fee: req.body.fee,
    };
    let sql = "INSERT INTO student SET ?";
    db.query(sql, details, (error) => {
      if (error) {
        res.send({ status: false, message: "Student created Failed" });
      } else {
        res.send({ status: true, message: "Student created successfully" });
      }
    });
  });
//view the Records

server.get("/api/student", (req, res) => {
    var sql = "SELECT * FROM student";
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
//Search the Records

server.get("/api/student/:id", (req, res) => {
    var studentid = req.params.id;
    var sql = "SELECT * FROM student WHERE id=" + studentid;
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
//Update the Records

server.put("/api/student/update/:id", (req, res) => {
    let sql =
      "UPDATE student SET sname='" +
      req.body.sname +
      "', course='" +
      req.body.course +
      "',fee='" +
      req.body.fee +
      "'  WHERE id=" +
      req.params.id;
  
    let a = db.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: "Student Updated Failed" });
      } else {
        res.send({ status: true, message: "Student Updated successfully" });
      }
    });
  });
  
  //Delete the Records

  server.delete("/api/student/delete/:id", (req, res) => {
    let sql = "DELETE FROM student WHERE id=" + req.params.id + "";
    let query = db.query(sql, (error) => {
      if (error) {
        res.send({ status: false, message: "Student Deleted Failed" });
      } else {
        res.send({ status: true, message: "Student Deleted successfully" });
      }
    });
  });

// new custom teacher table for practice
//   CREATE TABLE teacher (
//     id INT AUTO_INCREMENT PRIMARY KEY, -- Unique ID for each teacher
//     name VARCHAR(100) NOT NULL,        -- Teacher's name
//     email VARCHAR(150) UNIQUE,         -- Teacher's email address
//     phone VARCHAR(15),                 -- Teacher's phone number
//     subject VARCHAR(100)               -- Teacher's subject specialization
// );
// http://localhost:8085/api/teacher/add
server.post("/api/teacher/add", (req, res) => {
  let details = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    subject: req.body.subject,
  };
  let sql = "INSERT INTO teacher SET ?";
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: "Teacher created Failed" });
    } else {
      res.send({ status: true, message: "Teacher created successfully" });
    }
  });
});

server.get("/api/teacher", (req, res) => {
  var sql = "SELECT * FROM teacher";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});