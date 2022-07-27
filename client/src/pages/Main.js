import React, { useState, useRef } from 'react';
import MainHeader from '../components/MainHeader.js';
import Map from '../components/Map.js';
import './Main.css';
import AddButton from '../components/AddButton.js';
import { Autocomplete } from '@react-google-maps/api';
import FancyButton from '../components/FancyButton.js';
import { useNavigate } from 'react-router-dom';

function Main() {
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
		navigate('/postList', { replace: true });
	};

	return (
		<div className="main-container">
			<MainHeader title="GO TRAVEL!" type="white" hasLogin="true" back="/" onClick={() => {
								toggleEditPopup();
							}}/>
			<Map />

			<AddButton color="white" className="add-button" />

			{editIntroPopupIsOpen && (
				<div className="popup-box">
					<div className="box">
						<span
							className="close-icon"
							onClick={() => {
								toggleEditPopup(-1);
							}}
						>
							x
						</span>
						<div>
							<form className="box-container">
								<Autocomplete options={options}>
									<input
										size="Input"
										className="Input"
										type="text"
										placeholder="Location"
										ref={addressRef}
									/>
								</Autocomplete>
								<FancyButton
									class="fancybutton"
									name="Search"
									onClick={() => {
								        handleClearText();
										handleSearch();
										console.log("click search");
									}}
					/>
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Main;
