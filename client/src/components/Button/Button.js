
import React, { Component } from 'react';

import './Button.scss';

export default class Button extends Component {
	static defaultProps = {
		type: 'default',
		disabled: false
	}

	render() {
		const { children, type, onClick, disabled } = this.props;

		return (
			<div onClick={onClick} className={`button ${type} ${disabled ? 'disabled' : ''}`}>
				{children}
			</div>
		);
	}
}
