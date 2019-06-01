import React, { Component } from 'react';

import './Modal.scss';

export default class Modal extends Component {
	static defaultProps = {
		closeWithClickOnOverlay: false,
		open: false,
		className: ''
	}

	clickOnOverlay = () => {
		if (this.props.closeWithClickOnOverlay) {
			this.props.close();
		}
	}

	render() {
		const { overlay, open, children, className } = this.props;

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
