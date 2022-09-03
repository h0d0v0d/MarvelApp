import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelServices'
import Spinner from '../Spinner/Spinner'
import Error from '../Error/Error'

import './HeroList.scss'

function HeroList ({onChangeMainCard}){

    const [listData, setListData] = useState([])
    const [offset, setOffset] = useState(1300)

    const {loading, itemLoading, error, clearError, getAllCharacters} = useMarvelService()

    const onRequest = (offset) => {
        clearError()
        getAllCharacters(offset)
        .then(upperListData)
    }

    const upperListData = (newListData) => { 
        setListData(listData => [...listData, ...newListData])
        setOffset(offset => offset + 9) 
    }

    const itemRefs = useRef([])

    function focusOnItem(id) {
        itemRefs.current.forEach((item) => {item.classList.remove('active-card')})
        itemRefs.current[id].classList.add('active-card')
    }

    useEffect(() => {
        onRequest()
    }, [])

    const cards = listData.map((item, i) => {
        const {id, thumbnail, name} = item 
        return (
            <li key={id} 
                className='hero-card' 
                onClick={() => {
                    focusOnItem(i) 
                    onChangeMainCard(id)
                }}
                ref={elem => itemRefs.current[i] = elem}>
                <div className="card-img-wrapper">
                    <img src={thumbnail} alt="img" />
                </div>
                <p>{name}</p>
            </li> 
        )
    })

    return(
        <div className="hero-list">
            <ul className="card-wrapper"> 
                {cards}
            </ul> 
            {loading ? <Spinner/> : null}
            {error ? <Error/> : null}
            {offset >= 1562 ? <p>Героина больше нет</p> : null}
            <button href="" className="button button__long button__main" 
                            onClick={() => {onRequest(offset)}} 
                            disabled={itemLoading}
                            style={{'display': offset >= 1562 ? 'none' : 'block'}} >  
                <div className="inner">Load more</div> 
            </button> 
        </div>
    )
} 

export default HeroList

HeroList.propTypes = {
    onChangeMainCard: PropTypes.func
}
