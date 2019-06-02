import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PasswordMask from 'react-password-mask';

import './PasswordField.scss';


export default class PasswordField extends Component {

	static propTypes = {
		onChange: PropTypes.func.isRequired,
		value: PropTypes.string.isRequired,
	}

	render() {
		const { value, onChange } = this.props;

		return (
			<div className='password-wrapper'>
					<label>
						<span>Password:</span>
						<PasswordMask
							value={value}
							maxLength={50}
							onChange={onChange}
							inputClassName='input-password'
							buttonClassName='btn-show-hide'
							useVendorStyles={false}
						/>
					</label>
				</div>
		);
	}
}
