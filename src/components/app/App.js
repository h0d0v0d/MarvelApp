import Header from "../Header/Header";
import RandomChar from "../RandomChar/RandomChar";
import HeroList from "../HeroList/HeroList";
import MainCard from "../MainCard/MainCard";
import { useState } from "react";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import './App.scss'

import decorImg from '../../resources/img/vision.png'

function App(){

    const [mainCardId, setMainCard] = useState(null)
    const [page, setPage] = useState('characters')

    const onChangeMainCard = (mainCardId) => { 
        setMainCard(mainCardId)
    } 

    const showOtherPage = (page) => {
        setPage(page)
    }
    
    return (
        <div className="app">
            <Header showOtherPage={showOtherPage}/>
            {
                page === 'characters' ? 
                <Сharacters onChangeMainCard={onChangeMainCard} 
                            mainCardId={mainCardId}/> :
                null
            }
        </div>
    )
    
}

const Сharacters = ({onChangeMainCard, mainCardId}) => { 
        return (
            <>
            <RandomChar/>
                <div className="main-wrapper">
                    <HeroList onChangeMainCard={onChangeMainCard}/>
                    <ErrorBoundary> 
                        <MainCard mainCardId={mainCardId}/>
                    </ErrorBoundary>
                    <img src={decorImg} alt="" className="main-decor-img" />
                </div>
            </>
        )
}

export default App;