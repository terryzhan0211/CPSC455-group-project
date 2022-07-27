import React, { useState, useRef,useEffect } from 'react';
import MainHeader from '../components/MainHeader.js';
import Map from '../components/Map.js';
import './Main.css';
import AddButton from '../components/AddButton.js';
import { Autocomplete } from '@react-google-maps/api';
import FancyButton from '../components/FancyButton.js';
import { useNavigate } from 'react-router-dom';

function Main() {
	const [first, setFirst] = useState('');
	const [last, setLast] = useState('');
  
	const [editIntroPopupIsOpen, setEditIntroPopupIsOpen] = useState(false);
	const addressRef = useRef();
	const navigate = useNavigate();
	var options = {
		types: ['(cities)'],
		componentRestrictions: { country: ['us', 'ca'] },
	};
	
	const toggleEditPopup = () => {
		setEditIntroPopupIsOpen(!editIntroPopupIsOpen);
		console.log(editIntroPopupIsOpen)
	};
	const handleClearText = () => {
		addressRef.current.value = '';
	};
	const handleSearch = () => {
		console.log('form submitted ✅');
		navigate('/postList', { replace: true });
	};

	let popRef = useRef();
	useEffect(() => {
		const keyDownHandler = event => {
		  console.log('User pressed: ', event.key);
	
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

	return (
		<div className="main-container">
			<MainHeader title="GO TRAVEL!" type="white" hasLogin="true" back="/" onClick={() => {
								toggleEditPopup();
							}}/>
			<Map />

			<AddButton color="white" className="add-button" />

			{editIntroPopupIsOpen && (
				<div className="popup-box">
					<div ref={popRef} className="box">				
													
								<Autocomplete options={options}>
									<input
										size="Input"
										className="Input"
										type="text"
										placeholder="Location"
										ref={addressRef}
									/>
								</Autocomplete>							
							
						
					</div>
				</div>
			)}
		</div>
	);
}

export default Main;
