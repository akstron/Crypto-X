import './TradeOptions.css'
import {Form,Row,Col,Button} from 'react-bootstrap';

const TradeOptions = () => {

    const handleSubmit=()=>{}
    const handleChange=()=>{}

    return (
        <div className='div-trade-options'>
            <h3>Trade Options</h3>
            <Form className='market-form mb-3' onSubmit={handleSubmit}>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Coin:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Select name='cryptoCoin' aria-label="Default select example" onChange={handleChange}>
                            <option value={0} defaultValue>BitCoin</option>
                            <option value={1} >Ethereum</option>
                            <option value={2} >DogeCoin</option>
                            <option value={3} >Polkadot</option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formValue">
                    <Form.Label column sm="2">Value: </Form.Label>
                    <Col sm='10'>
                        <Form.Control type="text" placeholder="Value" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formValue">
                    <Form.Label column sm="2">Amount: </Form.Label>
                    <Col sm='10'>
                        <Form.Control type="text" placeholder="Amount" />
                    </Col>
                </Form.Group>

                <Button className='trade-btn' variant="outline-primary"> Buy </Button>{' '}
            </Form>
        </div>
    )
}

export default TradeOptions;