import React, { useState,useRef,useEffect} from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import './Form.css';
import leftArrow from '../img/left-arrow.png';
import loginImg from '../img/login.png';
import Input from './Input.js';
import Textfield from './Textfield.js';
import FancyButton from './FancyButton.js';
import { useDispatch } from 'react-redux';
import { addPost } from '../features/cities.js';
import { Autocomplete,GoogleMap } from '@react-google-maps/api';

function AddPost(props) {
	const dispatch = useDispatch();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [location, setLocation] = useState('');
	const [photos, setPhotos] = useState([]);

	const addressRef= useRef();
	// const [imageURLS, setImageURLs] = useState([]);

	const handleSubmitPost = () => {
		console.log("addressRef.current.value");
		console.log(addressRef.current.value);
		console.log("location");
		console.log(location);
		console.log("photos");
		console.log(photos);
		dispatch(
			addPost({
				title: title,
				content: content,
				location: addressRef.current.value,
				photos: photos,
			})
		);
		handleClearText();
	};
	const handleUploadPhoto = (photo) => {
		setPhotos((oldList) => [...oldList, photo]);
	};
	const handleClearText = () => {
		setTitle('');
		setContent('');
		setLocation('');
		setPhotos([]);
		addressRef.current.value='';
	};

	// useEffect(() => {
	// 	if (photos.length < 1) return;
	// 	let newImageUrls = [];
	// 	photos.forEach((photo) => newImageUrls.push(URL.createObjectURL(photo)));
	// 	setImageURLs(newImageUrls);
	//   }, [photos]);

	const renderUploadPhoto = () => {
		var amount = photos.length;
		const photoInputs = [];
		for (var i = 0; i < amount; i++) {
			photoInputs.push(
				<Input
					size="Textfield"
					type="file"
					name="Photos"
					onChange={(event) => {
						handleUploadPhoto(event.target.value);
					}}
				/>
			);
		}
		return photoInputs;
	};
	// const BOUNDS_MOUNTAIN_VIEW = 
	// new LatLngBounds(	new LatLng(40.774, -74.125), 	new LatLng(60.500651, -58.736156));
	
	var strictBounds = new window.google.maps.LatLngBounds(
		new window.google.maps.LatLng(40.774, -74.125), //左下
		new window.google.maps.LatLng(60.500651, -58.736156)//右上
		);
    
	return (
		<div>
			<div>
				<Link to="/" className="back-button">
					<img alt="back" src={leftArrow}></img>
				</Link>
				<Header title="ADD POST" type="white"></Header>
				<Link to="/login" className="login-button">
					<img alt="login" src={loginImg}></img>
				</Link>
			</div>

			<div className="form-container">
				<Input
					size="Input"
					type="text"
					name="Title"
					value={title}
					onChange={(event) => setTitle(event.target.value)}
				/>
				<Input
					size="Textfield"
					type="text"
					name="Description"
					value={content}
					onChange={(event) => setContent(event.target.value)}
				/>
				<Autocomplete
				bounds={strictBounds}
				//  onLoad={()=>{onLoad()}}
				//  onPlaceChanged={()=>{onPlaceChanged()}}
				>
					<input
						size="Input"
						className='Input'
						type="text"
						placeholder='Location'
						value={location}
						onChange={(event) => setLocation(event.target.value)}
						ref={addressRef}
					/>
				</Autocomplete>
				
				{/* {renderUploadPhoto} */}
				<Input
					size="Textfield"
					type="file"
					name="Photos"
					onChange={(event) => {
						handleUploadPhoto(event.target.value);
					}}
				/>
				<FancyButton class="fancybutton" name="Post" onClick={()=>{handleSubmitPost()}} />
			</div>
		</div>
	);
}

export default AddPost;
