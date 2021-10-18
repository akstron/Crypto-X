require('dotenv').config();
const stripe = require("stripe")(process.env.SECRET_KEY);
const Wallet = require('../models/Wallet');

module.exports.payment = async (req, res) =>{ 

	const user = req.user;
	const {token, amount} = req.body;

	stripe.customers.create({ 
		email: token.email, 
		source: token.id, 
	}) 
	.then((customer) => { 
		return stripe.charges.create({ 
			amount: amount*100,	 
			description: 'Adding money in wallet', 
			currency: 'INR', 
			receipt_email: token.email,
			customer: customer.id 
		}); 
	}) 
	.then((result) => { 
		 // If no error occurs 
        if(result.status === 'succeeded'){
			// On success put the amount in database

			Wallet.findById(user.wallet).then((wallet) => {

				wallet.balance = wallet.balance + parseInt(amount);
				return wallet.save();
			})
			.then(wallet => {
				return res.json({
					status: true,
					wallet
				});

			}).catch(error => {
			 return res.status(500).json({
					status: false,
					error
				});
				
			})

        }else{
            return res.status(400).json(result);
        }
	}) 
	.catch((error) => { 
			
		console.log(error); // If some error occurs 
		return res.status(400).json(error);
	}); 
}
