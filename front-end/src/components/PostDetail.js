import React, { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import leftArrow from '../img/left-arrow.png';
import Header from './Header';
import loginImg from '../img/login.png';
import './PostDetail.css';
import { PostData } from './PostData';
import God from '../img/god.jpg';
import Test from '../img/test1.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import { useSelector } from 'react-redux';
import { MdOutlineFavoriteBorder, MdOutlineFavorite, MdYoutubeSearchedFor } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { unlikePostAsync } from '../features/thunks';
import user, { unlikePost, likePost } from '../features/user';
import { motion } from 'framer-motion';
import { animationTwo, transition } from '../animations';

function PostDetail(props) {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const post = useSelector((state) => state.cities.currPost);
	const userInfo = useSelector((state) => state.user);
	const [userLikedPost, setUserLikedPost] = useState([]);
	console.log(userLikedPost);
	const user_id = userInfo._id;
	const likedPosts = userInfo.likedPosts;
	const images = post.photos;
	const title = post.title;
	const content = post.content;
	const currPostID = post.postID;
	console.log(currPostID);
	const cityNameAllCaps = post.city.toLocaleUpperCase();
	let dispatch = useDispatch();
	const transition = { duration: 1, ease: [0.6, 0.01, -0.05, 0.9] };
	const text = {
		initial: { x: 0 },
		animate: {
			x: 0,
			transition: {
				delayChildren: 0.6,
				staggerChildren: 0.5,
				staggerDirection: -1,
			},
		},
	};

	const textPart = {
		initial: { x: '-150%' },
		animate: {
			x: 0,
			transition: { duration: 1, ...transition },
		},
	};

	console.log(userLikedPost?.includes(currPostID) ? 1 : 2);
	function handleUnlike(currPostID,user_id) {
		if (userInfo.isLogin) {
			console.log(currPostID)
			let user_idAndPostID = {
				user_id:user_id,
				postID:currPostID
			}
			dispatch(likePost(user_idAndPostID));
		} else {
			alert("You'll need to login for this action");
		}
	}

	function handleLike(currPostID,user_id) {
		if (userInfo.isLogin) {
			console.log(currPostID)
			let user_idAndPostID = {
				user_id:user_id,
				postID:currPostID
			}
			dispatch(likePost(user_idAndPostID));
		} else {
			alert("You'll need to login for this action");
		}
	}

	useEffect(() => {
		if (userInfo.isLogin) {
			setUserLikedPost(userInfo.user.likedPosts);
		} else {
			setUserLikedPost([]);
		}
	}, [userInfo]);
	return (
		<div>
			<Header title={cityNameAllCaps} type="black" hasLogin="true" back="/posts"></Header>
			<motion.div initial="initial" animate="animate" exit="exit" className="single">
				<div className="context-container">
					{/* <div className="image-container">
					<img alt="post" src={God}></img>					
				</div> */}

					<motion.div
						initial={{ height: '630px', width: '400px' }}
						animate={{
							width: '50%',
							height: '100%',
							transition: { delay: 0.1, ...transition },
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
							{images?.map((image, index) => (
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
								{title}
							</div>
							<div className="user-container-title-likebutton">
								{likedPosts?.includes(currPostID) ? (
									<MdOutlineFavorite
										color="red"
										fontSize="50px"
										onClick={() => {
											handleUnlike(currPostID,user_id);
										}}
									/>
								) : (
									<MdOutlineFavoriteBorder
										color="red"
										fontSize="50px"
										onClick={() => {
											handleLike(currPostID,user_id);
										}}
									/>
								)}
							</div>
						</motion.div>

						<motion.p variants={textPart} className="user-container-content">
							{content.split('\n').map((item, index) => {
								return (
									<span key={index}>
										{item}
										<br />
									</span>
								);
							})}
						</motion.p>
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
}

export default PostDetail;