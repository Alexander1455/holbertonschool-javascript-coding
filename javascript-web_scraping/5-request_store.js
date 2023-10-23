#!/usr/bin/node
const request = require('request');
const fs = require('fs');

const url = process.argv[2];
const filePath = process.argv[3];

if (!url || !filePath) {
  console.log('Usage: node 5-request_store.js <URL> <file-path>');
} else {
  request.get(url, (error, response, body) => {
    if (error) {
      console.error(error);
    } else if (response.statusCode === 200) {
      fs.writeFile(filePath, body, 'utf-8', (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`The contents have been saved to ${filePath}`);
        }
      });
    } else {
      console.error(`Request failed with status code: ${response.statusCode}`);
    }
  });
}
