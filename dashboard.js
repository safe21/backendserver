const express = require('express');
const mysql = require("mysql2");
const router = express.Router()
require('dotenv').config();
const db = mysql.createConnection(process.env.DATABASE_URL)


// count year
router.get("/year", (req, res) => {
    var sql=`SELECT YEAR(project.year) AS year, COUNT(YEAR(project.year)) AS freq
    FROM project
    GROUP BY YEAR(project.year);`
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB dashboard/year");
        } else {
            res.send({ status: true,data:result });
        }
    });
});
// count each category
router.get("/category/:namecate", (req, res) => {
    var namecate = req.params.namecate.substring(1)
    // console.log(namecate)
    var sql = `SELECT project.category, YEAR(project.year) AS year, COUNT(project.idProject) AS freq
    FROM project
    WHERE project.category ="${namecate}" GROUP BY project.category, YEAR(year)`;
    // console.log(sql)
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB category/:namecate");
        } else {
            res.send({ status: true, data: result });
        }
    });
});

router.get("/multiline", (req, res) => {
    // var namecate = req.params.namecate.substring(1)
    // console.log(namecate)
    var sql = `SELECT project.category, YEAR(project.year) AS year, COUNT(project.idProject) AS freq
FROM project
GROUP BY project.category, YEAR(project.year)
ORDER BY project.category,YEAR(project.year) ASC`;
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB /multiline");
        } else {
            res.send({ status: true, data: result });
        }
    });
});

module.exports = router;
