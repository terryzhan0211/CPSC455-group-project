import React from 'react';
import './AddButton.css';
import AddButtonImg from '../img/addpost.png';
function AddButton() {
	return (
		<div className="AddButton">
			<img alt="AddButtonImg" src={AddButtonImg}></img>
		</div>
	);
}

export default AddButton;
