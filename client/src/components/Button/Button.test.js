import React from 'react';
import ReactDOM from 'react-dom';

import renderer from 'react-test-renderer';
import Button from './Button';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Button />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing when disabled', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Button disabled />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('props.click should not crash with default value', () => {
  let component = renderer.create(<Button />);
  let instance = component.getInstance();
  
  instance.props.onClick();
});