require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require("mysql2");
const server = express();
const router = express.Router()
const db = mysql.createConnection(process.env.DATABASE_URL)


// localhost:9002/api/backend/{{path}}
server.get("", (req, res) => {
  var id = req.params.id.substring(1)
  // var sql = 'SELECT * FROM project WHERE en_title= "aaaaaaaa"';
  var cmd = `SELECT * FROM project  `
  // console.log(cmd);
  db.query(cmd, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

router.get("/recallid/:id", (req, res) => {
  var id = req.params.id.substring(1)
  var cmd = `SELECT * FROM project  `
  // console.log(cmd);
  db.query(cmd, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

router.get("/getroleforauth/:emailuser", (req, res) => {
  var id = req.params.emailuser.substring(1)
  // console.log(id)
  var cmd = `select user.iduser, role.name_role FROM user INNER JOIN role on user.role_idrole = role.idrole WHERE user.email = "${id}"`
  // console.log(cmd)
  db.query(cmd, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

router.delete("/backend/deletestudent/:idstudent", (req, res) => {
  var idstudent = req.params.idstudent.substring(1);
  let sql = `DELETE FROM student WHERE idstudent=${idstudent}`;
  // let sql = `DELETE FROM student WHERE student.idstudent = 8888;`;
  db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Student delete Failed /api/project/add",error });
    } else {
      res.send({ status: true, message: "Student delete successfully" });
    }
  });
});

router.post("/backend/updateteacher", (req, res) => {
  let sql = `INSERT INTO advisor (idadvisor, ad_en_first_name, ad_en_last_name, ad_th_first_name, ad_th_last_name) VALUES (${req.body.idadvisor}, '${req.body.en_first_name}', '${req.body.en_last_name}', '${req.body.th_first_name}', '${req.body.th_last_name}');`;
  db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Project created Failed /api/project/add",error, sql });
    } else {
      res.send({ status: true, message: "Advisor created successfully" });
    }
  });
});

router.get("/backend/getstudent/:idstudent", (req, res) => {
  var idstudent = req.params.idstudent.substring(1)
  let sql = `SELECT * FROM student WHERE student.idstudent="${idstudent}"`;
  db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Project created Failed /backend/getstudent/:idstudent" });
    } else {
      if (result.length > 0) {
        res.send({ status: true, data: result });
      }
      else {
        res.send({ status: false, data: result });
      }
    }
  });
});

router.get("/backend/role/:id", (req, res) => {
  var id = req.params.id.substring(1)
  var sql = `SELECT role.name_role FROM user INNER JOIN role ON user.role_idrole = role.idrole WHERE user.iduser = "${id}" `;
  // var sql=`SELECT * FROM user WHERE iduser='${id}'`
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB /backend/role/:id");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

router.get("/backend/getuser/:id", (req, res) => {
  var id = req.params.id.substring(1)
  var sql = `SELECT user.iduser, user.name, user.email, user.role_idrole, role.name_role FROM user INNER JOIN role ON user.role_idrole = role.idrole WHERE user.iduser="${id}" `;
  // var sql=`SELECT * FROM user WHERE iduser='${id}'`
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB /backend/getuser/:id");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

router.put("/backend/updaterole", (req, res) => {


  let sql = "UPDATE user SET role_idrole='" + req.body.idrole +
    "'  WHERE user.iduser='" + req.body.iduser + "'";
  console.log(sql)
  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Project Updated Failed /backend/updaterole" });
    } else {
      res.send({ status: true, message: "Project Updated successfully" });
    }
  });
});

router.get("/backend/role", (req, res) => {
  // var id = req.params.Project_idProject;
  var sql = `SELECT * FROM role `
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB /backend/role");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

router.get("/backend/User", (req, res) => {

  // var id = req.params.Project_idProject;
  var sql = `SELECT user.iduser, user.name, user.email, role.name_role FROM user INNER JOIN role ON user.role_idrole = role.idrole`
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB /backend/User");
    } else {
      res.send({ status: true, data: result });
    }
  });
});
module.exports= router;