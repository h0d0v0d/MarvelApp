import './ComicsBanner.scss'

import logo from '../../resources/img/avengersLogo.pdf'
import avengers from '../../resources/img/avengers.pdf'

const ComicsBanner = () => {
    return (
        <div className="coimcs-banner">
            <img src={avengers} alt="avengers" className='avengers'/>
            <div className="comics-banner__title">
                <p>New comics every week!</p>
                <p>Stay tuned!</p>
            </div>
            <img src={logo} alt="logo"/>
        </div>
    )
}

export default ComicsBanner