require('dotenv').config();
const cors = require("cors");
// const express = require("express");
const stripe = require("stripe")(process.env.SECRET_KEY);

const User = require('../models/User');
const Wallet = require('../models/Wallet');

/**
 * TODO: check why there is app instance, and cors()
 */

// const app = express();

// app.use(express.json());
// app.use(cors());

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
            res.status(200).json(result);
			
			// On success put the amount in database
			Wallet.findById(user.wallet).then((wallet) => {
				wallet.amount += amount;
				return wallet.save();
			})
			.then(wallet => {
				console.log(wallet);
				res.json({
					status: true,
					wallet
				})
			}).catch(e => {
				res.status(500).json({
					status: false,
					error: e
				})
			})

        }else{
            res.status(400).json(result);
        }
	}) 
	.catch((err) => { 
		res.status(400).json(err);	
		console.log(error); // If some error occurs 
	}); 
}
