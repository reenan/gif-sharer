import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom';

import './SharedGIF.scss';
import { Button, Loader, PasswordField, Modal } from 'components';

class SharedGIF extends Component {

  constructor(props) {
    super(props);

    this.state = {
      url: null,
      protected: false,
      id: null,
      fileContents: [],
      isPrivate: false,
      loading: true,
      invalidPassword: false,
      password: '',
      badStatusMessage: false
    }
  }

  componentDidMount = () => {
    this.loadGIF();
  }

  loadGIF = () => {
    const { params } = this.props.match;

    this.setState({loading: true})

    fetch(`${process.env.REACT_APP_API_URL}/gif/${params.id}`, {
      headers: {
        password: this.state.password,
      }
    }).then(async (data) => {

      if (data.status === 410 || data.status === 404) {
        const { message } = await data.json();

        this.setState({
          badStatusMessage: message,
          loading: false,
        });

        return;
      }

      if (data.status === 401) {
        this.setState({
          isPrivate: true,
          loading: false,
          invalidPassword: this.state.password !== '',
        })

        return;
      }

      if (data.status === 200) {
         const { result, base64 } = await data.json();
         const { url, id } = result;

        this.setState({ url, id, base64, isPrivate: false, loading: false, invalidPassword: false });
      }
    })
  }


  onChangePassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  render() {
    const { url, id, base64, loading, isPrivate, password, invalidPassword, badStatusMessage } = this.state;

    return (
      <div className='shared-gif-wrapper'>

        {
         loading ? <Loader /> : (
          <div>

            {
              isPrivate ? (
                <div>
                  <p>Looks like this GIF is protected.</p>

                  <PasswordField value={password} onChange={this.onChangePassword} />
                  {
                    invalidPassword ? <p className='invalid-password'>Invalid password</p> : null
                  }

                  <Button onClick={this.loadGIF}>
                    <span>Request</span>
                  </Button>
                </div>
              ) : null
            }

            {
              base64 ? (
                <div>
                  <img ref={(GIF) => this.GIF = GIF} alt='Shared GIF' src={url} />

                  <a className='download-button' href={base64} download={`${id}.gif`}>
                    <Button>
                      <span>Download</span>
                    </Button>
                  </a>
                </div>
              ) : null
            }

            {
              badStatusMessage ? (
                <Modal open={true}>
                  <p>{badStatusMessage}</p>

                  <NavLink to='/' className='share-a-gif'>
                    <Button>
                      <span>Share a GIF!</span>
                    </Button>
                  </NavLink>
                </Modal>
              ) : (
                <NavLink to='/' className='share-a-gif'>
                  <Button>
                    <span>Share a GIF!</span>
                  </Button>
                </NavLink>
              )
            }

          </div>
         )
        }

      </div>
    )
  }
}

export default withRouter(SharedGIF)
