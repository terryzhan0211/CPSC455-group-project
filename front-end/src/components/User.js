import React from 'react';
import Header from './Header';
import loginImg from '../img/login.png';
import './User.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/user';
import { Navigate, useNavigate } from 'react-router-dom';
function User() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userInfo = useSelector((state) => state.user.user);
	const handleOnClickSignout = () => {
		dispatch(logout());
		navigate('/');
	};
	return (
		<div>
			<Header title="Your Profile" type="black" hasLogin="false" back="/" />

			<div className="user-container">
				<div className="user-profilepic-container">
					<img src={loginImg} alt=""></img>
				</div>
				<div className="user-info-container">
					<button>Edit</button>
					<p>{userInfo.username}</p>
					<p>{userInfo.introduction}</p>
				</div>
			</div>
		</div>
	);
}

export default User;
