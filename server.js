var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');
require('dotenv').config()

//const connection = mysql.createConnection({
// host: 'localhost',
//  user: 'root',
//  database: 'mydb'
//});
const connection = mysql.createConnection(process.env.DATABASE_URL)

var app = express()
app.use(cors())
app.use(express.json())

app.get('/users', function (req, res, next) {
  connection.query(
    'SELECT * FROM `users`',
    function(err, results, fields) {
      res.json(results);
    }
  );
})

app.get('/users/:userId', function (req, res, next) {
  const userId = req.params.userId;
  connection.query(
    'SELECT * FROM `users` WHERE `userId` = ?',
    [userId],
    function(err, results) {
      res.json(results);
    }
  );
})

app.post('/users', function (req, res, next) {
  connection.query(
    'INSERT INTO `users`(`fname`, `lname`, `username`, `password`, `avatar`, `Phone`) VALUES (?, ?, ?, ?, ?, ?)',
    [req.body.fname, req.body.lname, req.body.username, req.body.password, req.body.avatar, req.body.Phone],
    function(err, results) {
      res.json(results);
    }
  );
})

app.put('/users', function (req, res, next) {
  connection.query(
    'UPDATE `users` SET `fname`= ?, `lname`= ?, `username`= ?, `password`= ?, `avatar`= ?, `Phone`= ? WHERE userId = ?',
    [req.body.fname, req.body.lname, req.body.username, req.body.password, req.body.avatar, req.body.Phone, req.body.userId],
    function(err, results) {
      res.json(results);
    }
  );
})

app.delete('/users', function (req, res, next) {
  connection.query(
    'DELETE FROM `users` WHERE userId = ?',
    [req.body.userId],
    function(err, results) {
      res.json(results);
    }
  );
})

app.post('/login', function (req, res, next) {
  connection.query(
    'SELECT * FROM `users` WHERE username = ? and password = ?',
    [req.body.username, req.body.password],
    function(err, results) {
      res.json(results);
    }
  );
})

// car


app.get('/ordersSell', function (req, res, next) {
  connection.query(
    'SELECT * FROM `ordersSell`',
    function(err, results, fields) {
      res.json(results);
    }
  );
})

app.get('/ordersSell/:orderID', function (req, res, next) {
  const orderID = req.params.userId;
  connection.query(
    'SELECT * FROM `ordersSell` WHERE `orderID` = ?',
    [orderID],
    function(err, results) {
      res.json(results);
    }
  );
})

app.post('/ordersSell', function (req, res, next) {
  connection.query(
    'INSERT INTO `ordersSell`(`Cbrand`, `Cmodel`, `Cyears`, `Cengine`, `Ctypegear`, `Cmiles`, `Cavatar`) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [req.body.Cbrand, req.body.Cmodel, req.body.Cyears, req.body.Cengine, req.body.Ctypegear, req.body.Cmiles, req.body.Cavatar],
    function(err, results) {
      res.json(results);
    }
  );
})

app.put('/ordersSell', function (req, res, next) {
  connection.query(
    'UPDATE `ordersSell` SET `Cbrand`= ?, `Cmodel`= ?, `Cyears`= ?, `Cengine`= ?, `Ctypegear`= ?, `Cmiles`= ?, `Cavatar`= ? WHERE orderID = ?',
    [req.body.Cbrand, req.body.Cmodel, req.body.Cyears, req.body.Cengine, req.body.Ctypegear, req.body.Cmiles, req.body.Cavatar, req.body.orderID],
    function(err, results) {
      res.json(results);
    }
  );
})

app.delete('/ordersSell', function (req, res, next) {
  connection.query(
    'DELETE FROM `ordersSell` WHERE orderID = ?',
    [req.body.orderID],
    function(err, results) {
      res.json(results);
    }
  );
})
  
app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})