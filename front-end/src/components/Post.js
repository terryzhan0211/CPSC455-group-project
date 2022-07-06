import React from 'react';
import './Post.css';
import { useNavigate } from 'react-router-dom';

function Post(props) {
	const navigate = useNavigate();
	const handlePostOnClick = () => {
		navigate('/postdetail', { replace: true });
	};
	return (
		<div className="post-container" onClick={() => handlePostOnClick()}>
			<img src={props.path} alt="post"></img>
			<div className="post-content">
				<p>
					<strong>@{props.userName}</strong> {props.title}
				</p>
			</div>
		</div>
	);
}

export default Post;
