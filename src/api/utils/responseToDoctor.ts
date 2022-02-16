import Doctor from "api/models/Doctor";

export type DoctorResponse = {
	id: number,
	email: string,
	crm: string,
	specialty: string,
	user: {
		name: string,
		login: string,
		password: string,
		cpf: string,
		phone: string,
	},
};

function responseToDoctor(res: DoctorResponse): Doctor {
	return new Doctor({
		id: res.id,
		name: res.user.name,
		login: res.user.login,
		password: res.user.password,
		email: res.email,
		cpf: res.user.cpf,
		phone: res.user.phone,
		crm: res.crm,
		specialty: res.specialty,
	});
}

export default responseToDoctor;
