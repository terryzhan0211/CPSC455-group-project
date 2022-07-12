import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { MdOutlineFavoriteBorder, MdOutlineFavorite, MdYoutubeSearchedFor} from "react-icons/md";
import { useDispatch } from "react-redux";
import {
	unlikePostAsync,
} from '../features/thunks';
import { unlikePost,likePost } from "../features/user"

function PostDetail(props) {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const post = useSelector((state) => state.cities.currPost);
	const currUserInfo = useSelector((state) => state.user.currUser);
	const currUserLikePost = currUserInfo.likedPosts;
	console.log(currUserLikePost)
	const images = post.photos;
	const title = post.title;
	const content = post.content;
	const currPostID = post.postID;
	console.log(currPostID)
	const cityNameAllCaps = post.city.toLocaleUpperCase();
	let dispatch = useDispatch();
	
	console.log(currUserLikePost.includes(currPostID)? 1: 2)
	function handleUnlike(currPostID) {
		dispatch(unlikePost(currPostID));
	}

	function handleLike(currPostID) {
		dispatch(likePost(currPostID));
	}

	return (
		<div>
			<Header title={cityNameAllCaps} type="black" hasLogin="true" back="/posts"></Header>
			<div className="context-container">
				{/* <div className="image-container">
					<img alt="post" src={God}></img>					
				</div> */}

				<div className="image-container">
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
					{currUserLikePost.includes(currPostID)
					? <MdOutlineFavorite color='red'fontSize='50px' onClick={()=>{handleUnlike(currPostID)}}/> 
					: <MdOutlineFavoriteBorder color='red' fontSize='50px' onClick={()=>{handleLike(currPostID)}}/>}
					
					
				</div>

				<div className="text-container">
					<p className="user-container-title">
						<strong>{'@' + post.username + '\t'}</strong>
						{title}
					</p>
					<p className="user-container-content">
						{content.split('\n').map((item, index) => {
							return (
								<span key={index}>
									{item}
									<br />
								</span>
							);
						})}
					</p>
				</div>
			</div>
		</div>
	);
}

export default PostDetail;
