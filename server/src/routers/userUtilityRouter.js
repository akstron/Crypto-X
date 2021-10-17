/**
 * Router of functions available to user
 */

const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const { EditUser, Transaction } = require('../middlewares/userUtility'); 
const { IsAuthenticated, IsVerified } = require('../middlewares/userAuth');
const { validationHandler } = require('../middlewares/validationHandler');

router.post('/edit', IsAuthenticated, IsVerified, 
    body('password').optional()
    .isLength({min: 7}).withMessage('Provide password of atleast length 7')
    /* Regex for checking password*/
    .matches( /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/)
    .withMessage('Password should contain letter, number and special character'),
    validationHandler,
EditUser);
router.put('/transaction', IsAuthenticated, IsVerified, Transaction);


module.exports = router;