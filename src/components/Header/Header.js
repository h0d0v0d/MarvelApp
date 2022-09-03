import { Link, NavLink} from 'react-router-dom'

import './Header.scss'

function Header (){
    return (
        <div className="header-wrapper">    
            <Link to='/' className='header__link' >
                <h2>
                    <span className='red-color'>Marvel</span> information portal
                </h2>
            </Link>
            <nav className="header-navbar">
                <ul>
                    <li><NavLink to='/' 
                                 end
                                 className={({isActive}) => isActive ? 'active__navbutton' : 'navbutton'}
                                 >Сharacters</NavLink></li>
                    /
                    <li><NavLink to='/comics' 
                                 className={({isActive}) => isActive ? 'active__navbutton' : 'navbutton'}
                                 >Сomics</NavLink></li>
                </ul>
            </nav>
        </div>
    ) 
}

export default Header
