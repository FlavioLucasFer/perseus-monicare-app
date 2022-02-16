import React, { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import { 
	FlatList,
	SafeAreaView, 
	ScrollView, 
	StyleSheet, 
	Text, 
	View, 
} from 'react-native';
import { Avatar, Divider, Icon } from 'react-native-elements';
import { List, Facebook } from 'react-content-loader/native';
import { Actions } from 'react-native-router-flux';
import { Tabs } from '@ant-design/react-native';
import { toString } from 'lodash';

import { 
	Patient, 
	Caregiver,
	PatientMeasurement, 
	AuthService,
	PatientRepository,
	MeasurementType,
	MeasurementTypeRepository,
} from '@api';

import Tag from '@components/Tag';
import { main } from '@utils/colors';

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
	},
	header: {
		padding: 15,
	},
	logoutIcon: {
		alignSelf: 'flex-end',
	},
	userInfo: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: 10,
	},
	patientName: {
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 10,
		color: '#000',
	},
	patientAge: {
		fontSize: 14,
		color: '#000',
	},
	tabContainer: { 
		width: '100%', 
		height: '100%',
	},
	measurementView: {
		display: 'flex',
		alignItems: 'center',
	},
	measurementValue: {
		fontSize: 20,
	},
	measuredAt: {
		fontSize: 11,
		alignSelf: 'flex-end',
	},
	divider: { 
		marginBottom: 15, 
		marginTop: 5, 
	},
	listSkeleton: {
		marginBottom: 10,
		marginLeft: 10,
	},
});

interface TabsT {
	title: string,
	id: number,
	name: string,
	measurements: PatientMeasurement[],
};

const Measurements = () => {
	const [measurementTypes, setMeasurementTypes] = useState<MeasurementType[]>([]); 
	const [measurements, setMeasurements] = useState<PatientMeasurement[]>([]);
	const [caregiver, setCaregiver] = useState<Caregiver | undefined>();
	const [patient, setPatient] = useState<Patient | undefined>();
	const [tabs, setTabs] = useState<TabsT[]>([]);

	const [isLoadingMeasurements, setIsLoadingMeasurements] = useState(true);
	const [isLoadingPatient, setIsLoadingPatient] = useState(true);

	const patientRepository = new PatientRepository();

	useEffect(() => {
		async function getLoggedUser() {
			let user: Patient | Caregiver | undefined;

			try {
				user = await AuthService.me();
			} catch (err) {
				errorToast('Um erro inesperado aconteceu. Tente novamente!');

				return Actions.login();
			}

			if (user instanceof Patient) {
				setIsLoadingPatient(false);
				return setPatient(user);
			}

			return setCaregiver(user);
		}

		getLoggedUser();
	}, []);

	useEffect(() => {
		const measurementTypeRepository = new MeasurementTypeRepository();

		async function fetchMeasurementTypes() {
			try {
				setMeasurementTypes(await measurementTypeRepository.all());
			} catch (err) {
				errorToast('Um erro inesperado aconteceu. Tente novamente!');

				return Actions.login();
			}
		}

		fetchMeasurementTypes();
	}, []);

	useEffect(() => {
		async function getPatient() {
			if (caregiver && caregiver.patientId)
				try {
					setPatient(await patientRepository.findById(caregiver.patientId));
					setIsLoadingPatient(false);
				} catch (err) {
					errorToast('Um erro inesperado aconteceu. Tente novamente!');

					return Actions.login();
				}
					
		}

		getPatient();
	}, [caregiver]);

	useEffect(() => {
		async function fetchMeasurements() {
			if (patient && patient.id)
				try {
						setMeasurements(await patientRepository.getMeasurements(patient.id))
				} catch (err) {
					errorToast('Um erro inesperado aconteceu. Tente novamente!');

					return Actions.login();
				}
		}

		fetchMeasurements();
	}, [patient]);

	useEffect(() => {
		if (measurements.length > 0) {
			const tabs = [];

			for (const measurementType of measurementTypes) 
				tabs.push({
					...measurementType,
					title: measurementType.name.toUpperCase(),
					measurements: measurements.filter(e => e.measurementType.id === measurementType.id),
				})
	
			setTabs(tabs);
			setIsLoadingMeasurements(false);
		}

	}, [measurements]);

	function errorToast(message: string) {
		Toast.show({
			type: 'error',
			text1: 'Erro',
			text2: message,
			position: 'bottom',
		});
	}

	function getPatientAge(): number {
		return moment().diff(patient?.birthDate, 'years');
	}

	async function handleLogout() {
		try {
			AuthService.logout();

			Actions.login();
		} catch (err) {
			errorToast('Um erro inesperado aconteceu. Tente novamente!');

			return Actions.login();
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				{isLoadingPatient ?
					<Facebook />
				:
					<>
						<Icon 
							name='sign-out-alt' 
							type='font-awesome-5'
							size={25}
							color='#585858'
							style={styles.logoutIcon}
							onPress={handleLogout}
						/>

						<View style={styles.userInfo}>
							<Avatar
								size={100}
								icon={{ name: 'person', type: 'material', size: 50 }}
								rounded
								containerStyle={{ backgroundColor: '#8a8a8a' }}
							/>

							<Text style={styles.patientName}>{patient?.name}</Text>
							<Text style={styles.patientAge}>
								{getPatientAge()} ano{getPatientAge() > 1 && 's'} - {moment(patient?.birthDate).format('DD/MM/YYYY')}
							</Text>
						</View>
						
						<Text>
							<Text style={{ fontWeight: 'bold' }}>Cuidadores: </Text> 
							{patient?.caregivers.map((e, i) => (
								<Text key={e.id}>
									<Text 
										style={e.id === caregiver?.id && {
											fontWeight: 'bold',
											color: '#000',
										}}
									>
										{e.name}{e.id === caregiver?.id && ' (você)'}
									</Text>
									{i < patient.caregivers.length - 1 && ', '}
								</Text>
							))}
						</Text>
					</>
				}
			</View>
			
				<View style={styles.tabContainer}>
			{isLoadingMeasurements ? 
				<>
					<List style={styles.listSkeleton} />
					<List style={styles.listSkeleton} />
					<List style={styles.listSkeleton} />
					<List style={styles.listSkeleton} />
					<List style={styles.listSkeleton} />
					<List style={styles.listSkeleton} />
				</>
			:
				<Tabs 
					tabs={tabs} 
					tabBarPosition='top'
					tabBarActiveTextColor={main.red}
					tabBarUnderlineStyle={{ backgroundColor: main.red }}
				>
					{( tab: TabsT ) => (
						<View style={{ padding: 10 }}>
							<FlatList 
								data={tab.measurements}
								renderItem={({ item }) => (
									<>
										<View style={styles.measurementView}>
											{['bad', 'caution'].includes(item.status) &&
												<Tag 
													text={item.status === 'bad' ? 'Perigoso' : 'Cuidado'} 
													color={item.status === 'bad' ? main.red : main.yellow}
													style={{ alignSelf: 'flex-start' }}
												/>
											}
											
											<Text 
												style={[
													styles.measurementValue, 
													['bad', 'caution'].includes(item.status) && { 
														fontWeight: 'bold', 
														color: item.status === 'bad' ? main.red : main.yellow,
													},
												]}
											>
												{item.value}
											</Text>
											<Text style={styles.measuredAt}>
												{moment(item.measuredAt).format('DD/MM/YYYY HH:mm:ss')}
											</Text>
										</View>

										<Divider style={styles.divider} />
									</>
								)}
								keyExtractor={item => toString(item.id)} 
							/>
						</View>
					)}
				</Tabs>
				}
			</View>
		</SafeAreaView>
	);
};

export default Measurements;
