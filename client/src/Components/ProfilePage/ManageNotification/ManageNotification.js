import React,{useState,useEffect} from 'react'
import {Form,Select,InputNumber,Card,Button,message} from 'antd'
import axios from 'axios'

import notificationIcon from '../../../Images/NotifyMe/notificationsIcon.png'

const { Option } = Select;

const ManageNotification = () => {
    
    const [cryptosList, setcryptosList] = useState({data:undefined,isFetching:true});
	const [loading,setLoading]=useState(false);
	
	const getCoinsDetails=(count)=>{
		const route = process.env.REACT_APP_BACKEND + '/getCoinDetails';
		axios.post(route, {count:count}).then(res => {
			const options={
				data:res?.data?.coins,
				isFetching:false,
			};
			setcryptosList(options);

		}).catch(error => {
			console.log(error);
			setcryptosList({
				data:undefined,
				isFetching:false,
			});
		})
	}

    useEffect(() => {
        getCoinsDetails(50);
    }, [])

	const onFinish = (values) => {
		setLoading(true);
		console.log('Success:', values);
		const notificationRoute = process.env.REACT_APP_BACKEND +'/storeNotification';
        axios.post(notificationRoute,values, {withCredentials: true}).then(res => {
            message.success("Notification added !");
            setLoading(false);
        }).catch(error => {
            console.log(error);
            message.error("Something went wrong !");
            setLoading(false)
        })
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
						{cryptosList?.data?.map((currency) => <Option value={currency.symbol}>{currency.name}</Option>)}
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
						<Option value={'less'}>Less Than</Option>
						<Option value={'greater'}>Greater Than</Option>
					</Select>
				</Form.Item>

				<Form.Item
					label="Price :"
					name="price"
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
					<Button type="primary" htmlType="submit" style={{margin:"0.2rem"}} loading={loading}>
						Notify Me !
					</Button>
				</Form.Item>
			</Form>
			</Card>

		</>
	)
}

export default ManageNotification
