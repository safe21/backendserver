const express = require('express');
const mysql = require("mysql2");
const router = express.Router()
require('dotenv').config();
const db = mysql.createConnection(process.env.DATABASE_URL)

router.get("/:idProject", (req, res) => {
  var id = req.params.idProject.substring(1)
  var sql = `SELECT * FROM project WHERE idProject = "${id}"`;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB rm1", error);
    } else {
      res.send({ status: true, data: result });
    }
  });
});

router.get("/abstract/:Project_idProject", (req, res) => {
  var id = req.params.Project_idProject.substring(1)
  var sql = `SELECT * FROM abstract WHERE abstract.Project_idProject="${id}"`;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB rm2", error);
    } else {
      res.send({ status: true, data: result });
    }
  });
});

router.get("/student/:idProject", (req, res) => {
  var id = req.params.idProject.substring(1)
  var sql = `SELECT project.idProject, student.idstudent, student.en_first_name, student.en_last_name, student.th_first_name, student.th_last_name FROM project  INNER JOIN project_team ON project.idProject = project_team.Project_idProject INNER JOIN student ON project_team.student_idstudent = student.idstudent WHERE project.idProject= "${id}"`;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB rm3", error);
    } else {
      res.send({ status: true, data: result });
    }
  });
});

router.get("/advisor/:idProject", (req, res) => {
  var id = req.params.idProject.substring(1)
  var sql = `SELECT project.idProject, advisor.idadvisor, advisor.ad_en_first_name, advisor.ad_en_last_name FROM project INNER JOIN project_advisor ON project.idProject= project_advisor.Project_idProject INNER JOIN advisor ON project_advisor.Advisor_idAdvisor = advisor.idadvisor WHERE project.idProject="${id}"`;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB rm4", error);
    } else {
      res.send({ status: true, data: result });
    }
  });
});

router.get("/keyword/:idProject", (req, res) => {
  var id = req.params.idProject.substring(1)
  var sql = `SELECT project.idProject, keyword.keyword FROM project INNER JOIN project_keyword ON project.idProject=project_keyword.Project_idProject INNER JOIN keyword ON project_keyword.keyword_idkeyword = keyword.idkeyword WHERE project.idProject="${id}"`;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB rm5", error);
    } else {
      res.send({ status: true, data: result });
    }
  });
});

router.delete("/keyword/delete/:keyword", (req, res) => {

  var keyword = req.params.keyword.substring(1); // อ่านค่า parameters ทั้งหมดจาก URL
  // var idProject = req.params.idProject.substring(1);
  console.log(keyword)
  // console.log(idProject)
  let sql = `DELETE FROM keyword WHERE keyword.keyword="${keyword} "`
  let query = db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "Keyword Deleted Failed", error });
    } else {
      res.send({ status: true, message: "keyword Deleted successfully" });
    }
  });
});

router.delete("/Projectkeyword/deletet/:idProject/:word", (req, res) => {

  var word = req.params.word.substring(1); // อ่านค่า parameters ทั้งหมดจาก URL
  var idProject = req.params.idProject.substring(1);
  console.log(word)
  console.log(idProject)
  let sql = `DELETE FROM project_keyword WHERE project_keyword.Project_idProject="${idProject}" AND project_keyword.keyword_idkeyword="${word}"`
  let query = db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "keyword Deleted Failed" , error});
    } else {
      res.send({ status: true, message: "keyword Deleted successfully" });
    }
  });
});

module.exports = router;

