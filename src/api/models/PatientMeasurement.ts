import { isString } from 'lodash';

import strToDate from 'api/utils/strToDate';

import MeasurementType from 'api/models/MeasurementType';

export type PatientMeasurementStatusT = 'bad' | 'caution' | 'good';

export type PatientMeasurementAttributesT = {
	id: number,
	value: number,
	measuredAt: Date,
	status: PatientMeasurementStatusT,
	patientId: number,
};

class PatientMeasurement {
	public readonly id: number;
	public readonly value: number;
	public readonly measuredAt: Date;
	public readonly status: PatientMeasurementStatusT;
	public readonly patientId: number;
	public readonly measurementType: MeasurementType;

	public constructor(attributes: {
		id: number,
		value: number,
		measuredAt: string | Date,
		status: PatientMeasurementStatusT,
		patientId: number,
		measurementType: MeasurementType,
	}) {
		this.id = attributes.id;
		this.value = attributes.value;
		this.measuredAt = isString(attributes.measuredAt) ? strToDate(attributes.measuredAt) : attributes.measuredAt;
		this.status = attributes.status;
		this.patientId = attributes.patientId;
		this.measurementType = attributes.measurementType;
	}
};

export default PatientMeasurement;
