import ComicsBanner from "../ComicsBanner/ComicsBanner"
import ComicsList from "../ComicsList/ComicsList"

const ComicsPage = () => {
    return (
        <div style={{'minHeight': '1000px'}}>
            <ComicsBanner/>
            <ComicsList/>
        </div>  
    )
}

export default ComicsPage