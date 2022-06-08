import React from 'react';
import './Input.css';

export default function Input(props) {
	return (
		<div>
			<input
				className={props.size}
				type={props.type}
				placeholder={props.name}
				// value={props.value}
				// onChange={(event) => props.onChange(event)}
			/>
		</div>
	);
}
