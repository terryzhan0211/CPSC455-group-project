import React, { useState, useRef,useEffect } from 'react';
import { useSelector } from 'react-redux';
import MainHeader from '../components/MainHeader.js';
import Map from '../components/Map.js';
import './Main.css';
import AddButton from '../components/AddButton.js';
import { useNavigate } from 'react-router-dom';
import Search from '../components/Search.js';
import Spinner from '../components/Spinner.js'

function Main() {
	const [editIntroPopupIsOpen, setEditIntroPopupIsOpen] = useState(false);
	const addressRef = useRef();
	let popRef = useRef();
	const navigate = useNavigate();	
	const { currCityName, getCityNameById } = useSelector(
		(state) => state.cities
	)
	
	const toggleEditPopup = () => {
		setEditIntroPopupIsOpen(!editIntroPopupIsOpen);
	};
	const handleSearch = () => {
		console.log('form submitted ✅');
		addressRef.current.value = '';
		navigate('/postList', { replace: true });
	};

	useEffect(() => {
		const keyDownHandler = event => {
		//   console.log('User pressed: ', event.key);	
		  if (event.key === 'Enter') {
			event.preventDefault();
			// 👇️ call submit function here
			handleSearch()
		  }
		};

		let pressEnterHandler = e =>{
			if(!popRef.current.contains(e.target)) {
				setEditIntroPopupIsOpen(false);
			}
		}		
		document.addEventListener('keydown', keyDownHandler);
		document.addEventListener('mousedown', pressEnterHandler);
		return () => {
		  document.removeEventListener('keydown', keyDownHandler);
		  document.removeEventListener('mousedown', pressEnterHandler);
		};
	}, []);
	
	if (getCityNameById === "PENDING"){
		return <Spinner />
	}
	
	return (
		<div className="main-container">
			<MainHeader title="GO TRAVEL!" type="white" hasLogin="true" back="/" onClick={() => {toggleEditPopup();}}/>
			<Map />
			<AddButton color="white" className="add-button" />
			
			<Search
			editIntroPopupIsOpen={editIntroPopupIsOpen}
			popRef={popRef}
			addressRef={addressRef}			
			/>
		</div>
	);
}

export default Main;
