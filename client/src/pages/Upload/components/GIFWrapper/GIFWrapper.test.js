import React from 'react';
import ReactDOM from 'react-dom';
import GIFWrapper from './GIFWrapper';
import { MemoryRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const GIF = new File(['bigbase64'], 'mock.gif', { type: 'image/gif' })

  ReactDOM.render(
    <MemoryRouter>
      <GIFWrapper GIF={GIF} />
    </MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
