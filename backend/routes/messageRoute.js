const express = require('express');
const router = express.Router();
const {createMessage,getMessage} =require('../controller/messageController');

router.post('/',createMessage);
router.get('/:chatId',getMessage);

module.exports = router;