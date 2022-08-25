import { Link } from 'react-router-dom'

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
                    <li><Link to='/'className='navbutton'>Сharacters</Link></li>
                    /
                    <li><Link to='/comics' className='navbutton'>Сomics</Link></li>
                </ul>
            </nav>
        </div>
    ) 
}

export default Header