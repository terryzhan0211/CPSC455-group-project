import React from 'react';
import { Link } from 'react-router-dom';
import leftArrow from '../img/left-arrow.png';
import Header from './Header';
import loginImg from '../img/login.png';
import './PostDetail.css';
import { PostData } from './PostData'
import God from "../img/god.jpg";
import Test from "../img/test1.jpg";
function PostDetail(props) {

	
	return (
		<div>
			<div>
				<Link to="/" className="back-button">
					<img alt="back" src={leftArrow}></img>
				</Link>
				<Header title="NEW YORK" type="white"></Header>
				<Link to="/login" className="login-button">
					<img alt="login" src={loginImg}></img>
				</Link>
			</div>
			<div className='context-container'>

				<div className="image-container">
					<img alt="post" src={God}></img>
					{/* <ImgSlide slides={PostData}/> */}
				</div>	

				<div className="text-container">
					<strong>@user1</strong>
					<p>	Is it your first time in New York? There are literally a million cool things to do in New York City. That’s what makes it New York. The possibilities here are endless… and so is the amount of money you can spend on those activities.
					</p>

					<p>
					We want to help you save money on your visit to New York City. So, we are going to keep this list budget friendly. That means we are going to skip things like shopping at Tiffany’s or eating out at world class restaurants. Instead we’re going to focus on other things that make New York stand out.
					</p>

					<p>
					We lived in NYC for a looong long time before leaving to travel the world. Thus we think we know a thing or a hundred about the City That Never Sleeps. However, we rarely ever experienced New York through the eyes of a tourist, which is why we haven’t really written about it until now.	
					</p>			
				
				</div>

			</div>

				
    </div>
	);
	
}

export default PostDetail;
