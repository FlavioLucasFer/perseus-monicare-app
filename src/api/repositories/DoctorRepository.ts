import HttpRequestService from "api/services/HttpRequestService";

import RepositoryInterface from "api/repositories/RepositoryInterface";

import responseToDoctor from "api/utils/responseToDoctor";

import Doctor from "api/models/Doctor";

export type NewDoctorT = {
	name: string,
	login: string,
	password: string,
	email: string,
	cpf: string,
	phone: string,
	crm: string,
	specialty: string,
};

class DoctorRepository implements RepositoryInterface<Doctor, NewDoctorT, number> {
	private resourceRoute = '/doctors';

	public async save(doctor: Doctor): Promise<Doctor> {
		let res: any;

		if (doctor.id) {
			try {
				res = await HttpRequestService.put(`${this.resourceRoute}/${doctor.id}`, doctor.dirty());
			} catch (err) {
				throw err;
			}
		} else {
			try {
				res = await HttpRequestService.post(this.resourceRoute, doctor.toObject());
			} catch (err) {
				throw err;
			}
		}

		return responseToDoctor(res);
	}

	public async create(attributes: NewDoctorT): Promise<Doctor> {
		try {
			return responseToDoctor(
				await HttpRequestService.post(this.resourceRoute, attributes),
			);
		} catch (err) {
			throw err;
		}
	}

	public async all(): Promise<Doctor[]> {
		let res: any[];

		try {
			res = await HttpRequestService.get(this.resourceRoute);
		} catch (err) {
			throw err;
		}

		return res.map(e => responseToDoctor(e));
	}

	public async findById(id: number): Promise<Doctor> {
		try {
			const res = await HttpRequestService.get(`${this.resourceRoute}/${id}`);

			return responseToDoctor(res);
		} catch (err) {
			throw err;
		}
	}
};

export default DoctorRepository;
