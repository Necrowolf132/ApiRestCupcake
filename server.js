const express = require('express');
const  app = express();
const bodyParser = require('body-parser');
const morganso = require('morgan');
const mongoose = require('mongoose');
const Configuracion = require('./config');
const Logeador = require('./Rutas/logueador');

// Configuraciones
app.set('port', process.env.PORT || 3000);
mongoose.connect(Configuracion.dataBase, {useNewUrlParser: true });
mongoose.Promise = global.Promise;
app.set('SuperSecret1', Configuracion.privateKey);
app.set('SuperSecret2', Configuracion.publicKeyPrueba);
//  midddlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({}));
app.use((req, res, next) => {
    console.log('yo recibi esto ----> ', req.body);
    next();
});
app.get('/api', (resq, res) => {
    res.send("Bienvenido a la super api de la Escuela Experimental Venezuela");
});
app.use(morganso('combined'));
app.use('/login', Logeador);
app.get('*', (resq, res) => {
    res.send("Ruta inaccesible , o sin permisos");
})

app.listen(app.get('port'), () => {
    console.log(`servidor iniciado en  el puerto ${app.get('port')} `)
})