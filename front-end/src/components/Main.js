import React from 'react';
import Header from './Header.js';
import Map from './Map.js';
import './Main.css';
import AddButton from './AddButton.js';
import LoginHeader from './LoginHeader';
import { Link } from 'react-router-dom';
import loginImg from '../img/login-white.png';
import { useSelector } from 'react-redux';
function Main() {
	const username = useSelector((state) => state.user.currUser.userName);
	return (
		<div className="main-container">
			<Header title="GO TRAVEL" type="white" hasLogin="true" />

			<Map />
			<Link to="/addpost" className="add-button">
				<AddButton color="white" />
			</Link>
		</div>
	);
}

export default Main;
