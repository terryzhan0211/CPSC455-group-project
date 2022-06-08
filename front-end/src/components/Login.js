import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Input from './Input';
import FancyButton from './FancyButton';
import leftArrow from '../img/left-arrow.png';
import './Form.css';
function Login() {
	return (
		<div>
			<Link to="/" className="back-button">
				<img alt="back" src={leftArrow}></img>
			</Link>
			<Header title="LOGIN" type="white"></Header>

			<div className="form-container">
				<Input
					size="Input-narrow"
					type="text"
					name="User name"
					// value={title}
					// onChange={(event) => setTitle(event.target.value)}
				/>
				<Input
					size="Input-narrow"
					type="password"
					name="Password"
					// value={title}
					// onChange={(event) => setTitle(event.target.value)}
				/>
				<FancyButton name="Login" />
			</div>
		</div>
	);
}

export default Login;
