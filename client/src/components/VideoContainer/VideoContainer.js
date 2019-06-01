
import React, { Component } from 'react'


import { Range, getTrackBackground } from 'react-range';

import './VideoContainer.scss';

export default class VideoContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trimValues: [0, 0],
    }
  }

  componentDidMount() {

    // Better a tiny workaround than not finishing
    setTimeout(() => {
      this.setState({
        trimValues: [0, this.video.duration]
      });

      this.video.play();
      this.loopInterval = setInterval(this.loopVideo, 30);
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.loopInterval);
  }

  onChangeRange = (trimValues) => {
    this.setState({ trimValues });
  }

  loopVideo = () => {
    if (this.video.currentTime >= this.state.trimValues[1]) {
      this.video.currentTime = this.state.trimValues[0];
      this.video.play();
    }
  }

  cropVideo = () => {
    fetch('http://localhost:7070/api/video', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        video: this.props.file.content,
        startTime: this.state.trimValues[0],
        duration: this.getCroppedVideoDuration(),
      })
    }).then((data) => {
      console.log('then: ', data);
    }).catch((err) => {
      console.log('catch: ', err);
    });
  }

  getCroppedVideoDuration = () => {
    return Math.abs(this.state.trimValues[1] - this.state.trimValues[0]).toFixed(2);
  }

  render() {
    const { trimValues } = this.state;
    const croppedVideoDuration = this.getCroppedVideoDuration();
    return (
      <div className='video-container'>
        <video accept='.mp4,.gif' ref={video => this.video = video}
          muted src={this.props.file.content}
        />

        {
          this.video ?
            <div className='crop-wrapper'>
              <Range values={trimValues} step={0.01} min={0}
                max={this.video.duration} onChange={this.onChangeRange}
                renderTrack={Track.bind(this, trimValues, this.video.duration)} renderThumb={Thumb}
              />

              <span className={`duration ${croppedVideoDuration > 5 ? 'red' : ''}`}>Video Duration: {croppedVideoDuration}s</span>
              { croppedVideoDuration > 5 ?
                  <span className='length-warning'>Please, crop your video to a max of 5 seconds</span> : null
              }
            </div> : null
        }

        <div className='upload-button' onClick={this.cropVideo}>
          <p>Share</p>
        </div>

      </div>
    )
  }
}


const Thumb = ({ props, isDragged }) => (
  <div
    {...props}
    style={{
      ...props.style,
      height: '25px',
      width: '25px',
      borderRadius: '100%',
      backgroundColor: '#FFF',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0px 2px 6px #AAA'
    }}
  >
    <div
      style={{
        height: '8px',
        width: '8px',
        borderRadius: '100%',
        backgroundColor: isDragged ? '#548BF4' : '#CCC'
      }}
    />
  </div>
)

const Track = (trimValues, max, { props, children }) => (
  <div
    className='track'
    onMouseDown={props.onMouseDown}
    onTouchStart={props.onTouchStart}
    style={{
      ...props.style
    }}
  >
    <div
      ref={props.ref}
      style={{
        height: '5px',
        width: '100%',
        borderRadius: '4px',
        background: getTrackBackground({
          values: trimValues,
          colors: ['#ccc', '#548BF4', '#ccc'],
          min: 0,
          max: max
        }),
        alignSelf: 'center'
      }}
    >
      {children}
    </div>
  </div>
)