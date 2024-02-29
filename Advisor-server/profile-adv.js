const express = require('express');
const mysql = require("mysql2");
const router = express.Router()
require('dotenv').config();
const db = mysql.createConnection(process.env.DATABASE_URL)
// ___________________________________________________________# Get ADV #_______________________________________________________________
router.get("/advisor/:idadvisor", (req, res) => {
    var id = req.params.idadvisor.substring(1)
    var sql = `SELECT * FROM advisor WHERE advisor.idadvisor="${id}" `;
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB Get ADV profile");
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
            console.log("Error Connecting to DB ADV Phaone profile");
        } else {
            res.send({ status: true, data: result });
        }
    });
});
// ___________________________________________________________# Get ADV Email #_______________________________________________________________
router.get("/advisor_email/:idadvisor", (req, res) => {
    var id = req.params.idadvisor.substring(1)
    var sql = `SELECT * FROM advisor INNER JOIN advisor_email ON advisor.idadvisor = advisor_email.advisor_idadvisor WHERE advisor.idadvisor ="${id}" `;
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB Get ADV Email profile");
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
            console.log("Error Connecting to DB Get Project ADV profile");
        } else {
            res.send({ status: true, data: result });
        }
    });
});
// ___________________________________________________________# Get Invite ADV #_______________________________________________________________
router.get("/inviteadvisor/:idadvisor", (req, res) => {
    var id = req.params.idadvisor.substring(1)
    var sql = `SELECT * FROM project INNER JOIN inviteadvisor ON project.idProject = inviteadvisor.Project_idProject WHERE inviteadvisor.advisor_idadvisor="${id}"`;
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting Get Invite ADV profile");
        } else {
            res.send({ status: true, data: result });
        }
    });
});
// ___________________________________________________________# Leave Project ADV #_______________________________________________________________
router.delete("/leave/:idadvisor/:idProject", (req, res) => {

    var idadvisor = req.params.idadvisor.substring(1); // อ่านค่า parameters ทั้งหมดจาก URL
    var idProject = req.params.idProject.substring(1);
    let sql = `DELETE FROM project_advisor WHERE project_advisor.Advisor_idAdvisor="${idadvisor}" AND project_advisor.Project_idProject = "${idProject}"`
    let query = db.query(sql, (error) => {
        if (error) {
            res.send({ status: false, message: "Projcet Deleted Failed", error });
        } else {
            res.send({ status: true, message: "project Deleted successfully" });
        }
    });
});
// ___________________________________________________________# Delete Phone ADV #_______________________________________________________________
router.delete("/advisor_phone/leave/:idadvisor/:phone", (req, res) => {

    var idadvisor = req.params.idadvisor.substring(1); // อ่านค่า parameters ทั้งหมดจาก URL
    var phone = req.params.phone.substring(1);

    let sql = `DELETE FROM advisor_phone WHERE advisor_phone.advisor_idadvisor = "${idadvisor}" AND advisor_phone.phone = "${phone}"`
    let query = db.query(sql, (error) => {
        if (error) {
            res.send({ status: false, message: "Projcet Deleted Failed" });
        } else {
            res.send({ status: true, message: "project Deleted successfully" });
        }
    });
});
// ___________________________________________________________# Update Profile ADV #_______________________________________________________________
router.put("/advisor/update/:idadvisor", (req, res) => {
    let sql =
        "UPDATE advisor SET idadvisor='" + req.body.idadvisor +
        "', ad_en_first_name='" + req.body.ad_en_first_name +
        "', ad_en_last_name='" + req.body.ad_en_last_name +
        "', ad_th_first_name='" + req.body.ad_th_first_name +
        "', ad_th_last_name='" + req.body.ad_th_last_name +
        "'  WHERE idadvisor=" + req.params.idadvisor.substring(1);
    console.log(sql)

    let a = db.query(sql, (error, result) => {
        if (error) {
            res.send({ status: false, message: "Project Updated Failed" });
        } else {
            res.send({ status: true, message: "Project Updated successfully" });
        }
    });
});
// ___________________________________________________________# Add Phone ADV #_______________________________________________________________
router.post("/advisor_phone/add", (req, res) => {
    let details = {
        phone: req.body.phone,
        advisor_idadvisor: req.body.advisor_idadvisor,
    };
    let sql = "INSERT INTO advisor_phone SET ?";
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

router.get("/chartadvisor/:idadvisor", (req, res) => {
    var id = req.params.idadvisor.substring(1)
    var sql = `SELECT project.idProject, keyword.keyword, COUNT(keyword.keyword) AS freq
    FROM project
    INNER JOIN project_keyword ON project_keyword.Project_idProject = project.idProject
    INNER JOIN keyword ON keyword.idkeyword = project_keyword.keyword_idkeyword
    INNER JOIN project_advisor ON project.idProject = project_advisor.Project_idProject
    WHERE project_advisor.Advisor_idAdvisor = ${id}
    GROUP BY keyword.keyword
    ORDER BY freq DESC, keyword.keyword 
    LIMIT 5;`;
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting Get Invite ADV profile");
        } else {
            res.send({ status: true, data: result });
        }
    });
});
module.exports = router;