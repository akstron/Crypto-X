import React from 'react'
import './CoinImage.css'

function CoinImage({ImgURL}){
    return (
        <img className="coin-img"  src={ImgURL} alt="Img not Available" >
        </img>
    );
}

export default CoinImage;