import React,{useState,useEffect} from 'react'
import {Form,Select,InputNumber,Card,Button} from 'antd'
import axios from 'axios'

import notificationIcon from '../../../Images/NotifyMe/notificationsIcon.png'

const { Option } = Select;

const ManageNotification = () => {
    
    const [cryptosList, setcryptosList] = useState({data:undefined,isFetching:true});

	const getCoinsDetailsAPI=(count)=>{
		const options = {
			method: 'GET',
			url: 'https://coinranking1.p.rapidapi.com/coins?limit='+count,
			headers: {
				'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
				'x-rapidapi-key': 'b5dcac0fdamsh6ce3cdcd6c0a205p1206bcjsn78e048e0a244'
			}
		};

		axios.request(options).then(function (response) {
			const options={
				data:response.data.data.coins,
				isFetching:false,
			}
			console.log(options)
			setcryptosList(options);
		}).catch(function (error) {
			console.error(error);
			setcryptosList({
				data:undefined,
				isFetching:false,
			});
		});
	}
	

    useEffect(() => {
        getCoinsDetailsAPI(50);
    }, [])

	const onFinish = (values) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<>
			{/* <Title><img className='signup-image' alt='img' src={notificationIcon} height={'45px'} /> Notify Me </Title>
			<Divider/> */}


			<Card
				title={<strong>
							<img className='signup-image' alt='img' src={notificationIcon} height={'25px'} />
							  &nbsp; Receive Notifications 
						</strong>}
				style={{width: "fit-content",
                        margin:".5rem auto",
                        borderRadius:"2rem",
						textAlign: "center"}}
				hoverable>

			<Form
				name="NotificationForm"
				labelCol={{
					span: 10,
				}}
				wrapperCol={{
					span: 14,
				}}
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off">

				<Form.Item
					label="Coin"
					name="coin"
					rules={[
					{
						required: true,
						message: 'Please select a coin !',
					},
					]}>
					<Select
							showSearch
                            placeholder="Select a Coin"
                            optionFilterProp="children"
							loading={cryptosList.isFetching}
							filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
						{cryptosList?.data?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
					</Select>
				</Form.Item>

				<Form.Item
					label="Type :"
					name="type"
					rules={[
					{
						required: true,
						message: 'Please select Type !',
					},
					]}>
					<Select default={'greaterThen'}>
						<Option value={'lessThen'}>Less Then</Option>
						<Option value={'greaterThen'}>Greater Then</Option>
					</Select>
				</Form.Item>

				<Form.Item
					label="Value"
					name="value"
					rules={[
					{
						required: true,
						message: 'Please enter a value !',
					},
					]}>
					<InputNumber min={0} defaultValue={0}/>
				</Form.Item>
				<Form.Item 
					wrapperCol={{
                        offset: 0,
                        span: 24,
                        }}>
					<Button type="primary" htmlType="submit" style={{margin:"0.2rem"}}>
						Notify Me !
					</Button>
				</Form.Item>
			</Form>
			</Card>

		</>
	)
}

export default ManageNotification