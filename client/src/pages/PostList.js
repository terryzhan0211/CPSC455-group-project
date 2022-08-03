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
import { getCityNameById } from '../features/citiesThunks.js';
import { setStatusToIdle } from '../features/postList';
import Loading from '../components/Loading.js';
function PostList(props) {
	const { cityId } = useParams();
	const dispatch = useDispatch();

	const postList = useSelector((state) => state.postList.postList);
	const cityName = useSelector((state) => state.cities.currCityName);
	const postListFulfilled = useSelector((state) => state.postList.getPostListByCityId);
	const [renderPostList, setRenderPostList] = useState();
	const [initialDataLoaded, setInitialDataLoaded] = useState(false);
	const [renderPage, setRenderPage] = useState(false);

	useEffect(() => {
		dispatch(getCityNameById(cityId));
		dispatch(getPostListByCityIdAsync(cityId));
	}, [dispatch]);
	useEffect(() => {
		if (postListFulfilled === 'FULFILLED' && initialDataLoaded === false) {
			setInitialDataLoaded(true);
			dispatch(setStatusToIdle());
		} else if (postListFulfilled === 'PENDING' || postListFulfilled === 'IDLE') {
			setInitialDataLoaded(false);
		}
	}, [postList]);
	useEffect(() => {
		if (initialDataLoaded) {
			setRenderPostList(() => {
				return postList?.map((post, index) => {
					return (
						<div className="posts-item" key={index}>
							<PostBlock
								path={post.photos[0].data_url}
								username={post.username}
								title={post.title}
								content={post.content}
								imgs={post.photos}
								id={post._id}
								cityName={cityName}
							/>
						</div>
					);
				});
			});
			setRenderPage(true);
		}
	}, [postList, initialDataLoaded]);

	return renderPage ? (
		<motion.div
			initial="out"
			animate="in"
			exit="out"
			variants={animationOne}
			transition={transition}
		>
			<div className="posts-page">
				<Header title={cityName} type="black" hasLogin="true" back="/" />
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
	) : (
		<Loading />
	);
}

export default PostList;
