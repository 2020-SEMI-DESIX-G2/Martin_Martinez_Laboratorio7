const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  edad: Number,
  telefono: String
});

const Estudiantes = mongoose.model('Estudiantes', schema);

module.exports = Estudiantes;