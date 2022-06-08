import React from 'react';
import leftArrow from '../img/left-arrow.png';
import loginImg from '../img/login.png';
import Header from './Header';
import { Link } from 'react-router-dom';
function Title() {
	return (
		<div>
			<Link to="/" className="back-button">
				<img alt="back" src={leftArrow}></img>
			</Link>
			<Header title="ADD POST" type="white"></Header>
			<Link to="/login" className="login-button">
				<img alt="login" src={loginImg}></img>
			</Link>
		</div>
	);
}

export default Title;
