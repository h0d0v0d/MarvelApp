import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelServices";

import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";

import './ComicsList.scss'

const ComicsList = () => {

    const [comics, setComics] = useState([])
    const [offset, setOffset] = useState(100)

    const {loading, itemLoading, error, getAllComics} = useMarvelService()

    const getData = () => {
        getAllComics(offset)
        .then(uppeListData)
    }

    const uppeListData = (newComics) => {
        setComics(comics => [...comics, ...newComics])
        setOffset(offset => offset + 8)
    }

    useEffect(() => {
        getData()
    }, [])

    const cards = comics.map((item, i) => {
        const {title, price, thumbnail, id} = item
        return (
            <li className="comics-card" key={i}>
                <Link to={`/comics/${id}`}>
                    <div className="card-img-wrapper"> 
                        <img src={thumbnail} alt="" className="card-img" />
                    </div>
                    <p className="name">
                    {title}
                    </p>
                    <p className="price">
                        {price ? price : 3}
                    </p>
                </Link>
            </li>
        )
    })

    return (
        <div className="comics-list">
            <ul className="comics-card-wrapper">
                {cards}
            </ul>
            {loading ? <Spinner/> : null}
            {error ? <Error/> : null}
            <button className="button button__long button__main" 
                    onClick={getData} 
                    disabled={itemLoading}>
                <div className="inner">
                    Load more 
                </div>
            </button>
        </div>
    )
}

export default ComicsList