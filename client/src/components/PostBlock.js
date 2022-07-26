import React from 'react';
import './PostBlock.css';
import { useDispatch } from 'react-redux';
import { getCurrPost } from '../features/cities';
import { useNavigate } from 'react-router-dom';

function Post(props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	function handleOnClick(id) {
		dispatch(getCurrPost(id));
		navigate(`/postdetail`, { replace: true });
		// navigate(`/postdetail/${id}`, { replace: true });
	}
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
