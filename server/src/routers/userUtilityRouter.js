/**
 * Router of functions available to user
 */

const express = require('express');
const router = express.Router();
const { EditUser, Transaction } = require('../utility/userUtility'); 
const { IsAuthenticated, IsVerified } = require('../utility/userAuth');

router.post('/edit', IsAuthenticated, IsVerified, EditUser);
router.put('/transaction', IsAuthenticated, IsVerified, Transaction);
// router.put('/transaction', Transaction);

const func = (cb) => {
    cb();
}

router.post('/check', (req, res) => {
    func(() => {
        res.json({
            success: true
        })
    });
});

module.exports = router;