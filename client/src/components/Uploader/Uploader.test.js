import React from 'react';
import ReactDOM from 'react-dom';
import Uploader from './Uploader';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Uploader />, div);
  ReactDOM.unmountComponentAtNode(div);
});
