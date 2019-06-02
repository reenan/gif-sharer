import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Uploader } from '../';

import './GIFWrapper.scss';

export default class GIFWrapper extends Component {

  static propTypes = {
    GIF: PropTypes.object.isRequired,
  }

   // Request to save a GIF
   uploadGIF = (isPrivate, password, expiresAt) => {

    return new Promise((resolve, reject) => {
      fetch(`${process.env.REACT_APP_API_URL}/GIF`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          GIF: this.props.GIF.content,
          isPrivate: isPrivate,
          password: password,
          expiresAt: expiresAt,
        })
      }).then(async (data) => {
        const { id } = await data.json();
        resolve(id);

      }).catch((err) => {
        reject(err);
      });
    })
  }

  render() {
    return (
      <div className='gif-wrapper'>
        <img alt='Uploaded GIF' src={this.props.GIF.content} />

        <Uploader upload={this.uploadGIF} />
      </div>
    )
  }
}
