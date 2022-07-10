import React from 'react';
import { Link } from 'react-router-dom';
import loginImgWhite from '../img/login-white.png';
import loginImg from '../img/login.png';
import leftArrow from '../img/left-arrow.png';
import './Header.css';
import { useSelector } from 'react-redux';
function Header(props) {
	const isLogin = useSelector((state) => state.user.isLogin);
	var link = '/login';
	var username = 'Login';
	if (isLogin) {
		link = '/user';
		username = props.username;
	} else if (props.forceText) {
		username = 'Logout';
	}
	let loginImgColor = loginImg;
	let usernameColor = 'black';
	if (props.type === 'white') {
		loginImgColor = loginImgWhite;
		usernameColor = 'white';
	}
	return (
		<div className="header-container">
			<div className={props.type}></div>
			<div className="header-info">
				<div className="back-button">
					<Link to={props.back}>
						{props.type === 'black' && <img alt="back" src={leftArrow}></img>}
					</Link>
				</div>
				<div className={'title-' + props.type}>
					<h1>{props.title}</h1>
				</div>
				<div className="login-button">
					{props.hasLogin === 'true' && (
						<Link to={link}>
							<div className="login-container">
								<p style={{ color: usernameColor, zIndex: 10 }}>{username}</p>
								<img alt="login" src={loginImgColor}></img>
							</div>
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}

export default Header;
