import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Header from "../Header/Header";
import Spinner from "../Spinner/Spinner";

import './App.scss'

const MainPage = lazy(() => import('../pages/MainPage'))
const ComicsPage = lazy(() => import('../pages/ComicsPage'))
const SingleComics = lazy(() => import('../SingleComics/SingleComics'))
const Page404 = lazy(() => import('../pages/404'))

function App(){

    return (
        <Router>
            <div className="app">
                <Header/>
                <Suspense fallback={<Spinner/>}>
                    <Routes>
                        <Route path='/' element={<MainPage/>}/>
                        <Route path='/comics' element={<ComicsPage/>}/>
                        <Route path='/comics/:comicId' element={<SingleComics/>}/>
                        <Route path='*' element={<Page404/>}/>
                    </Routes>
                </Suspense>
            </div> 
        </Router>
    )
}

export default App;