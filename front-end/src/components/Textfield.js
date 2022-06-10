import React from 'react';
import './Textfield.css';

export default function Textfield(props) {
	return (
		<div>
			<textarea
				className={props.size}
				type={props.type}
				placeholder={props.name}
				// value={props.value}
				// onChange={(event) => props.onChange(event)}
			/>
		</div>
	);
}
