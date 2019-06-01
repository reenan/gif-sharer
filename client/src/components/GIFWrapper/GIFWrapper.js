import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { GIFUpload } from '../';
import './GIFWrapper.scss';

export default class GIFWrapper extends Component {

  static propTypes = {
    GIF: PropTypes.object.isRequired,
  }

   // Request to save a GIF
   uploadGIF = (isPrivate, password, expirationDate) => {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:7070/api/GIF', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          GIF: this.props.GIF.content,
          isPrivate: isPrivate,
          password: password,
          expirationDate: expirationDate,
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
        <img src={this.props.GIF.content} />

        <GIFUpload upload={this.uploadGIF} />
      </div>
    )
  }
}
