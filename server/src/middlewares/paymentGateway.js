require('dotenv').config();
const shortid = require('shortid')
const Razorpay = require('razorpay')
const request = require('request')

const razorpay = new Razorpay({
	key_id: process.env.KEY_ID,
	key_secret: process.env.KEY_SECRET
})


module.exports.createOrder = async(req, res) => {
	console.log('createOrder route called')
	console.log(process.env.KEY_ID)
	const body = req.body
	const amount = body.amount
	const currency = body.currency;

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate()
	};

	try {
		const order = await razorpay.orders.create(options);
		console.log(order);
		return res.send(order)
		// return res.json({
		// 	id: order.id,
		// 	currency: order.currency,
		// 	amount: order.amount
		// });
	} catch (error) {
		console.log(error);
		res.status(400).json(error);
	}
}

module.exports.verification = async(req, res) => {
	
	const secret = process.env.WEBHOOOK_KEY;

	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
		// TODO: add the money in wallet
	} else {
		// fake requsest
	}
	res.json({ status: 'ok' })
}

module.exports.contact = async(req, res) => {
	try{
		const response = await createContact(req.user);
		res.send(response)     // response will be contact
		// TODO: store contact_id
	}catch(error){
		console.log(error)
	}
}

module.exports.fundAccountUsingBankAccount = async(req, res) => {
	try{
		///TODO: require all below things from database
		const {name, contact_id, account_number, ifsc} = req.body
		const data = {
			name,
			contact_id,
			account_number,
			ifsc,
			account_type: 'bank_account'
		}
		const response = await createFundAccountUsingBankAccount(data);
		res.send(response)
		//TODO: store fund_account_id for bank account in database
	}catch(error){
		console.log(error)
	}
}

module.exports.fundAccountUsingVPA = async(req, res) => {
	try{
		// TODO: require all below things form database
		const {contact_id, UPI_ID} = req.body
		const data = {
			UPI_ID,
			contact_id,
			account_type: 'vpa'
		}
		const response = await createFundAccountUsingVPA(data);
		res.send(response)
		//TODO: store fund_account_id for vpa in database
	}catch(error){
		console.log(error)
	}
}

module.exports.payout = async(req, res) => {
	try{
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
		const response = await createPayout(data);
		res.send(response)
		// TODO: subtract response.amount/100 from wallet money
	}catch(error){
		console.log(error)
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