import React from 'react'
import {Link} from 'react-router-dom'
import './InfoBar.css'


const InfoBar = ({room}) => {
    return(
        <div className="infoBar">
        <div className="leftInnerContainer">
            <i className="material-icons online">brightness_1</i>
            <h3 >{room}</h3>
        </div>
        <div className="rightInnerContainer">
            <Link to="/"><i className="material-icons close">close</i></Link>
        </div>
    </div>
    )
    
}

export default InfoBar
