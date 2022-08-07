import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Input from '../components/Input';
import FancyButton from '../components/FancyButton';
import { register } from '../features/userThunks.js';
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
			navigate('/', { replace: true });
		}
	};
	return (
		<div className="signup-page">
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
