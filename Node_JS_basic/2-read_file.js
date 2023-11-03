const fs = require("fs");

function countStudents(path) {
  try {
    // Lee el contenido del archivo CSV de manera síncrona
    const data = fs.readFileSync(path, "utf8");

    // Divide el contenido del archivo en líneas
    const lines = data.split("\n");

    // Inicializa objetos para contar estudiantes por campo
    const studentCount = {
      CS: 0,
      SWE: 0,
    };
    const studentList = {
      CS: [],
      SWE: [],
    };

    // Itera a través de las líneas para contar estudiantes y agregar nombres a las listas
    for (const line of lines) {
      const [firstname, , , field] = line.split(",");
      if (field === "CS") {
        studentCount.CS++;
        studentList.CS.push(firstname);
      } else if (field === "SWE") {
        studentCount.SWE++;
        studentList.SWE.push(firstname);
      }
    }

    // Muestra el resultado en la consola
    console.log("Number of students:", studentCount.CS + studentCount.SWE);
    console.log(
      `Number of students in CS: ${
        studentCount.CS
      }. List: ${studentList.CS.join(", ")}`
    );
    console.log(
      `Number of students in SWE: ${
        studentCount.SWE
      }. List: ${studentList.SWE.join(", ")}`
    );
  } catch (error) {
    throw new Error("Cannot load the database");
  }
}

module.exports = countStudents;
