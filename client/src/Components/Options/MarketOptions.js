import './MarketOptions.css'
import {Form,Row,Col} from 'react-bootstrap';
import Button from '@restart/ui/esm/Button';

const MarketOptions = ({setPlot,cryptoCoinList,Coin}) => {

    var cryptoCoinSelected=Coin; 
    var coinList=cryptoCoinList;
    
    const handleSubmit=(event)=>{
        event.preventDefault();
        console.log(event.target.value);
    }
    const handleChange=(event)=>{
        console.log(event.target.name);
        console.log(event.target.value);
        if(event.target.name==='range'){
            cryptoCoinSelected.Range=parseInt(event.target.value);
        }
        if(event.target.name==='cryptoCoin'){
            let range=cryptoCoinSelected.Range;
            cryptoCoinSelected=coinList[event.target.value];
            cryptoCoinSelected.Range=parseInt(range);
        }
        console.log(cryptoCoinSelected.CoinName + " -- " + cryptoCoinSelected.Range);
        setPlot({Coin:cryptoCoinSelected,Range:cryptoCoinSelected.Range});
    }

    return (
        <>
        {/* {console.log(cryptoCoinSelected)} */}
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
        </>
    )


}

export default MarketOptions;