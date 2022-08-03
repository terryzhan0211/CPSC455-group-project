import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useSelector } from 'react-redux';
import { BsSearch } from 'react-icons/bs';
import loginImgWhite from '../img/login-white.png';
import loginImg from '../img/login.png';
import leftArrow from '../img/left-arrow.png';

function Header(props) {
	const userInfo = useSelector((state) => state.user);
	var link = '/login';
	var username = 'Login';
	if (userInfo.isLogin) {
		link = '/user';
		username = userInfo.user.username;
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
		<div className={props.type}>
			<div className="header-info">
				<div className="back-button">
					<Link to={props.back}>
						{props.type === 'black' && <img alt="back" src={leftArrow}></img>}
						{props.type === 'white' && (
							<BsSearch
								color="white"
								fontSize="30px"
								onClick={props.onClick}
							></BsSearch>
						)}
					</Link>
				</div>

				<div className={'title-' + props.type}>
					<h1>{props.title}</h1>
				</div>
				<div className="login-button">
					<div className="login-container">
						{props.hasLogin === 'true' && (
							<>
								<p style={{ color: usernameColor }}>{username}</p>
								<Link to={link}>
									<img alt="login" src={loginImgColor}></img>
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Header;
