import React from 'react';
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

function SharePopup(props) {
	const emailShare = {
		subject: `${props.postInfo.title} - All in GO-TRAVEL!`,
		body: `Read more about a travel journal to ${props.postInfo.cityName}!`,
		separator: `\n\n`,
	};
	const facebookShare = {
		quote: `${props.postInfo.title}: Travel in ${props.postInfo.cityName}\n\n - All in GO-TRAVEL!`,
		hashtag: `GO-TRAVEL!`,
	};
	const twitterShare = {
		title: `${props.postInfo.title} - All in GO-TRAVEL!`,
		hashtags: [`GO-TRAVEL!`, `${props.postInfo.cityName}`],
	};
	const redditShare = {
		title: `${props.postInfo.title}: Travel in ${props.postInfo.cityName} - All in GO-TRAVEL!`,
	};
	return (
		<div className="popup-box">
			<div className="box">
				<span className="close-icon" onClick={props.toggle}>
					x
				</span>
				<div>
					<form className="share-box-container">
						<FacebookShareButton
							url={props.currURL}
							quote={facebookShare.quote}
							hashtag={facebookShare.hashtag}
						>
							<div className="share-container">
								<div className="share-content">
									<div className="share-icon">
										<FacebookIcon size="50px" round />
									</div>
									<div className="share-text">Share to Facebook</div>
								</div>
							</div>
						</FacebookShareButton>
						<TwitterShareButton
							url={props.currURL}
							title={twitterShare.title}
							hashtag={twitterShare.hashtags}
						>
							<div className="share-container">
								<div className="share-content">
									<div className="share-icon">
										<TwitterIcon size="50px" round />
									</div>
									<div className="share-text">Share to Twitter</div>
								</div>
							</div>
						</TwitterShareButton>
						<RedditShareButton url={props.currURL} title={redditShare.title}>
							<div className="share-container">
								<div className="share-content">
									<div className="share-icon">
										<RedditIcon size="50px" round />
									</div>
									<div className="share-text">Share to Reddit</div>
								</div>
							</div>
						</RedditShareButton>
						<EmailShareButton
							url={props.currURL}
							subject={emailShare.subject}
							body={emailShare.body}
							separator={emailShare.separator}
						>
							<div className="share-container">
								<div className="share-content">
									<div className="share-icon">
										<EmailIcon size="50px" round />
									</div>
									<div className="share-text">Share via Email</div>
								</div>
							</div>
						</EmailShareButton>
					</form>
				</div>
			</div>
		</div>
	);
}

export default SharePopup;
