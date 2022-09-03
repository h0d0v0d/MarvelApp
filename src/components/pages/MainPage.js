import { useState } from "react";

import RandomChar from "../RandomChar";
import HeroList from "../HeroList/HeroList";
import MainCard from "../MainCard/MainCard";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
 
const MainPage = () => { 

    const [mainCardId, setMainCard] = useState(null)

    const onChangeMainCard = (mainCardId) => { 
        setMainCard(mainCardId)
    } 

    return (
        <>
        <RandomChar/>
            <div className="main-wrapper">
                <HeroList onChangeMainCard={onChangeMainCard}/>
                <ErrorBoundary> 
                    <MainCard mainCardId={mainCardId}/>
                </ErrorBoundary>
            </div>
        </>
    )
}

export default MainPage