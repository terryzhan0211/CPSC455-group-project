import React from 'react';
import './AddButton.css';
import AddButtonImg from '../img/addpost.png';
import AddButtonImgWhite from '../img/addpost-white.png';
function AddButton(props) {
	let addButtonImg = AddButtonImg;
	if (props.color === 'white') {
		addButtonImg = AddButtonImgWhite;
	}

	return (
		<div className="AddButton">
			<img alt="AddButtonImg" src={addButtonImg}></img>
		</div>
	);
}

export default AddButton;
