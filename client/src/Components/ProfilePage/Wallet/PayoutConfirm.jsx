import React from 'react'
import { Select,Form, Button,InputNumber} from 'antd';

const { Option } = Select;


const PayoutConfirm = () => {

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    function onFinish(value) {
        console.log(`selected ${value}`);
    }

    return (
        <div style={{with:"fit-content"}}>
            
            <Form
                name="PayOutForm"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off">
                <Form.Item
                    label="Accept in :"
                    name="account"
                    rules={[{required:true}]}>
                    <Select defaultValue="bank" style={{ width: 120 }} onChange={handleChange}>
                        <Option value="bank">A/c No: 3125555554</Option>
                        <Option value="UPI">UPI ID: aayushshanilya80@gmail.com</Option>
                    </Select>
                </Form.Item>
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
                    <InputNumber min={0} defaultValue={0}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary"> Confirm </Button>
                </Form.Item>
            </Form>
            
            
        </div>
    )
}

export default PayoutConfirm
