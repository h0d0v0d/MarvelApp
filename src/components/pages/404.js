import { Link } from "react-router-dom"

import Error from "../Error/Error"


const Page404 = () => {
    return (
        <div style={{'margin': '20px auto', 'textAlign': 'center'}}>
            <Error/>
            <h2>Page dosent exist</h2>
            <Link to='/'>Back to main page</Link>
        </div>
    )
}

export default Page404