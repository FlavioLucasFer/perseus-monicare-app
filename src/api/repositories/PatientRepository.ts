import moment from "moment";
import { isDate } from "lodash";

import HttpRequestService from "api/services/HttpRequestService";

import RepositoryInterface from "api/repositories/RepositoryInterface";

import responseToCaregiver from "api/utils/responseToCaregiver";
import responseToPatient from "api/utils/responseToPatient";

import Caregiver from "api/models/Caregiver";
import Patient from "api/models/Patient";
import PatientMeasurement from "api/models/PatientMeasurement";
import responseToPatientMeasurement from "api/utils/responseToPatientMeasurement";

export type NewPatientT = {
	name: string,
	login: string,
	password: string,
	email: string | null,
	birthDate: string | Date,
	cpf: string,
	phone: string,
};

class PatientRepository implements RepositoryInterface<Patient, NewPatientT, number> {
	private resourceRoute = '/patients';
	
	public async save(patient: Patient): Promise<Patient> {
		let res: any;

		if (patient.id) {
			const dirty = patient.dirty();

			if (dirty.birthDate) {	
				dirty.birthDate = moment(dirty.birthDate).format('YYYY-MM-DD');
			}

			try {
				res = await HttpRequestService.put(`${this.resourceRoute}/${patient.id}`, dirty);
			} catch (err) {
				throw err;
			}
		} else {
			const patientObj = patient.toObject();

			if (isDate(patientObj.birthDate))
				patientObj.birthDate = moment(patientObj.birthDate).format('YYYY-MM-DD');
			
			try {
				res = await HttpRequestService.post(this.resourceRoute, patientObj);
			} catch (err) {
				throw err;
			}
		}

		return responseToPatient(res);
	}

	public async create(attributes: NewPatientT): Promise<Patient> {
		if (isDate(attributes.birthDate))
			attributes.birthDate = moment(attributes.birthDate).format('YYYY-MM-DD');

		try {
			return responseToPatient(
				await HttpRequestService.post(this.resourceRoute, attributes),
			);
		} catch (err) {
			throw err;
		}
	}

	public async all(): Promise<Patient[]> {
		let res: any[];

		try {
			res = await HttpRequestService.get(this.resourceRoute);
		} catch (err) {
			throw err;
		}

		return res.map(e => responseToPatient(e));
	}

	public async findById(id: number): Promise<Patient> {
		try {
			const res = await HttpRequestService.get(`${this.resourceRoute}/${id}`);

			return responseToPatient(res);
		} catch (err) {
			throw err;
		}
	}

	public async getCaregivers(patientId: number): Promise<Caregiver[]> {
		try {
			const res = await HttpRequestService.get(`${this.resourceRoute}/${patientId}`);

			return res.caregivers.map((e: any) => responseToCaregiver(e));
		} catch (err) {
			throw err;
		}
	}

	public async getMeasurements(patientId: number): Promise<PatientMeasurement[]> {
		try {
			const res = await HttpRequestService.get(`/patient-measurements/${patientId}`);

			return res.map((e: any) => responseToPatientMeasurement(e));
		} catch (err) {
			throw err;
		}
	}
};

export default PatientRepository;
