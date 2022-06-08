import React from 'react';
import Header from './Header.js';
import Post from './Post.js';
import { Link } from 'react-router-dom';
import './Posts.css';
import leftArrow from '../img/left-arrow.png';
import loginImg from '../img/login.png';
import AddButton from './AddButton.js';
function Posts() {
	const img = require('../img/test1.jpg');
	const posts = [];
	for (let i = 0; i < 10; i++) {
		posts.push(
			<div className="posts-item" key={i}>
				<Post path={img} userName="user1" title="title1" />
			</div>
		);
	}
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

			<div className="posts-container">{posts}</div>
			<Link to="/addpost" className="add-button">
				<AddButton />
			</Link>
		</div>
	);
}

export default Posts;
