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
	// const posts = [];
	// const { state } = useLocation();
	// const { cityName } = state;

	// useEffect(() => {
	// 	// dispatch(getPosts(props.cityName));
	//
	// });
	const [renderPosts, setRenderPosts] = useState();
	const [showPosts, setShowPosts] = useState(false);
	const cityNameAllCaps = posts.city.toLocaleUpperCase();
	useEffect(() => {
		// console.log(state);
		// dispatch(getCurrPosts(state));
		console.log(posts);
		setRenderPosts(() => {
			return posts.posts?.map((post, index) => {
				console.log(post.photos);
				console.log(post.photos[0]);
				console.log(post.photos[0].data_url);
				return (
					<div className="posts-item" key={index}>
						<Post
							path={post.photos[0].data_url}
							userName={post.username}
							title={post.title}
							content={post.content}
							imgs={post.photos}
							id={post.postID}
						/>
					</div>
				);
			});
		});
		// setShowPosts(true);
	}, []);
	return (
		<div>
			<Header title={cityNameAllCaps} type="black" hasLogin="true" />
			<div className="posts-container">{renderPosts}</div>
			<Link to="/addpost" className="add-button">
				<AddButton />
			</Link>
		</div>
	);
}

export default Posts;
