var express = require('express');
var router = express.Router();
var User = require("../../../database/collections/user");
//CRUD Create, Read, Update, Delete/*del video rest*/
//Creation of users--registrar usuarios/*del video rest*/
router.post("/user", (req, res) => {
  if (req.body.name == "" && req.body.email == "") {
    res.status(400).json({
      "msn" : "formato incorrecto"
    });
    return;
  }
    var user = {
    name : req.body.name,
    altura : req.body.altura,
    peso : req.body.peso,
    edad : req.body.edad,
    sexo : req.body.sexo,
    email : req.body.email
  };
  var userData = new User(user);

  userData.save().then( () => {
    //json remmplazo a content-type/*del video rest*/
    res.status(200).json({
      "msn" : "usuario Registrado con exito "
    });
  });
});

// READ all users-- leer todos los usuarios/*del video rest*/
router.get("/user", (req, res, next) => {
  User.find({}).exec( (error, docs) => {
    res.status(200).json(docs);
  })
});

// Read only one user-- leer por cada usuario/*del video rest*/
router.get(/user\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  User.findOne({_id : id}).exec( (error, docs) => {
    if (docs != null) {
        res.status(200).json(docs);
        return;
    }

    res.status(200).json({
      "msn" : "No existe el recurso "
    });
  })
  //console.log(url);
});

// delete only one user-- eliminar un usuario/*del video rest*/
router.delete(/user\/[a-z0-9]{1,}$/, (req, res) => {
  var url = req.url;
  var id = url.split("/")[2];
  User.find({_id : id}).remove().exec( (err, docs) => {
      res.status(200).json(docs);
  });
});





});

module.exports = router;
