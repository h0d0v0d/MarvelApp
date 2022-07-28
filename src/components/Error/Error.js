import './Error.scss'

import error from './error.gif'

function Error() {
    return (
        <div className="error-wrapper">
            <img src={error} alt="" />
        </div>
    )
}

export default Error