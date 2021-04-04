import React from 'react';
import '../../../scss/button/Button2.scss';


const Button2 = (props) => {
	return ( 
		<div>
			<button className="btn2-main" onClick={props.onClick}>
			{props.text}
			</button>
		</div>
	)
}

export default Button2; 