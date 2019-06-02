import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Button.scss';


export default class Button extends Component {

	static propTypes = {
		onClick: PropTypes.func,
		type: PropTypes.string,
		disabled: PropTypes.bool,
	}

	static defaultProps = {
		onClick: () => {},
		type: 'default',
		disabled: false,
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
