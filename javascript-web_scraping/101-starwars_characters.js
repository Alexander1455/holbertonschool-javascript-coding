#!/usr/bin/node
const request = require('request');

const movieId = process.argv[2];

if (!movieId) {
  console.log('Usage: node 101-starwars_characters.js <Movie ID>');
} else {
  const url = `https://swapi-api.hbtn.io/api/films/${movieId}/`;

  request.get(url, (error, response, body) => {
    if (error) {
      console.error(error);
    } else if (response.statusCode === 200) {
      const movieData = JSON.parse(body);

      // Obtener la lista de personajes en el orden correcto
      const characterUrls = movieData.characters;

      // Función para obtener y mostrar los nombres de los personajes
      function getCharacterName(index) {
        if (index < characterUrls.length) {
          request.get(characterUrls[index], (charError, charResponse, charBody) => {
            if (charError) {
              console.error(charError);
            } else if (charResponse.statusCode === 200) {
              const characterData = JSON.parse(charBody);
              console.log(characterData.name);
              getCharacterName(index + 1); // Llamar recursivamente para el siguiente personaje
            } else {
              console.error(`Request failed with status code: ${charResponse.statusCode}`);
            }
          });
        }
      }

      // Comenzar la secuencia para obtener los nombres de los personajes
      getCharacterName(0);
    } else {
      console.error(`Request failed with status code: ${response.statusCode}`);
    }
  });
}
