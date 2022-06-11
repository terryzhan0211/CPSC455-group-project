import React from 'react';
import './Post.css';
import { Link } from 'react-router-dom';
import { BiZoomIn } from "react-icons/bi";


function Post(props) {
	return (
		<div className="post-container">
			<img src={props.path} alt="post"></img>
			<div className="post-content">
				<p>
					<strong>@{props.userName}</strong> {props.title} 
					<Link to="/postdetail"  className="back-button"> 
						<BiZoomIn className='btn-zoom-in' style={{color: 'white'}} />
					</Link>
					
				</p>
			</div>
		</div>
	);
}

export default Post;
