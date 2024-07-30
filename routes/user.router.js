const { addUser, loginUser } = require('../controller/user.controller');

const router = require('express').Router();

router.post('/addUser',addUser);
router.post('/login',loginUser)

module.exports=router;