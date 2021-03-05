import React from 'react';
import '../../../scss/button/Button.scss';


const Button = (props) => {
	return (
		<div>
			<button>{props.text}</button>
		</div>
	)
}

export default Button; 