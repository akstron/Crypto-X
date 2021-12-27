require('dotenv').config();
const shortid = require('shortid')
const Razorpay = require('razorpay')
const request = require('request');
const { response } = require('express');
const payOrderMap = require('../store/PaymentOrderMap');
const { getSocketId } = require('../store/SocketMap');

const razorpay = new Razorpay({
	key_id: process.env.KEY_ID,
	key_secret: process.env.KEY_SECRET
});

// create order for payment middleware
module.exports.CreateOrder = async(req, res) => {
	const body = req.body
	const amount = body.amount
	const currency = body.currency;
    
	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate()
	};

	try {
		const wallet = req.wallet;
		const order = await razorpay.orders.create(options)
		console.log(order)
		payOrderMap.set(order.id, {
			wallet,
			userId: req.user.id
		});     
		
		return res.json({
			status: true,
			id: order.id,
			currency: order.currency,
			amount: order.amount
		});

	} catch (error) {
		console.log(error);

		return res.status(500).json({
			status: false, 
			error
		});
	}
}

// payment verification 
module.exports.Verification = async(req, res) => {
	console.log(req.body.payload.payment.entity)

	//const wallet = req.wallet;
	const secret = process.env.WEBHOOOK_KEY;
	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
		const orderId = req.body.payload.payment.entity.order_id;
		/* Add money to wallet */
		if(payOrderMap.has(orderId)){
			const wallet = payOrderMap.get(orderId).wallet;
			const amount = req.body.payload.payment.entity.amount/100;
			wallet.balance = parseFloat(wallet.balance) + amount;
			await wallet.save();

			const io = require('../server');
			const userId = payOrderMap.get(orderId).userId;
			
			const socketId = getSocketId(userId);
			if(io && socketId){
				// sending new wallet balance to the user through socketId
				io.to(socketId).emit('paymentStatus', wallet.balance);
			}

			payOrderMap.delete(orderId); //this orderId is successfully processed so deleting it
				
		}
		

	} else {
		// fake requsest
	}

	res.json({ 
		status: true,
		message: 'Amount added in wallet successfully!'
	});
}

const doRequest = (options) => {
	return new Promise(function (resolve, reject) {
		request(options, function (error, res, body) {
		  if (!error) {
			resolve(body);
		  } else {
			reject(error);
		  }
		});
	});
}

// middlware for adding account information
module.exports.AddAccount = async (req, res) => {
	const account = req.account;

	try{
		const {name, account_number, ifsc} = req.body;
		account.name = name;
		account.account_number = account_number;
		account.ifsc = ifsc;
	
		await fundAccountUsingBankAccount(account);
		await account.save();

		return res.json({
			status: true,
			message: 'Bank account have been successfully created'
		})
	}
	catch(e){
		console.log(e)
		res.status(500).json({
			status: false,
			error: e
		});
	}

}

// utility function for creating fund_account_id for bank_account
const fundAccountUsingBankAccount = async (account) => {

	try{

		///TODO: require all below things from database
		const {name, contact_id, account_number, ifsc} = account;
		const data = {
			name,
			contact_id,
			account_number,
			ifsc,
			account_type: 'bank_account'
		};

		const response = await createFundAccountUsingBankAccount(data);

		//TODO: store fund_account_id for bank account in database
		// fund_account_id_bank_account

		account.bank_fund_account_id = JSON.parse(response).id
		
		console.log(account.bank_fund_account_id)
		await account.save();

		return response;
		

	}catch(error){
		throw error;
	}
}

// middleware for adding UPI information
module.exports.AddUPI = async(req, res) => {
	const account = req.account;
	const {UPI_id} = req.body;

	

	try{

		account.UPI_id = UPI_id;
		await fundAccountUsingVPA(account);

		await account.save();

		return res.json({
			status: true,
			message: 'UPI id added!'
		});
	}
	catch(e){
		console.log(e);
		return res.status(500).json({
			status: false,
			error: e
		});
	}
}

// utility function for creating fund_account_id for vpa(upi)
const fundAccountUsingVPA = async(account) => {
	try{

		// TODO: require all below things form database
		const {contact_id, UPI_id} = account;
		const data = {
			UPI_ID: UPI_id,
			contact_id,
			account_type: 'vpa'
		}
		const response = await createFundAccountUsingVPA(data);
		//TODO: store fund_account_id for vpa in database

		// fund_account_id_vpa

		account.vpa_fund_account_id = JSON.parse(response).id;
		await account.save();

		return response;

	}catch(error){
		throw error;
	}
}

// middleware for payout
module.exports.Payout = async(req, res) => {
	try{
		const wallet = req.wallet;
		//console.log('2nd   ', wallet)

		// NOT DONE YET!
		//TODO: require fund_account_id (according to mode)
		const {amount, currency, mode, purpose} = req.body
		var fund_account_id;
		console.log(req.account)
		
		if(mode === 'IMPS'){
			fund_account_id = req.account.bank_fund_account_id
		}else{
			fund_account_id = req.account.vpa_fund_account_id;
		}
		
		const userId = req.user.id
		const data = {
			fund_account_id,
			amount,
			currency,
			mode,
			purpose,
			reference_id: userId
		}
		
		console.log(data)

		// Check given amount is available or not
		if(parseFloat(wallet.balance) < parseFloat(data.amount)){
			return res.status(400).json({
				status: false,
				error: 'Insufficient balance in wallet!'
			});
		}

		const response = await createPayout(data);
		console.log(response)
		const payoutAmount = parseFloat(JSON.parse(response).amount)/100; 
		wallet.balance = parseFloat(parseFloat(wallet.balance) - payoutAmount);
		console.log(wallet);
		await wallet.save();

		return res.json({
			status: true,
			message: 'Payout completed'
		});

	}catch(error){
		
		console.log(error)
		return res.status(500).json({
			status: false,
			error
		});
	}
}

// utility function for creating fund account (bank_account)
const createFundAccountUsingBankAccount = async ({contact_id, name, ifsc, account_number, account_type}) => {
	
	const headers = {
		'Content-Type': 'application/json'
	};
	
	const data = {
	  contact_id,
	  account_type,
	  bank_account:{
		name,
		ifsc,
		account_number
	  }
	};
	
	const options = {
		url: 'https://api.razorpay.com/v1/fund_accounts',
		method: 'POST',
		headers: headers,
		body: JSON.stringify(data),
		auth: {
			'user': process.env.KEY_ID,
			'pass': process.env.KEY_SECRET
		}
	};

	  const response = await doRequest(options);
	  if(JSON.parse(response).error){
		  throw new Error(JSON.parse(response).error.description);
	  }
	  return response
}

// utility function for creating fund account (vpa)
const createFundAccountUsingVPA = async ({contact_id, UPI_ID, account_type}) => {
	
	const headers = {
		'Content-Type': 'application/json'
	};
	
	const data = {
	  contact_id,
	  account_type,
	  vpa:{
		address: UPI_ID
	  }
	};
	
	const options = {
		url: 'https://api.razorpay.com/v1/fund_accounts',
		method: 'POST',
		headers: headers,
		body: JSON.stringify(data),
		auth: {
			'user': process.env.KEY_ID,
			'pass': process.env.KEY_SECRET
		}
	};

	const response = await doRequest(options);
	if(JSON.parse(response).error){
		throw new Error(JSON.parse(response).error.description);
	}
	return response
}

// utility function for payout
const createPayout = async(payoutInfo) => {
	
	const {fund_account_id, amount, currency, mode, purpose, reference_id} = payoutInfo;

	var headers = {
		'Content-Type': 'application/json'
	};
	
	var data = {
	  account_number: process.env.RAZORPAY_PAYOUT_AC_NO,
	  fund_account_id,
	  amount: amount*100,
	  currency,
	  mode,
	  purpose,
	  queue_if_low_balance: true,
	  reference_id
	};
	
	var options = {
		url: 'https://api.razorpay.com/v1/payouts',
		method: 'POST',
		headers: headers,
		body: JSON.stringify(data),
		auth: {
			'user': process.env.KEY_ID,
			'pass': process.env.KEY_SECRET
		}
	};

	console.log(options)
	
	const response = await doRequest(options);
	console.log(response)
	if(JSON.parse(response).error.description){
		throw new Error(JSON.parse(response).error.description);
	}
	return response
	
}