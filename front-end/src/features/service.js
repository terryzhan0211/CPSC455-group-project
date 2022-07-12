

const unlikePost = async (id) => {
	const response = await fetch('http://localhost:3000/postdetail/unlike' + id, {
		method: 'DELETE',
	});
	return await response.json();;
};


const PostService = {
	unlikePost,
	
}
export default PostService;