require('dotenv').config();
const express = require('express');
const mysql = require("mysql2");
const router = express.Router()
const db = mysql.createConnection(process.env.DATABASE_URL)
//add to keyword
router.post("/keyword/add", (req, res) => {
  let details = {
    keyword: req.body.keyword,
  };
  let sql = "INSERT INTO keyword SET ?";
  db.query(sql, details, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Project created Failed" });
    } else {
      const keywordId = result.insertId;
      res.send({ status: true, message: "Project created successfully", keywordId });
    }
  });
});

router.post("/project_keyword/add", (req, res) => {
  let details = {
    Project_idProject:  req.body.Project_idProject,
    keyword_idkeyword: req.body.keyword_idkeyword,
  };
  let sql = "INSERT INTO project_keyword SET ?";
  db.query(sql, details, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Project created Failed" });
    } else {
      // const keywordId = result.insertId;
      res.send({ status: true, message: "Project created successfully" });
    }
  });
});
//get for edit
router.get("/:idstudent", (req, res) => {
  var id = req.params.idstudent.substring(1)
  var sql = `SELECT * FROM student WHERE student.idstudent ="${id}"`;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB st1");
    } else {
      res.send({ status: true, data: result });
    }
  });
});
//delete on keyword
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
// projaect add
router.post("/project/add", (req, res) => {
  let details = {
    en_title: req.body.en_title,
    th_title: req.body.th_title,
    url: req.body.url,
    category: req.body.category,
    year: req.body.year,
  };
  let sql = "INSERT INTO project SET ?";
  db.query(sql, details, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Project created Failed addProject/project/add", error });
    } else {
      const idproject = result.insertId
      res.send({ status: true, message: "Project created successfully", idproject });
    }
  });
});

// role_description add
router.post("/member_role/add", (req, res) => {
  let details = {
    descript:  req.body.descript,
  };
  let sql = "INSERT INTO member_role SET ?";
  console.log(details)
  db.query(sql, details, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Project created Failed" });
    } else {
      const idmemberrole = result.insertId;
      res.send({ status: true, message: "Project created successfully",idmemberrole });
    }
  });
});

router.post("/project_team/add", (req, res) => {
  let details = {
    Project_idProject:  req.body.Project_idProject,
    student_idstudent:  req.body.student_idstudent,
    member_role_idmember_role:  req.body.member_role_idmember_role ,
  };
  let sql = "INSERT INTO project_team SET ?";
  console.log(details)
  db.query(sql, details, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Project created Failed" });
    } else {
      const idmemberrole = result.insertId;
      res.send({ status: true, message: "Project created successfully",idmemberrole });
    }
  });
});

router.post("/invitestudent/add", (req, res) => {
  let details = {
    Project_idProject:  req.body.Project_idProject,
    student_idstudent:  req.body.student_idstudent,
  };
  let sql = "INSERT INTO invitestudent SET ?";
  console.log(details)
  db.query(sql, details, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Project created Failed /invitestudent/add", error });
    } else {
      // const idmemberrole = result.insertId;
      res.send({ status: true, message: "Project created successfully"});
    }
  });
});
router.post("/inviteadvisor/add", (req, res) => {
  let details = {
    Project_idProject:  req.body.Project_idProject,
    advisor_idadvisor:  req.body.advisor_idadvisor,
  };
  let sql = "INSERT INTO inviteadvisor SET ?";
  console.log(details)
  db.query(sql, details, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Project created Failed inviteadvisor/add" });
    } else {
      // const idmemberrole = result.insertId;
      res.send({ status: true, message: "Project created successfully"});
    }
  });
});
//update student my project
router.put("/student/my", (req, res) => {
  let details = {
    idstudent: req.body.en_title,
    en_first_name: req.body.en_first_name,
    en_last_name: req.body.en_last_name,
    th_first_name: req.body.th_first_name,
    th_last_name: req.body.th_last_name,
  };

  let sql = "UPDATE student SET ? WHERE idstudent = ?";
  let idstudent = req.body.idstudent; // Assuming idstudent is the primary key
  db.query(sql, [details, idstudent], (error, result) => {
    if (error) {
      res.send({ status: false, message: "Update failed", error });
    } else {
      res.send({ status: true, message: "Update successful" });
    }
  });
});

router.post("/abstract/add", (req, res) => {
  // var idProject = req.params.idProject.substring(1)
  let details = {
    Project_idProject:  req.body.Project_idProject,
    en_abstract: req.body.en_abstract,
    th_abstract: req.body.th_abstract,

  };
  let sql = "INSERT INTO abstract SET ?";
  db.query(sql, details, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Project created Failed /abstract/add/:idProject", error });
    } else {
      const idproject = result.insertId
      res.send({ status: true, message: "Project created successfully", idproject });
    }
  });
});


module.exports = router;