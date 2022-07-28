import { Component } from "react";
import PropTypes from 'prop-types';

import MarvelService from "../../services/MarvelServices";
import Error from "../Error/Error";
import Spinner from "../Spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";

import './MainCard.scss'

class MainCard extends Component{

    state = {
        char: {
            name: 'Ya',
            thumbnail: 'Th',
            wiki: 'w', 
            homepage: 'h',
            description: 'Descr',
            comicsList: 'cj'
        },
        error: false, 
        loading: false,
        skeleton: true
    }

    marvelservice = new MarvelService

    getChar = () => {
        const {mainCardId} = this.props
        if (mainCardId === null) {
            return
        }

        this.onLoading()
        this.marvelservice
        .getOneCharacter(mainCardId)
        .then(this.updateChar)
        .catch(this.onError)
    }

    updateChar = (char) => {
        this.setState({char})
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 1000)
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false,
            skeleton: false
        })
    }

    onLoading = () => {
        this.setState({
            loading: true,
            error: false,
            skeleton: false
        })
    }

    componentDidMount() {
        this.getChar()
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.mainCardId !== this.props.mainCardId) {
            this.getChar()
        }
    }
    
    render() {
        const {char, loading, error, skeleton} = this.state

        const errorText = error ? <Error/> : null
        const loadingText = loading ? <Spinner/> : null
        const skeletonText = skeleton ? <Skeleton/> : null
        const view = !(error || loading || skeleton) ? <View char={char}/> : null

        return (
            <div className={skeleton ? 'card-description' : 'card-description active-main'}>
            {/* <div className="card-description">  */}
                 {errorText}
                 {loadingText}
                 {skeletonText}  
                 {view}
            </div>
        )
    }
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
                <div className="description-face-img">
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
                {comicsList.map((item, i) => {
                    if (i >= 8) {
                        return
                    }
                    return <li className="appearances-item" key={i}>
                                {item.name}
                           </li>
                })}
                {comicsList.length === 0 ? 'NO COMICS' : null}
        </>
    )
}

