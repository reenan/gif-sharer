import React from 'react';
import ReactDOM from 'react-dom';
import Upload from './Upload';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Upload />, div);
  ReactDOM.unmountComponentAtNode(div);
});
