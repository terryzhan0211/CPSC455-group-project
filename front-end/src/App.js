import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/Main.js';
import Posts from './components/Posts.js';
import Login from './components/Login.js';
import AddPost from './components/AddPost.js';
import { LoadScript } from '@react-google-maps/api';
function App() {
	return (
		<div className="App">
			<LoadScript
				id="script-loader"
				libraries={['visualization']}
				googleMapsApiKey="AIzaSyD2YB2p_MX4E0WDiQt5KfODgs1mCfLbWoY"
			>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Main />} />
						<Route path="/posts" element={<Posts />} />
						<Route path="/login" element={<Login />} />
						<Route path="/addpost" element={<AddPost />} />
					</Routes>
				</BrowserRouter>
			</LoadScript>
		</div>
	);
}

export default App;
