import React from 'react';
import './Post.css';

function Post(props) {
	return (
		<div className="post-container">
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
