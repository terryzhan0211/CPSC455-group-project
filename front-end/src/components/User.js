import React, { useState } from 'react';
import Header from './Header';
import loginImg from '../img/login.png';
import './User.css';
import './Popup.css';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, editUser } from '../features/user';
import { Navigate, useNavigate } from 'react-router-dom';
import Input from './Input';
import Textfield from './Textfield';
import FancyButton from './FancyButton';
function User() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userInfo = useSelector((state) => state.user.currUser);
	const [editPopupIsOpen, setEditPopupIsOpen] = useState(false);
	const [editUsername, setEditUsername] = useState(userInfo.username);
	const [editIntroduction, setEditIntroduction] = useState(userInfo.introduction);
	const toggleEditPopup = () => {
		setEditPopupIsOpen(!editPopupIsOpen);
	};
	const handleOnClickSignout = () => {
		dispatch(logoutUser());
		navigate('/');
	};
	const handleOnClickEdit = (id) => {
		console.log(editUsername, editIntroduction);
		dispatch(editUser(id, { editUsername, editIntroduction }));
		toggleEditPopup();
	};
	return (
		<div>
			<Header title="Your Profile" type="black" hasLogin="false" back="/" />
			<div className="user-container">
				<div className="user-profilepic-container">
					<img src={loginImg} alt=""></img>
					<FancyButton
						class="fancybutton"
						name="Edit"
						onClick={() => {
							toggleEditPopup();
						}}
					/>
					<FancyButton
						class="fancybutton-neg"
						name="Logout"
						onClick={() => {
							handleOnClickSignout();
						}}
					/>
				</div>
				<div className="user-info-container">
					<div>
						<p>Username</p>
						<strong>{userInfo.username}</strong>
						<p>Introduction</p>
						<strong>{userInfo.introduction}</strong>
					</div>
				</div>
			</div>
			{editPopupIsOpen && (
				<div className="popup-box">
					<div className="box">
						<span
							className="close-icon"
							onClick={() => {
								toggleEditPopup(-1);
							}}
						>
							x
						</span>
						<div>
							<form className="box-container">
								<Input
									size="Input"
									type="text"
									name="Your new username"
									onChange={(event) => setEditUsername(event.target.value)}
								/>
								<Textfield
									size="Textfield"
									type="text"
									name="Your new introduction"
									onChange={(event) => setEditIntroduction(event.target.value)}
								/>
								<FancyButton
									type="AddButton"
									name="Edit"
									onClick={() => {
										handleOnClickEdit();
									}}
								/>
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default User;
