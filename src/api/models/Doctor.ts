import { isEqual } from 'lodash';

import objectsDiff from 'api/utils/objectsDiff';

export type DoctorAttributesT = {
	id?: number,
	name?: string,
	login?: string,
	password?: string,
	email?: string,
	cpf?: string,
	phone?: string,
	crm?: string,
	specialty?: string,
};

class Doctor {
	private _id?: number;
	private _name?: string;
	private _login?: string;
	private _password?: string;
	private _email?: string;
	private _cpf?: string;
	private _phone?: string;
	private _crm?: string;
	private _specialty?: string;
	private original: DoctorAttributesT;

	public constructor(attributes?: DoctorAttributesT) {
		if (attributes) {
			this._id = attributes.id;
			this._name = attributes.name;
			this._login = attributes.login;
			this._password = attributes.password;
			this._email = attributes.email;
			this._cpf = attributes.cpf;
			this._phone = attributes.phone;
			this._crm = attributes.crm;
			this._specialty = attributes.specialty;
		}

		this.original = this.toObject();
	}

	public get id(): number | undefined {
		return this._id;
	}

	public get name(): string | undefined {
		return this._name;
	}

	public set name(name: string | undefined) {
		this._name = name;
	}

	public get login(): string | undefined {
		return this._login;
	}

	public set login(login: string | undefined) {
		this._login = login;
	}

	public get password(): string | undefined {
		return this._password;
	}

	public set password(password: string | undefined) {
		this._password = password;
	}

	public get email(): string | undefined {
		return this._email;
	}

	public set email(email: string | undefined) {
		this._email = email;
	}

	public get cpf(): string | undefined {
		return this._cpf;
	}

	public set cpf(cpf: string | undefined) {
		this._cpf = cpf;
	}

	public get phone(): string | undefined {
		return this._phone;
	}

	public set phone(phone: string | undefined) {
		this._phone = phone;
	}

	public get crm(): string | undefined {
		return this._crm;
	}

	public set crm(crm: string | undefined) {
		this._crm = crm;
	}

	public get specialty(): string | undefined {
		return this._specialty;
	}

	public set specialty(specialty: string | undefined) {
		this._specialty = specialty;
	}

	public get isDirty(): boolean {
		return !isEqual(this.toObject(), this.original);
	}

	public dirty(): { [key: string]: any } {
		if (this.isDirty)
			return objectsDiff(this.toObject(), this.original);

		return {};
	}

	public toObject(): { [key: string]: any } {
		return {
			id: this.id,
			name: this.name,
			login: this.login,
			password: this.password,
			email: this.email,
			cpf: this.cpf,
			phone: this.phone,
			crm: this.crm,
			specialty: this.specialty,		
		};
	}
};

export default Doctor;
