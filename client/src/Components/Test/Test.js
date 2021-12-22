import React, { useState } from 'react'

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const _DEV_ = document.domain === 'localhost'

function Test() {
	const [name, setName] = useState('Saurabh')

	async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}
		console.log(res);

		const headers = {
			"Content-Type": "application/json"
		};
		const amount = 50;
		const body = {
			amount,
			currency: 'INR'
		}

		const order = await fetch('http://localhost:8000/createOrder', {
			 method: 'POST',
			 credentials:'include',
			 headers,
			 body: JSON.stringify(body) 
			}).then((res) =>{
				return res.json()
            }
		)

		console.log(order)

		const options = {
			key: _DEV_ ? 'rzp_test_xyXW0WOgNrvhPp' : 'PRODUCTION_KEY',
			currency: 'INR',
			amount: order.amount.toString(),
			order_id: order.id,
			name: 'crypto-x',
			description: 'money added in wallet',
			handler: function (response) {
				alert(response.razorpay_payment_id)
				alert(response.razorpay_order_id)
				alert(response.razorpay_signature)
			},
			prefill: {
				name,
				email: 'abcd@gmail.com',
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}

	async function doPayout(){
		console.log('dopayout')
		const res = await fetch('http://localhost:1337/payout')
		console.log(res);
	}

	return (
		<div className="App">
			<header className="App-header">
				
				
				<button
					className="btn"
					onClick={displayRazorpay}
					target="_blank"
					rel="noopener noreferrer"
				>
					PAY
				</button>
				<button
					className="btn"
					onClick={doPayout}
				>
					PAYOUT
				</button>
			</header>
		</div>
	)
}

export default Test;