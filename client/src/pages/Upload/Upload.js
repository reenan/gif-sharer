import React, { Component } from 'react'

import { GIFWrapper, VideoWrapper } from './components';

import './Upload.scss';

export default class Upload extends Component {

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

      // Read new uploaded file data
      if (file != null) {
        const reader = new FileReader();

        reader.onload = this.defineFile;
        reader.readAsDataURL(file);
      }
    })
  }

  // Define file and file content
  defineFile = (e) => {
    let { file } = this.state;
    file.content = e.target.result;

    this.setState({ file });
  }

  render() {
    const { file } = this.state;

    return (
      <div className='upload'>

        <div className={`${!file ? 'empty' : ''} input-wrapper`} >
          <input accept='.mp4,.gif' type='file' onChange={this.onMediaChange} />
          <div className='file-button'>
            <p>Click to upload</p>
            <span>or, drag and drop (.mp4 or .gif)</span>

            <span className='filename'>
              Selected: { file ? file.name : 'None' }
            </span>
          </div>
        </div>

        {
          file && file.content ?
            (
              file.type.indexOf('video') !== -1 ?
                <VideoWrapper video={file} /> : <GIFWrapper GIF={file} />
            ) : null
        }

        </div>
    )
  }
}
