import React from 'react';

import { BrowserRouter } from 'react-router-dom'
import Routes from './routes.js';

export default () => (
  <BrowserRouter>
    <div className='app'>
      <p className='title'>GIF Sharer</p>
      
      <Routes />
    </div>
  </BrowserRouter>
)
