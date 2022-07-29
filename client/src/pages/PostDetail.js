import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import './PostDetail.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import { useSelector } from 'react-redux';
import { BsHeart, BsHeartFill, BsThreeDotsVertical } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import {
	decreaseLikePostByIdAsync,
	getPostByIdAsync,
	increaseLikePostByIdAsync,
} from '../features/postListThunks';
import { likePost } from '../features/userThunks';
import { motion } from 'framer-motion';
import { animationTwo, transition } from '../animations';
import { useLocation, useParams } from 'react-router-dom';
import {
	EmailShareButton,
	FacebookShareButton,
	RedditShareButton,
	TwitterShareButton,
	FacebookIcon,
	EmailIcon,
	TwitterIcon,
	RedditIcon,
} from 'react-share';
import user from '../features/user';

function PostDetail(props) {
	const { postId } = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getPostByIdAsync(postId));
	}, []);

	const userInfo = useSelector((state) => state.user);
	const post = useSelector((state) => state.postList.currentPost);
	const [thumbsSwiper, setThumbsSwiper] = useState(null);

	const [sharePopup, setSharePopup] = useState(false);
	const [currLocation, setCurrLocation] = useState(window.location.href);

	const [userLikedPost, setUserLikedPost] = useState(false);
	// const [likeCount, setLikeCount] = useState(post.likes);
	const [renderLikeButton, setRenderLikeButton] = useState();
	const emailShare = {
		subject: `${post.title} - All in GO-TRAVEL!`,
		body: `Read more about a travel journal to ${post.cityName}!`,
		separator: `\n\n`,
	};
	const facebookShare = {
		quote: `${post.title}: Travel in ${post.cityName}\n\n - All in GO-TRAVEL!`,
		hashtag: `GO-TRAVEL!`,
	};
	const twitterShare = {
		title: `${post.title} - All in GO-TRAVEL!`,
		hashtags: [`GO-TRAVEL!`, `${post.cityName}`],
	};
	const redditShare = {
		title: `${post.title}: Travel in ${post.cityName} - All in GO-TRAVEL!`,
	};

	useEffect(() => {
		// console.log('login: ' + userInfo.isLogin);
		// console.log('user liked: ' + userInfo.user.likedPosts);
		// console.log('like includes: ' + userInfo.user.likedPosts?.includes(postId));
		console.log('user liked: ');
		console.log(userInfo.user.likedPosts);

		if (userInfo.isLogin && userInfo.user.likedPosts?.includes(postId)) {
			setUserLikedPost(true);
			console.log('set like in effect');
		} else {
			setUserLikedPost(false);
			console.log('set not like in effect');
		}
		// setLikeCount(post.likes);
	}, [userInfo]);

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
	}, [userLikedPost]);

	// const userid = userInfo.user._id;
	// const likedPosts = userInfo.user.likedPosts;

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

	// console.log(userLikedPost?.includes(currPostID) ? true : false);
	function handleLike() {
		if (userInfo.isLogin) {
			const useridAndpostid = {
				userid: userInfo.user._id,
				postid: postId,
			};
			dispatch(likePost(useridAndpostid));
			// dispatch(increaseLikePostByIdAsync(postId));
			setUserLikedPost(true);
			// setLikeCount(likeCount + 1);
			console.log('setlike');
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
			// dispatch(decreaseLikePostByIdAsync(postId));
			setUserLikedPost(false);
			// setLikeCount(likeCount - 1);
			console.log('set unlike');
			console.log('like list after unlike: ' + userLikedPost);
		} else {
			alert("You'll need to login for this action");
		}
	}

	const toggleSharePopup = () => {
		setSharePopup(!sharePopup);
	};
	return (
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

							{/* <div className="user-container-title-likecount">
								<p className="user-container-title-likecount-content">
									{likeCount}
								</p>
							</div> */}
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

					{sharePopup && (
						<div className="popup-box">
							<div className="box">
								<span
									className="close-icon"
									onClick={() => {
										toggleSharePopup();
									}}
								>
									x
								</span>
								<div>
									<form className="share-box-container">
										<FacebookShareButton
											url={currLocation}
											quote={facebookShare.quote}
											hashtag={facebookShare.hashtag}
										>
											<div className="share-container">
												<div className="share-content">
													<div className="share-icon">
														<FacebookIcon size="50px" round />
													</div>
													<div className="share-text">
														Share to Facebook
													</div>
												</div>
											</div>
										</FacebookShareButton>
										<TwitterShareButton
											url={currLocation}
											title={twitterShare.title}
											hashtag={twitterShare.hashtags}
										>
											<div className="share-container">
												<div className="share-content">
													<div className="share-icon">
														<TwitterIcon size="50px" round />
													</div>
													<div className="share-text">
														Share to Twitter
													</div>
												</div>
											</div>
										</TwitterShareButton>
										<RedditShareButton
											url={currLocation}
											title={redditShare.title}
										>
											<div className="share-container">
												<div className="share-content">
													<div className="share-icon">
														<RedditIcon size="50px" round />
													</div>
													<div className="share-text">
														Share to Reddit
													</div>
												</div>
											</div>
										</RedditShareButton>
										<EmailShareButton
											url={currLocation}
											subject={emailShare.subject}
											body={emailShare.body}
											separator={emailShare.separator}
										>
											<div className="share-container">
												<div className="share-content">
													<div className="share-icon">
														<EmailIcon size="50px" round />
													</div>
													<div className="share-text">
														Share via Email
													</div>
												</div>
											</div>
										</EmailShareButton>
									</form>
								</div>
							</div>
						</div>
					)}
				</div>
			</motion.div>
		</div>
	);
}

export default PostDetail;
