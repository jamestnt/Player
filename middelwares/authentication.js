'use strict;'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret ='clave_secreta_ALV';

exports.ensureAuth = (req, res, next) =>{
  var params = req.body;
  var headers = req.headers;
  if (!headers.authorization) {
    return  res.status(403).send({message: "no header authorization"});
  }else {
    var token = headers.authorization.replace(/["']+/g, "" );
    try {
      var payload = jwt.decode(token, secret);
      if (payload.exp <= moment.unix()) {
        return  res.status(401).send({message: "token expirado"});
      }else {

      }
    } catch (e) {
      console.log(e);
      return  res.status(403).send({message: "token no valido"});
      return
    } finally {

    }
  }
  req.user = payload;
  next();
};
