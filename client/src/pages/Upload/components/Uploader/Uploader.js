import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker'
import Toggle from 'react-toggle'
import 'react-toggle/style.css';
import 'react-datepicker/src/stylesheets/datepicker.scss';

import { Modal, Button, Loader, PasswordField } from 'components';

import './Uploader.scss';

class Uploader extends Component {
	static propTypes = {
		upload: PropTypes.func.isRequired,
		enableUpload: PropTypes.bool,
  }

	static defaultProps = {
		enableUpload: true,
	}

	constructor(props) {
		super(props);

		this.state = {
			isPrivate: false,
			password: '',
			hasExpirationDate: false,
			expiresAt: null,
      loading: false,
      uploadedID: null,
      modaIsOpen: false,
		}
	}

	upload = async () => {
		this.setState({ loading: true });

		const {
			isPrivate,
			password,
			hasExpirationDate,
			expiresAt,
		} = this.state;

		const GIFID = await this.props.upload(
			isPrivate,
			isPrivate ? password : null,
			hasExpirationDate ? expiresAt : null
		);

		this.setState({
			loading: false,
			uploadedID: GIFID,
			modaIsOpen: true
		});
	}

	changeIsPrivate = (e) => {
    this.setState({
      isPrivate: e.target.checked
    })
  }

  changePassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  changeHasExpirationDate = (e) => {
    this.setState({
      hasExpirationDate: e.target.checked
    })
  }

  changeExpirationDate = (value) => {
    this.setState({
      expiresAt: value
    })
  }

  closeModal = () => {
    this.setState({
      modaIsOpen: false
    })
	}

	canUpload = () => {
		let isValid = true;

		if (!this.props.enableUpload) {
			isValid = false;
		}

		if (this.state.isPrivate && !this.state.password) {
			isValid = false;
		}

		return isValid;
	}

	render() {
		const {
      isPrivate,
      hasExpirationDate,
      expiresAt,
      password,
      loading,
      modaIsOpen,
      uploadedID
		} = this.state;

		const canUpload = this.canUpload();

		return (
			<div className='uploader-wrapper'>

				{
					loading ?
						<Loader /> : null
				}

				<Modal open={modaIsOpen}>
					<p>Use this link to share your GIF with the world:</p>
					<NavLink to={`/${uploadedID}`}>
						<p>{window.location.href}{uploadedID}</p>
					</NavLink>

					<Button onClick={this.closeModal}>
						<p>Close</p>
					</Button>
				</Modal>

				<div className='protection-wrapper'>
					<label>
						<span>Protect your GIF with a password?</span>
						<Toggle
							defaultChecked={false}
							icons={false}
							onChange={this.changeIsPrivate} />
					</label>
				</div>

				{
					isPrivate ?
						<PasswordField onChange={this.changePassword} value={password} /> : null
				}

				<div className='expiration-wrapper'>
					<label>
						<span>Determine an expiration date for your GIF's URL?</span>
						<Toggle
							defaultChecked={false}
							icons={false}
							onChange={this.changeHasExpirationDate} />
					</label>
				</div>

				{
					hasExpirationDate ?
						<div className='expires-at-wrapper'>
							<label>
								<span>Expiration date:</span>
								<DatePicker fixedHeight selected={expiresAt} dateFormat="MM/dd/yyyy"
									onChange={this.changeExpirationDate} />
							</label>
						</div> : null
				}

				<Button disabled={!canUpload} onClick={this.upload}>
					<p>Share</p>
				</Button>
			</div>
		);
	}
}

export default withRouter(Uploader);
