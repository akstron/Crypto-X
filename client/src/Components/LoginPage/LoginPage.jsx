import React,{useState} from 'react'
import { Typography,Card} from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import loginIcon from '../../Images/login-logo.png'
import './LoginPage.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const {Title} =Typography

const LoginPage = () => {

    const [GAuth, setGAuth] = useState(false);

    const history = useHistory();
    const loginToHome=()=>{
        history.push('/')
    }

    const toggleGAuth = () => {
        setGAuth(!GAuth);
    }

    const onFinish = (values) => {
        console.log('Success:', values);
        const route = process.env.REACT_APP_BACKEND + '/login';
        console.log(route);
        axios.post(route, {
            email: values.emailId, 
            password: values.password
        }, {withCredentials: true}).then(res => {
            console.log(res);
            if(res['data']['status']){
                loginToHome();
                console.log(res);
            }
        }).catch(error => {
            console.log(error);
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
        <Title><img className='login-image' alt='img' src={loginIcon} height={'30px'} /> Login </Title>
        <hr/>
        <div className='login-card'>
            <Card
                extra={<img className='login-image' alt='img' src={loginIcon} height={'20px'} />}
                title={`Login`}
                hoverable
            >
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    >
                    <Form.Item
                        label="Email Id"
                        name="emailId"
                        rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                        offset: 8,
                        span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                        offset: 4,
                        span: 20,
                        }}
                    >
                        <div className="form-submit" style={{padding:"0.2rem"}}>
                            <Button type="primary" htmlType="submit" style={{margin:"0.2rem"}}>
                                Submit
                            </Button>
                            <Button variant="dark" className='google-btn' 
                                onClick={toggleGAuth}> Sign-in with 
                                <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png" alt="G" height='15px' style={{margin:".1rem"}}/> 
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
            {GAuth ? (
                <div style={{display:"none"}}>
                    {window.location.href=process.env.REACT_APP_BACKEND + '/login/google'}
                </div>
            ):(
                <></>
            )}
        </div>
        </>

    )
}

export default LoginPage;
