const express = require('express');
const mysql = require("mysql2");
const router = express.Router()
require('dotenv').config();
const db = mysql.createConnection(process.env.DATABASE_URL)

router.post("/student/add", (req, res) => {
    let details = {
        idstudent: req.body.idstudent,
        en_first_name: req.body.en_first_name,
        en_last_name: req.body.en_last_name,
        th_first_name: req.body.th_first_name,
        th_last_name: req.body.th_last_name,
    };
    let sql = "INSERT INTO student SET ?";
    db.query(sql, details, (error) => {
        if (error) {
            res.send({ status: false, message: "Project created Failed /api/student/add" });
        } else {
            res.send({ status: true, message: "Project created successfully" });
        }
    });
});

router.post("/user/add", (req, res) => {
    let details = {
        iduser: req.body.iduser,
        name: req.body.name,
        email: req.body.email,
        role_idrole: req.body.role_idrole,
    };
    let sql = "INSERT INTO user SET ?";
    db.query(sql, details, (error) => {
        if (error) {
            res.send({ status: false, message: "Project created Failed /api/user/add" });
        } else {

            res.send({ status: true, message: "Project created successfully" });
        }
    });
});


router.post("/student_email/add", (req, res) => {
    let details = {
        student_idstudent: req.body.student_idstudent,
        email: req.body.email,
    };
    let sql = "INSERT INTO student_email SET ?";
    db.query(sql, details, (error) => {
        if (error) {
            res.send({ status: false, message: "Project created Failed" });
        } else {
            res.send({ status: true, message: "Project created successfully" });
        }
    });
});


router.post("/student_phone/add", (req, res) => {
    let details = {
        student_idstudent: req.body.student_idstudent,
        phone: req.body.phone,
    };
    let sql = "INSERT INTO student_phone SET ?";
    db.query(sql, details, (error) => {
        if (error) {
            res.send({ status: false, message: "Project created Failed",error });
        } else {
            res.send({ status: true, message: "Project created successfully" });
        }
    });
});

//check register?
router.get("/checkregister/:email", (req, res) => {
    var email = req.params.email.substring(1);
    let sql = `SELECT * FROM user WHERE user.email ="${email}"`;
    db.query(sql, (error, result) => {
        if (error) {
            res.send({ status: false, message: "Project created Failed",error });
        } else {
            if(result.length>=1){
                var state = true;
                console.log(result.length);
            }
            else{
                var state = false;
                console.log(result.length);
            }
            res.send({ status: true, message: "Project created successfully", state});
            return state;
        }
    });
});
module.exports = router;