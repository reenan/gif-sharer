
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

    // Better a workaround then not finishing
    setTimeout(() => {
      this.setState({
        trimValues: [0, this.video.duration]
      });
  
      this.video.play();
      this.loopInterval = setInterval(this.loopVideo, 30);
    }, 100);
  }

  onChangeRange = (trimValues) => {
    this.setState({ trimValues });
  } 
   
  loopVideo = () => {
    if (this.video.currentTime >= this.state.trimValues[1]) {
      this.video.currentTime = this.state.trimValues[0];
      this.video.play();
    }
  };

  render() {
    const { trimValues } = this.state;

    return (
      <div className='video-container'>
        <video ref={video => this.video = video}
          src={this.props.file.content}
        />

        {
          this.video ? 
            <Range values={trimValues} step={0.01} min={0}
              max={this.video.duration} onChange={this.onChangeRange}
              renderTrack={Track.bind(this, trimValues, this.video.duration)} renderThumb={Thumb}
            /> : null
        }

      </div>
    )
  }
}


const Thumb = ({ props, isDragged }) => (
  <div
    {...props}
    style={{
      ...props.style,
      height: '42px',
      width: '42px',
      borderRadius: '4px',
      backgroundColor: '#FFF',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0px 2px 6px #AAA'
    }}
  >
    <div
      style={{
        height: '16px',
        width: '5px',
        backgroundColor: isDragged ? '#548BF4' : '#CCC'
      }}
    />
  </div>
)

const Track = (trimValues, max, { props, children }) => (
  <div
    onMouseDown={props.onMouseDown}
    onTouchStart={props.onTouchStart}
    style={{
      ...props.style,
      height: '36px',
      display: 'flex',
      width: '100%'
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