import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Main from './pages/Main.js';
import PostList from './pages/PostList.js';
import Login from './pages/Login.js';
import AddPost from './pages/AddPost.js';
import PostDetail from './pages/PostDetail';
import Signup from './pages/Signup';
import User from './pages/User';
import Loading from './pages/Loading';
import { LoadScript } from '@react-google-maps/api';
import { AnimatePresence } from 'framer-motion';
function App() {
	return (
		<div className="App">
			<AnimatePresence exitBeforeEnter>
				<LoadScript
					id="script-loader"
					libraries={['visualization', 'places']}
					googleMapsApiKey="AIzaSyD2YB2p_MX4E0WDiQt5KfODgs1mCfLbWoY"
				>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Main />} />
							<Route path="/postlist/:cityId" element={<PostList />} />
							{/* <Route path="/postlist" element={<PostList />} /> */}
							<Route path="/login" element={<Login />} />
							<Route path="/addpost" element={<AddPost />} />
							<Route path="/postdetail/:postId" element={<PostDetail />} />
							<Route path="/loading" element={<Loading />} />
							<Route path="/signup" element={<Signup />} />
							<Route path="/user" element={<User />} />
						</Routes>
					</BrowserRouter>
				</LoadScript>
			</AnimatePresence>
		</div>
	);
}

export default App;
