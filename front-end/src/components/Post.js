import React from 'react';
import './Post.css';

import { useDispatch } from 'react-redux';
import { getCurrPost } from '../features/cities';
import { useNavigate } from 'react-router-dom';

function Post(props) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function handleOnClick(id) {
		console.log(id);
		dispatch(getCurrPost(id));
		navigate('/postdetail', { replace: true });
	}
	console.log(props.id);
	return (
		<div
			className="post-container"
			onClick={() => {
				handleOnClick(props.id);
			}}
		>
			<img src={props.path} alt="post"></img>
			<div className="post-content">
				<p>
					<strong>@{props.username}</strong> {props.title}
				</p>
			</div>
		</div>
	);
}

export default Post;
