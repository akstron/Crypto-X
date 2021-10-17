/**
 * Middlewares for functions available to user
 */

const mongoose = require('mongoose');
const Wallet = require('../models/Wallet');
const Bank = require('../models/Bank');
const getCurrentPrice = require('../utils/currentPrice');
const {v4: idGererator} = require('uuid');

/* Function for checking edit access */ 
const checkEditPossible = (changes) => {
    return (
    !('isVerified' in changes || 
    'isEligible' in changes || 
    'wallet' in changes || 
    'email' in changes || 
    '_id' in changes || 
    'googleId' in changes));
}

module.exports.EditUser = async (req, res) => {
    
    try{
        const changes = req.body;
        const user = req.user;

        if(!checkEditPossible(changes)){
            return res.status(405).json({
                status: false,
                error: 'Changes not allowed'
            });
        }

        for(const [key, value] of Object.entries(changes)){
            user[key] = value;
        }

        await user.save();
    
        return res.json({
            status: true, 
            user
        });

    } catch(e){
        console.log(e);
        
        return res.status(500).json({
            status: false,
            error: 'Internal server error'
        });
    }
};

const updateBank = (coins, updates) => {
    for(const [key, value] of Object.entries(updates)){
        if(key in coins){
            coins[key] += value * -1;
        } 
        else {
            coins[key] = value * -1;
        }
    }
}

const addTransaction = (coins, updates, rate) => {
    for(const [key, value] of Object.entries(updates)){
        if(key in coins){
            coins[key].push({
                id: idGererator(), 
                coins: value,
                rate
            });
        }
        else{
           coins[key] = [{
                id: idGererator(),
                coins: value,
                rate
           }];
        }
    }
}

/**
 * TODO: Add checks whether account reaches below zero
 */

module.exports.Transaction = async (req, res) => {
    const user = req.user;
    const {updates} = req.body;
    const session = await mongoose.startSession();

    console.log(user);
    console.log(updates);

    try{
        session.startTransaction();

        const wallet = await Wallet.findById(user.wallet).session(session);
        var bank = await Bank.findOne({}).session(session);

        if(!bank){
            bank = new Bank({}, session);
            await bank.save();
        }

        const rate = await getCurrentPrice('bitcoin');

        addTransaction(wallet.coins, updates, rate);
        updateBank(bank, updates);

        wallet.markModified('coins');

        await wallet.save();
        await bank.save();

        await session.commitTransaction();
        session.endSession();

        res.json({
            wallet
        });

    } catch(e){

        await session.abortTransaction();
        session.endSession();
        console.log(e);
        res.json({
            status: false,
            error: 'Internal server error'
        })
    }
}