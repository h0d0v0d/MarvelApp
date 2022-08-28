import { useState, useEffect } from "react"
import { NavLink, useParams } from "react-router-dom"

import ComicsBanner from "../ComicsBanner/ComicsBanner"
import useMarvelService from "../../services/MarvelServices"
import Spinner from "../Spinner/Spinner"
import Error from "../Error/Error"

import './SingleComics.scss'

const SingleComics = () => {

    const [comic, setComic] = useState({})
    const {loading, error, clearError,  getOneComics} = useMarvelService()
    const {comicId} = useParams()

    const getData = () => {
        clearError() 
        getOneComics(comicId)
        .then((res) => {
            setComic(res)
        })
    }

    useEffect(() => {
        getData()
    }, [comicId])

    return(
        <>
            <ComicsBanner/>
            <div className="single-comics-wrapp">
                {loading ? <Spinner/> : null}
                {error ? <Error/> : null}
                {!(loading || error) ? <View comic={comic}/> : null}
            </div>
        </>
    )
}

export default SingleComics

const View = ({comic}) => {
    const {id, title, description, thumbnail, price, pageCount} = comic

    return (
        <>
            <div className="single-comics-img-wrapper">
                <img src={thumbnail} alt="img" className="single-comics-img" />
            </div>
            <div className="single-description-wrapper">
                <h2 className="single-comics-name">{title}</h2>
                <p className="single-comics-description">{description ? description : 'No description'}</p>
                <h2 className="single-comics-volume">{pageCount}</h2>
                <h2 className="single-comics-language">Language : en-us</h2>
                <span className="single-comics-price">{`${price === 0 ? 5 : price }$`}</span>
            </div>
            <NavLink className='single-comics-back' to="/comics">Back to all</NavLink>
        </>
    )
}

