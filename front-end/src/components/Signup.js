import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import Input from './Input';
import FancyButton from './FancyButton';
import leftArrow from '../img/left-arrow.png';
import { register } from '../features/user.js';
import './Form.css';
import { useDispatch, useSelector } from 'react-redux';

function Signup() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleSignup = () => {
		if (password !== confirmPassword) {
			alert('Please confirm your password.');
		} else {
			dispatch(register({ username: username, password: password }));
			navigate('/login', { replace: true });
		}
	};
	return (
		<div>
			<Header title="SIGN UP" type="black" hasLogin="false" back="/" />

			<div className="form-container">
				<div className="form">
					<Input
						size="Input-narrow"
						type="text"
						name="User name"
						value={username}
						onChange={(event) => setUsername(event.target.value)}
					/>
					<Input
						size="Input-narrow"
						type="password"
						name="Password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
					<Input
						size="Input-narrow"
						type="password"
						name="Confirm password"
						value={confirmPassword}
						onChange={(event) => setConfirmPassword(event.target.value)}
					/>
					<p></p>
				</div>

				<div className="buttons">
					<FancyButton
						class="fancybutton"
						name="Sign up"
						onClick={() => handleSignup()}
					/>
				</div>
			</div>
		</div>
	);
}

export default Signup;
