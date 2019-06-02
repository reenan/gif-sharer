import React from 'react';
import ReactDOM from 'react-dom';
import Uploader from './Uploader';
import { MemoryRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Uploader upload={() => {}}/>
    </MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
