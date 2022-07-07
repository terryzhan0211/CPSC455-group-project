import React from 'react';

import './Main.css';

import { Link } from 'react-router-dom';
import loginImgWhite from '../img/login-white.png';
import loginImg from '../img/login.png';
function LoginHeader(props) {
	let loginImgColor = loginImg;
	let usernameColor = 'black';
	if (props.color === 'white') {
		loginImgColor = loginImgWhite;
		usernameColor = 'white';
	}
	return (
		<Link to="/login" className="login-button">
			<h2 style={{ color: usernameColor }}>{props.username}</h2>
			<img alt="login" src={loginImgColor}></img>
		</Link>
	);
}

export default LoginHeader;
