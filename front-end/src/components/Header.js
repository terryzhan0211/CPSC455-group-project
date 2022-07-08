import React from 'react';
import { Link } from 'react-router-dom';
import loginImgWhite from '../img/login-white.png';
import loginImg from '../img/login.png';
import leftArrow from '../img/left-arrow.png';
import './Header.css';
function Header(props) {
	let loginImgColor = loginImg;
	let usernameColor = 'black';
	if (props.type === 'white') {
		loginImgColor = loginImgWhite;
		usernameColor = 'white';
	}
	return (
		<div className="header-container">
			<Link to="/" className="back-button">
				{props.type === 'black' && <img alt="back" src={leftArrow}></img>}
			</Link>
			<div className={props.type}>
				<h1>{props.title}</h1>
			</div>
			<Link to="/login" className="login-button">
				{props.hasLogin === 'true' && (
					<img alt="login" src={loginImgColor}>
						{/* <h2 style={{ color: usernameColor }}>{props.username}</h2> */}
					</img>
				)}
			</Link>
		</div>
	);
}

export default Header;
