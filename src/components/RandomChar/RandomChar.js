import './RandomChar.scss'
import '../../style/button.scss'

import useMarvelService from '../../services/MarvelServices'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'

import decor from '../../resources/img/mjolnir.png'
import { useEffect, useState} from 'react'

function RandomChar() {

    const [char, setChar] = useState({})
    const {loading, error, getOneCharacter, clearError} = useMarvelService()

    const onUpperChar = () => {
        clearError()
        const randomId = Math.round(Math.random() * (1011400 - 1011000) + 1011000)
        getOneCharacter(randomId, false)
        .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }

    useEffect(() => {
        onUpperChar()
    }, [])

    return (
        <div className="randomchar-wrapper">
            <div className="randomchar">
                <div className="randomchar-block">
                    {error ? <Error/> : null}
                    {loading ? <Spinner/> : null}
                    {!(error || loading) ? <RandomCharBlock char={char}/> : null}
                </div>
                <div className="randomchar-static">
                    <p className="randomchar__title">
                        Random character for today!!
                        <br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title mrt-30">Or choose another one</p>
                    <button href="" className="button button__main" onClick={onUpperChar} >
                            <div className="inner">TRY IT</div>
                    </button>
                    <img src={decor} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        </div>
    )
}

export default RandomChar

function RandomCharBlock({char}) {
    const {thumbnail, name, description, wiki, homepage} = char
    return (
        <>
            <img src={thumbnail} alt="thor" className='randomchar__img' />
            <div className="randomchar-info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description ? description : 'NO DESCRIPTION'}</p>
                <a href={homepage} 
                   target='_blank' 
                   className="button button__main">
                    <div className="inner">HOMEPAGE</div>
                </a>
                <a href={wiki} 
                   target='_blank' 
                   className="button button__secondary">
                    <div className="inner">WIKI</div>
                </a>
            </div>
        </>
    )
}