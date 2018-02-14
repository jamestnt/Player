var express = require('express');
var UserController = require('../controllers/users');
var router = express.Router();
var md_auth = require('../middelwares/authentication');
/* GET users listing. */
router.get('/prueba', md_auth.ensureAuth, UserController.prueba);
router.post('/register', UserController.saveUser);
router.post('/login', UserController.login);
router.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);

module.exports = router;
