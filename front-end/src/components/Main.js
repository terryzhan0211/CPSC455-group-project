import React from 'react';
import Header from './Header.js';
import Map from './Map.js';
import './Main.css';
import AddButton from './AddButton.js';
import { Link } from 'react-router-dom';
import loginImg from '../img/login.png';
function Main() {
	return (
		<div className="Main">
			<Header title="GO TRAVEL" type="black" />
			<Link to="/login" className="login-button">
				<img alt="login" src={loginImg}></img>
			</Link>
			<Map />
			<Link to="/addpost" className="add-button">
				<AddButton />
			</Link>
		</div>
	);
}

export default Main;
