import { useEffect, useState } from 'react'
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelServices'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'

import './HeroList.scss'

function HeroList ({onChangeMainCard}){

    const [listData, setListData] = useState([])
    const [loading, setLoading] = useState({loading: true, itemLoading: false, error: false})
    const [offset, setOffset] = useState(1300)
    const [activeId, setActiveId] = useState(null)

    const marvelservice = new MarvelService

    const onRequest = (offset) => {
        onCharListLoading()
        marvelservice
        .getAllCharacters(offset)
        .then(upperListData)
        .catch(showError)
    }

    const onCharListLoading = () => {
        setLoading({loading: true, itemLoading: true, error: false})
    }

    const onActiveMainCard = (id) => {
        onChangeMainCard(id)
        setActiveId(id)
    }

    const upperListData = (newListData) => {
        setListData(listData => [...listData, ...newListData])
        setLoading({loading: false, itemLoading: false, error: false})
        setOffset(offset => offset + 9)
    }

    const showError = (error) => {
        setLoading({loading: false, itemLoading: false, error: true})
        console.log(error)
    }

    useEffect(() => {
        onRequest()
    }, [])

    const cards = listData.map((i) => {
        const {id, thumbnail, name} = i 
        let clazz = activeId === id ? 'hero-card active' : 'hero-card'
        return (
            <li key={id} className={clazz} onClick={() => {onActiveMainCard(id)}}>
                    <div className="card-img-wrapper">
                        <img src={thumbnail} alt="img" />
                    </div>
                    <p>{name}</p>
            </li> 
        )
    })
    const load = loading.loading ? <Spinner/> : null
    const message = offset >= 1562 ? <p>Героина больше нет</p> : null

    return(
        <div className="hero-list">
            <ul className="card-wrapper"> 
                {cards}
            </ul> 
            {loading.error ? <Error/> : load}
            {message}
            <button href="" className="button button__long button__main" 
                            onClick={() => {onRequest(offset)}} 
                            disabled={loading.itemLoading}
                            style={{'display': offset >= 1562 ? 'none' : 'block'}} >  
                <div className="inner">More</div>
            </button> 
        </div>
    )
    
} 

export default HeroList

HeroList.propTypes = {
    onChangeMainCard: PropTypes.func
}