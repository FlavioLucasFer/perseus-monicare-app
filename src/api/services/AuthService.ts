import HttpRequestService from "api/services/HttpRequestService";

import responseToCaregiver from "api/utils/responseToCaregiver";
import responseToPatient from "api/utils/responseToPatient";
import responseToDoctor from "api/utils/responseToDoctor";

import Caregiver from "api/models/Caregiver";
import Patient from "api/models/Patient";
import Doctor from "api/models/Doctor";


export type AuthResponseT = {
	accessToken: string,
	tokenType: 'bearer',
	expiresIn: number,
};

class AuthService {
	public static async login(login: string, password: string): Promise<AuthResponseT> {
		let res: AuthResponseT;
		const body = {
			login,
			password,
		};

		try {
			res = await HttpRequestService.post('/auth/login', body) as AuthResponseT;
		} catch (err) {
			throw err;
		}

		HttpRequestService.authenticationToken = res.accessToken;

		return res;
	}

	public static async logout(): Promise<void> {
		try {
			await HttpRequestService.post('/auth/logout');
		} catch (err) {
			throw err;
		}

		HttpRequestService.authenticationToken = '';
	}

	public static async me(): Promise<Doctor | Patient | Caregiver> {
		let res: any;

		try {
			res = await HttpRequestService.post('/auth/me');
		} catch (err) {
			throw err;
		}

		switch (res.user.type) {
			case 'DC':
				return responseToDoctor(res);

			case 'CG':
				return responseToCaregiver(res);

			default:
				return responseToPatient(res);
		}
	}

	public static async refreshToken(): Promise<AuthResponseT> {
		let res: AuthResponseT;

		try {
			res = await HttpRequestService.post('/auth/refresh') as AuthResponseT;
		} catch (err) {
			throw err;
		}

		HttpRequestService.authenticationToken = res.accessToken;

		return res;
	}
};

export default AuthService;
