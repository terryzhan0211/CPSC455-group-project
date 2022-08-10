import React, { useState, useRef, useEffect } from 'react';
import { Autocomplete } from '@react-google-maps/api';

function Search(props) {
	var options = {
		types: ['(cities)'],
		componentRestrictions: { country: ['us', 'ca'] },
	};
	return (
		<div className={props.type}>
			{props.searchBarPopup && (
				<div className="popup-box" onMouseDown={props.onMouseDown}>
					<div ref={props.popRef} className="search-box">
						<Autocomplete options={options}>
							<input
								size="Input"
								className="Input"
								type="text"
								placeholder="City Name"
								ref={props.addressRef}
								onKeyPress={props.onKeyPress}
							/>
						</Autocomplete>
					</div>
				</div>
			)}
		</div>
	);
}

export default Search;
