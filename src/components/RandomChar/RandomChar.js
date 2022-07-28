import './RandomChar.scss'
import '../../style/button.scss'

import { Component } from 'react'
import MarvelService from '../../services/MarvelServices'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'

import decor from '../../resources/img/mjolnir.png'

class RandomChar extends Component {

    state = {
        char:{},
        loading: false,
        error: false,
    }

    marvelservice = new MarvelService 

    onCharLoaded = (char) => {
        this.setState({char})
    }

    onLoading = () => {
        this.setState({
            loading: true,
            error: false
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
        console.log('I am the ERROR')
    }
    
    onUpperChar = () => {
        this.onLoading()
        const randomId = Math.round(Math.random() * (1011400 - 1011000) + 1011000)
        this.marvelservice
            .getOneCharacter(randomId)
            .then(this.onCharLoaded)
            .catch(this.onError)
            .finally(() => {
                setTimeout(() => {
                    this.setState({loading: false}) 
                }, 1000)
            })
    }

    componentDidMount() {
        this.onUpperChar()
    }
 
    render() {

        const {char, loading, error} = this.state
        let block;
        if (error) {
            block = <Error/>
        } else if (loading){
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
                            Random character for today!
                            <br/>
                            Do you want to get to know him better?
                        </p>
                        <p className="randomchar-title mrt-30">Or choose another one</p>
                        <button href="" className="button button__main" onClick={this.onUpperChar} >
                                <div className="inner">TRY IT</div>
                        </button>
                        <img src={decor} alt="mjolnir" className="randomchar-decoration" />
                    </div>
                </div>
            </div>
        )
    }
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