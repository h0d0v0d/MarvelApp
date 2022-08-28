import { Link, NavLink} from 'react-router-dom'

import './Header.scss'

function Header (){
    return (
        <div className="head-wrapper">   
            <Link to='/' className='head-link' >
                <h2>
                    <span className='red-color'>Marvel</span> information portal
                </h2>
            </Link>
            <nav className="head-navbar">
                <ul>
                    <li><NavLink to='/' 
                                 end
                                 className={({isActive}) => isActive ? 'active-navbutton' : 'navbutton'}
                                 >Сharacters</NavLink></li>
                    /
                    <li><NavLink to='/comics' 
                                 className={({isActive}) => isActive ? 'active-navbutton' : 'navbutton'}
                                 >Сomics</NavLink></li>
                </ul>
            </nav>
        </div>
    ) 
}

export default Header
