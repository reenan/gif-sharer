import React from 'react';
import ReactDOM from 'react-dom';
import PasswordField from './PasswordField';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const onChange = () => {};
  const value = 'mock';

  ReactDOM.render(<PasswordField onChange={onChange} value={value} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
