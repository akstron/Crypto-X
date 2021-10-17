import './MarketOptions.css'
import {cryptoCoins} from '../Data/data'
import {Form,Row,Col} from 'react-bootstrap';
import Button from '@restart/ui/esm/Button';

const MarketOptions = ({setPlot,cryptoCoin}) => {

    var cryptoCoinOption={cryptoCoin:cryptoCoin,range:604800}; 

    const handleSubmit=(event)=>{
        event.preventDefault();
        console.log(event.target.value);
    }
    const handleChange=(event)=>{
        console.log(event.target.name);
        console.log(event.target.value);
        if(event.target.name==='range'){
            cryptoCoinOption.range=event.target.value;
        }
        if(event.target.name==='cryptoCoin'){
            cryptoCoinOption.cryptoCoin=cryptoCoins[event.target.value];
        }
        setPlot(cryptoCoinOption);
    }

    return (
        <div className='div-market-options'>
            <h3>View Current Market </h3>
            <Form className='market-form' onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <label htmlFor='range' className=''>Show Data for : </label>
                        <Form.Select name='range' aria-label="Default select example" onChange={handleChange}>
                            <option value={3600}  >Hour</option>
                            <option value={86400} >Day</option>
                            <option value={604800} defaultValue selected>Week</option>
                            <option value={2.628e+6}  >Month</option>
                        </Form.Select>
                    </Col>
                    <Col>
                    {/* Add Multi Select Options */}
                        <label htmlFor='cryptoCoin' className=''>Choose Currency: </label>
                        <Form.Select name='cryptoCoin' aria-label="Default select example" onChange={handleChange}>
                            <option value={0} defaultValue>BitCoin</option>
                            <option value={1} >Ethereum</option>
                            <option value={2} >DogeCoin</option>
                            <option value={3} >Polkadot</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Button className='btn' type='submit'>Search</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )


}

export default MarketOptions;