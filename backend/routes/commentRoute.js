const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require ('../middleware/multer-config');
const commentCtrl = require('../controllers/comment');
const regex = require ('../middleware/regexComment');

router.post('/comment',auth,regex,commentCtrl.createComment);
router.get('/comment', auth,commentCtrl.getAllComments);
router.get('/comment/:id', auth,commentCtrl.getOneComment);
router.put('/comment/:id', auth,commentCtrl.modifyComment);
router.delete('/comment/:id',auth,commentCtrl.deleteComment);




module.exports = router;