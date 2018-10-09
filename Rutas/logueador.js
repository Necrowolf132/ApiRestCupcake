const express = require('express');
const ruteador = express.Router();
const codificado = require('./../controladores/codificador');
const User = require('./../modelos/usuarios');

ruteador.use(codificado.decodificador);
ruteador.get('/', (resq, res, next) => {
    User.find({_id:'5bbad533a99c8c5f1fa3ae83'}, (err, query) => {
        if(err) throw err;
        res.body = query;
        next();
    });
});
ruteador.post('/', (resq, res, next) => {
    if (resq.decoded){
        console.log('lo obtenido es ', resq.decoded.respuestaActual);
        res.body = {Saludo: 'hooola papu cree usuario ', numeros: [1, 2, 3, 4, 5]};
        next();
    } else {
        res.send("Exprecion sin token, premiso no autorizado");
    }
});
ruteador.use(codificado.codificador);
module.exports = ruteador;