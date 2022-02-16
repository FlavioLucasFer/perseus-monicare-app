import React from 'react';
import { shallow } from 'enzyme';

import Login from 'screens/Login';


describe('Login screen', () => {
	it('Should render properly', () => {
		const wrapper = shallow(
			<Login />
		);

		expect(wrapper.debug()).toMatchSnapshot();
	});
});
