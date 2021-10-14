import React from 'react';
import {NavLink} from 'react-router-dom'
import {ReactComponent as Logo} from '../../assets/instagram.svg';
import {ReactComponent as Home} from '../../assets/home.svg';
import {ReactComponent as Explore} from '../../assets/explore.svg';
import './header.css';
const Header = () =>{
    return(
        <nav>
            <div className='div-header'>
                <div className='div-svg'>
                    <Logo/>
                </div>
                <h2>Baniya Trade</h2>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <NavLink exact to='/' activeClassName='active'><Home className='div-svg'/></NavLink>
                    <NavLink exact to='/explore' activeClassName='active'><Explore className='div-svg'/></NavLink>
                    <button className='button-header'>Log out</button>
                </div>
            </div>
        </nav>
    )
}

export default Header;