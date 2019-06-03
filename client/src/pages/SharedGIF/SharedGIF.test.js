import React from 'react';
import sinon from 'sinon';

import { shallow } from 'enzyme';

import SharedGIF from './SharedGIF';

afterEach(() => {
  // Restore the default sandbox here
  sinon.restore();
});

it('onChangePassword should update state password', () => {
  // Avoid rendering router elements, mock match prop.
  let component = shallow(
    <SharedGIF.WrappedComponent match={{ params: { id : 'mock' } }} />
  );

  component.instance().onChangePassword( {target: { value: 'mock' }} );

  expect(component.state('password')).toBe('mock');
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