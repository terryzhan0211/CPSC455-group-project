import axios from 'axios';
// TODO
// implement all requests for postList
const getPostListByCityID = async(cityId) => {
    const response = await fetch('', {
        method: 'GET',
    });
    const data = await response.json()
    console.log(data);
    return data;
}

const postListService = {
    getPostListByCityID,
};

export default postListService;