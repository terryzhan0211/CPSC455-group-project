import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import leftArrow from '../img/left-arrow.png';
import Header from './Header';
import loginImg from '../img/login.png';
import './PostDetail.css';
import { PostData } from './PostData';
import testImgs from '../img/testImg.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper';

function PostDetail(props) {
	const [thumbsSwiper, setThumbsSwiper] = useState(null);
	const images = testImgs; // I put it to another file and import it here.
	return (
		<div>
			<div>
				<Link to="/posts" className="back-button">
					<img alt="back" src={leftArrow}></img>
				</Link>
				<Header title="NEW YORK" type="white"></Header>
				<Link to="/login" className="login-button">
					<img alt="login" src={loginImg}></img>
				</Link>
			</div>
			<div className="context-container">
				<div className="image-container">
					<Swiper
						style={{
							'--swiper-navigation-color': '#fff',
							'--swiper-pagination-color': '#fff',
						}}
						loop={true}
						spaceBetween={10}
						navigation={true}
						thumbs={{ swiper: thumbsSwiper }}
						modules={[FreeMode, Navigation, Thumbs]}
						className="mySwiper2"
					>
						{images.map((image, index) => (
							<SwiperSlide key={index}>
								<img src={image.data_url} alt={image.data_url} />
							</SwiperSlide>
						))}
					</Swiper>
					{/* <Swiper
						onSwiper={setThumbsSwiper}
						loop={true}
						spaceBetween={10}
						slidesPerView={4}
						freeMode={true}
						watchSlidesProgress={true}
						modules={[FreeMode, Navigation, Thumbs]}
						className="mySwiper"
					>
						{images.map((image, index) => (
						<SwiperSlide key={index}>
							<img src={image.data_url} />
						</SwiperSlide>
						))}
					</Swiper> */}
				</div>

				<div className="text-container">
					<strong>{props.userName}</strong>
					<h3>{props.title}</h3>
					<p>{props.content}</p>
				</div>
			</div>
		</div>
	);
}

export default PostDetail;
