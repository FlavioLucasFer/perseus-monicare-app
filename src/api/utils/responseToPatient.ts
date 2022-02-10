import responseToCaregiver, { CaregiverResponse } from "api/utils/responseToCaregiver";

import Caregiver from "api/models/Caregiver";
import Patient from "api/models/Patient";

export type PatientResponse = {
	id: number,
	email: string,
	birthDate: string | Date,
	user: {
		name: string,
		login: string,
		password: string,
		cpf: string,
		phone: string,
	},
	caregivers?: CaregiverResponse[],
};

function responseToPatient(res: PatientResponse): Patient {
	let caregivers: Caregiver[] = [];

	if (res.caregivers)
		caregivers = res.caregivers.map((e: any) => {
			const aux = {
				...e,
				patient: {
					id: res.id,
				},
			};

			return responseToCaregiver(aux);
		})

	return new Patient({
		id: res.id,
		name: res.user.name,
		login: res.user.login,
		password: res.user.password,
		email: res.email,
		birthDate: res.birthDate,
		cpf: res.user.cpf,
		phone: res.user.phone,
		caregivers,
	});
}

export default responseToPatient;
