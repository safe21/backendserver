require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require("mysql2");
const server = express();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const rmProject = require('./readMore')
const STprofile = require('./STprofile')
const profile = require('./profile')
const adProject = require('./addProject')
const edProject = require('./editProject')
const register = require('./register')
const Guard = require('./guard')
const admin = require('./admin')
//dashboard
const dashboard = require('./dashboard')
// ADVISOR #
const projectAdv = require('./Advisor-server/project-adv')
const profileAdv = require('./Advisor-server/profile-adv')
const inviteAdv = require('./Advisor-server/invite-adv')
server.use(bodyParser.json());


const cors = require('cors')
server.use(cors());


// const secretKey = process.env.JWTSECRETKEY;
server.use('/rmProject', rmProject);
server.use('/STprofile', STprofile);
server.use('/profile', profile);
server.use('/adProject', adProject)
server.use('/edProject', edProject)
server.use('/register', register)
server.use('/guard', Guard)
// ADVISOR #
server.use('/projectAdv', projectAdv);
server.use('/profileAdv', profileAdv);
server.use('/inviteAdv', inviteAdv);


server.use('', admin)
server.use('/dashboard', dashboard);


//Establish the database connection

const db = mysql.createConnection(process.env.DATABASE_URL)

db.connect(function (error) {
  if (error) {
    console.log("Error Connecting to DB connect host",error);
  } else {
    console.log("successfully Connected to DB");
  }
});

//Establish the Port

server.listen(9002, function check(error) {
  if (error) {
    console.log("Error....dddd!!!!");
  }

  else {
    console.log("Started....!!!! 9002");

  }
});

//Create the Records
server.get("/api/recallid/:title", (req, res) => {
  var title = req.params.title.substring(1)
  // var sql = 'SELECT * FROM project WHERE en_title= "aaaaaaaa"';
  var cmd = `SELECT * FROM project WHERE en_title= "${title}" `
  // console.log(cmd);
  db.query(cmd, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB /api/recallid/:title");
    } else {
      res.send({ status: true, data: result });
    }
  });
});
//form Add project________________________________________________________________________________________________
server.post("/api/project/add", (req, res) => {

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
      res.send({ status: false, message: "Project created Failed /api/project/add" });
    } else {
      const projectId = result.insertId;
      res.send({ status: true, message: "Project created successfully", projectId });
    }
  });
});

server.post("/api/advisor/add", (req, res) => {

  let details = {
    idadvisor: req.body.idadvisor,
    ad_en_first_name: req.body.ad_en_first_name,
    ad_en_last_name: req.body.ad_en_last_name,
    ad_th_first_name: req.body.ad_th_first_name,
    ad_th_last_name: req.body.ad_th_last_name,
  };
  let sql = "INSERT INTO advisor SET ?";
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: "Project created Failed /api/advisor/add" });
    } else {
      res.send({ status: true, message: "Project created successfully" });
    }
  });
});

server.post("/api/abstract/add:id", (req, res) => {
  let details = {
    Project_idProject: req.params.id.substring(1),
    en_abstract: 'req.body.en_abstract',
    th_abstract: 'req.body.th_abstract',
  };
  console.log(details.Project_idProject)
  console.log(details.en_abstract)
  console.log(details.th_abstract)
  let sql = "INSERT INTO abstract SET ?";
  console.log(sql, details)
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: "Project created Failed /api/abstract/add:id" });
    } else {
      res.send({ status: true, message: "Project created successfully" });
    }
  });
});


//________________________________________________________________________________________________________________________________________

//Get Project show on home P
server.get("/api/project", (req, res) => {
  var sql = `SELECT * FROM project`;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB /api/project");
    } else {
      res.send({ status: true, data: result });
    }
  });
});




server.get("/api/studentproject/:idProject", (req, res) => {
  var idproject = req.params.idProject.substring(1)
  var sql = `SELECT *
  FROM project_team
  INNER JOIN student ON project_team.student_idstudent = student.idstudent
  WHERE project_team.Project_idProject = ${idproject}`;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB /api/student");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

server.get("/api/user/:email", (req, res) => {
  var email = req.params.email.substring(1)
  var sql = `SELECT user.iduser, user.name, user.email, user.role_idrole, role.name_role FROM user INNER JOIN role ON user.role_idrole = role.idrole WHERE email= "${email}" `;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB /api/user/:email");
    } else {
      res.send({ status: true, data: result });
    }
  });
});


// show on project readmore P
server.get("/api/project/:idProject", (req, res) => {
  var id = req.params.idProject.substring(1)
  var sql = `SELECT * FROM project WHERE idProject = "${id}"`;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB /api/project/:idProject");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// show on profile
// server.get("/api/profile/:id", (req, res) => {
//   var id = req.params.id.substring(1)
//   var sql = "SELECT * FROM student WHERE idstudent = " + id;
//   db.query(sql, function (error, result) {
//     if (error) {
//       console.log("Error Connecting to DB /api/profile/:id");
//     } else {
//       res.send({ status: true, data: result });
//     }
//   });
// });


//show project on home
server.get("/api/project_team/:id", (req, res) => {
  var id = req.params.id.substring(1)
  var sql = `SELECT student.idstudent, student.en_first_name,  project.idProject FROM student,project WHERE project.idProject ="${id}"`;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB /api/project_team/:id");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//show on user profile 
server.get("/api/profile/:idstudent", (req, res) => {
  var idstudent = req.params.idstudent.substring(1)
  var sql = `SELECT * FROM student WHERE idstudent ="${idstudent}"`;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB /api/profile/:idstudent");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// member on project by id Homepage
server.get("/api/studentProject/:idproject", (req, res) => {
  var id = req.params.idproject.substring(1)
  // console.log(id)
  var sql = `SELECT student.idstudent, student.en_first_name, student.en_last_name FROM project  INNER JOIN project_team ON project.idProject = project_team.Project_idProject INNER JOIN student ON project_team.student_idstudent = student.idstudent WHERE project.idProject="${id}"`;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB pf1");
    } else {
      res.send({ status: true, data: result });
    }
  });
});


server.get("/api/keyword/:idkeyword", (req, res) => {

  var id = req.params.idkeyword;
  var sql = `SELECT * FROM keyword WHERE idkeyword ="${id}"`;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB /api/keyword/:idkeyword");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

server.get("/api/abstract/:Project_idProject", (req, res) => {
  var id = req.params.Project_idProject.substring(1)
  var sql = `SELECT * FROM abstract WHERE Project_idProject ="${id}"`;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB /api/abstract/:Project_idProject");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

// Edit details Project //////////////////////////////////////////////////////////////////////////////////////////////////
// Edit project
server.put("/api/project/update/:idProject", (req, res) => {
  let sql =
    "UPDATE project SET en_title='" + req.body.en_title +
    "', th_title='" + req.body.th_title +
    "', category='" + req.body.category +
    "', year='" + req.body.year +
    "', url='" + req.body.url +
    "'  WHERE idProject=" + req.params.idProject;

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Project Updated Failed" });
    } else {
      res.send({ status: true, message: "Project Updated successfully" });
    }
  });
});

// Edit student
server.put("/api/student/update/:idstudent", (req, res) => {
  let sql =
    "UPDATE student SET idstudent='" + req.body.idstudent +
    "', en_first_name='" + req.body.en_first_name +
    "', en_last_name='" + req.body.en_last_name +
    "', th_first_name='" + req.body.th_first_name +
    "', th_last_name='" + req.body.th_last_name +
    "'  WHERE idstudent=" + req.params.idstudent;

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Project Updated Failed" });
    } else {
      res.send({ status: true, message: "Project Updated successfully" });
    }
  });
});

// Edit advisor
server.put("/api/advisor/update/:idadvisor", (req, res) => {
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
server.put("/api/abstract/update/:Project_idProject", (req, res) => {
  var id = req.params.Project_idProject.substring(1);
  let sql =
    `UPDATE abstract SET en_abstract = "${req.body.en_abstract}",th_abstract = "${req.body.th_abstract}" WHERE abstract.Project_idProject = ${id};`

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Project Updated Failed" });
    } else {
      res.send({ status: true, message: "Project Updated successfully" });
    }
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// leave Project
server.delete("/project/leave/:idstudent/:idProject", (req, res) => {

  var idstudent = req.params.idstudent.substring(1); // อ่านค่า parameters ทั้งหมดจาก URL
  var idProject = req.params.idProject.substring(1);
  console.log(idstudent)
  console.log(idProject)
  let sql = `DELETE FROM project_team WHERE project_team.student_idstudent="${idstudent}" AND project_team.Project_idProject = "${idProject}"`
  let query = db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "Projcet Deleted Failed",error });
    } else {
      res.send({ status: true, message: "project Deleted successfully" });
    }
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////



//update role on backend

//get user by id

//get role by id


server.post("/api/project/addtest", (req, res) => {
  let sql = "INSERT INTO `keyword` (`idkeyword`, `keyword`) VALUES (NULL, 'erer');";
  db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Project created Failed /api/project/add" });
    } else {
      const projectId = result.insertId; // Get the ID of the inserted project
      console.log(projectId)
      res.send({ status: true, message: "Project created successfully", projectId });
    }
  });
});
//get data student for post to teacher

// post advisor from update role student --> advisor

//delete student on updaterole