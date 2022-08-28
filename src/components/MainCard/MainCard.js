import { useState, useEffect, useMemo } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';


import useMarvelService from "../../services/MarvelServices";
import Error from "../Error/Error";
import Spinner from "../Spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";

import './MainCard.scss'

function MainCard ({mainCardId}){

    const [char, setChar] = useState({})
    /* const [comicsList, setComicsList] = useState([]) */
    const [skeleton, setSkeleton] = useState(true)
    
    const {loading, error, getOneCharacter, getComicsListByCharId} = useMarvelService()

    const getChar = () => {
        if (mainCardId === null) {
            return
        }
        setSkeleton(false)
        getOneCharacter(mainCardId, true)
        .then(updateChar)
        .catch(onError)
    }

    const updateChar = (char) => {
        setChar(char)
    }

    const onError = () => {
        setSkeleton(false)
    }

    useEffect(() => {
        getChar()
    }, [mainCardId])

    return (
        <div className='card-description'>
                {error ? <Error/> : null}
                {loading ? <Spinner/> : null}
                {skeleton ? <Skeleton/> : null}  
                {!(error || loading || skeleton) ? <View char={char}/> : null}
        </div>
    )
}

export default MainCard

MainCard.propTypes = {
    mainCardId: PropTypes.number
}

function View({char}) {
    const {name, homepage, wiki, thumbnail, description, comicsList} = char
    return (
        <>
            <div className="card-description-face">
                <div className="description-face-img" >
                    <img src={thumbnail} alt="face" />
                </div>
                <div className="description-face-name">
                    <p className='description-name'>{name}</p>
                    <a href={homepage} className="button button__main" target="_blank">
                        <div className="inner">HOMEPAGE</div>
                    </a>
                    <a href={wiki} className="button button__secondary" target="_blank">
                        <div className="inner">WIKI</div>
                    </a>
                </div>
             </div>
            <p className="description-text">{description ? description : 'NO DESCRIPTION'}</p>
            <p className="appearances">Comics:</p>
                {
                    comicsList.map((item, i) => { 
                        const {id, title} = item
                        if (i >= 15) {
                            return 
                        }
                        return <li key={id}>
                                    <NavLink className="appearances-item" to={`/comics/${id}`}>
                                        {title}
                                    </NavLink>
                               </li>
                    })
                }
                {comicsList.length === 0 ? 'NO COMICS' : null}
        </>
    )
}

