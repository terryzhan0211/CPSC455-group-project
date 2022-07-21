import React, { useState, useLocation, useEffect } from 'react';
import Header from '../components/Header.js';
import PostBlock from '../components/PostBlock.js';
import './Posts.css';
import AddButton from '../components/AddButton.js';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrPosts } from '../features/cities';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { animationOne, transition, animationFour } from '../animations';

function PostList() {
	// const { cityid } = useParams();
	const postList = useSelector((state) => state.cities.currPosts);
	const [renderPosts, setRenderPosts] = useState();
	const cityNameAllCaps = postList.city.toLocaleUpperCase();
	// const dispatch = useDispatch();
	// dispatch(getCurrPosts(cityid));

	useEffect(() => {
		setRenderPosts(() => {
			return postList.posts?.map((post, index) => {
				return (
					<div className="posts-item" key={index}>
						<PostBlock
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
	}, [postList]);
	return (
		<motion.div
			initial="out"
			animate="in"
			exit="out"
			variants={animationOne}
			transition={transition}
		>
			<div className="posts-page">
				<Header title={cityNameAllCaps} type="black" hasLogin="true" back="/" />
				<div className="posts-section">
					<div className="posts-container">{renderPosts}</div>
				</div>

				<AddButton className="add-button" />
			</div>
		</motion.div>
	);
}

export default PostList;
