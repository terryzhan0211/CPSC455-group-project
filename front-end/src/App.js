import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/Main.js';
import Posts from './components/Posts.js';
import Login from './components/Login.js';
import AddPost from './components/AddPost.js';
function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/posts" element={<Posts />} />
					<Route path="/login" element={<Login />} />
					<Route path="/addpost" element={<AddPost />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
