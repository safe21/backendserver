const express = require('express');
const mysql = require("mysql2");
const router = express.Router()
require('dotenv').config();
const db = mysql.createConnection(process.env.DATABASE_URL)

router.get("/:idstudent", (req, res) => {
  var id = req.params.idstudent.substring(1)
  var sql = `SELECT * FROM student WHERE student.idstudent = "${id}" `;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB st1", error);
    } else {
      res.send({ status: true, data: result });
    }
  });
});

router.get("/advisor/:idadvisor", (req, res) => {
  var id = req.params.idadvisor.substring(1)
  var sql = `SELECT * FROM advisor WHERE idadvisor ="${id}"`;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB /advisor/:idadvisor", error);
    } else {
      res.send({ status: true, data: result });
    }
  });
});

router.get("/project/:idstudent", (req, res) => {
  var id = req.params.idstudent.substring(1);
  var sql = `SELECT project.idProject, project.en_title, project.th_title, project.url, project.category, project.year,project_team.student_idstudent, keyword.idkeyword,keyword.keyword FROM project_team INNER JOIN project ON project_team.Project_idProject = project.idProject INNER JOIN project_keyword ON project_keyword.Project_idProject = project.idProject INNER JOIN keyword ON keyword.idkeyword = project_keyword.keyword_idkeyword WHERE project_team.student_idstudent= "${id}"`;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB st4" ,error);
    } else {
      res.send({ status: true, data: result,sql });
    }
  });
});
//าร้างขึ้นมาเพื่อแก้ไขการเรียกข้อมูลซ้ำเพราะคีเวิด
router.get("/myproject/:idstudent", (req, res) => {
  var id = req.params.idstudent.substring(1);
  var sql = `SELECT project.idProject, project.en_title, project.th_title, project.url, project.category, project.year,project_team.student_idstudent FROM project_team INNER JOIN project ON project_team.Project_idProject = project.idProject WHERE project_team.student_idstudent="${id}"`;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB st5",error);
    } else {
      res.send({ status: true, data: result,sql });
    }
  });
});

router.get("/project/:idstudent/:keyword", (req, res) => {
  var idstudent = req.params.idstudent.substring(1)
  var keyword = req.params.keyword.substring(1)
  var sql = `SELECT project.idProject, project.en_title, project.th_title, project.url, project.category, project.year,project_team.student_idstudent, keyword.idkeyword,keyword.keyword FROM project_team INNER JOIN project ON project_team.Project_idProject = project.idProject INNER JOIN project_keyword ON project_keyword.Project_idProject = project.idProject INNER JOIN keyword ON keyword.idkeyword = project_keyword.keyword_idkeyword WHERE keyword.keyword="${keyword}" AND project_team.student_idstudent="${idstudent}"`;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB st6",error);
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// _____________________________________________________ Keyword(10) Student ___________________________________________________________
router.get("/keywords/:idstudent", (req, res) => {
  var id = req.params.idstudent.substring(1)
  var sql = `SELECT keyword.keyword, COUNT(keyword.keyword) AS count FROM keyword INNER JOIN project_keyword ON keyword.idkeyword = project_keyword.keyword_idkeyword INNER JOIN project ON project_keyword.Project_idProject = project.idProject INNER JOIN project_team ON project.idProject = project_team.Project_idProject INNER JOIN student ON project_team.student_idstudent = student.idstudent WHERE student.idstudent= "${id}" GROUP BY keyword.keyword`;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB rm5",error);
    } else {
      res.send({ status: true, data: result });
    }
  });
});
module.exports = router;