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
	}, [cityhandleSearch]);

	const toggleEditPopup = () => {
		setSearchBarPopup(!searchBarPopup);
	};
	const OnClickhandleSearch = () => {
		console.log('form submitted ✅');
		dispatch(handleSearch(addressRef.current.value));
		addressRef.current.value = '';
		setSearchBarPopup(false);
		// if (cityhandleSearch === "FULFILLED"){
		// 	alert(currCityId)
		// 	navigate(`/postList/${currCityId}`, { replace: true });
		// }else {
		// 	return <Spinner />
		// }
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

	// useEffect(() => {
	// 	const keyDownHandler = event => {
	// 	//   console.log('User pressed: ', event.key);
	// 	  if (event.key === 'Enter') {
	// 		event.preventDefault();
	// 		// 👇️ call submit function here
	// 		handleSearch()
	// 	  }
	// 	};

	// 	let pressEnterHandler = e =>{
	// 		if(!popRef.current.contains(e.target)) {
	// 			setEditIntroPopupIsOpen(false);
	// 		}
	// 	}
	// 	document.addEventListener('keydown', keyDownHandler);
	// 	document.addEventListener('mousedown', pressEnterHandler);
	// 	return () => {
	// 	  document.removeEventListener('keydown', keyDownHandler);
	// 	  document.removeEventListener('mousedown', pressEnterHandler);
	// 	};
	// }, []);

	// if (cityhandleSearch === "PENDING"){
	// 	return <Spinner />
	// }

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
