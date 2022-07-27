const URL = 'http://localhost:3001/';
// implement all requests for postList
const addPost = async (postInfo, token) => {
	console.log(2);
	const response = await fetch(URL + 'posts/', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(postInfo),
	});
	const data = await response.json();
	console.log(data);
	return data;
};

const getPostListByCityID = async (cityId) => {
	const response = await fetch(URL + 'posts/byCity/' + cityId, {
		method: 'GET',
	});
	const data = await response.json();
	console.log(data);
	return data;
};

const getPostListByUserId = async (userId) => {
	const response = await fetch(URL + 'posts/byUser/' + userId, {
		method: 'GET',
	});
	const data = await response.json();
	console.log(data);
	return data;
};

const getPostById = async (postId) => {
	const response = await fetch(URL + 'posts/' + postId, {
		method: 'GET',
	});
	const data = await response.json();
	console.log(data);
	return data;
};

const deletePostById = async (postId) => {
	const response = await fetch(URL + 'posts/' + postId, {
		method: 'DELETE',
	});
	const data = await response.json();
	console.log(data);
	return data;
};

const increaseLikePostById = async (postId) => {
	const response = await fetch(URL + 'posts/likes/inc/' + postId, {
		method: 'PUT',
	});
	const data = await response.json();
	console.log(data);
	return data;
};

const decreaseLikePostById = async (postId) => {
	const response = await fetch(URL + 'posts/likes/dec/' + postId, {
		method: 'PUT',
	});
	const data = await response.json();
	console.log(data);
	return data;
};

const sortPostByLike = async (cityId) => {
	const response = await fetch(URL + 'posts/sort/likes/' + cityId, {
		method: 'GET',
	});
	const data = await response.json();
	console.log(data);
	return data;
};

const sortPostByDate = async (cityId) => {
	const response = await fetch(URL + 'posts/sort/date/' + cityId, {
		method: 'GET',
	});
	const data = await response.json();
	console.log(data);
	return data;
};

const postListService = {
	getPostListByCityID,
	addPost,
	getPostListByUserId,
	getPostById,
	deletePostById,
	increaseLikePostById,
	decreaseLikePostById,
	sortPostByLike,
	sortPostByDate,
};

export default postListService;
