import React, { useState, useEffect } from 'react';
import Header from '../components/Header.js';
import PostBlock from '../components/PostBlock.js';
import './PostList.css';
import AddButton from '../components/AddButton.js';
import { useSelector, useDispatch } from 'react-redux';
import { getPostListByCityIdAsync } from '../features/postListThunks';
import { useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { animationOne, transition, animationFour } from '../animations';
import DropdownMenu from '../components/DropdownMenu.js';

function PostList(props) {
	// const { cityId } = useParams();
	// hard code for testing
	const cityId = '62e18e5d519ad301e702d15c';
	const { state } = useLocation();
	const dispatch = useDispatch();
	
	const postList = useSelector((state) => state.postList.postList);
	var cityNameAllCaps = '';
	if (state.cityName) {
		cityNameAllCaps = state.cityName.toLocaleUpperCase();
	} else {
		cityNameAllCaps = postList[0].cityname;
	}
	// console.log(state);
	// console.log(postList);
	const [renderPostList, setRenderPostList] = useState();

	useEffect(() => {
		dispatch(getPostListByCityIdAsync(cityId));
	}, [dispatch]);
	useEffect(() => {
		setRenderPostList(() => {
			return postList?.map((post, index) => {
				// console.log(post);
				return (
					<div className="posts-item" key={index}>
						<PostBlock
							path={post.photos[0].data_url}
							username={post.username}
							title={post.title}
							content={post.content}
							imgs={post.photos}
							id={post._id}
							cityName={cityNameAllCaps}
						/>
					</div>
				);
			});
		});
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
						<DropdownMenu cityId={cityId} />
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
