/* eslint-disable guard-for-in */
/* eslint-disable camelcase */
/* eslint-disable max-len */
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
const request = require('request');
require('dotenv').config(); // Load environment variables

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

// Set CORS options
const corsOptions = {
  origin: process.env.origin,
  methods: ['POST', 'GET'],
  optionsSuccessStatus: 200,
};

// Middleware to log the current time for every incoming request
app.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

// Enable preflight requests for all routes
app.options('/', cors(corsOptions));

// Route to add a new user to the database
app.post('/addUser', cors(corsOptions), (req, res, next) => {
  const {data} = req.body;
  const {email, pass, bio, country} = data;
  // do basic validation here
  connection.query(`INSERT INTO Users(email,pass, bio, country) VALUES ('${email}', '${pass}', '${bio}'), '${country}'`, (err, result, fields) => {
    if (err) {
      res.status(404).send(err);
      throw err;
    }
    console.log(result, fields);
    res.status(200).send('User Added');
  });
  next();
});

// Route to delete a user from the database
app.post('/deleteUser', cors(corsOptions), (req, res, next) => {
  const {data} = req.body;
  const {uid} = data;

  const sql = `DELETE FROM Users WHERE id = ${uid}`;
  connection.query(sql, (err, result, fields) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).send(`UserID: ${uid} deleted`);
  });
  next();
});

// Route to add a new launch to a user's watchlist
app.post('/Watch', cors(corsOptions), (req, res, next) => {
  const {data} = req.body;
  const {uid, lid} = data;

  const sql = `INSERT INTO Watching(user_id, launch_id) VALUES (${uid}, ${lid})`;
  connection.query(sql, (err, result, fields) => {
    if (err) {
      res.status(404).send(err);
    }
    console.log(result, fields);
    res.status(200).send(`UserID: ${uid} now watching launch ${lid}`);
  });
  next();
});

// Route to get a list of all launch sites from the database
app.get('/getLaunchSites', cors(corsOptions), (req, res) => {
  const sql = 'SELECT * FROM Launches';
  connection.query(sql, function(errback, resback, fields) {
    if (errback) {
      console.log(errback);
      res.status(404);
    }
    res.send(JSON.stringify(resback));
  });
});


app.get('/serverSideProps', cors(corsOptions), (req, res) => {
  const sendBackData = {worldMapData: require('./assets/worldMapRawData.json'), svg: './assets/wrld-bp-1-svg.svg'};
  try {
    res.status(200).send(JSON.stringify(sendBackData));
  } catch (error) {
    res.status(404);
  }
});

app.get('/populateBackend', cors(corsOptions), (req, res) => {
  // Populating SQL table with request data
  // need to run this twice, once on page 1, and once on page 2
  const options = {
    method: 'GET',
    url: 'https://fdo.rocketlaunch.live/json/locations?page=2',
    headers: {
      Authorization: `Bearer ${process.env.api_key}`,
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
      // ON DUPLICATE KEY UPDATE location_name='${name}'   ....etc
      connection.query(sql, function(err, result) {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }
        console.log('1 record inserted');
      });
    }
    res.status(200).send('Success');
  });
});

app.get('/', cors(corsOptions), (req, res) => {
  console.log('Received response');
  res.send('Hello world!!');
});

app.listen(3000, () => console.log(`Example app is listening on port 3000.`));
