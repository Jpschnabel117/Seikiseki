/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
/* eslint-disable guard-for-in */
// Populating SQL table with request data
// need to run this twice, once on page 1, and once on page 2

import request from 'request';

populateLaunchTableData = async () => {
  const options = {
    method: 'GET',
    url: 'https://fdo.rocketlaunch.live/json/launches?after_date=1963-01-01&page=1',
    headers: {
      Authorization: `Bearer ${process.env.api_key}`,
    },
  };
  request(options, function(error, response) {
    if (error) throw new Error(error);
    const data = JSON.parse(response.body);
    const {last_page} = data;
  });
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

