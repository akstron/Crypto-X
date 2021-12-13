import {NavLink} from 'react-router-dom'
import './NavItem.css'
const NavItem = ({path,title}) => {
    return (
        <div>
            <li className="nav-item">
                <NavLink to={path}>{title}</NavLink>
            </li>
        </div>
    )
}


export default NavItem;