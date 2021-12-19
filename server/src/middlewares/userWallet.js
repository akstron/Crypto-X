/**
 * Wallet related middlewares
 */

const Wallet = require('../models/Wallet');

module.exports.PopulateWallet = async (req, res, next) => {

    const walletId = req.user.wallet;

    try{
        const wallet = await Wallet.findById(walletId);
        if(!wallet){
            return res.status(500).json({
                status: false,
                error: 'No wallet can be found!'
            });
        }

        req.wallet = wallet;
        next();
    }
    catch(e){
        return res.status(500).json({
            status: false,
            error: 'Internal server error'
        });
    }
};

module.exports.GetWallet = async (req, res) => {
    const wallet = req.wallet;

    try{
        await wallet.populate({
            path: 'coins',
            select: ['coinType', 'costPrice', 'sellPrice']
        });

        return res.json({
            status: true,
            wallet
        });
    }
    catch(e){
        console.log('this:' + e);
        return res.status(500).json({
            status: false,
            error: 'Internal server error'
        }); 
    }
}