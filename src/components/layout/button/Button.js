import React from 'react';
import '../../../scss/button/Button.scss';


const Button = (props) => {
	return ( 
		<div>
			<button className="btn-main" onClick={props.onClick}>
			{props.text}
			</button>
		</div>
	)
}

export default Button; 