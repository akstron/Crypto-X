import './CoinBalance.css'
const CoinBalance = ({CoinName,Balance,Growth}) => {
    return (
        <div>
            <div className="wallet-details">
                    <h4>{CoinName} :</h4>
                <div className="wallet-balance">
                    <h2>{Balance}</h2> 
                    {(Growth<=0)?
                        (<span className="neg-growth">  ({Growth} %)</span>)
                        :
                        (<span className="pos-growth">  ({Growth} %)</span>)
                    }
                </div>
            </div>
        </div>
    )
}

export default CoinBalance;