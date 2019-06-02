import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import sinon from 'sinon';

import Modal from './Modal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Modal />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders with open without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Modal open={true} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('props.close should not crash with default value', () => {
  let component = renderer.create(<Modal />);
  let instance = component.getInstance();
  
  instance.props.close();
});

it('clickOnOverlay should call props.close with closeWithClickOnOverlay true', () => {
  let close = sinon.spy();
  
  let component = renderer.create(<Modal closeWithClickOnOverlay close={close} />);
  let instance = component.getInstance();


  instance.clickOnOverlay();

  expect(close.calledOnce).toBe(true);
});

it('clickOnOverlay should call not props.close with default closeWithClickOnOverlay', () => {
  let close = sinon.spy();
  
  let component = renderer.create(<Modal close={close} />);
  let instance = component.getInstance();

  instance.clickOnOverlay();

  expect(close.calledOnce).toBe(false);
});