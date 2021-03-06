import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';

import { Uploader } from '../';

import './VideoWrapper.scss';

export default class VideoWrapper extends Component {

  static propTypes = {
    video: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      trimValues: [0, 0],
    }
  }

  // Define initial trim values and start loop
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        // Sometimes video will not be ready yet, so initial will be 5
        trimValues: [0, isNaN(this.video.duration) ? 5 : this.video.duration]
      });

      this.startLoop();
    }, 100);
  }

  // Remove Interval for looping on video
  componentWillUnmount() {
    clearInterval(this.loopInterval);
  }

  // Update video trim values and restart video loop
  onChangeRange = (trimValues) => {
    this.setState({ trimValues }, this.startLoop);
  }

  // Ensure video will be playing and updated using a interval
  startLoop = () => {
    this.video.play();

    clearInterval(this.loopInterval);
    this.loopInterval = setInterval(this.loopVideo, 30);
  }

  // Ensure video wont be playing outside of defined range
  loopVideo = () => {
    if (
      this.video.currentTime < this.state.trimValues[0] ||
      this.video.currentTime >= this.state.trimValues[1]
    ) {
      this.video.currentTime = this.state.trimValues[0];
      this.video.play();
    }
  }

  // Request to crop and save a video
  cropVideo = (isPrivate, password, expiresAt) => {
    return new Promise((resolve, reject) => {

      fetch(`${process.env.REACT_APP_API_URL}/video`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          video: this.props.video.content,
          startTime: this.state.trimValues[0],
          duration: this.getCroppedVideoDuration(),
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

  getCroppedVideoDuration = () => {
    return Math.abs(this.state.trimValues[1] - this.state.trimValues[0]).toFixed(2);
  }

  canConvertToGIF = () => {
    return this.getCroppedVideoDuration() <= 5;
  }

  render() {
    const { trimValues } = this.state;

    const croppedVideoDuration = this.getCroppedVideoDuration();
    const canConvertToGIF = this.canConvertToGIF();

    return (
      <div className='video-wrapper'>

        <video ref={video => this.video = video}
          muted src={this.props.video.content}
        />

        {
          this.video ?
            <div className='crop-wrapper'>

              <p className='desc'>Use this bar to crop your video! You can create a GIF with a max of 5 seconds.</p>

              <Range allowCross={false} defaultValue={trimValues} max={isNaN(this.video.duration) ? 5 : this.video.duration}
                onChange={this.onChangeRange} step={0.10} pushable={0.10} />

              <span className={`duration ${!canConvertToGIF ? 'red' : ''}`}>GIF Duration: {croppedVideoDuration}s</span>

              {
                !canConvertToGIF ?
                  <span className='length-warning'>Your GIF can have a max of 5 seconds</span> : null
              }
            </div> : null
        }

        <Uploader enableUpload={canConvertToGIF} upload={this.cropVideo} />

      </div>
    )
  }
}
