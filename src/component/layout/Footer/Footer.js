import React from 'react'
import playstore from '../../../images/playstore.png'
import appStore from '../../../images/Appstore.png'
import './Footer.css'
const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4 > DOWNLOAD OUR APP</h4>
                <p> Download App for Android and IOS Mobile Phone</p>
                <img src={playstore} alt='playStore' />
                <img src={appStore} alt='appStore' />
            </div>
            <div className="midFooter">
                <h1>City Bazar</h1>
                <p>High Quality is our first priority</p>
                <p>Copyrights 2024 &copy; Paritoshsp</p>
            </div>
            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="http://instagram.com/paritoshsp35">Instagram</a>
                <a href="http://youtube.com">Youtube</a>
                <a href="http://instagram.com/paritoshsp35">Facebook</a>
            </div>
        </footer>
    )
}

export default Footer