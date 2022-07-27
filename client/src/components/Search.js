import React, { useState, useRef,useEffect } from 'react';
import { Autocomplete } from '@react-google-maps/api';

function Search(props) {
    var options = {
		types: ['(cities)'],
		componentRestrictions: { country: ['us', 'ca'] },
	};
   
	return (
		<div className={props.type}>
			{props.editIntroPopupIsOpen && (
				<div className="popup-box">
					<div ref={props.popRef} className="search-box">				
													
								<Autocomplete options={options}>
									<input
										size="Input"
										className="Input"
										type="text"
										placeholder="Location"
										ref={props.addressRef}
									/>
								</Autocomplete>							
							
						
					</div>
				</div>
			)}
		</div>
	);
}

export default Search;
