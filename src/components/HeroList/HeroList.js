import { Component } from 'react'
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelServices'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'


import './HeroList.scss'


class HeroList extends Component {

    state = {
        listData: [],
        loading: true,
        itemLoading: false,
        error: false,
        offset: 1200,
        activeId: null
        
    }

    marvelservice = new MarvelService

    onRequest = (offset) => {
        this.onCharListLoading()
        this.marvelservice
        .getAllCharacters(offset)
        .then(this.upperListData)
        .catch(this.showError)
    }

    onCharListLoading = () => {
        this.setState({
            itemLoading: true
        })
    }

    onChangeMainCard = (id) => {
        this.props.onChangeMainCard(id)
        this.setState({
            activeId: id
        })
    }

    upperListData = (newListData) => {
        this.setState(({listData, offset}) => ({
            listData: [...listData, ...newListData],
            loading: false,
            itemLoading: false,
            offset: offset + 9
        }))

        if (newListData.length < 9) {
            this.setState({charEnded: true})
        }
    }

    showError = (error) => {
        this.setState({
            error: true,
            loading: false,
            itemLoading: false,
        })
        console.log(error)
    }

    componentDidMount() {
        this.onRequest()
    }


    render() {
        const {listData, loading, itemLoading, error, offset, activeId} = this.state
 
        const cards = listData.map((i) => {
            const {id, thumbnail, name} = i 
            let clazz = activeId === id ? 'hero-card active' : 'hero-card'
            return (
                <li key={id} className={clazz} onClick={() => {this.onChangeMainCard(id)}}>
                        <div className="card-img-wrapper">
                            <img src={thumbnail} alt="img" />
                        </div>
                        <p>{name}</p>
                </li> 
            )
        })
        const load = loading ? <Spinner/> : null
        const message = offset >= 1562 ? <p>Героина больше нет</p> : null

        return(
            <div className="hero-list">
                <ul className="card-wrapper"> 
                    {cards}
                </ul> 
                {error && !loading ? <Error/> : load}
                {message}
                <button href="" className="button button__long button__main" 
                                onClick={() => {this.onRequest(offset)}} 
                                disabled={itemLoading}
                                style={{'display': offset >= 1562 ? 'none' : 'block'}} >  
                    <div className="inner">More</div>
                </button> 
            </div>
        )
    }
} 

export default HeroList

HeroList.propTypes = {
    onChangeMainCard: PropTypes.func
}