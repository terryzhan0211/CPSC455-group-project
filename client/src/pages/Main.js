import React, { useState, useRef, useEffect } from 'react';
import MainHeader from '../components/MainHeader.js';
import Map from '../components/Map.js';
import './Main.css';
import AddButton from '../components/AddButton.js';
import { useNavigate } from 'react-router-dom';
import Search from '../components/Search.js';
import Spinner from '../components/Spinner.js';
import { useDispatch, useSelector } from 'react-redux';
import { handleSearch } from '../features/citiesThunks.js';


function Main() {
	const [searchBarPopup, setSearchBarPopup] = useState(false);
	const [navigatePost, setnavigatePost] = useState(false);
	const addressRef = useRef();
	let popRef = useRef();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	let { currCityId, cityhandleSearch } = useSelector((state) => state.cities);

	useEffect(() => {
		// if(cityhandleSearch === "PENDING"){
		// 	return <Spinner />
		// }
		if (cityhandleSearch === 'FULFILLED' && navigatePost === false) {
			navigate(`/postList/${currCityId}`, { replace: true });
			window.location.reload(true);
			setnavigatePost(true);
		} 
		// else if (cityhandleSearch === 'REJECTED') {
		// 	alert('There is no post for this city');
		// }
	}, [cityhandleSearch]);

	const toggleEditPopup = () => {
		setSearchBarPopup(!searchBarPopup);
	};
	const OnClickhandleSearch = () => {
		console.log('form submitted ✅');
		dispatch(handleSearch(addressRef.current.value));
		addressRef.current.value = '';
		setSearchBarPopup(false);
	};
	function handleKeyPress(e) {
		var key = e.key;
		console.log('You pressed a key: ' + key);
		if (key === 'Enter') {
			OnClickhandleSearch();
		}
	}
	function handleMouseDown(e) {
		if (e.type === 'mousedown' && !popRef.current.contains(e.target)) {
			setSearchBarPopup(false);
		}
	}

	return (
		<div className="main-container">
			<MainHeader
				title="GO TRAVEL!"
				type="white"
				hasLogin="true"
				back="/"
				onClick={() => {
					toggleEditPopup();
				}}
			/>
			<Map />
			<AddButton color="white" className="add-button" />

			<Search
				searchBarPopup={searchBarPopup}
				popRef={popRef}
				addressRef={addressRef}
				onKeyPress={(e) => handleKeyPress(e)}
				onMouseDown={(e) => handleMouseDown(e)}
			/>
		</div>
	);
}

export default Main;
