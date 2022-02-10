export type HttpRequestConfigT = {
	protocol: 'http' | 'https',
	host: string,
	port: number,
	prefix: string,
};

export type RequestHeadersT = {
	[key: string]: any,
};

class HttpRequestService {
	private authenticationToken: string = '';
	private static instance: HttpRequestService;
	private static config: HttpRequestConfigT = {
		protocol: 'http',
		host: 'localhost',
		port: 8000,
		prefix: 'api',
	};
	private static route: string = `${this.config.protocol}://${this.config.host}:${this.config.port}${this.config.prefix ? `/${this.config.prefix}` : ''}`;

	private constructor() { }

	public static get authenticationToken(): string {
		return `Bearer ${this.getInstance().authenticationToken}`;
	}

	public static set authenticationToken(token: string) {
		this.getInstance().authenticationToken = token;
	};

	private static getInstance(): HttpRequestService {
		if (!this.instance)
			this.instance = new HttpRequestService();

		return this.instance;
	}

	private static async request(route: string, requestOptions: RequestInit) {
		try {
			const res = await fetch(route, requestOptions);
			const data = await res.json();

			if (!data.success)
				throw data;

			if (!data.data)
				throw data;

			return data.data;
		} catch (err) {
			throw err;
		}
	}

	public static async get(route: string, params?: Object, headers: RequestHeadersT = {}): Promise<any> {
		route = this.route + route;

		if (params)
			route += `?${this.mapObjectParamsToString(params)}`;

		if (this.authenticationToken)
			headers['Authorization'] = this.authenticationToken;

		const requestOptions = {
			method: 'GET',
			headers,
		};

		try {
			return this.request(route, requestOptions);
		} catch (err) {
			throw err;
		}
	}

	public static async post(route: string, body = {}, headers: RequestHeadersT = {}): Promise<any> {
		route = this.route + route;		

		headers['Content-Type'] = 'application/json';

		if (this.authenticationToken)
			headers['Authorization'] = this.authenticationToken;

		const requestOptions = {
			method: 'POST',
			headers,
			body: JSON.stringify(body),
		};

		try {
			return this.request(route, requestOptions);
		} catch (err) {
			throw err;
		}
	}

	public static async put(route: string, body = {}, headers: RequestHeadersT = {}): Promise<any> {
		route = this.route + route;

		headers['Content-Type'] = 'application/json';

		if (this.authenticationToken)
			headers['Authorization'] = this.authenticationToken;

		const requestOptions = {
			method: 'PUT',
			headers,
			body: JSON.stringify(body),
		};

		try {
			return this.request(route, requestOptions);
		} catch (err) {
			throw err;
		}
	}

	public static async delete(route: string, headers: RequestHeadersT = {}): Promise<any> {
		route = this.route + route;

		if (this.authenticationToken)
			headers['Authorization'] = this.authenticationToken;

		const requestOptions = {
			method: 'DELETE',
			headers,
		};

		try {
			return this.request(route, requestOptions);
		} catch (err) {
			throw err;
		}
	}

	private static mapObjectParamsToString(params: Object): string {
		let strParams: string = '';

		for (const [key, value] of Object.entries(params))
			strParams += `${key}=${Array.isArray(value) ? value.toString() : value}&`;

		return strParams;
	}
};

export default HttpRequestService;
