import './CoinBalance.css'
const CoinBalance = ({CoinName,Balance,Growth}) => {
    return (
        <div>
            <div className="wallet-details">
                    {CoinName} :
                <div className="wallet-balance">
                    {Balance} 
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