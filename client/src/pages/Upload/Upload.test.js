import React from 'react';
import ReactDOM from 'react-dom';
import Upload from './Upload';

import { shallow } from 'enzyme'; 

import renderer from 'react-test-renderer';
import sinon from 'sinon';


afterEach(() => {
  // Restore the default sandbox here
  sinon.restore();
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Upload />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('update file state correctly with null', () => {
  const component = renderer.create(<Upload />);
  const instance = component.getInstance();

  const mockEvent = {
    target: {
      files: [null]
    }
  }

  instance.onMediaChange(mockEvent);

  expect(instance.state.file).toBe(null)
});

it('update file state correctly with mock', () => {
  const onload = () => {};

  sinon.stub(window, 'FileReader').returns({
    onload: onload,
    readAsDataURL: (file) => {
      onload(file)
    }
  });

  const component = renderer.create(<Upload />);
  const instance = component.getInstance();

  const mockFile = {target: { result: 'mock' }};
  const mockEvent = {
    target: {
      files: [mockFile]
    }
  }

  instance.onMediaChange(mockEvent);

  expect(instance.state.file).toBe(mockFile)
});

it('update file state correctly via define file (video)', () => {
  const onload = () => {};

  sinon.stub(window, 'FileReader').returns({
    onload: onload,
    readAsDataURL: (file) => {
      onload(file)
    }
  });

  const component = shallow(<Upload />);
  const instance = component.instance();

  const mockFile = { type: 'video', target: { result: 'mock' }};
  const mockEvent = {
    target: {
      files: [mockFile]
    }
  }

  instance.onMediaChange(mockEvent);
  instance.defineFile(mockFile);

  expect(instance.state.file.content).toBe('mock')
});

it('update file state correctly via define file (gif)', () => {
  const onload = () => {};
  
  sinon.stub(window, 'FileReader').returns({
    onload: onload,
    readAsDataURL: (file) => {
      onload(file)
    }
  });

  const component = shallow(<Upload />);
  const instance = component.instance();

  const mockFile = { type: 'gif', target: { result: 'mock' }};
  const mockEvent = {
    target: {
      files: [mockFile]
    }
  }

  instance.onMediaChange(mockEvent);
  instance.defineFile(mockFile);

  expect(instance.state.file.content).toBe('mock')
});
