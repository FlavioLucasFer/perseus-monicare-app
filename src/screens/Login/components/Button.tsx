import React from 'react';
import { 
	ActivityIndicator,
	StyleSheet, 
	Text, 
	TouchableOpacity, 
	TouchableOpacityProps, 
} from 'react-native';

interface LoginButtonProps extends TouchableOpacityProps {
	title: string,
	loading?: boolean,
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',

		backgroundColor: '#FC9A9A',
		borderWidth: 2,
		borderColor: '#FF1616',
		borderRadius: 50,
		padding: 10,
	},

	disabled: {
		backgroundColor: '#FC9A9A4D',
		borderColor: '#FF16164D',
	},

	title: {
		color: '#000',
		fontSize: 20,
		fontWeight: 'bold',
	},

	titleDisabled: {
		color: '#00000080',
	},
});

const Button: React.FC<LoginButtonProps> = props => {
	const {
		title,
		loading,
		style,
		...rest
	} = props;

	return (
		<TouchableOpacity
			{...rest}
			style={[styles.container, props.disabled && styles.disabled, style]}
		>
			{loading &&
				<ActivityIndicator 
					color='#FF1616'
					style={{ marginRight: 10 }}
				/>
			}
			<Text style={[styles.title, props.disabled && styles.titleDisabled]}>{title}</Text>
		</TouchableOpacity>
	);
};

export type {
	LoginButtonProps,
};
export default Button;
