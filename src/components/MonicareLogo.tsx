import React from 'react';
import { Image, ImageProps } from 'react-native';

interface MonicareLogoProps extends Omit<ImageProps, 'source'> {};

const MonicareLogo: React.FC<MonicareLogoProps> = props => (
	<Image 
		{...props}
		style={[{ resizeMode: 'contain', width: '100%' }, props.style]}
		source={require('images/monicare-logo.png')}
	/>
);

export type {
	MonicareLogoProps,
};
export default MonicareLogo;
