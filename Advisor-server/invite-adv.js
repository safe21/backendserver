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
            console.log("Error Connecting to DB Get ADV profile");
        } else {
            res.send({ status: true, data: result });
        }
    });
});
// ___________________________________________________________# Post project_ADV #_______________________________________________________________
router.post("/project_advisor/add", (req, res) => {
    let details = {
        Project_idProject: req.body.Project_idProject,
        Advisor_idAdvisor: req.body.Advisor_idAdvisor,
        advisor_role_idadvisor_role: req.body.advisor_role_idadvisor_role,
    };
    let sql = "INSERT INTO project_advisor SET ?";
    console.log(details)
    db.query(sql, details, (error, result) => {
        if (error) {
            res.send({ status: false, message: "Project created Failed", error });
        } else {
            const idmemberrole = result.insertId;
            res.send({ status: true, message: "Project created successfully", idmemberrole });
        }
    });
});
// ___________________________________________________________# Post Role_ADV #_______________________________________________________________
router.post("/advisor_role/add", (req, res) => {
    let details = {
        descript: req.body.descript_role,
    };
    let sql = "INSERT INTO advisor_role SET ?";
    console.log(details)
    db.query(sql, details, (error, result) => {
        if (error) {
            res.send({ status: false, message: "Project created Failed" });
        } else {
            const idadvisorrole = result.insertId;
            res.send({ status: true, message: "Project created successfully", idadvisorrole });
        }
    });
});

router.delete("/inviteadvisor/delete/:idstudent/:idProject", (req, res) => {
    var idstudent = req.params.idstudent.substring(1); // อ่านค่า 
    var idProject = req.params.idProject.substring(1);
let sql = `DELETE FROM inviteadvisor WHERE inviteadvisor.advisor_idadvisor = ${idstudent} AND inviteadvisor.Project_idProject = ${idProject}`;
    console.log(sql)
    let query = db.query(sql, (error) => {
        if (error) {
            res.send({ status: false, message: "Projcet Deleted Failed" });
        } else {
            res.send({ status: true, message: "project Deleted successfully" });
        }
    });
});
module.exports = router;