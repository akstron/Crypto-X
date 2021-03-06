import React,{useState,useContext} from 'react';
import { Form, InputNumber , Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { UserContext } from "../../../App.js";

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

const AmountConfirm = () => {
    const User = useContext(UserContext);

	// const [name, setName] = useState(User.firstName) 
    const [paying,setPaying]=useState(false);

    async function displayRazorpay(amount) {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		const headers = {
			"Content-Type": "application/json"
		};
		const body = {
			amount,
			currency: 'INR'
		}
		const order = await fetch(process.env.REACT_APP_BACKEND+'/createOrder', {
			 method: 'POST',
			 headers,
			 credentials:'include',
			 body: JSON.stringify(body) 
			}).then((res) =>{
				console.log(res.data);
				return res.json()
			}
		)

		console.log(order)

		const options = {
			key: _DEV_ ? 'rzp_test_xyXW0WOgNrvhPp' : 'PRODUCTION_KEY',
			currency: order.currency,
			amount: order.amount.toString(),
			order_id: order.id,
			name: 'crypto-x',
			description: 'Add money in wallet',
			image:"https://cdn-icons-png.flaticon.com/512/3874/3874387.png",
			handler: function (response) {
				alert(response.razorpay_payment_id)
				alert(response.razorpay_order_id)
				alert(response.razorpay_signature)
			},
			prefill: {
				name: User?.data?.firstName,
				email: User?.data?.email,
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}

    const onFinish = (values) => {
        console.log('Success:', values);
		setPaying(true);
        displayRazorpay(values.amount);
		setPaying(false);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

  return (
    <Form
      name="basic"
      labelCol={{ span: 12 }}
      wrapperCol={{ span: 12 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
        <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Amount can't be Zero !" },
					({ getFieldValue }) => ({
						validator(_, value) {
						if (value > 0) {
							return Promise.resolve();
						}

						return Promise.reject(new Error('Amount must be greater then 1'));
						},
					}),
			]}
        >
            <InputNumber min={0} defaultValue={0} disabled={paying}/>
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" loading={paying}>
                <PlusCircleOutlined style={{margin:"0rem"}}/> Add
            </Button>
        </Form.Item>
    </Form>
  );
};

export default AmountConfirm;