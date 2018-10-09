const jwt = require('jsonwebtoken');

module.exports.codificador = function  (resq, res) {
    const respuestaActual = res.body;
    const token = jwt.sign({respuestaActual}, resq.app.get('SuperSecret1'), {algorithm: 'RS256', expiresIn: 600 });
    res.json({procesado: true, message: 'todo hecho como debe ser', token});
};
module.exports.decodificador = function (resq, res, next) {
    var token = resq.body.token || resq.query.token || resq.headers['x-access-token'];
    if(token) {
        jwt.verify(token, resq.app.get('SuperSecret2'), { algorithms: ['RS256'] }, function (err, payload) {
            if (err){
                if( err.name === 'TokenExpiredError') {
                    res.json({procesado: false, tipo: 'Tiempo de token expirado'});
                } else {
                    res.json({procesado: false, tipo: 'Token mal formado'});
                }
            } else {
                resq.decoded =  payload;
                next();
            }
        });
    } else {
        next();
    }
};
