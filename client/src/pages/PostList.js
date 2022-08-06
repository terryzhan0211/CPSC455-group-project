import React, { useState, useEffect } from 'react';
import Header from '../components/Header.js';
import PostBlock from '../components/PostBlock.js';
import './PostList.css';
import AddButton from '../components/AddButton.js';
import { useSelector, useDispatch } from 'react-redux';
import { getPostListByCityIdAsync } from '../features/postListThunks';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { animationOne, transition } from '../animations';
import DropdownMenu from '../components/DropdownMenu.js';
import { getCityNameByIdAsync } from '../features/citiesThunks.js';
import { setGetCityNameByIdToIdle } from '../features/cities';
import { setStatusToIdle } from '../features/postList';
import Loading from '../components/Loading.js';
function PostList(props) {
	const { cityId } = useParams();
	const dispatch = useDispatch();

	const postList = useSelector((state) => state.postList.postList);
	const cityName = useSelector((state) => state.cities.currCityName);
	const postListFulfilled = useSelector((state) => state.postList.getPostListByCityId);
	const cityNameFulfilled = useSelector((state) => state.cities.getCityNameById);
	const [renderPostList, setRenderPostList] = useState();
	const [initialDataLoaded, setInitialDataLoaded] = useState(false);
	const [renderPage, setRenderPage] = useState(false);
	const [initialCityNameLoaded, setInitialCityNameLoaded] = useState(false);
	useEffect(() => {
		dispatch(getCityNameByIdAsync(cityId));
		dispatch(getPostListByCityIdAsync(cityId));
	}, [dispatch]);
	useEffect(() => {
		if (postListFulfilled === 'FULFILLED' && initialDataLoaded === false) {
			setInitialDataLoaded(true);
			dispatch(setStatusToIdle());
		}
	}, [postList]);
	useEffect(() => {
		if (cityNameFulfilled === 'FULFILLED') {
			setInitialCityNameLoaded(true);
			dispatch(setGetCityNameByIdToIdle());
		}
	}, [cityName]);
	useEffect(() => {
		if (initialDataLoaded) {
			setRenderPostList(() => {
				return postList?.map((post, index) => {
					var title = '';
					if (post.title.length > 18) {
						title = post.title.substring(0, 17) + '...';
					} else {
						title = post.title;
					}
					return (
						<div className="posts-item" key={index}>
							<PostBlock
								path={post.photos[0].data_url}
								username={post.username}
								title={title}
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

	return (
		<div className="posts-page">
			<Header title={cityName} type="black" hasLogin="true" back="/" />

			{renderPage ? (
				<motion.div
					initial="out"
					animate="in"
					exit="out"
					variants={animationOne}
					transition={transition}
				>
					<div className="postlist-content-section">
						<div className="posts-sortbutton">
							<DropdownMenu cityId={cityId} setRenderPage={setRenderPage} />
						</div>

						<div className="posts-section">
							<div className="posts-container">{renderPostList}</div>
						</div>
					</div>
				</motion.div>
			) : (
				<Loading />
			)}
			<AddButton className="add-button" />
		</div>
	);
}

export default PostList;
