#!/usr/bin/node
const request = require('request');

const movieId = process.argv[2];

if (!movieId) {
  console.log('Usage: node 100-starwars_characters.js <Movie ID>');
} else {
  const url = `https://swapi-api.hbtn.io/api/films/${movieId}/`;

  request.get(url, (error, response, body) => {
    if (error) {
      console.error(error);
    } else if (response.statusCode === 200) {
      const movieData = JSON.parse(body);

      // Obtener la lista de personajes
      const characters = movieData.characters;

      // Realizar solicitudes para obtener los nombres de los personajes
      characters.forEach((characterUrl) => {
        request.get(characterUrl, (charError, charResponse, charBody) => {
          if (charError) {
            console.error(charError);
          } else if (charResponse.statusCode === 200) {
            const characterData = JSON.parse(charBody);
            console.log(characterData.name);
          } else {
            console.error(`Request failed with status code: ${charResponse.statusCode}`);
          }
        });
      });
    } else {
      console.error(`Request failed with status code: ${response.statusCode}`);
    }
  });
}
