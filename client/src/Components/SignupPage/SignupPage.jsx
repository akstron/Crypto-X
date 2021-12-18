import React from 'react';
import {Form, Input, Button } from 'antd';
import { Typography,Card} from 'antd';
import { useHistory } from 'react-router-dom';

import signupIcon from '../../Images/signup-logo.png'
import  './SignupPage.css'

import axios from 'axios';

const {Title} =Typography

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 12,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 12,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const SignupPage = () => {
  const [form] = Form.useForm();

  const history = useHistory();
  const loginToHome=()=>{
      history.push('/')
  }

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    const userDetails = {firstName:values.firstname,lastName:values.lastname,email:values.email,password:values.password};
    console.log(userDetails);
    
    const route = process.env.REACT_APP_BACKEND + '/signup';
      axios.post(route, userDetails, {withCredentials: true}).then(res => {
          console.log(res);
          if(res['data']['status']){
              console.log(userDetails);
              loginToHome();
          }
      }).catch(error => {
          console.log(error);
      })
  };

  return (
      <>
        <Title><img className='signup-image' alt='img' src={signupIcon} height={'45px'} /> Sign-up </Title>
        <hr/>
        <div className='signup-card'>
            <Card
                extra={<img className='signup-image' alt='img' src={signupIcon} height={'35px'} />}
                title={`Sign-up form`}
                hoverable
            >
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        prefix: '91',
      }}
      scrollToFirstError
    >
      <Form.Item
        name="firstname"
        label="First Name"
        rules={[
          {
            required: true,
            message: 'Please input your first name!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="lastname"
        label="Last Name"
        rules={[
          {
            required: true,
            message: 'Please input your lastname!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
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
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Re-enter Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
        style={{width:"fit-content"}}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
    </Card>
    </div>
    </>
  );
};

export default SignupPage;