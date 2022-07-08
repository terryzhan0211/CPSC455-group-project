import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Main from './components/Main.js';
import Posts from './components/Posts.js';
import Login from './components/Login.js';
import AddPost from './components/AddPost.js';
import PostDetail from './components/PostDetail';
import Signup from './components/Signup';
import { LoadScript } from '@react-google-maps/api';
function App() {
	return (
		<div className="App">
			<LoadScript
				id="script-loader"
				libraries={['visualization', 'places']}
				googleMapsApiKey="AIzaSyD2YB2p_MX4E0WDiQt5KfODgs1mCfLbWoY"
			>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Main />} />
						<Route path="/posts" element={<Posts />} />
						<Route path="/login" element={<Login />} />
						<Route path="/addpost" element={<AddPost />} />
						<Route path="/postdetail" element={<PostDetail />} />
						<Route path="/signup" element={<Signup />} />
					</Routes>
				</BrowserRouter>
			</LoadScript>
		</div>
	);
}

export default App;
