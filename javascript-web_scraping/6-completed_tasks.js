#!/usr/bin/node
const request = require('request');

const apiUrl = process.argv[2];

if (!apiUrl) {
  console.log('Usage: node 6-completed_tasks.js <API URL>');
} else {
  request.get(apiUrl, (error, response, body) => {
    if (error) {
      console.error(error);
    } else if (response.statusCode === 200) {
      const todos = JSON.parse(body);

      // Crear un objeto para contar las tareas completadas por usuario
      const completedTasks = {};

      for (const todo of todos) {
        if (todo.completed) {
          if (completedTasks[todo.userId]) {
            completedTasks[todo.userId]++;
          } else {
            completedTasks[todo.userId] = 1;
          }
        }
      }

      console.log(completedTasks);
    } else {
      console.error(`Request failed with status code: ${response.statusCode}`);
    }
  });
}
