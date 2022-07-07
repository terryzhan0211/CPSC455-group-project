import React, { useState, useRef } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import './Form.css';

import Input from './Input.js';
import Textfield from './Textfield.js';
import FancyButton from './FancyButton.js';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../features/cities.js';
import { Autocomplete } from '@react-google-maps/api';
import ImageUploading from 'react-images-uploading';
import uploadImgButton from '../img/upload-img-gray.png';

function AddPost(props) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const addressRef = useRef();
	const username = useSelector((state) => state.user.username);
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

	const handleSubmitPost = () => {
		if (title === '' || content === '' || addressRef === '' || images.length === 0) {
			alert('please fill in all sections to post');
		} else {
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
					location: addressRef.current.value,
					photos: images,
					username: username,
				})
			);
			handleClearText();
			alert('Post successfully!');
			navigate('/', { replace: true });
		}
	};

	const handleClearText = () => {
		setTitle('');
		setContent('');
		setLocation('');
		setImages([]);
		addressRef.current.value = '';
	};

	return (
		<div>
			<Header title="ADD POST" type="black" hasLogin="true" />

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
						<div
							className="upload__image-wrapper"
							style={isDragging ? { backgroundColor: 'white' } : null}
							{...dragProps}
						>
							{/* <img
								src={uploadImgButton}
								width="50px"
								height="50px"
								style={isDragging ? { color: 'red' } : null}
								onClick={onImageUpload}
								alt=""
							></img> */}
							{images.length < 1 && (
								<div className="upload__image-false">
									<img src={uploadImgButton} alt="" onClick={onImageUpload} />
								</div>
							)}
							{/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
							{images.length > 0 && (
								<div className="upload__image-true">
									{images?.map((image, index) => (
										<div key={index} className="image-item">
											<div className="image-item__btn-wrapper">
												{/* <button onClick={() => onImageUpdate(index)}>
												Update
											</button> */}
												<button onClick={() => onImageRemove(index)}>
													X
												</button>
												<img src={image.data_url} alt="" width="100px" />
											</div>
										</div>
									))}
								</div>
							)}
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
