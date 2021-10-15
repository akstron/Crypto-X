import './MarketOptions.css'
import {Form,Row,Col} from 'react-bootstrap';
import Button from '@restart/ui/esm/Button';

const MarketOptions = () => {

    const handleSubmit=(event)=>{
        event.preventDefault();
        console.log(event.target.value);
    }

    const handleChange=(event)=>{
        console.log(event.target.value);
    }

    return (
        <div className='div-market-options'>
            <h3>View Current Market </h3>
            <Form className='market-form' onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <label htmlFor='Scale' className=''>Show Data for : </label>
                        <Form.Select name='Scale' aria-label="Default select example" onChange={handleChange}>
                            <option value="Hour" defaultValue>Hour</option>
                            <option value="Day">Day</option>
                            <option value="Week">Week</option>
                            <option value="Month">Month</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <label htmlFor='currency-options' className=''>Choose Currency: </label>
                        <Form.Select name='currency-options' aria-label="Default select example" onChange={handleChange}>
                            <option value="BitCoin" defaultValue>BitCoin</option>
                            <option value="Ethereum">Ethereum</option>
                            <option value="DogeCoin">DogeCoin</option>
                            <option value="Polkadot">Polkadot</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Button className='btn' type='submit'>Search</Button>
                </Row>
            </Form>
            
        </div>
    )


}

export default MarketOptions;