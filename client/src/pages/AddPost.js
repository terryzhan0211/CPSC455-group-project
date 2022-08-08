import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import './Form.css';

import Input from '../components/Input.js';
import Textfield from '../components/Textfield.js';
import FancyButton from '../components/FancyButton.js';
import { useDispatch, useSelector } from 'react-redux';
import { addPostAsync } from '../features/postListThunks';
import { setAddPostStatusToIdle } from '../features/postList';
import { Autocomplete } from '@react-google-maps/api';
import ImageUploading from 'react-images-uploading';
import uploadImgButton from '../img/upload-img-gray.png';
import { motion } from 'framer-motion';
import { animationTwo, transition } from '../animations';
import Loading from '../components/Loading';

function AddPost(props) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const addressRef = useRef();
	const userInfo = useSelector((state) => state.user);
	const { addPost, newPost } = useSelector((state) => state.postList);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [location, setLocation] = useState('');
	const [images, setImages] = useState([]);
	const [isAdding, setIsAdding] = useState(false);
	const maxNumber = 69;
	let imageList = [];
	var options = {
		types: ['(cities)'],
		componentRestrictions: { country: ['us', 'ca'] },
	};
	const onChange = (imageList, addUpdateIndex) => {
		setImages(imageList);
	};

	const handleSubmitPost = () => {
		setIsAdding(true);
		if (title === '' || content === '' || addressRef === '' || images.length === 0) {
			alert('please fill in all sections to post');
			setIsAdding(false);
		} else if (!userInfo.isLogin) {
			alert('please log in first');
			setIsAdding(false);
			navigate('/login');
		} else {
			const newPost = {
				cityId: '',
				cityName: '',
				title: title,
				content: content,
				location: addressRef.current.value,
				photos: images,
				userId: userInfo.user._id,
				username: userInfo.user.username,
			};
			dispatch(addPostAsync(newPost));
		}
	};

	const handleClearText = () => {
		setTitle('');
		setContent('');
		setLocation('');
		setImages([]);
		addressRef.current.value = '';
	};

	const [city, setCity] = useState(null);
	const [state, setState] = useState(null);
	const [country_name, setCountry_name] = useState(null);
	const getUserGeolocationDetials = () => {
		addressRef.current.value = city + ', ' + state + ', ' + country_name;
	};

	useEffect(() => {
		if (addPost === 'FULFILLED') {
			alert('Post successfully!');
			handleClearText();
			dispatch(setAddPostStatusToIdle());
			navigate(`/postlist/${newPost.cityId}`, { replace: true });
			setIsAdding(false);
		} else if (addPost === 'REJECTED') {
			setIsAdding(false);
			dispatch(setAddPostStatusToIdle());
			alert('Failed to post');
		}
	}, [addPost]);

	useEffect(() => {
		fetch('https://geolocation-db.com/json/86f5f280-f4eb-11ec-8676-4f4388bc6daa')
			.then((respons) => respons.json())
			.then((data) => {
				setCity(data.city);
				setState(data.state);
				setCountry_name(data.country_name);
			});
	}, []);

	return (
		<motion.div
			initial="out"
			animate="in"
			exit="out"
			variants={animationTwo}
			transition={transition}
		>
			<div className="addpost-page">
				<Header title="ADD POST" type="black" hasLogin="true" back="/" />

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
					<div className="autocomplete-container">
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
							name="Your Location"
							onClick={() => {
								getUserGeolocationDetials();
							}}
						/>
					</div>

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
							<div
								className="upload__image-wrapper"
								style={isDragging ? { backgroundColor: 'white' } : null}
								{...dragProps}
							>
								{images.length < 1 && (
									<div className="upload__image-false">
										<img src={uploadImgButton} alt="" onClick={onImageUpload} />
										<p>Drag and drop</p>
									</div>
								)}
								{images.length > 0 && (
									<div className="upload__image-true">
										{images?.map((image, index) => (
											<div key={index} className="image-item">
												<div className="image-item__btn-wrapper">
													<button onClick={() => onImageRemove(index)}>
														X
													</button>
													<img
														src={image.data_url}
														alt=""
														width="100px"
													/>
												</div>
											</div>
										))}
									</div>
								)}
							</div>
						)}
					</ImageUploading>

					{!isAdding ? (
						<FancyButton
							class="fancybutton"
							name="Post"
							onClick={() => {
								handleSubmitPost();
							}}
						/>
					) : (
						<Loading />
					)}
				</div>
			</div>
		</motion.div>
	);
}

export default AddPost;
