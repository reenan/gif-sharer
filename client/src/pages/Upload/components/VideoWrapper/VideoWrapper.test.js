import React from 'react';
import ReactDOM from 'react-dom';
import VideoWrapper from './VideoWrapper';
import { MemoryRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const video = new File(['bigbase64'], 'mock.mp4', { type: 'video/mp4' })

  ReactDOM.render(
    <MemoryRouter>
      <VideoWrapper video={video} />
    </MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
