import React from 'react';
import { shallow } from 'enzyme';

import LinkLikeButton from 'components/LinkLikeButton';

describe('LinkLikeButton component', () => {
	it('Should render properly', () => {
		const wrapper = shallow(
			<LinkLikeButton title='teste' />
		);
		expect(wrapper.debug()).toMatchSnapshot();
	});
});
