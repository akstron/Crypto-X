import React ,{useEffect,useState}from 'react'
import { Select,Form, Button,InputNumber,message} from 'antd';
import axios from 'axios';

const { Option } = Select;

const PayoutConfirm = () => {

    const [bankAccount,setBankAccount]=useState({
        name:undefined,
        account_number:undefined,
        ifsc:undefined,
        upiId:undefined,
        isFetching:true
    });

    const [paying,setPaying]=useState(false);

    const getBankAccount=()=>{
        const upiRoute = process.env.REACT_APP_BACKEND + '/getBankingOptions';
        setBankAccount({
            name:undefined,
            account_number:undefined,
            ifsc:undefined,
            upiId:undefined,
            isFetching:true
        })
        axios.get(upiRoute,{withCredentials: true}).then(res => {
            if(res['data']['status']){
                const bankAc={
                    name:res.data.account.name,
                    account_number:res.data.account.account_number,
                    ifsc:res.data.account.ifsc,
                    upiId:res.data.account.UPI_id,
                    isFetching:false
                };
                console.log(bankAc);
                setBankAccount(bankAc);
            }
        }).catch(error => {
            console.log(error);
            setBankAccount({
                name:undefined,
                account_number:undefined,
                ifsc:undefined,
                upiId:undefined,
                isFetching:false
            })
        })
    }

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    function onFinish(values) {
        console.log(values);
        setPaying(true);

        const payoutRoute = process.env.REACT_APP_BACKEND + '/payout';

        const payoutReq={
            mode:(bankAccount.account_number)?('NEFT'):('UPI'),
            amount:values.amount,
        }
        axios.post(payoutRoute,payoutReq,{withCredentials: true}).then(res => {
            console.log(res.data);
            setPaying(false);
            message.success("Withdrawal  successfull")

        }).catch(error => {
            console.log(error);
            setPaying(false);
            message.error(error.toString());

        })
    }

    useEffect(()=>{
        getBankAccount();
    },[])

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
                    <Select style={{ width: 120 }} onChange={handleChange} loading={bankAccount.isFetching} disabled={paying}>
                        {(bankAccount.account_number)?(
                            <Option value={bankAccount.account_number}>A/c No: {bankAccount.account_number}</Option>
                        ):(<>
                            <Option value={undefined} disabled>No Bank Account No</Option>
                        </>)}

                        {(bankAccount.upiId)?(
                            <Option value={bankAccount.upiId}>UPI ID: {bankAccount.upiId} </Option>
                        ):(<>
                            <Option value={undefined} disabled>No UPI Found </Option>
                        </>)}
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
                    <InputNumber min={0} defaultValue={0} disabled={paying}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={paying}> Confirm </Button>
                </Form.Item>
            </Form>
            
            
        </div>
    )
}

export default PayoutConfirm
