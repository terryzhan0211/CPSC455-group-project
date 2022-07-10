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
		setRenderPosts(() => {
			return posts.posts?.map((post, index) => {
				return (
					<div className="posts-item" key={index}>
						<Post
							path={post.photos[0].data_url}
							username={post.username}
							title={post.title}
							content={post.content}
							imgs={post.photos}
							id={post.postID}
							cityName={cityNameAllCaps}
						/>
					</div>
				);
			});
		});
		// setShowPosts(true);
	}, [posts, cityNameAllCaps]);
	return (
		<div className="posts-page">
			<Header title={cityNameAllCaps} type="black" hasLogin="true" back="/" />
			<div className="posts-section">
				<div className="posts-container">{renderPosts}</div>
			</div>

			<Link to="/addpost" className="add-button">
				<AddButton />
			</Link>
		</div>
	);
}

export default Posts;
