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
				<div className="form">
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
				</div>

				<div className="buttons">
					<FancyButton class="fancybutton" name="Login" />
					<FancyButton class="fancybutton-neg" name="Sign up" />
				</div>
			</div>
		</div>
	);
}

export default Login;
