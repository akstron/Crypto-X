import React,{useState} from 'react';
import { Form, Input, Button,message} from 'antd';
import axios from 'axios'

const KYCForm = () => {

    const [updating,setUpdating]=useState(false);

    const onFinish = (values) => {
        console.log('Success:', values);
        setUpdating(true);
        //Call to server
        const notificationRoute = process.env.REACT_APP_BACKEND +'/AddPancard';
        axios.post(notificationRoute,{pancard:values.panNo}, {withCredentials: true}).then(res => {
            message.success("Notification added !");
            setUpdating(false);
        }).catch(error => {
            console.log(error);
            message.error("Something went wrong !");
            setUpdating(false);
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
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
                    label="PAN Card Id:"
                    name="panNo"
                    rules={[{ required: true, message: "Enter your pan card Id !" }]}
                >
                    <Input disable={updating}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={updating}>
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default KYCForm
