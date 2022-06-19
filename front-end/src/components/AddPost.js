import React, { useState } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import './Form.css';
import leftArrow from '../img/left-arrow.png';
import loginImg from '../img/login.png';
import Input from './Input.js';
import Textfield from './Textfield.js';
import FancyButton from './FancyButton.js';
import { useDispatch } from 'react-redux';
import { addPost } from '../features/data.js';
function AddPost(props) {
	const dispatch = useDispatch();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [location, setLocation] = useState('');
	const [photos, setPhotos] = useState([]);
	const handleSubmitPost = () => {
		dispatch(
			addPost({
				title: title,
				content: content,
				location: location,
				photos: photos,
			})
		);
		handleClearText();
	};
	const handleClearText = () => {
		setTitle('');
		setContent('');
		setLocation('');
		setPhotos([]);
	};
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
				<Input
					size="Textfield"
					type="text"
					name="Location"
					value={location}
					onChange={(event) => setLocation(event.target.value)}
				/>
				<Input
					size="Textfield"
					type="file"
					name="Photos"
					onChange={(event) => {
						const newPhotos = photos;
						newPhotos.push(event.target.value);
						setPhotos(newPhotos);
					}}
				/>
				<FancyButton class="fancybutton" name="Post" onClick={handleSubmitPost} />
			</div>
		</div>
	);
}

export default AddPost;
