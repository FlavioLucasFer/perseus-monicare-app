import React from 'react';
import { shallow } from 'enzyme';

import Tag from 'components/Tag';

describe('Tag component', () => {
	it('Should render properly', () => {
		const wrapper = shallow(
			<Tag text='teste'
			  color='#FFFFFF'	/>
		);
		expect(wrapper.debug()).toMatchSnapshot();
	});
});
