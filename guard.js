const express = require('express');
const router = express.Router()
const mysql = require("mysql2")
require('dotenv').config();
const db = mysql.createConnection(process.env.DATABASE_URL)
// get role user
router.get("/roleuser/:email", (req, res) => {
    var email = req.params.email.substring(1);
    let sql = `SELECT role.name_role
    FROM user
    INNER JOIN role ON user.role_idrole = role.idrole WHERE user.email ="${email}"`;
    db.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: "Error fetching user role" });
      } else {
        if (result.length > 0) {
          const roleName = result[0].name_role;
          res.send({ status: true, message: "User role fetched successfully", roleName });
        } else {
          res.send({ status: false, message: "User not found" });
        }
      }
    });
});
 
// canaccess
router.get("/accessrole/:role", (req, res) => {
    var role = req.params.role.substring(1);
    // var column = req.params.column.substring(1);
    let sql = `SELECT *
    FROM roleaccess
    INNER JOIN role ON roleaccess.role_idrole=role.idrole WHERE role.name_role="${role}"`;
    db.query(sql, (error, result) => {
      if (error) {
        res.send({ status: false, message: "Error fetching user role" });
      } else {
        if (result.length > 0) {
          const access = result;
          // console.log(access)
          res.send({ status: true, message: "User accessrole fetched successfully", access });
            
            
        } else {
          res.send({ status: false, message: "User not found" });
        }
      }
    });
});
 
router.get("/myproject/:email", (req, res) => {
  var email = req.params.email.substring(1);
  let sql = `SELECT * FROM project_team
  INNER JOIN user ON user.iduser =project_team.student_idstudent WHERE user.email="${email}"`;
  db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Error fetching user role" });
    } else {
      if (result.length > 0) {
        var setresult= [];
        for(let i of result){
          var iditem= i.Project_idProject;
          setresult.push(iditem);
        }
        res.send({ status: true, message: "User role fetched successfully", setresult});
      } else {
        res.send({ status: false, message: "User not found" });
      }
    }
  });
});
 
// emailmatchid
router.get("/emailmatchid/:email", (req, res) => {
  var email = req.params.email.substring(1);
  // var iduser =req.params.iduser
  let sql = `SELECT user.iduser, user.email FROM user where user.email="${email}"`;
  db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Error fetching user role" });
    } else {
      if (result.length > 0) {
        const match = result[0].iduser;
        // console.log(access)
        res.send({ status: true, message: "User accessrole fetched successfully", match });
      } else {
        var match=false;
        res.send({ status: false, message: "User not found",match});
      }
    }
  });
});
module.exports = router;