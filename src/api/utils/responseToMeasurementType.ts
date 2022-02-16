import MeasurementType from "api/models/MeasurementType";

export type MeasurementTypeResponse = {
	id: number,
	name: string,
};

function responseToMeasurementType(res: MeasurementTypeResponse): MeasurementType {
	return new MeasurementType({
		id: res.id,
		name: res.name,
	});
}

export default responseToMeasurementType;
