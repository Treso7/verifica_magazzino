var express = require("express");
var apiServer = express();
var cors = require("cors");
apiServer.use(cors());
var fs = require("fs");
const { stringify } = require("querystring");
require("dotenv").config();
const mysql = require("mysql2");

/*
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
});
*/
kkkkk
var connection = mysql.createConnection({
  host:"localhost",
  port:"3306",
  user:"root",
  password:"password",
  database:"c195_prova"
  });


var host = "localhost";
var port = 3000;

apiServer.listen(port, host, () => {
  console.log("Server partito: http://%s:%d/", host, port);
});





apiServer.get("/api/magazzino", (req, res) => {
  connection.query(
    'SELECT * FROM Magazzino ORDER BY Nome ASC;',
    function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.status(200).json(result);
    });  
});



apiServer.get("/api/insert", (req, res) => {
  console.log("ricevuti:", req.query.mail, req.query.password);
  connection.query(
    'INSERT INTO magazzino (name,id, quantita) VALUES (?, ?, ?);',
    [req.query.id, req.query.name, req.query.quantita],
    function (err, results) {
      console.log(err, results);
      if (results) {
        res.status(200).json({ message: "insert success" });
      } else {
        res.status(400).json({ message: "insert failed" });
      }
    }
  );