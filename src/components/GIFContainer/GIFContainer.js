
import React, { Component } from 'react'

import './GIFContainer.scss';

export default class GIFContainer extends Component {

  render() {
    return (
      <div className='gif-container'>
        <img src={this.props.file.content} />
      </div>
    )
  }
}
