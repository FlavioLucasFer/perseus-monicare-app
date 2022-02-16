import React from 'react';
import { shallow } from 'enzyme';

import Button from 'screens/Login/components/Button';

describe('Button component', () => {
	it('Should render properly', () => {
		const wrapper = shallow(
			<Button title='teste' />
		);
		expect(wrapper.debug()).toMatchSnapshot();
	});
});
