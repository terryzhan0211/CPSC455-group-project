import React from 'react';
import './Post.css';
import { Link } from 'react-router-dom';
import { BiZoomIn } from 'react-icons/bi';
import {useDispatch} from 'react-redux';
import {getCurrPost} from "../features/cities";
import { useNavigate } from 'react-router-dom';

function Post(props) {
	console.log(props.imgs)
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function handleOnClick(id) {
		// navigate('/postdetail', { replace: true });
		console.log(id);
		// dispatch(getCurrPost(id));
		navigate('/postdetail', { replace: true });

	}
	return (
		<div className="post-container">
			<img src={props.path} alt="post"></img>
			<div className="post-content">
				<p>
					<strong>@{props.userName}</strong> {props.title}
					
						<BiZoomIn className="btn-zoom-in" style={{ color: 'white' }} 
						onClick={()=>{handleOnClick(props.id)}}/>
					
				</p>
			</div>
		</div>
	);
}

export default Post;
