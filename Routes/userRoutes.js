const express = require('express');
const { adminsOnly, isUserLoggedIn } = require("../middlware/middleware.js");
const {
    homepage,
    updateUser,
    getAllUsers,
    deleUser,
    registerUser, 
    loginUser,
    getNewToken,
    logout
} = require('../controllers/controllers.js');
const { generateFreshToken } = require('../utils/generatetoken.js');
const cookieParser = require('cookie-parser');


const router = express.Router();

router.use(cookieParser());

router.get('/', homepage);

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/refresh_token', generateFreshToken, getNewToken);

router.post('/logout', logout);

router.use(isUserLoggedIn);

router.patch('/update/:id', updateUser);

router.delete('/delete/:user', deleUser);

router.get('/all-users', adminsOnly, getAllUsers);



module.exports = router;