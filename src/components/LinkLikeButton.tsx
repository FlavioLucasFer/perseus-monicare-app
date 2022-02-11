import React from 'react';
import { 
	TouchableOpacity, 
	StyleSheet, 
	Text, 
	TouchableOpacityProps, 
} from 'react-native';

interface LinkLikeButtonProps extends TouchableOpacityProps {
	title: string,
};

const styles = StyleSheet.create({
	title: {
		color: '#0075FF',
		textDecorationLine: 'underline',
	},
});

const LinkLikeButton: React.FC<LinkLikeButtonProps> = props => {
	const {
		title,
		...rest
	} = props;

	return (
		<TouchableOpacity {...rest}>
			<Text style={styles.title}>
				{title}
			</Text>
		</TouchableOpacity>
	);
}

export type {
	LinkLikeButtonProps,
};
export default LinkLikeButton;
