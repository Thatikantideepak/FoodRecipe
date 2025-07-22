const express = require('express');
const user = require('../models/user');
const router = express.Router();
const { userSignUp, userLogin, getUser } = require('../controller/user');


router.post("/signUp",userSignUp);
router.post("/login", userLogin);
router.get("/user/:id", getUser);


module.exports = router;  