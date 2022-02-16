import React from 'react';
import { shallow } from 'enzyme';

import Input from 'screens/Login/components/Input';

let mockField = {};
let mockMeta = {};
let mockHelpers = {};

jest.mock("formik", () => ({
	...jest.requireActual("formik"),
	useField: jest.fn(() => {
		return [mockField, mockMeta, mockHelpers];
	}),
}));

describe('Input component', () => {
	it('Should render properly', () => {
		mockField = { name: "test" };
		mockMeta = { touched: false, error: undefined };
		mockHelpers = { setValue: jest.fn() };
		const defaultProps = { name: "test", onChange: jest.fn(), status: "default" };

		const wrapper = shallow(
			<Input 
				{...defaultProps}
				placeholder='Test'
			/>
		);
		expect(wrapper.debug()).toMatchSnapshot();
	});
});
