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

function Posts({ route }) {
	const img = require('../img/test1.jpg');
	const dispatch = useDispatch();
	const posts = useSelector((state) => state.cities.currPosts);
	const [renderPosts, setRenderPosts] = useState();
	const [showPosts, setShowPosts] = useState(false);
	const cityName = posts.city.toLocaleUpperCase();
	useEffect(() => {
		console.log(posts);
		setRenderPosts(() => {
			return posts.posts?.map((post, index) => {
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
	}, []);

	return (
		<div>
			<div className="header">
				<Link to="/" className="back-button">
					<img alt="back" src={leftArrow}></img>
				</Link>
				<Header title={cityName} type="white"></Header>
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
