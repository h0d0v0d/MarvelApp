import { Component } from "react";

import './Header.scss'

class Header extends Component{
    render() {
        return (
            <div className="head-wrapper">   
                <a href="#" className='head-link' >
                    <h2>
                        <span className='red-color'>Marvel
                        </span> information portal
                    </h2>
                </a>
                <nav className="head-navbar">
                    <a href="#" className='active-navbutton' onClick={this.props.showCharacters} >Сharacters</a>
                    <span> / </span>
                    <a href="#" className='unactive-navbutton' onClick={this.props.showComics} >Сomics</a>
                </nav>
            </div>
        )
    }
}

export default Header