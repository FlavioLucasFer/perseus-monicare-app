import MeasurementType from "api/models/MeasurementType";
import PatientMeasurement, { PatientMeasurementStatusT } from "api/models/PatientMeasurement";

export type PatientMeasurementResponse = {
	id: number,
	value: number,
	measuredAt: string | Date,
	status: PatientMeasurementStatusT,
	measurement: {
		id: number,
		name: string,
	},
	patient: {
		id: number,
	},
};

function responseToPatientMeasurement(res: PatientMeasurementResponse): PatientMeasurement {
	const measurementType = new MeasurementType({
		id: res.measurement.id,
		name: res.measurement.name,
	});
	
	return new PatientMeasurement({
		id: res.id,
		value: res.value,
		measuredAt: res.measuredAt,
		status: res.status,
		patientId: res.patient.id,
		measurementType,
	});
}

export default responseToPatientMeasurement;
