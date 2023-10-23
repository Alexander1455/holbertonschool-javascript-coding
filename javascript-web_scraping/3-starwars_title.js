#!/usr/bin/node
const request = require('request');

const movieId = process.argv[2];

if (!movieId) {
  console.log('Usage: node 3-starwars_title.js <movieId>');
} else {
  const url = `https://swapi-api.hbtn.io/api/films/${movieId}`;

  request.get(url, (error, response, body) => {
    if (error) {
      console.error(error);
    } else if (response.statusCode === 200) {
      const movieData = JSON.parse(body);
      console.log(movieData.title);
    } else {
      console.error(`Request failed with status code: ${response.statusCode}`);
    }
  });
}
