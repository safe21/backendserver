const express = require('express');
const mysql = require("mysql2");
const router = express.Router()
require('dotenv').config();
const db = mysql.createConnection(process.env.DATABASE_URL)

router.post("/student_phone/add", (req, res) => {
    let details = {
        phone: req.body.phone,
        student_idstudent: req.body.student_idstudent,
    };
    let sql = "INSERT INTO student_phone SET ?";
    db.query(sql, details, (error, result) => {
        if (error) {
            res.send({ status: false, message: "Project created Failed /student_phone/add", error });
        } else {
            const projectId = result.insertId; // Get the ID of the inserted project
            console.log(projectId)
            res.send({ status: true, message: "Project created successfully", projectId });
        }
    });
});

router.get("/student/:idstudent", (req, res) => {
    var id = req.params.idstudent.substring(1)
    var sql = `SELECT * FROM student WHERE student.idstudent= "${id}"`;
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB pf1 true", error);
        } else {
            res.send({ status: true, data: result });
        }
    });
});

//member on project
router.get("/studentProject/:idproject", (req, res) => {
    var id = req.params.idproject.substring(1)
    // console.log(id)
    var sql = `SELECT project.idProject, student.idstudent, student.en_first_name, student.en_last_name FROM project  INNER JOIN project_team ON project.idProject = project_team.Project_idProject INNER JOIN student ON project_team.student_idstudent = student.idstudent WHERE project.idProject= "${id}"`;
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB pf1" ,error);
        } else {
            res.send({ status: true, data: result });
        }
    });
});

router.get("/phone/:idstudent", (req, res) => {
    var id = req.params.idstudent.substring(1)
    var sql = `SELECT student_phone.phone FROM student INNER JOIN student_phone ON student.idstudent = student_phone.student_idstudent WHERE student.idstudent = "${id}"`;
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB st2",error);
        } else {
            res.send({ status: true, data: result });
        }
    });
});

router.get("/email/:idstudent", (req, res) => {
    var id = req.params.idstudent.substring(1)
    var sql = `SELECT student_email.email FROM student INNER JOIN student_email ON student.idstudent = student_email.student_idstudent WHERE student.idstudent = "${id}"`;
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB st3",error);
        } else {
            res.send({ status: true, data: result });
        }
    });
});

router.get("/invitestudent/:idstudent", (req, res) => {
    var id = req.params.idstudent.substring(1)
    var sql = `SELECT * FROM project INNER JOIN invitestudent ON project.idProject = invitestudent.Project_idProject WHERE invitestudent.student_idstudent="${id}"`;
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB st4",error);
        } else {
            res.send({ status: true, data: result });
        }
    });
});

router.delete("/invitestudent/delete/:idstudent/:idProject", (req, res) => {
    var idstudent = req.params.idstudent.substring(1); // อ่านค่า 
    var idProject = req.params.idProject.substring(1);
    let sql = `DELETE FROM invitestudent WHERE invitestudent.student_idstudent = "${idstudent}" AND invitestudent.Project_idProject = "${idProject}"`;
    console.log(sql)
    let query = db.query(sql, (error) => {
        if (error) {
            res.send({ status: false, message: "Projcet Deleted Failed",error });
        } else {
            res.send({ status: true, message: "project Deleted successfully" });
        }
    });
});

router.delete("/student_phone/leave/:idstudent/:phone", (req, res) => {

    var idstudent = req.params.idstudent.substring(1); // อ่านค่า parameters ทั้งหมดจาก URL
    var phone = req.params.phone.substring(1);

    let sql = `DELETE FROM student_phone WHERE student_phone.student_idstudent = "${idstudent}" AND student_phone.phone = "${phone}"`
    let query = db.query(sql, (error) => {
        if (error) {
            res.send({ status: false, message: "Projcet Deleted Failed" });
        } else {
            res.send({ status: true, message: "project Deleted successfully" });
        }
    });
});



router.put("/student/update/:idstudent", (req, res) => {
    let sql =
        "UPDATE student SET idstudent='" + req.body.idstudent +
        "', en_first_name='" + req.body.en_first_name +
        "', en_last_name='" + req.body.en_last_name +
        "', th_first_name='" + req.body.th_first_name +
        "', th_last_name='" + req.body.th_last_name +
        "'  WHERE idstudent=" + req.params.idstudent.substring(1);
    console.log(sql)

    let a = db.query(sql, (error, result) => {
        if (error) {
            res.send({ status: false, message: "Project Updated Failed" });
        } else {
            res.send({ status: true, message: "Project Updated successfully" });
        }
    });
});

//profile recall project remove keyword
router.get("/project/:idstudent", (req, res) => {
    var id = req.params.idstudent.substring(1);
    var sql = `SELECT project.idProject, project.en_title, project.th_title, project.url, project.category, project.year,project_team.student_idstudent
    FROM project_team 
    INNER JOIN project ON project_team.Project_idProject = project.idProject 
    WHERE project_team.student_idstudent= "${id}"`;
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB st4",error);
        } else {
            res.send({ status: true, data: result, sql });
        }
    });
});
module.exports = router;