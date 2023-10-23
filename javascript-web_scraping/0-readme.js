#!/usr/bin/node
const fs = require('fs');

const filePath = process.argv[2]; // Obtener el primer argumento (nombre del archivo) desde la línea de comandos

if (!filePath) {
  console.log('Usage: node 0-readme.js <file-path>');
} else {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err); // Imprimir el error en caso de que ocurra uno
    } else {
      console.log(data); // Imprimir el contenido del archivo
    }
  });
}
