import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

import { shallow } from 'enzyme';

import renderer from 'react-test-renderer';
import sinon from 'sinon';

import SharedGIF from './SharedGIF';

afterEach(() => {
  // Restore the default sandbox here
  sinon.restore();
});

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <MemoryRouter>
      <SharedGIF />
    </MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('onChangePassword should update state password', () => {
  // Avoid rendering router elements, mock match prop.
  let component = renderer.create(
    <SharedGIF.WrappedComponent match={{ params: { id : 'mock' } }} />
  );

  let instance = component.getInstance();
  instance.onChangePassword( {target: { value: 'mock' }} );

  expect(instance.state.password).toBe('mock');
});

it('should be able to loadGIF with successful result', (done) => {
  sinon.stub(window, 'fetch').resolves({
      status: 200,
      json: () => { return {
        result: { url: 'mockURL', id: 'mockID' }, base64: 'mock64'
      }
    }
  });

  // Avoid rendering router elements, mock match prop.
  let component = shallow(
    <SharedGIF.WrappedComponent match={{ params: { id : 'mock' } }} />
  );

  // Wait re-render
  setTimeout(() => {
    expect(component.state('url')).toBe('mockURL')
    expect(component.state('id')).toBe('mockID')
    expect(component.state('base64')).toBe('mock64')

    done()
  }, 100)
});

it('should be able to handle loadGIF with bad result 410', (done) => {
  sinon.stub(window, 'fetch').resolves({
      status: 410,
      json: () => { return {
        message: 'Mock result 410'
      }
    }
  });

  // Avoid rendering router elements, mock match prop.
  let component = shallow(
    <SharedGIF.WrappedComponent match={{ params: { id : 'mock' } }} />
  );

  // Wait re-render
  setTimeout(() => {
    expect(component.state('badStatusMessage')).toBe('Mock result 410')

    done()
  }, 100)
});

it('should be able to handle loadGIF with bad result 404', (done) => {
  sinon.stub(window, 'fetch').resolves({
      status: 404,
      json: () => { return {
        message: 'Mock result 404'
      }
    }
  });

  // Avoid rendering router elements, mock match prop.
  let component = shallow(
    <SharedGIF.WrappedComponent match={{ params: { id : 'mock' } }} />
  );

  // Wait re-render
  setTimeout(() => {
    expect(component.state('badStatusMessage')).toBe('Mock result 404')

    done()
  }, 100)
});

it('should be able to handle loadGIF with unauthorized response', (done) => {
  sinon.stub(window, 'fetch').resolves({
      status: 401,
      json: () => { return {
        message: 'Mock result 401'
      }
    }
  });

  // Avoid rendering router elements, mock match prop.
  let component = shallow(
    <SharedGIF.WrappedComponent match={{ params: { id : 'mock' } }} />
  );

  // Wait re-render
  setTimeout(() => {
    expect(component.state('isPrivate')).toBe(true)

    done()
  }, 100)
});