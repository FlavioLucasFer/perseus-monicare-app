export type MeasurementTypeAttributesT = {
	id: number,
	name: string,
};

class MeasurementType {
	public readonly id: number;
	public readonly name: string;

	public constructor(attributes: MeasurementTypeAttributesT) {
		this.id = attributes.id;
		this.name = attributes.name;
	}
};

export default MeasurementType;
