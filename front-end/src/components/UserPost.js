import React from 'react';
import './UserPost.css';
import { useDispatch } from 'react-redux';
import { getCurrPost } from '../features/cities';
import { useNavigate } from 'react-router-dom';

function UserPost(props) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function handleOnClick(id) {
		dispatch(getCurrPost(id));
		navigate('/postdetail', { replace: true });
	}
	return (
		<div
			className="post-container-user"
			onClick={() => {
				handleOnClick(props.id);

			}}
		>
			<img src={props.path} alt="post"></img>
			<div className="post-content-user">
				<p>{props.title}</p>

			</div>
		</div>
	);
}

export default UserPost;
