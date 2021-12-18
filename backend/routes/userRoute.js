const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');
const schemaPassword = require('../middleware/Password');
const regex = require ('../middleware/regexInput');
const regexEmail = require('../middleware/regexEmail');
const regexLastName = require('../middleware/regexLastName');
const auth = require('../middleware/auth')
const multer = require ('../middleware/multer-config');

router.post('/signup',regex,regexEmail,schemaPassword,userCtrl.signup);
router.post('/login',regex,regexEmail,schemaPassword,userCtrl.login);
router.get('/user',auth,userCtrl.getAllUsers);
router.get('/user/:id',auth,userCtrl.getOneUser);
router.put('/user/:id',auth,regex,regexLastName,regexEmail,userCtrl.updateOneUser);
router.put('/user/picture/:id',auth,multer,userCtrl.updatePicture);
router.delete('/user/delete/:id',auth,userCtrl.deleteUser);







module.exports= router; 