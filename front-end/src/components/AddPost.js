import React, { useState, useRef, useEffect } from 'react';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import './Form.css';
import leftArrow from '../img/left-arrow.png';
import loginImg from '../img/login.png';
import Input from './Input.js';
import Textfield from './Textfield.js';
import FancyButton from './FancyButton.js';
import { useDispatch } from 'react-redux';
import { addPost } from '../features/cities.js';
import { Autocomplete, GoogleMap } from '@react-google-maps/api';
import ImageUploading from 'react-images-uploading';

function AddPost(props) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [location, setLocation] = useState('');
	const [photos, setPhotos] = useState([]);
	const [images, setImages] = useState([]);
	const maxNumber = 69;
	let imageList = [];
	const onChange = (imageList, addUpdateIndex) => {
		// data for submit

		console.log(imageList, addUpdateIndex);
		setImages(imageList);
		console.log('imageList');
		console.log(imageList);
		console.log('images');
		console.log(images);
	};

	const addressRef = useRef();
	// const [imageURLS, setImageURLs] = useState([]);

	const handleSubmitPost = () => {
		console.log('addressRef.current.value');
		console.log(addressRef.current.value);
		console.log('location');
		console.log(location);
		console.log('images');
		console.log(images);
		console.log(typeof images);
		console.log(images[0]);
		dispatch(
			addPost({
				title: title,
				content: content,
				location: location,
				photos: photos,
			})
		);
		handleClearText();
		navigate('/', { replace: true });
	};
	const handleUploadPhoto = (photo) => {
		setPhotos((oldList) => [...oldList, photo]);
	};
	const handleClearText = () => {
		setTitle('');
		setContent('');
		setLocation('');
		setImages([]);
		addressRef.current.value = '';
	};

	// const renderUploadPhoto = () => {
	// 	var amount = photos.length;
	// 	const photoInputs = [];
	// 	for (var i = 0; i < amount; i++) {
	// 		photoInputs.push(
	// 			<Input
	// 				size="Textfield"
	// 				type="file"
	// 				name="Photos"
	// 				onChange={(event) => {
	// 					handleUploadPhoto(event.target.value);
	// 				}}
	// 			/>
	// 		);
	// 	}
	// 	return photoInputs;
	// };

	// var strictBounds = new window.google.maps.LatLngBounds(
	// 	new window.google.maps.LatLng(40.774, -74.125), //左下
	// 	new window.google.maps.LatLng(60.500651, -58.736156)//右上
	// 	);

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
				<Textfield
					size="Textfield"
					type="text"
					name="Description"
					value={content}
					onChange={(event) => setContent(event.target.value)}
				/>
				<Autocomplete
				// bounds={strictBounds}
				//  onLoad={()=>{onLoad()}}
				//  onPlaceChanged={()=>{onPlaceChanged()}}
				>
					<input
						size="Input"
						className="Input"
						type="text"
						placeholder="Location"
						// value={location}
						// onChange={(event) => setLocation(event.target.value)}
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
				<ImageUploading
					multiple
					value={images}
					onChange={onChange}
					maxNumber={maxNumber}
					dataURLKey="data_url"
				>
					{({
						imageList,
						onImageUpload,
						onImageRemoveAll,
						onImageUpdate,
						onImageRemove,
						isDragging,
						dragProps,
					}) => (
						// write your building UI
						<div className="upload__image-wrapper">
							<button
								style={isDragging ? { color: 'red' } : null}
								onClick={onImageUpload}
								{...dragProps}
							>
								Click or Drop here
							</button>
							&nbsp;
							<button onClick={onImageRemoveAll}>Remove all images</button>
							{images.map((image, index) => (
								<div key={index} className="image-item">
									<img src={image.data_url} alt="" width="100" />
									<div className="image-item__btn-wrapper">
										<button onClick={() => onImageUpdate(index)}>Update</button>
										<button onClick={() => onImageRemove(index)}>Remove</button>
									</div>
								</div>
							))}
						</div>
					)}
				</ImageUploading>
				<FancyButton
					class="fancybutton"
					name="Post"
					onClick={() => {
						handleSubmitPost();
					}}
				/>
			</div>
		</div>
	);
}

export default AddPost;
