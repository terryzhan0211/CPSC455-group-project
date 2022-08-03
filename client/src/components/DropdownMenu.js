import { BiMenu } from 'react-icons/bi';
import './DropdownMenu.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sortPostByLikeAsync, sortPostByDateAsync } from '../features/postListThunks';
export default function DropdownMenu(props) {
	const dispatch = useDispatch();
	const handleSortByDate = () => {
		dispatch(sortPostByDateAsync(props.cityId)); //postsortbydate
		props.setRenderPage(false);
	};
	const handleSortByLikeCount = () => {
		dispatch(sortPostByLikeAsync(props.cityId)); //postsortbylike
		props.setRenderPage(false);
	};
	return (
		<div className="DropdownMenu">
			<span>
				<button className="plain-button">
					<div className="plain-button-icon">
						<BiMenu size="20px" />
					</div>
					<div className="plain-button-text">Sort By</div>
				</button>
			</span>
			<div className="DropdownMenu-content">
				<div
					onClick={() => {
						handleSortByDate();
					}}
				>
					<strong>Date</strong>: From New to Old
				</div>
				<div
					onClick={() => {
						handleSortByLikeCount();
					}}
				>
					<strong>Likes</strong>: From Most to Few
				</div>
			</div>
		</div>
	);
}
