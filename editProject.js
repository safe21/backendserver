const express = require('express');
const mysql = require("mysql2");
const router = express.Router()
require('dotenv').config();
const db = mysql.createConnection(process.env.DATABASE_URL)
// Edit details Project //////////////////////////////////////////////////////////////////////////////////////////////////
// Edit project
router.put("/project/update", (req, res) => {
  let sql =
    "UPDATE project SET en_title='" + req.body.en_title +
    "', th_title='" + req.body.th_title +
    "', url='" + req.body.url +
    "', category='" + req.body.category +
    "', year='" + req.body.year.substring(0,10) +
    "'  WHERE idProject=" + req.body.idProject;
console.log(sql)
  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Project Updated Failed" });
    } else {
      res.send({ status: true, message: "Project Updated successfully",error });
    }
  });
});

// Edit student
router.put("/student/update/:idstudent", (req, res) => {
  var id = req.params.idstudent.substring(1)
  let sql =
    "UPDATE student SET idstudent='" + req.body.idstudent +
    "', en_first_name='" + req.body.en_first_name +
    "', en_last_name='" + req.body.en_last_name +
    "', th_first_name='" + req.body.th_first_name +
    "', th_last_name='" + req.body.th_last_name +
    "'  WHERE idstudent=" + id;
  console.log(sql)
  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Project Updated Failed" });
    } else {
      res.send({ status: true, message: "Project Updated successfully" });
    }
  });
});

// Edit advisor
router.put("/advisor/update/:idadvisor", (req, res) => {
  let sql =
    "UPDATE advisor SET idadvisor='" + req.body.idadvisor +
    "', ad_en_first_name='" + req.body.ad_en_first_name +
    "', ad_en_last_name='" + req.body.ad_en_last_name +
    "', ad_th_first_name='" + req.body.ad_th_first_name +
    "', ad_th_last_name='" + req.body.ad_th_last_name +
    "'  WHERE idadvisor=" + req.params.idadvisor;

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Project Updated Failed" });
    } else {
      res.send({ status: true, message: "Project Updated successfully" });
    }
  });
});

// Edit abstract
router.put("/abstract/update", (req, res) => {
  // var id = req.params.Project_idProject.substring(1);
  let sql =
    `UPDATE abstract SET en_abstract = "${req.body.en_abstract}",th_abstract = "${req.body.th_abstract}" WHERE abstract.Project_idProject = ${req.body.idProject};`

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Project Updated Failed" });
    } else {
      res.send({ status: true, message: "Project Updated successfully" });
    }
  });
});

router.put("/descript/update", (req, res) => {
  let sql =
    `UPDATE member_role SET descript = "${req.body.descript}" WHERE member_role.idmember_role = ${req.body.idmember_role};`

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Project Updated Failed" });
    } else {
      res.send({ status: true, message: "Project Updated successfully" });
    }
  });
});

//get project_member
router.get("/projectteam/:idProject", (req, res) => {
  var id = req.params.idProject.substring(1);
  let sql =
    `SELECT * FROM project_team INNER JOIN member_role ON project_team.member_role_idmember_role = member_role.idmember_role WHERE project_team.Project_idProject="${id}";`

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Project Updated Failed" });
    } else {
      const member = result;
      res.send({ status: true, message: "Project Updated successfully", member });
    }
  });
});

router.get("/projectadvisor/:idProject", (req, res) => {
  var id = req.params.idProject.substring(1);
  let sql =
    `SELECT * 
      FROM project_advisor 
      INNER JOIN advisor ON project_advisor.Advisor_idAdvisor = advisor.idadvisor
      INNER JOIN advisor_role ON project_advisor.advisor_role_idadvisor_role = advisor_role.idadvisor_role
      WHERE project_advisor.Project_idProject=${id};`

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Project Updated Failed" });
    } else {
      if (result.length > 0) {
        const advisor_data = result;
        res.send({ status: true, message: "Project Updated successfully", advisor_data });
      }
      else{
        res.send({ status: false, message: "No advisor"});
      }
    }
  });
});

router.get("/roleDescript/:idProject/:idstudent", (req, res) => {
  var id = req.params.idProject.substring(1);
  var idstudent = req.params.idstudent.substring(1);
  let sql =
    `SELECT member_role.descript, project_team.student_idstudent, project_team.Project_idProject, project_team.member_role_idmember_role
    FROM project_team
    INNER JOIN member_role ON project_team.member_role_idmember_role = member_role.idmember_role
    WHERE project_team.Project_idProject="${id}" AND project_team.student_idstudent="${idstudent}";`

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Project Updated Failed" });
    } else {
      const member = result;
      res.send({ status: true, message: "Project Updated successfully", member });
    }
  });
});

router.get("/studentinfor/:idstudent", (req, res) => {
  var id = req.params.idstudent.substring(1);
  let sql =
    `SELECT * FROM student WHERE student.idstudent ="${id}";`

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Project Updated Failed" });
    } else {
      const student_data = result;
      res.send({ status: true, message: "Project Updated successfully", student_data });
    }
  });
});
router.get("/invitedstudent/:idproject", (req, res) => {
  var id = req.params.idproject.substring(1);
  let sql =
    `SELECT * FROM invitestudent WHERE invitestudent.Project_idProject="${id}";`

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Project get invited student Failed" });
    } else {
      const data = result;
      res.send({ status: true, message: "Project get invited student successfully", data });
    }
  });
});

router.get("/invitedadvisor/:idproject", (req, res) => {
  var id = req.params.idproject.substring(1);
  let sql =
    `SELECT * FROM inviteadvisor WHERE inviteadvisor.Project_idProject="${id}";`

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Project get invited advisor Failed" });
    } else {
      const data = result;
      res.send({ status: true, message: "Project get invited advisor successfully", data });
    }
  });
});
router.delete("/deleteinvite/:idstudent/:idProject", (req, res) => {

  var idstudent = req.params.idstudent.substring(1); // อ่านค่า parameters ทั้งหมดจาก URL
  var idProject = req.params.idProject.substring(1);
  console.log(idstudent)
  console.log(idProject)
  let sql = `DELETE FROM invitestudent WHERE invitestudent.student_idstudent = ${idstudent} AND invitestudent.Project_idProject = ${idProject}`
  let query = db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "deleteinvite Deleted Failed" });
    } else {
      res.send({ status: true, message: "deleteinvite Deleted successfully" });
    }
  });
});
// Advisor
router.delete("/deleteinviteAd/:idadvisor/:idProject", (req, res) => {

  var idadvisor = req.params.idadvisor.substring(1); // อ่านค่า parameters ทั้งหมดจาก URL
  var idProject = req.params.idProject.substring(1);
  console.log(idadvisor)
  console.log(idProject)
  let sql = `DELETE FROM inviteadvisor WHERE inviteadvisor.advisor_idadvisor = ${idadvisor} AND inviteadvisor.Project_idProject = ${idProject}`
  let query = db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "deleteinvite Deleted Failed" });
    } else {
      res.send({ status: true, message: "deleteinvite Deleted successfully" });
    }
  });
});

// keyword
router.post("/project_keyword/add", (req, res) => {
  let details = {
    Project_idProject: req.body.idProject,

    keyword_idkeyword: req.body.idkeyword,

  };
  console.log(details)
  let sql = `INSERT INTO project_keyword SET ?`;
  db.query(sql, details, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Project created Failed" });
    } else {
      // const keywordId = result.insertId;
      res.send({ status: true, message: "Project created successfully" });
    }
  });
});

router.get("/project_keyword/:idProject", (req, res) => {
  var id = req.params.idProject.substring(1)
  var sql = `SELECT project.idProject, keyword.keyword ,keyword.idkeyword FROM project INNER JOIN project_keyword ON project.idProject=project_keyword.Project_idProject INNER JOIN keyword ON project_keyword.keyword_idkeyword = keyword.idkeyword WHERE project.idProject="${id}"`;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB rm5",error);
    } else {
      res.send({ status: true, data: result });
    }
  });
});

router.delete("/project_keyword/delete/:idProject/:idkeyword", (req, res) => {
  var idkeyword = req.params.idkeyword.substring(1); // อ่านค่า parameters ทั้งหมดจาก URL
  var idProject = req.params.idProject.substring(1);

  let sql = `DELETE FROM project_keyword WHERE project_keyword.Project_idProject = ${idProject} AND project_keyword.keyword_idkeyword = ${idkeyword}`
  let query = db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "Projcet Deleted Failed", error });
    } else {
      res.send({ status: true, message: "project Deleted successfully" });
    }
  });
});

router.delete("/keyword/delete/:idkeyword", (req, res) => {
  var idkeyword = req.params.idkeyword.substring(1); // อ่านค่า parameters ทั้งหมดจาก URL
  // var idProject = req.params.idProject.substring(1);

  let sql = `DELETE FROM keyword WHERE keyword.idkeyword = "${idkeyword}"`
  let query = db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "Projcet Deleted Failed" });
    } else {
      res.send({ status: true, message: "project Deleted successfully" });
    }
  });
});
module.exports = router;