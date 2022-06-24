import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Input from './Input';
import FancyButton from './FancyButton';
import leftArrow from '../img/left-arrow.png';

import './Form.css';

function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const handleLogin = () => {};
	const handleSignup = () => {};
	return (
		<div>
			<Link to="/" className="back-button">
				<img alt="back" src={leftArrow}></img>
			</Link>
			<Header title="LOGIN" type="white"></Header>

			<div className="form-container">
				<div className="form">
					<Input size="Input-narrow" type="text" name="User name" value={username} />
					<Input size="Input-narrow" type="password" name="Password" value={password} />
				</div>

				<div className="buttons">
					<FancyButton class="fancybutton" name="Login" onClick={handleLogin} />
					<FancyButton class="fancybutton-neg" name="Sign up" onClick={handleSignup} />
				</div>
			</div>
		</div>
	);
}

export default Login;
