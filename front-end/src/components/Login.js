import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import Input from './Input';
import FancyButton from './FancyButton';
import leftArrow from '../img/left-arrow.png';
import { loginUser } from '../features/user.js';
import './Form.css';
import { useDispatch, useSelector } from 'react-redux';

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isLogin = useSelector((state) => state.user.isLogin);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const handleLogin = () => {
		dispatch(loginUser({ username: username, password: password }));
		if (isLogin) {
			handleClear();
			navigate('/', { replace: true });
		} else {
			alert('wrong credential');
		}
	};
	const handleClear = () => {
		setUsername('');
		setPassword('');
	};
	const handleSignup = () => {
		navigate('/signup', { replace: true });
	};
	return (
		<div>
			<Header title="LOGIN" type="black" hasLogin="false" />

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
				</div>

				<div className="buttons">
					<FancyButton class="fancybutton" name="Login" onClick={() => handleLogin()} />
					<FancyButton
						class="fancybutton-neg"
						name="Sign up"
						onClick={() => handleSignup()}
					/>
				</div>
			</div>
		</div>
	);
}

export default Login;
