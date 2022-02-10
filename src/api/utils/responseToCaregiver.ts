import Caregiver, { KinshipT } from "api/models/Caregiver";

export type CaregiverResponse = {
	id: number,
	email: string,
	birthDate: string | Date,
	kinship: KinshipT,
	user: {
		name: string,
		login: string,
		password: string,
		cpf: string,
		phone: string,
	},
	patient?: {
		id?: number,
	},
};

function responseToCaregiver(res: CaregiverResponse): Caregiver {
	return new Caregiver({
		id: res.id,
		name: res.user.name,
		login: res.user.login,
		password: res.user.password,
		email: res.email,
		birthDate: res.birthDate,
		cpf: res.user.cpf,
		phone: res.user.phone,
		kinship: res.kinship,
		patientId: res?.patient?.id,
	});
}

export default responseToCaregiver;
