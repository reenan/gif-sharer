import React from 'react';
import ReactDOM from 'react-dom';
import GIFWrapper from './GIFWrapper';
import { MemoryRouter } from 'react-router-dom';

import { shallow } from 'enzyme'; 

import renderer from 'react-test-renderer';
import sinon from 'sinon';


afterEach(() => {
  // Restore the default sandbox here
  sinon.restore();
});


it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <MemoryRouter>
      <GIFWrapper GIF={{ content: 'mock' }} />
    </MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should handle upload correcly', async () => {
  sinon.stub(window, 'fetch').resolves({
    json: () => { return {
      id: 'mock'
    }}
  });

  const component = shallow(<GIFWrapper GIF={{ content: 'mock' }} />);
  const instance = component.instance();

  const returnedID = await instance.uploadGIF(false, null, null);

  expect(returnedID).toBe('mock');

})
