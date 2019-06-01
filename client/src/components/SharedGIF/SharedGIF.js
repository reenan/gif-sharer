import React, { Component } from 'react'

import './SharedGIF.scss';

export default class SharedGIF extends Component {

  constructor(props) {
    super(props);

    this.state = {
      url: null,
      protected: false,
      id: null
    }
  }

  componentDidMount = () => {
    const { params } = this.props.match;

    fetch(`http://localhost:7070/api/gif/${params.id}`).then(async (data) => {
      const { id, url } = await data.json();
      this.setState({ url, id });
    })
  }
  
  download = () => {
    const { params } = this.props.match;
    
    fetch(`http://localhost:7070/api/gif/${params.id}/download`);
  }

  render() {
    const { url, id } = this.state;
    return (
      <div className='shared-gif'>
        <img src={url} />
        <span onClick={this.download}>Download</span>
      </div>
    )
  }
}
