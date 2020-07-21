require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectDb = require("./configDatabase");
const Estudiantes = require("./ruta/Estudiantes");
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

//ruta por defecto
app.get("/", (req, res) => {
  res.send("ruta por defecto");
});

//consultar todos los estudiantes
app.get("/api/estudiantes/", async (req, res) => {
  const estudiantes = await Estudiantes.find().exec();
  res.json({
    estudiantes,
    cantidad: estudiantes.length,
  });
});

//añadir un estudiante
app.post("/api/estudiantes/", async (req, res) => {
  const { nombre, apellido, edad, telefono } = req.body;
  await Estudiantes.create({ nombre, apellido, edad, telefono });
  res.send("estudiante añadido correctamente");
});

//encontrar un estudiante por su ID
app.get("/api/estudiantes/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const estudiante = await Estudiantes.findById(id).exec();
    res.json(estudiante);
  } catch (error) {
    console.log(`error obteniendo estudiante ${error}`);
    res.json({});
  }
});

//actualizar un estudiante por su ID
app.put("/api/estudiantes/:id", async (req, res) => {
  const id = req.params.id;
  const updated = req.body;
  try {
    await Estudiantes.findByIdAndUpdate(id,updated).exec();
    res.send("actualizado correctamente");
  } catch (error) {
    console.log(`error actualizando estudiante ${error}`);
    res.json({});
  }
});

//eliminar un estudiante por su ID
app.delete("/api/estudiantes/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Estudiantes.findByIdAndDelete(id).exec();
    res.send("Estudiante eliminado correctamente");
  } catch (error) {
    console.log(`error eliminando estudiante ${error}`);
    res.json({});
  }
});

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Ejecutando en el puerto ${PORT}`);
  });
});