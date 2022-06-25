import React, { useState, useLocation, useEffect } from 'react';
import Header from './Header.js';
import Post from './Post.js';
import { Link } from 'react-router-dom';
import './Posts.css';
import leftArrow from '../img/left-arrow.png';
import loginImg from '../img/login.png';
import AddButton from './AddButton.js';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrPosts } from '../features/cities';
import { Router, Route } from 'react-router';

function Posts({route}) {
	const img = require('../img/test1.jpg');
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.cities.currPosts);
	// const posts = [];
	// const { state } = useLocation();
	// const { cityName } = state;

	// useEffect(() => {
	// 	// dispatch(getPosts(props.cityName));
	//
	// });
	const [renderPosts, setRenderPosts] = useState();
	const [showPosts, setShowPosts] = useState(false);
	useEffect(() => {
		// console.log(state);
		// dispatch(getCurrPosts(state));
		console.log(posts);
		setRenderPosts(() => {
			return posts.posts.map((post, index) => {
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
		});
		// setShowPosts(true);
	}, []);
	return (
		<div>
			<div>
				<Link to="/" className="back-button">
					<img alt="back" src={leftArrow}></img>
				</Link>
				<Header title={posts.city} type="white"></Header>
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
