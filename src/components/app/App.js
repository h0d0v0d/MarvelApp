import { useState } from "react";

import Header from "../Header/Header";
import RandomChar from "../RandomChar/RandomChar";
import HeroList from "../HeroList/HeroList";
import MainCard from "../MainCard/MainCard";
import ComicsBanner from "../ComicsBanner/ComicsBanner";
import ComicsList from "../ComicsList/ComicsList";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.scss'

import decorImg from '../../resources/img/vision.png'

function App(){

    const [mainCardId, setMainCard] = useState(null)
    const [page, setPage] = useState('comics')

    const onChangeMainCard = (mainCardId) => { 
        setMainCard(mainCardId)
    } 

    const showOtherPage = (page) => {
        setPage(page)
    }
    
    return (
        <Router>
            <div className="app">
                <Header showOtherPage={showOtherPage}/>
                <Switch>
                    <Route exact path='/'>
                        <Сharacters onChangeMainCard={onChangeMainCard} 
                                        mainCardId={mainCardId}/>
                    </Route>
                    <Route exact path='/comics'>
                        <Comics/>
                    </Route>
                </Switch>
            </div>
        </Router>
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

const Comics = () => {
    return (
        <div style={{'minHeight': '1000px'}}>
            <ComicsBanner/>
            <ComicsList/>
        </div>  
    )
}

export default App;