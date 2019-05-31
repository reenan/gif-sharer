import React, { Component } from 'react'

import { GIFContainer, VideoContainer } from '../';
import './Uploader.scss';

export default class Uploader extends Component {

  constructor(props) {
    super(props);

    this.state = {
      file: null,
    }
  }

  onMediaChange = (e) => {
    const { target } = e;
    const file = target.files[0];

    this.setState({ file }, () => {
      const reader = new FileReader();
  
      reader.onload = this.defineFile;
      reader.readAsDataURL(file);
    })
  }

  defineFile = (e) => {
    let { file } = this.state;
    file.content = e.target.result;

    this.setState({ file });
  }

  render() {
    const { file } = this.state;

    return (
      <div className='uploader'>
        <input type='file' onChange={this.onMediaChange} />
        
        {
          file && file.content ?
            (
              file.type.indexOf('video') !== -1 ? 
                <VideoContainer file={file} /> : <GIFContainer file={file} />
            ) : null
        }

        </div>
    )
  }
}
