import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import './Form.css';
import leftArrow from '../img/left-arrow.png';
import loginImg from '../img/login.png';
import Input from './Input.js';
import Textfield from './Textfield.js';
import FancyButton from './FancyButton.js';
function AddPost(props) {
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
					// value={title}
					// onChange={(event) => setTitle(event.target.value)}
				/>
				<Textfield
					size="Textfield"
					type="text"
					name="Description"
					// value={ingredients}
					// onChange={(event) => setIngredients(event.target.value)}
				/>
				<Input
					size="Textfield"
					type="file"
					name="Photos"
					// value={ingredients}
					// onChange={(event) => setIngredients(event.target.value)}
				/>
				<FancyButton class="fancybutton" name="Post" />
			</div>
		</div>
	);
}

export default AddPost;
