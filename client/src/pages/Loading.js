import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
function Loading() {
	const navigate = useNavigate();
	const newPost = useSelector((state) => state.postList.newPost);
	useEffect(() => {
		navigate(`/user/${newPost.cityId}`, {
			replace: true,
		});
	}, [newPost.cityId]);
	return <div>Loading</div>;
}

export default Loading;
