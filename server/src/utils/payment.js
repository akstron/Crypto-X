const request = require('request');

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

module.exports.createContact = async (user) => {

	const headers = {
		'Content-Type': 'application/json'
	};
	
	/**
     * NO FIELD LIKE user.name
     */
    
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

	console.log(response);

	return response
}