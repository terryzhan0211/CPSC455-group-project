import React, { useState, useLocation, useEffect } from 'react';
import Header from '../components/Header.js';
import PostBlock from '../components/PostBlock.js';
import './PostList.css';
import AddButton from '../components/AddButton.js';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrPosts } from '../features/cities';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { animationOne, transition, animationFour } from '../animations';
import DropdownMenu from '../components/DropdownMenu.js';

function PostList() {
	//TODO
	// const { cityid } = useParams();
	// const dispatch = useDispatch();
	// dispatch(getCurrPosts(cityid));
	// const city = useSelector((state) => state.cities.currCity);
	// const postList = useSelector((state) => state.postList.postList);
	// const cityNameAllCaps = city.cityName.toLocaleUpperCase();
	const postList = useSelector((state) => state.cities.currPosts);
	const [renderPostList, setRenderPostList] = useState();
	const cityNameAllCaps = postList.city.toLocaleUpperCase();

	useEffect(() => {
		setRenderPostList(() => {
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
				<div className="postlist-content-section">
					<div className="posts-sortbutton">
						<DropdownMenu />
					</div>
					<div className="posts-section">
						<div className="posts-container">{renderPostList}</div>
					</div>
				</div>

				<AddButton className="add-button" />
			</div>
		</motion.div>
	);
}

export default PostList;
