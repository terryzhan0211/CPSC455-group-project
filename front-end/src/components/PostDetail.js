import React from 'react';
import { Link } from 'react-router-dom';
import leftArrow from '../img/left-arrow.png';
import Header from './Header';
import loginImg from '../img/login.png';
import './PostDetail.css';
import { PostData } from './PostData';
import God from '../img/god.jpg';
import Test from '../img/test1.jpg';
function PostDetail(props) {
	return (
		<div>
			<div>
				<Link to="/" className="back-button">
					<img alt="back" src={leftArrow}></img>
				</Link>
				<Header title="NEW YORK" type="white"></Header>
				<Link to="/login" className="login-button">
					<img alt="login" src={loginImg}></img>
				</Link>
			</div>
			<div className="context-container">
				<div className="image-container">
					<img alt="post" src={God}></img>
					{/* <ImgSlide slides={PostData}/> */}
				</div>

				<div className="text-container">
					<strong>{props.userName}</strong>
					<h3>{props.title}</h3>
					<p>{props.content}</p>
				</div>
			</div>
		</div>
	);
}

export default PostDetail;
