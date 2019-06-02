import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// this adds jest-dom's custom assertions
import 'jest-dom/extend-expect';