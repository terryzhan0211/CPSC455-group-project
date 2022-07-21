import React from 'react';
import Header from '../components/Header.js';
import Map from '../components/Map.js';
import './Main.css';
import AddButton from '../components/AddButton.js';
import { useNavigate } from 'react-router-dom';
import loginImg from '../img/login-white.png';
import { useSelector } from 'react-redux';
function Main() {
	return (
		<div className="main-container">
			<Header title="GO TRAVEL!" type="white" hasLogin="true" back="/" />
			<Map />

			<AddButton color="white" className="add-button" />
		</div>
	);
}

export default Main;
