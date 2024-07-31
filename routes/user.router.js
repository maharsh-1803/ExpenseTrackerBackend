const { addUser, loginUser, getUserDetailById } = require('../controller/user.controller');
const authToken = require('../middleware/AuthUser');

const router = require('express').Router();

router.post('/addUser',addUser);
router.post('/login',loginUser)
router.get('/userById',authToken,getUserDetailById)

module.exports=router;