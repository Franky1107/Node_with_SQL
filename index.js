const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "prompt",
  database: "delta_app",
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

// app.get("/", (req, res) => {
//   let q = `SELECT count(*) FROM user`;
//   connection.query(q, (err, results) => {
//     if (err) {
//       console.log(err);
//       return res.send("Some error in database");
//     }
//     res.send("success ");
//     console.log(results[0]["count(*)"]);

//   });
// });

app.get("/", (req, res) => {
  let q = `SELECT count(*) FROM user`;
  try {
    connection.query(q ,(err, results) => {
      if (err) throw err;
      let count=results[0]["count(*)"];
    //   console.log(results[0]["count(*)"]);
      res.render("home.ejs",{count});

    });
  } catch (err) {
    console.log(err);
    res.send("Some error in database");
  }
});

app.listen(8080, () => {
  console.log("App listening on port number 8080");
});

// connection.end();
