import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	decreaseLikePostByIdAsync,
	getPostByIdAsync,
	increaseLikePostByIdAsync,
} from '../features/postListThunks';
import { setStatusToIdle } from '../features/postList';
import { likePost } from '../features/userThunks';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import { BsHeart, BsHeartFill, BsThreeDotsVertical } from 'react-icons/bs';
import { motion } from 'framer-motion';
import './PostDetail.css';
import Header from '../components/Header';
import SharePopup from '../components/SharePopup';
import Loading from '../components/Loading';

function PostDetail(props) {
	const { postId } = useParams();
	const dispatch = useDispatch();

	const userInfo = useSelector((state) => state.user);
	const post = useSelector((state) => state.postList.currentPost);
	const postFulfilled = useSelector((state) => state.postList.getPostById);
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const [renderSharePopup, setRenderSharePopup] = useState(false);
	const [currLocation, setCurrLocation] = useState(window.location.href);
	const [initialDataLoaded, setInitialDataLoaded] = useState(false);
	const [userLikedPost, setUserLikedPost] = useState(false);
	const [likeCount, setLikeCount] = useState(0);
	const [renderLikeButton, setRenderLikeButton] = useState();
	const [renderLikeCount, setRenderLikeCount] = useState();
	const [renderPage, setRenderPage] = useState(false);

	useEffect(() => {
		dispatch(getPostByIdAsync(postId));
	}, [dispatch]);
	useEffect(() => {
		if (postFulfilled === 'FULFILLED' && initialDataLoaded === false) {
			setInitialDataLoaded(true);
			if (userInfo.isLogin && userInfo.user.likedPosts?.includes(postId)) {
				setUserLikedPost(true);
			} else {
				setUserLikedPost(false);
			}
			dispatch(setStatusToIdle());
			setRenderPage(true);
			setLikeCount(post.likes);
		} else if (postFulfilled === 'PENDING' || postFulfilled === 'IDLE') {
			setInitialDataLoaded(false);
		}
	}, [post]);

	useEffect(() => {
		setRenderLikeButton(() => {
			return (
				<div className="user-container-title-likebutton">
					{userLikedPost ? (
						<BsHeartFill
							color="red"
							fontSize="35px"
							onClick={() => {
								handleUnlike();
							}}
						/>
					) : (
						<BsHeart
							color="black"
							fontSize="35px"
							onClick={() => {
								handleLike();
							}}
						/>
					)}
				</div>
			);
		});
		setRenderLikeCount(() => {
			return (
				<div className="user-container-title-likecount">
					<p className="user-container-title-likecount-content">{likeCount}</p>
				</div>
			);
		});
	}, [userLikedPost]);

	const transition = { duration: 1, ease: [0.6, 0.01, -0.05, 0.9] };
	const text = {
		initial: { x: 0 },
		animate: {
			x: 0,
			transition: {
				delayChildren: 0,
				staggerChildren: 0.2,
				staggerDirection: -1,
			},
		},
	};

	const textPart = {
		initial: { x: '-150%' },
		animate: {
			x: 0,
			transition: { duration: 0.3, ...transition },
		},
	};

	function handleLike() {
		if (userInfo.isLogin) {
			const useridAndpostid = {
				userid: userInfo.user._id,
				postid: postId,
			};
			dispatch(likePost(useridAndpostid));
			dispatch(increaseLikePostByIdAsync(postId));
			setUserLikedPost(true);
			setLikeCount(likeCount + 1);
		} else {
			alert("You'll need to login for this action");
		}
	}

	function handleUnlike() {
		if (userInfo.isLogin) {
			const useridAndpostid = {
				userid: userInfo.user._id,
				postid: postId,
			};
			dispatch(likePost(useridAndpostid));
			dispatch(decreaseLikePostByIdAsync(postId));
			setUserLikedPost(false);
			setLikeCount(likeCount - 1);
		} else {
			alert("You'll need to login for this action");
		}
	}

	const toggleSharePopup = () => {
		setRenderSharePopup(!renderSharePopup);
	};
	return renderPage ? (
		<div>
			<Header
				title={post.cityName.toUpperCase()}
				type="black"
				hasLogin="true"
				back={`/postList/${post.cityId}`}
			/>
			<motion.div initial="initial" animate="animate" exit="exit" className="single">
				<div className="context-container">
					<motion.div
						initial={{ height: '630px', width: '400px' }}
						animate={{
							width: '50%',
							height: '100%',
							transition: { transition },
							// rotate: 180
						}}
						className="image-container"
					>
						<Swiper
							style={{
								'--swiper-navigation-color': '#fff',
								'--swiper-pagination-color': '#fff',
							}}
							loop={false}
							spaceBetween={10}
							navigation={true}
							thumbs={{ swiper: thumbsSwiper }}
							modules={[FreeMode, Navigation, Thumbs]}
							className="mySwiper2"
						>
							{post.photos?.map((image, index) => (
								<SwiperSlide key={index}>
									<img src={image.data_url} alt="" />
								</SwiperSlide>
							))}
						</Swiper>
					</motion.div>

					<motion.div variants={text} className="text-container">
						<motion.div variants={textPart} className="user-container-title">
							<div className="user-container-title-title">
								<strong>{'@' + post.username + '\t'}</strong>
								{post.title}
							</div>

							{renderLikeButton}

							{renderLikeCount}
							<div className="user-container-title-sharebutton">
								<BsThreeDotsVertical
									color="black"
									fontSize="35px"
									onClick={() => {
										toggleSharePopup();
									}}
								/>
							</div>
						</motion.div>

						<motion.p variants={textPart} className="user-container-content">
							{post.content?.split('\n').map((item, index) => {
								return (
									<span key={index}>
										{item}
										<br />
									</span>
								);
							})}
						</motion.p>
					</motion.div>

					{renderSharePopup && (
						<SharePopup
							currURL={currLocation}
							toggle={() => {
								toggleSharePopup();
							}}
							postInfo={post}
						/>
					)}
				</div>
			</motion.div>
		</div>
	) : (
		<Loading />
	);
}

export default PostDetail;
