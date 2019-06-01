
import React, { Component } from 'react'


import { Range, getTrackBackground } from 'react-range';
import PasswordMask from 'react-password-mask';
import DatePicker from 'react-datepicker'
import Toggle from 'react-toggle'
import '../../../node_modules/react-toggle/style.css';
import '../../../node_modules/react-datepicker/src/stylesheets/datepicker.scss';

import './VideoContainer.scss';

export default class VideoContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trimValues: [0, 0],
      isPrivate: false,
      changeHasExpirationDate: false,
      password: '',
      expirationDate: null,
      loading: false
    }
  }

  componentDidMount() {

    setTimeout(() => {
      this.setState({
        trimValues: [0, this.video.duration]
      });

      this.startLoop();
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.loopInterval);
  }

  onChangeRange = (trimValues) => {
    this.setState({ trimValues }, this.startLoop);
  }

  startLoop = () => {
    this.video.play();

    clearInterval(this.loopInterval);
    this.loopInterval = setInterval(this.loopVideo, 30);
  }

  loopVideo = () => {
    if (this.video.currentTime < this.state.trimValues[0]) {
      this.video.currentTime = this.state.trimValues[0];
    }

    if (this.video.currentTime >= this.state.trimValues[1]) {
      this.video.currentTime = this.state.trimValues[0];
      this.video.play();
    }
  }

  cropVideo = () => {
    this.setState({ loading: true });

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
        isPrivate: this.state.isPrivate,
        password: this.state.isPrivate ? this.state.password : null,
        expirationDate: this.state.hasExpirationDate ? this.state.expirationDate : null,
      })
    }).then((data) => {
      console.log('then: ', data);
      this.setState({ loading: false });
    }).catch((err) => {
      console.log('catch: ', err);
      this.setState({ loading: false });
    });
  }

  getCroppedVideoDuration = () => {
    return Math.abs(this.state.trimValues[1] - this.state.trimValues[0]).toFixed(2);
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
    console.log(value)
    this.setState({
      expirationDate: value
    })
  }

  canConvertToGIF = () => {
    let isValid = true;

    if (this.getCroppedVideoDuration() > 5) {
      isValid = false;
    }

    if (this.state.isPrivate && this.state.password.length === 0) {
      isValid = false;
    }

    if (this.state.hasExpirationDate && this.state.expirationDate === null) {
      isValid = false;
    }

    return isValid;
  }

  render() {
    const {
      trimValues,
      isPrivate,
      hasExpirationDate,
      expirationDate,
      password,
      loading,
    } = this.state;
    
    const croppedVideoDuration = this.getCroppedVideoDuration();
    const canConvertToGIF = this.canConvertToGIF();
    
    return (
      <div className='video-container'>
        <video ref={video => this.video = video}
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
            <div className='password-wrapper'>  
              <label>
                <span>Password:</span>
                <PasswordMask
                  value={password}
                  maxLength={50}
                  onChange={this.changePassword}
                  inputClassName='input-password'
                  buttonClassName='btn-show-hide'
                  useVendorStyles={false}
                />
              </label>
            </div> : null
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
            <div className='expiration-date-wrapper'>  
              <label>
                <span>Expiration date:</span>
                <DatePicker fixedHeight selected={expirationDate}
                  onChange={this.changeExpirationDate} />
              </label>
            </div> : null
        }

        <div className={`${loading || !canConvertToGIF ? 'disabled' : ''} upload-button`} onClick={this.cropVideo}>
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