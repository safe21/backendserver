const express = require('express');
const mysql = require("mysql2");
const router = express.Router()
require('dotenv').config();
const db = mysql.createConnection(process.env.DATABASE_URL)
// ___________________________________________________________# Get ADV #_______________________________________________________________
router.get("/advisor/:idadvisor", (req, res) => {
    var id = req.params.idadvisor.substring(1)
    var sql = `SELECT * FROM advisor WHERE advisor.idadvisor="${id}"`;
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB Get ADV");
        } else {
            res.send({ status: true, data: result });
        }
    });
});
// ___________________________________________________________# Get ADV Phaone #_______________________________________________________________
router.get("/advisor_phone/:idadvisor", (req, res) => {
    var id = req.params.idadvisor.substring(1)
    var sql = `SELECT * FROM advisor INNER JOIN advisor_phone ON advisor.idadvisor = advisor_phone.advisor_idadvisor WHERE advisor.idadvisor ="${id}"`;
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB ADV Phaone");
        } else {
            res.send({ status: true, data: result });
        }
    });
});
// ___________________________________________________________# Get ADV Email #_______________________________________________________________
router.get("/advisor_email/:idadvisor", (req, res) => {
    var id = req.params.idadvisor.substring(1)
    var sql = `SELECT * FROM advisor INNER JOIN advisor_email ON advisor.idadvisor = advisor_email.advisor_idadvisor WHERE advisor.idadvisor ="${id}"`;
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB Get ADV Email");
        } else {
            res.send({ status: true, data: result });
        }
    });
});
// ___________________________________________________________# Get Project ADV #_______________________________________________________________
router.get("/project_advisor/:idadvisor", (req, res) => {
    var id = req.params.idadvisor.substring(1)
    var sql = `SELECT * FROM project_advisor INNER JOIN project ON project_advisor.Project_idProject = project.idProject INNER JOIN advisor ON project_advisor.Advisor_idAdvisor = advisor.idadvisor WHERE advisor.idadvisor ="${id}"`;
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB Get Project ADV");
        } else {
            res.send({ status: true, data: result });
        }
    });
});
// _____________________________________________________ Keyword(10) Student ___________________________________________________________
router.get("/keywords/:idadvisor", (req, res) => {
    var id = req.params.idadvisor.substring(1)
    var sql = `SELECT keyword.keyword, COUNT(keyword.keyword) AS count FROM keyword INNER JOIN project_keyword ON keyword.idkeyword = project_keyword.keyword_idkeyword INNER JOIN project ON project_keyword.Project_idProject = project.idProject INNER JOIN project_advisor ON project.idProject = project_advisor.Project_idProject INNER JOIN advisor ON project_advisor.Advisor_idAdvisor = advisor.idadvisor WHERE advisor.idadvisor="${id}" GROUP BY keyword.keyword`;
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB rm5");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });

  router.get("/project/:idadvisor/:keyword", (req, res) => {
    var idadvisor = req.params.idadvisor.substring(1)
    var keyword = req.params.keyword.substring(1)
    var sql = `SELECT project.idProject, project.en_title, project.th_title, project.url, project.category, project.year,project_advisor.Advisor_idAdvisor, keyword.idkeyword,keyword.keyword 
    FROM project_advisor 
    INNER JOIN project ON project_advisor.Project_idProject = project.idProject 
    INNER JOIN project_keyword ON project_keyword.Project_idProject = project.idProject 
    INNER JOIN keyword ON keyword.idkeyword = project_keyword.keyword_idkeyword
    WHERE project_advisor.Advisor_idAdvisor= "${idadvisor}" AND keyword.keyword="${keyword}"`;
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB st4");
      } else {
        res.send({ status: true, data: result });
      }
    });
  });
module.exports = router;