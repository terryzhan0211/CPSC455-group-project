import React, { useState, useLocation, useEffect } from 'react';
import Header from './Header.js';
import Post from './Post.js';
import { Link } from 'react-router-dom';
import './Posts.css';
import leftArrow from '../img/left-arrow.png';
import loginImg from '../img/login.png';
import AddButton from './AddButton.js';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../features/cities';
function Posts(props) {
	const img = require('../img/test1.jpg');
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.currPosts);
	// const posts = [];
	// const { state } = useLocation();
	// const { cityName } = state;
	const renderPosts = () => {
		posts.map((post, index) => {
			return (
				<div className="posts-item" key={index}>
					<Post
						path={img}
						userName={post.username}
						title={post.title}
						content={post.content}
					/>
				</div>
			);
		});
	};
	useEffect(() => {
		dispatch(getPosts(props.cityName));
	});
	return (
		<div>
			<div>
				<Link to="/" className="back-button">
					<img alt="back" src={leftArrow}></img>
				</Link>
				<Header title={props.cityName} type="white"></Header>
				<Link to="/login" className="login-button">
					<img alt="login" src={loginImg}></img>
				</Link>
			</div>

			<div className="posts-container">{renderPosts}</div>
			<Link to="/addpost" className="add-button">
				<AddButton />
			</Link>
		</div>
	);
}

export default Posts;
