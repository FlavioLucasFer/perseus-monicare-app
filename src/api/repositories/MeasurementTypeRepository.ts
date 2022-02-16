import HttpRequestService from "api/services/HttpRequestService";
import MeasurementType from "api/models/MeasurementType";
import responseToMeasurementType from "api/utils/responseToMeasurementType";

class MeasurementTypeRepository {
	private resourceRoute = '/measurement-types';

	public async all(): Promise<MeasurementType[]> {
		let res: any[];

		try {
			res = await HttpRequestService.get(this.resourceRoute);
		} catch (err) {
			throw err;
		}

		return res.map(e => responseToMeasurementType(e));
	}

	public async findById(id: number): Promise<MeasurementType> {
		try {
			const res = await HttpRequestService.get(`${this.resourceRoute}/${id}`);

			return responseToMeasurementType(res);
		} catch (err) {
			throw err;
		}
	}
};

export default MeasurementTypeRepository;
