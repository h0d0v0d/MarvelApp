import Header from "../Header/Header";
import RandomChar from "../RandomChar/RandomChar";
import HeroList from "../HeroList/HeroList";
import MainCard from "../MainCard/MainCard";
import { Component } from "react";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import './App.scss'

import decorImg from '../../resources/img/vision.png'

class App extends Component{

    state = { 
        mainCardId: null,
        page: 'characters'
    }

    onChangeMainCard = async (mainCardId) => {
        await this.setState({mainCardId})
    } 

    showComics = () => {
        this.setState({page: 'comics'})
    }

    showCharacters = () => {
        this.setState({page: 'characters'})
    }
    
    render() {
        return (
            <div className="app">
                <Header showComics={this.showComics}
                        showCharacters={this.showCharacters}/>
                {
                    this.state.page === 'characters' ? 
                    <Сharacters onChangeMainCard={this.onChangeMainCard} 
                             mainCardId={this.state.mainCardId}/> :
                    null
                }
            </div>
        )
    } 
}

class Сharacters extends Component{
    render() {
        const {onChangeMainCard, mainCardId} = this.props
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
}

export default App;