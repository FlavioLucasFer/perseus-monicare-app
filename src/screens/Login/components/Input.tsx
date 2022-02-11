import { ErrorMessage, useField } from 'formik';
import React, { useState } from 'react';
import { 
	StyleSheet, 
	Text, 
	TextInput, 
	TextInputProps, 
	View, 
} from "react-native";
import { Icon } from 'react-native-elements';

interface LoginInputProps extends TextInputProps {
	name: string,
	placeholder: string,
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',

		backgroundColor: '#F6F6F6',
		borderWidth: 1, 
		borderColor: '#BDBDBD', 
		borderRadius: 7,
	},
	input: {
		paddingLeft: 15,
		fontSize: 16,
		width: '90%',
	},
	errorMessage: {
		color: '#F00',
	},
});

const Input: React.FC<LoginInputProps> = props => {
	const [field, meta, helpers] = useField(props.name);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [secureTextEntry, setSecureTextEntry] = useState(props.secureTextEntry);

	function handleVisibilityIconPress() {
		setIsPasswordVisible(!isPasswordVisible);
		setSecureTextEntry(!secureTextEntry);
	}

	return (
		<>
			<View 
				style={styles.container}
			>
				<TextInput 
					{...props}
					value={field.value}
					placeholderTextColor='#BDBDBD'
					style={[styles.input, props.style]}
					onBlur={() => helpers.setTouched(!meta.touched)}
					onChangeText={helpers.setValue}
					secureTextEntry={secureTextEntry}
				/>
				{props.secureTextEntry &&
					<Icon
						name={isPasswordVisible ? 'visibility-off' : 'visibility'}
						color={isPasswordVisible ? '#0000004D' : undefined}
						type='material'
						size={28}
						onPress={handleVisibilityIconPress}
					/>
				}
			</View>
			<Text style={styles.errorMessage}>
				<ErrorMessage name={props.name} />
			</Text>
		</>
	);
}; 

export type {
	LoginInputProps,
};
export default Input;
