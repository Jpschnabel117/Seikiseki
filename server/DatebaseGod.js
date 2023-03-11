/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
/* eslint-disable guard-for-in */
// Populating SQL table with request data
// need to run this twice, once on page 1, and once on page 2
require('dotenv').config(); // Load environment variables
const request = require('request');

let last_page;


async function populateLaunchTableData(dataarray = [], page = 1) {
  const options = {
    method: 'GET',
    url: `https://fdo.rocketlaunch.live/json/launches?after_date=1963-01-01&page=${page}`,
    headers: {
      Authorization: `Bearer ${process.env.api_key}`,
    },
  };
  const data = {};
  try {
    request(options, async (err, results) => {
      try {
        data = (results.body);
      } catch (error) {
        console.error('Error parsing JSON:', err);
        console.error('Response body:', results.body);
        throw new Error('Error parsing JSON');
      }
    });

    if (!last_page) {
      last_page = data.last_page;
    }

    if (page > last_page) {
      return {
        message: `inserted ${page} pages of data`,
        data: putData(dataarray),
      };
    }

    for (const launch of await data.result) {
      const obj = {
        'id': launch.id,
        'sort_date': launch['sort_date'],
        'rocket_name': launch['name'],
        'provider': launch['provider.name'],
        'vehicle': launch['vehicle.name'],
        'date_str': launch['date_str'],
        'quicktext': launch['quicktext'],
        'result': launch['result'],
      };

      dataarray.push(obj);
      page++;

      await populateLaunchTableData(dataarray, page);
    }
  } catch (error) {
    console.error(error);
  }
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
