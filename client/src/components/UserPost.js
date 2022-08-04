import React from 'react';
import './UserPost.css';
import { useNavigate } from 'react-router-dom';

function UserPost(props) {
	const navigate = useNavigate();

	function handleOnClick(id) {
		navigate(`/postdetail/${id}`, { replace: true });
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
