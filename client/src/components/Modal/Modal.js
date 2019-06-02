import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Modal.scss';

export default class Modal extends Component {
	static propTypes = {
		closeWithClickOnOverlay: PropTypes.bool,
		open: PropTypes.bool,
		close: PropTypes.func,
		className: PropTypes.string,
	}

	static defaultProps = {
		closeWithClickOnOverlay: false,
		open: false,
		className: '',
		close: () => {},
	}

	clickOnOverlay = () => {
		if (this.props.closeWithClickOnOverlay) {
			this.props.close();
		}
	}

	render() {
		const { open, children, className } = this.props;

		return (
			<div className={`${className} modal ${open ? 'open' : ''}`}>

				<div onClick={this.clickOnOverlay} className={`overlay`} />

				<div className='modal-inner'>
					<div className='modal-content-area'>
						{children}
					</div>
				</div>
			</div>
		);
	}
}
