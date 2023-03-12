/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
/* eslint-disable guard-for-in */
// Populating SQL table with request data
// need to run this twice, once on page 1, and once on page 2
require('dotenv').config(); // Load environment variables
const request = require('request');
const mysql = require('mysql2');

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

async function populateLaunchTableData() {
  const options =(page) => ({
    method: 'GET',
    url: `https://fdo.rocketlaunch.live/json/launches?after_date=1963-01-01&page=${page}`,
    headers: {
      Authorization: `Bearer ${process.env.api_key}`,
    },
  });
  let last_page = 100;

  let page = 1;

  const rid = setInterval(() => {
    if (page >= last_page) {
      clearInterval(rid);
    }
    request(options(page), async (err, results) => {
      try {
        console.log(page);
        data= JSON.parse(results.body);
        last_page=data['last_page'];
        for (const launch of data['result']) {
          console.log(launch['id']);
          if (launch['pad']['location']['statename'] == 'Florida') {
            console.log('mutating location name');
            launch['pad']['location']['name'] =
            'Cape Canaveral/Kennedy Space Center';
          }
          const obj = {
            'id': launch.id,
            'sort_date': launch['sort_date'],
            'rocket_name': launch['name'],
            'launch_site': launch['pad']['location']['name'],
            'provider': launch['provider']['name'],
            'vehicle': launch['vehicle']['name'],
            'date_str': launch['date_str'],
            'quicktext': launch['quicktext'],
            'result': launch['result'],
          };


          const {id, sort_date, rocket_name, launch_site,
            provider, vehicle, date_str, quicktext, result} = obj;
          const sql = `INSERT INTO LaunchData(
                  id, sort_date, rocket_name, 
                  launch_site, prov, vehicle, 
                  date_str, quicktext, result) 
                  VALUES('${id}','${sort_date}','${rocket_name}', 
                  '${launch_site}','${provider}','${vehicle}', 
                  '${date_str}','${quicktext}', '${result}')
              ON DUPLICATE KEY UPDATE 
                  sort_date = '${sort_date}', 
                  rocket_name = '${rocket_name}', 
                  launch_site = '${launch_site}', 
                  prov = '${provider}', 
                  vehicle = '${vehicle}', 
                  date_str = '${date_str}', 
                  quicktext = '${quicktext}', 
                  result = '${result}'`;
          connection.query(sql, function(err, result) {
            if (err) {
              console.error(err);
            }
            console.log('1 record inserted');
          });
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
        console.error('Response body:', results.body);
        throw new Error('Error parsing JSON');
      }


      page++;
    });
  }, (3000));
};


populateLaunches = async () => {
  const options= (page) = {
    method: 'GET',
    url: `https://fdo.rocketlaunch.live/json/locations?page=#{page}`,
    headers: {
      Authorization: `Bearer ${process.env.api_key}`,
    },
  };
  for (let i = 0; i <= 2; i++) {
    request(options(i), function(error, response) {
      if (error) throw new Error(error);
      const data = JSON.parse(response.body);
      const result = data.result;
      for (i in result) {
        let {name, latitude, longitude, country, utcOffset} = result[i];
        if (!longitude) longitude = 0.0;
        if (!latitude) latitude = 0.0;
        if (!utcOffset) utcOffset= 0;
        if (!country) {
          country = {code: 'NA'};
        }
        console.log(country);
        const sql = `INSERT INTO Launches(location_name, country, 
        longitude, latitude, utcOffset) VALUES 
        ('${name}','${country.code}','${longitude}',
        '${latitude}','${utcOffset}')`;
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
  }
};

populateLaunchTableData();
