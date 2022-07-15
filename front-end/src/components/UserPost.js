import React from 'react';
import './UserPost.css';
import { useDispatch } from 'react-redux';
import { getCurrPost } from '../features/cities';
import { useNavigate } from 'react-router-dom';
import { TiDelete } from "react-icons/ti";

function UserPost(props) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function handleOnClick(id) {
		dispatch(getCurrPost(id));
		navigate('/postdetail', { replace: true });
	}
	return (
		<div className="post-container-user"
			onClick={() => {
				handleOnClick(props.id);
			}} 
		>   
            <TiDelete className='post-content-user'/>
			<img src={props.path} alt="post"></img>
			<div className="post-content-user">   
                         
				<p>
					<strong>{props.title}</strong>
				</p>
			</div>
		</div>
	);
}

export default UserPost;