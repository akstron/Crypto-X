require('dotenv').config();
const cors = require("cors");
const express = require("express");

const stripe = require("stripe")(process.env.SECRET_KEY);

const app = express();

app.use(express.json());
app.use(cors());

module.exports.payment = async (req, res) =>{ 

	const {token, amount} = req.body;

    console.log(req.body);
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
		res.status(200).json(result); // If no error occurs 
	}) 
	.catch((err) => { 
		res.status(400).json(err);	
		console.log(error); // If some error occurs 
	}); 
}
