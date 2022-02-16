import React from 'react';
import Toast from 'react-native-toast-message';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Formik, FormikHelpers } from 'formik';

import LinkLikeButton from '@components/LinkLikeButton';
import MonicareLogo from '@components/MonicareLogo';

import Button from '@screens/Login/components/Button';
import Input from '@screens/Login/components/Input';

import { AuthService } from '@api';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',

		backgroundColor: '#fff',
		padding: 20, 
	},
	body: {
		flex: 6,
		justifyContent: 'flex-start',
	},
	form: {
		marginBottom: 50,
	},
	logoView: {
		flex: 4,
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: {
		width: '70%',
	},
	loginButtonView: {
		marginBottom: 15,
	},
	forgotPasswordView: {
		display: 'flex',
		alignItems: 'center',
		margin: 20,
	},
});

interface LoginFormValues {
	login: string,
	password: string,
};

const Login = () => {
	const initialValues: LoginFormValues = {
		login: '',
		password: '',
	};

	async function handleSubmit(values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) {
		const {
			login,
			password,
		} = values;
		
		try {
			await AuthService.login(login, password);
		} catch (err: any) {
			if (err?.errors === 'Invalid credentials')
				return Toast.show({
					type: 'error',
					text1: 'Erro',
					text2: 'Login ou senha invalido!',
					position: 'bottom',
				});
			
			return Toast.show({
				type: 'error',
				text1: 'Erro',
				text2: 'Um erro inesperado aconteceu. Por favor, tente novamente!',
				position: 'bottom',
			});
		}
		
		Actions.measurements();
		actions.setSubmitting(false);
		actions.resetForm();
	}

	function handleValidate(values: LoginFormValues) {
		const {
			login,
			password,
		} = values;
		const errors: {[key: string]: any} = {};

		if (!login)
			errors.login = 'Login é obrigatório';

		if (!password)
			errors.password = 'Senha é obrigatória';

		return errors;
	}

	function isValid(values: LoginFormValues): boolean {
		const {
			login,
			password,
		} = values;

		if (login && password)
			return true;

		return false;
	}

	return (
		<Formik initialValues={initialValues}
			onSubmit={handleSubmit}
			validate={handleValidate}>
			{({ handleSubmit, values, isSubmitting }) => (
				<SafeAreaView style={styles.container}>
					<View style={styles.logoView}>
						<MonicareLogo style={styles.logo} />
					</View>

					<View style={styles.body}>
						<View style={styles.form}>
							<View style={styles.loginButtonView}>
								<Input 
									name='login'
									placeholder='Login' 
								/>
							</View>

							<Input 
								name='password'
								placeholder='Senha'
								secureTextEntry 
							/>
						</View>

						<Button 
							title='Entrar'
							onPress={handleSubmit as any}
							disabled={!isValid(values) || isSubmitting}
							loading={isSubmitting}
						/>
						
						<View style={styles.forgotPasswordView}>
							<LinkLikeButton title='Esqueceu sua senha?' />
						</View>
					</View>
				</SafeAreaView>
			)}
		</Formik>
	);
};

export default Login;
