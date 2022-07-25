import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Input from '../components/Input';
import FancyButton from '../components/FancyButton';
import { login } from '../features/userThunks.js';
import { reset } from '../features/user.js';
import './Form.css';
import { useDispatch, useSelector } from 'react-redux';

import { motion } from 'framer-motion';
import { animationTwo, transition } from '../animations';
import { getCurrUserPosts } from '../features/cities';
function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user, isLoading, isError, isSuccess, message, isLogin } = useSelector(
		(state) => state.user
	);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		if (isError) {
			alert('wrong credential');
		}

		if (isSuccess || user) {
			navigate('/');
		}

		dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	const handleLogin = () => {
		dispatch(login({ username: username, password: password }));
		dispatch(getCurrUserPosts({ username: username }));
	};
	const handleClear = () => {
		setUsername('');
		setPassword('');
	};
	const handleSignup = () => {
		navigate('/signup', { replace: true });
	};

	return (
		<motion.div
			initial="out"
			animate="in"
			exit="out"
			variants={animationTwo}
			transition={transition}
		>
			<div>
				<Header title="LOGIN" type="black" hasLogin="false" back="/" />

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
						<FancyButton
							class="fancybutton"
							name="Login"
							onClick={() => handleLogin()}
						/>
						<FancyButton
							class="fancybutton-neg"
							name="Sign up"
							onClick={() => handleSignup()}
						/>
					</div>
				</div>
			</div>
		</motion.div>
	);
}

export default Login;
