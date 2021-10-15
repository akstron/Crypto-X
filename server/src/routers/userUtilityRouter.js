/**
 * Router of functions available to user
 */

const express = require('express');
const router = express.Router();
const { EditUser } = require('../utility/userUtility'); 
const { IsAuthenticated, IsVerified } = require('../utility/userAuth');

router.post('/edit', IsAuthenticated, IsVerified, EditUser);

module.exports = router;