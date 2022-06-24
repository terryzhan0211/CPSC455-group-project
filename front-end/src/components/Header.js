import React from 'react';

import './Header.css';
function Header(props) {
	
	return (
		<div className={props.type}>
			<h1>{props.title}</h1>
		</div>
	);
}

export default Header;
