require('dotenv').config();
const shortid = require('shortid')
const Razorpay = require('razorpay')
const request = require('request')

const razorpay = new Razorpay({
	key_id: process.env.KEY_ID,
	key_secret: process.env.KEY_SECRET
});

module.exports.CreateOrder = async(req, res) => {
	const body = req.body
	const amount = body.amount
	const currency = body.currency

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate()
	}

	try {
		const order = await razorpay.orders.create(options)
		console.log(order)
		res.json({
			id: order.id,
			currency: order.currency,
			amount: order.amount
		});

	} catch (error) {
		console.log(error);

		res.status(400).json({
			status: false, 
			error
		});
	}
}

module.exports.Verification = async(req, res) => {
	
	const wallet = req.wallet;
	const secret = process.env.WEBHOOOK_KEY;
	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')

		/* Add money to wallet */
		wallet.balance += req.amount;
		await wallet.save();
		console.log(req.amount);

	} else {
		// fake requsest
	}

	res.json({ 
		status: true,
		message: 'Amount added in wallet successfully!'
	});
}

module.exports.Contact = async(req, res) => {
	try{
		const account = req.account;
		const response = await createContact(req.user);
		
		console.log(response.contact_id);
		account.contact_id = response.contact_id;
		await account.save();

		res.json({
			status: true,
			message: 'Contact id added successfully!'
		});

		// res.send(response)     // response will be contact
		// TODO: store contact_id

	}catch(error){
		console.log(error)	
	}
}

module.exports.AddAccount = async (req, res) => {
	const account = req.account;
	
	const {name, account_number, ifsc} = req;
	account.name = name;
	account.account_number = account_number;
	account.ifsc = ifsc;

	await account.save();
}

module.exports.FundAccountUsingBankAccount = async(req, res) => {

	try{
		const account = req.account;

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

		account.bank_fund_account_id = response.fund_account_id;
		await account.save();

		res.json({
			status: true,
			message: 'Bank fund account id added successfully!'
		});

	}catch(error){
		console.log(error);
		res.status(400).json({
			status: true,
			error
		});
	}
}

module.exports.AddUPI = async(req, res) => {
	const account = req.account;
	const {UPI_id} = req;

	try{
		account.UPI_id = UPI_id;

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

module.exports.FundAccountUsingVPA = async(req, res) => {
	try{
		const account = req.account;

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

		account.vpa_fund_account_id = response.fund_account_id;
		await account.save();

		return res.json({
			status: true,
			message: 'VPA fund account id saved!'
		});

	}catch(error){
		console.log(error);

		return res.status(400).json({
			status: false,
			error
		});
	}
}

module.exports.Payout = async(req, res) => {
	try{
		const wallet = req.wallet;

		// NOT DONE YET!
		//TODO: require fund_account_id (according to map)
		const {fund_account_id, amount, currency, mode, purpose} = req.body
		const userId = req.user.id
		const data = {
			fund_account_id,
			amount,
			currency,
			mode,
			purpose,
			reference_id: userId
		}

		const payoutAmount = response.amount/100; 

		// Check given amount is available or not
		if(wallet.balance < payoutAmount){
			return res.status(400).json({
				status: false,
				error: 'Insufficient balance in wallet!'
			});
		}

		const response = await createPayout(data);

		wallet.balance -= payoutAmount;
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

const doRequest = (options) => {
	return new Promise(function (resolve, reject) {
		request(options, function (error, res, body) {
		  if (!error && res.statusCode == 200) {
			resolve(body);
		  } else {
			reject(error);
		  }
		});
	});
}
const createContact = async (user) => {

	const headers = {
		'Content-Type': 'application/json'
	};
	
	const data = {
	  name: user.name,
	  email: user.email,
	  type: 'customer',
	  reference_id: user.id
	};
	
	const options = {
		url: 'https://api.razorpay.com/v1/contacts',
		method: 'POST',
		headers: headers,
		body: JSON.stringify(data),
		auth: {
			'user': process.env.KEY_ID,
			'pass': process.env.KEY_SECRET
		}
	};
	
	const response = await doRequest(options);
	return response
}

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
	  return response
}

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
	  return response
}

const createPayout = async(payoutInfo) => {
	
	const {fund_account_id, amount, currency, mode, purpose, reference_id} = payoutInfo;

	var headers = {
		'Content-Type': 'application/json'
	};
	
	var data = {
	  account_number: '2323230023678523',
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

	const response = await doRequest(options);
	console.log(response)
	return response
}