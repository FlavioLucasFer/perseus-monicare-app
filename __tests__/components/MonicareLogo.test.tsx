import React from 'react';
import { shallow } from 'enzyme';

import MonicareLogo from 'components/MonicareLogo';

describe('MonicareLogo component', () => {
	it('Should render properly', () => {
		const wrapper = shallow(
			<MonicareLogo />
		);
		expect(wrapper.debug()).toMatchSnapshot();
	});
});
