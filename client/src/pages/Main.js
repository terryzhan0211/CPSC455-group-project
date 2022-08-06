import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleSearch } from '../features/citiesThunks.js';
import { searchStateToIdle } from '../features/cities';
import './Main.css';
import Map from '../components/Map.js';
import AddButton from '../components/AddButton.js';
import Search from '../components/Search.js';
import Header from '../components/Header.js';

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
			dispatch(searchStateToIdle());
			setnavigatePost(true);
		} else if (cityhandleSearch === 'REJECTED') {
			dispatch(searchStateToIdle());
			alert('No one has been there!');
		}
		setnavigatePost(false);
	}, [cityhandleSearch]);

	const toggleEditPopup = () => {
		setSearchBarPopup(!searchBarPopup);
	};
	const OnClickhandleSearch = () => {
		var searchKey = addressRef.current.value;
		addressRef.current.value = '';
		dispatch(handleSearch(searchKey));
		setSearchBarPopup(false);
	};
	function handleKeyPress(e) {
		var key = e.key;
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
			<Header
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
