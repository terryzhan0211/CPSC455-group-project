import React from 'react';
import './AddButton.css';
import AddButtonImg from '../img/addpost.png';
import AddButtonImgWhite from '../img/addpost-white.png';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function AddButton(props) {
	const userInfo = useSelector((state) => state.user);
	const navigate = useNavigate();
	let addButtonImg = AddButtonImg;
	if (props.color === 'white') {
		addButtonImg = AddButtonImgWhite;
	}

	const handleAddPostButton = () => {
		if (!userInfo.isLogin) {
			alert('please login to write down your advanture');
			navigate('/login', { replace: true });
		} else {
			navigate('/addpost', { replace: true });
		}
	};
	return (
		<div className="AddButton">
			<img alt="AddButtonImg" src={addButtonImg} onClick={() => handleAddPostButton()}></img>
		</div>
	);
}

export default AddButton;
