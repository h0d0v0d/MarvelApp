import './RandomChar.scss'
import '../../style/button.scss'

import MarvelService from '../../services/MarvelServices'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'

import decor from '../../resources/img/mjolnir.png'
import { useEffect, useState } from 'react'

function RandomChar() {

    /* state = {
        char:{},
        loading: false,
        error: false,
    } */

    const [char, setChar] = useState({})
    const [loading, setLoading] = useState({loading: false, error: false})

    const marvelservice = new MarvelService 

    const onCharLoaded = (char) => {
        setChar(char)
        setLoading({loading: false, error: false})
    }

    const onLoading = () => {
        setLoading({loading: true, error: false})
    }

    const onError = () => {
        setLoading({loading: false, error: true})
        console.log('I am the ERROR')
    }
    
    const onUpperChar = () => {
        onLoading()
        const randomId = Math.round(Math.random() * (1011400 - 1011000) + 1011000)
        marvelservice
            .getOneCharacter(randomId)
            .then(onCharLoaded)
            .catch(onError)
    }

    useEffect(() => {
        onUpperChar()
    }, [])

    let block;
    if (loading.error) {
        block = <Error/>
    } else if (loading.loading){
        block = <Spinner/>
    } else {
        block = <RandomCharBlock char={char}/>
    }

    return (
        <div className="randomchar-wrapper">
            <div className="randomchar">
                <div className="randomchar-block">
                    {block}
                </div>
                <div className="randomchar-static">
                    <p className="randomchar-title">
                        Random character for today!!
                        <br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar-title mrt-30">Or choose another one</p>
                    <button href="" className="button button__main" onClick={onUpperChar} >
                            <div className="inner">TRY IT</div>
                    </button>
                    <img src={decor} alt="mjolnir" className="randomchar-decoration" />
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
            <img src={thumbnail} alt="thor" className='randomchar-img' />
            <div className="randomchar-info">
                <p className="randomchar-name">{name}</p>
                <p className="randomchar-descr">{description}</p>
                <a href={homepage} className="button button__main">
                    <div className="inner">HOMEPAGE</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">WIKI</div>
                </a>
            </div>
        </>
    )
}