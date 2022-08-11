import './Header.scss'

function Header ({showOtherPage}){
    return (
        <div className="head-wrapper">   
            <a href="#" className='head-link' >
                <h2>
                    <span className='red-color'>Marvel
                    </span> information portal
                </h2>
            </a>
            <nav className="head-navbar">
                <a href="#" className='active-navbutton' onClick={() => {showOtherPage('characters')}} >Сharacters</a>
                <span> / </span>
                <a href="#" className='unactive-navbutton' onClick={() => {showOtherPage('comics')}} >Сomics</a>
            </nav>
        </div>
    )
}

export default Header