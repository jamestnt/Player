'use strict'

var express = require('express');
var jwt = require('../services/jwt');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/users');

var prueba = (res, req) => {
req.status(200).send({message: 'pruebas service'});
}

var saveUser = (req, res) => {
  var user = new User();
  var params = req.body;

  user.name = params.name;
  user.surname = params.surname;
  user.email = params.email;
  // user.password = params.password;
  user.role = params.role;
  user.image = params.image;

  if (params.password) {

    bcrypt.hash(params.password, null, null , function(err, hash) {
      if (!err) {
            user.password = hash;
            if (user.name != null && user.surname != null && user.email != null) {
              user.save(function(err, userStored){
              console.log("listo para guardar");
                if (err) {
                  console.log("error al guardar");
                  console.log(err);
                  res.status(500).send({message:'Error al guardar el usuario'})
                }else {
                  console.log("guardando");
                  if (!userStored) {
                    res.status(404).send({message:'no se pudo guardar el usuario'})
                  }else {
                    res.status(200).send({user:userStored})
                  }
                }
              });
            }else {
              res.status(200).send({message:'introduce todos los campos'})
            }
      }else {
        console.log("error hash");
      }
    });

  }else{
      res.status(200).send({message:'introduce la contraseña'})
  }
}

var login = (req, res) =>{
  var params = req.body;
  var email = params.email;
  var password = params.password;

  User.findOne({email:(String(email).toLowerCase())}, (err, user)=>{
    if (err) {
      res.status(500).send({message: "error en la peticion"});
    }else {
      if (!user) {
        res.status(404).send({message: "usuario no existe"});
      }else {
        bcrypt.compare(password, user.password, (err, check)=>{
          if (check) {
            if (params.gethash) {
              res.status(200).send({
                token: jwt.createToken(user)
              })
            }else {
              res.status(200).send({user})
            }
          }else {
            res.status(200).send({message:"Correo o contraseña son incorrectos"})
          }
        })
      }
    }
  });
}

var updateUser = (req, res)=>{
  var userId = req.params.id;
  var update = req.body;
  User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
    if (err) {
      res.status(500).send({message:"Error al actualizar al usuario"});
    }else {
      if (!userUpdated) {
        res.status(404).send({message:"No se ha podido actualizar el usuario"});
      }else {
        res.status(200).send({user:userUpdated});
      }
    }
  })
}

module.exports = {
  prueba,
  saveUser,
  updateUser,
  login
};
