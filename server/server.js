/* eslint-disable guard-for-in */
/* eslint-disable camelcase */
/* eslint-disable max-len */
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();
const connection = mysql.createConnection({
  database: 'seikiseki',
  user: process.env.user,
  password: process.env.password,
  host: process.env.host,
  port: process.env.port,
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected!');
});


const corsOptions = {
  origin: process.env.origin,
  methods: ['POST', 'GET'],
  optionsSuccessStatus: 200,
};


app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});
app.options('/', cors(corsOptions));


app.post('/addUser', cors(corsOptions), (req, res, next) => {
  const {data} = req.body;
  const {email, pass, bio, country} = data;
  // do basic validation here
  connection.query(`INSERT INTO Users(email,pass, bio, country) VALUES ('${email}', '${pass}', '${bio}'), '${country}'`, (err, res, field) => {
    if (eb) {
      res.status(404).send(err);
      throw err;
    }
    console.log(res, field);
    res.status(200).send('User Added');
  });
  next();
});

app.post('/deleteUser', cors(corsOptions), (req, res, next) => {
  const {data} = req.body;
  const {uid} = data;

  const sql = `DELETE FROM Users WHERE id = ${uid}`;
  connection.query(sql, (errback, resback, fields) => {
    if (errback) {
      res.status(404).send(errback);
    }
    res.status(200).send(`UserID: ${uid} now watching launch ${lid}`);
  });
  next();
});

app.post('/Watch', cors(corsOptions), (req, res, next) => {
  const {data} = req.body;
  const {uid, lid} = data;

  const sql = `INSERT INTO Watching(user_id, launch_id) VALUES (${uid}, ${lid})`;
  connection.query(sql, (errback, resback, fields) => {
    if (errback) {
      res.status(404).send(errback);
    }
    console.log(res, field);
    res.status(200).send(`UserID: ${uid} now watching launch ${lid}`);
  });
  next();
});


app.get('/getLauncheSites', cors(corsOptions), (req, res) => {
  const sql = 'SELECT * FROM Launches';
  connection.query(sql, function(errback, resback, fields) {
    if (errback) {
      console.log(errback);
      res.status(404);
    }
    res.send(JSON.stringify(resback));
  });
});


app.get('/populateBackend', cors(corsOptions), (req, res) => {
  // Populating SQL table with request data
  // need to run this twice, once on page 1, and once on page 2
  const request = require('request');
  const options = {
    'method': 'GET',
    'url': 'https://fdo.rocketlaunch.live/json/locations?page=2',
    'headers': {
      'Authorization': `Bearer ${process.env.api_key}`,
    },
  };
  request(options, function(error, response) {
    if (error) throw new Error(error);
    const data = JSON.parse(response.body);
    const result = data.result;
    for (i in result) {
      let {name, latitude, longitude, country, utc_offset} = result[i];
      if (!longitude) longitude = 0.0;
      if (!latitude) latitude = 0.0;
      if (!utc_offset) utc_offset = 0;
      if (!country) {
        country = {code: 'NA'};
      }
      console.log(country);
      const sql = `INSERT INTO Launches(location_name, country, longitude, latitude, utc_offset) VALUES ('${name}','${country.code}','${longitude}','${latitude}','${utc_offset}')`;
      connection.query(sql, function(err, result) {
        if (err) {
          res.send('404');
        };
        console.log('1 record inserted');
        res.send('200');
        next();
      });
    }
  });
});


app.listen(3000, () => console.log('Example app is listening on port 3000.'));
app.get('/', cors(corsOptions), (req, res, next) => {
  console.log('Recieved response');
  res.send('Hello world!!');
  next();
});
