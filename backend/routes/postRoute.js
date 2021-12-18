const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require ('../middleware/multer-config');
const regex = require ('../middleware/regexTitle')

const postCtrl = require('../controllers/post');


router.post('/post',auth,multer,regex,postCtrl.createPost);
router.get('/post',auth,multer, postCtrl.getAllPosts);
router.get('/post/:id',auth,multer, postCtrl.getOnePost);
router.delete('/post/:id',auth,multer,postCtrl.deletePost);
router.put('/post/:id',auth,multer,regex,postCtrl.modifyPost);
router.put('/post/picture/:id',auth,multer,postCtrl.updatePicture);


module.exports = router;
