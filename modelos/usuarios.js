const mongooser = require('mongoose');
const Schema = mongooser.Schema;
const ObjectId = mongooser.ObjectId;

const User = new Schema({
    idUsuario: ObjectId,
    idPerfil: ObjectId,
    idSeccion: ObjectId,
    cedula: Number,
    apellido: String,
    nombre: String,
    extra: Object,
    pass: String
});
module.exports = mongooser.model('usuarios', User);