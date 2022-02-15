import React from 'react';
import { Text, TextProps } from 'react-native';

interface Props extends TextProps {
	text: string,
	color: string,
};

const Tag: React.FC<Props> = props => {
	const {
		text,
		color,
		style,
	} = props;

	return (
		<Text 
			style={[{ 
					color: color, 
					backgroundColor: `${color}1A`, 
					padding: 2,
					paddingHorizontal: 7,
					borderColor: color,
					borderWidth: 1,
					borderRadius: 25,
					fontSize: 11,
				}, 
				style,
			]}
		>
			{text}
		</Text>
	);
};

export default Tag;
