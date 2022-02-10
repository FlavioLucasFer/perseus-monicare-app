import moment from "moment";
import { isDate } from "lodash";

import HttpRequestService from "api/services/HttpRequestService";

import RepositoryInterface from "api/repositories/RepositoryInterface";

import responseToCaregiver from "api/utils/responseToCaregiver";
import responseToPatient from "api/utils/responseToPatient";

import Caregiver, { KinshipT } from "api/models/Caregiver";
import Patient from "api/models/Patient";

export type NewCaregiverT = {
	name: string,
	login: string,
	password: string,
	email: string | null,
	birthDate: string | Date,
	cpf: string,
	phone: string,
	kinship: KinshipT,
	patientId: number,
};

class CaregiverRepository implements RepositoryInterface<Caregiver, NewCaregiverT, number> {
	private resourceRoute = '/caregivers';

	public async save(caregiver: Caregiver): Promise<Caregiver> {
		let res: any;

		if (caregiver.id) {
			const dirty = caregiver.dirty();

			if (dirty.birthDate) {
				dirty.birthDate = moment(dirty.birthDate).format('YYYY-MM-DD');
			}

			try {
				res = await HttpRequestService.put(`${this.resourceRoute}/${caregiver.id}`, dirty);
			} catch (err) {
				throw err;
			}
		} else {
			const patientObj = caregiver.toObject();

			if (isDate(patientObj.birthDate))
				patientObj.birthDate = moment(patientObj.birthDate).format('YYYY-MM-DD');

			try {
				res = await HttpRequestService.post(this.resourceRoute, patientObj);
			} catch (err) {
				throw err;
			}
		}

		return responseToCaregiver(res);
	}

	public async create(attributes: NewCaregiverT): Promise<Caregiver> {
		if (isDate(attributes.birthDate))
			attributes.birthDate = moment(attributes.birthDate).format('YYYY-MM-DD');

		try {
			return responseToCaregiver(
				await HttpRequestService.post(this.resourceRoute, attributes),
			);
		} catch (err) {
			throw err;
		}
	}

	public async all(): Promise<Caregiver[]> {
		let res: any[];

		try {
			res = await HttpRequestService.get(this.resourceRoute);
		} catch (err) {
			throw err;
		}

		return res.map(e => responseToCaregiver(e));
	}

	public async findById(id: number): Promise<Caregiver> {
		try {
			const res = await HttpRequestService.get(`${this.resourceRoute}/${id}`);

			return responseToCaregiver(res);
		} catch (err) {
			throw err;
		}
	}

	public async getPatient(caregiverId: number): Promise<Patient> {
		try {
			const res = await HttpRequestService.get(`${this.resourceRoute}/${caregiverId}`);

			return responseToPatient(res.patient);
		} catch (err) {
			throw err;
		}
	}
};

export default CaregiverRepository;
