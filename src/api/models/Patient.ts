import { isEqual, isString } from 'lodash';

import objectsDiff from 'api/utils/objectsDiff';
import strToDate from 'api/utils/strToDate';

import Caregiver from 'api/models/Caregiver';

export type PatientAttributesT = {
	id?: number,
	name?: string,
	login?: string,
	password?: string,
	email?: string | null,
	birthDate?: Date,
	cpf?: string,
	phone?: string,
};

class Patient {
	private _id?: number;
	private _name?: string;
	private _login?: string;
	private _password?: string;
	private _email?: string | null;
	private _birthDate?: Date;
	private _cpf?: string;
	private _phone?: string;
	private original: PatientAttributesT;

	public readonly caregivers: Caregiver[] = [];

	public constructor(attributes?: {
		id?: number,
		name?: string,
		login?: string,
		password?: string,
		email?: string | null,
		birthDate?: string | Date,
		cpf?: string,
		phone?: string,
		caregivers?: Caregiver[],
	}) {
		if (attributes) {
			this._id = attributes.id;
			this._name = attributes.name;
			this._login = attributes.login;
			this._password = attributes.password;
			this._email = attributes.email;
			this._birthDate = isString(attributes.birthDate) ? strToDate(attributes.birthDate, 'YYYY-MM-DD') : attributes.birthDate;
			this._cpf = attributes.cpf;
			this._phone = attributes.phone;

			if (attributes.caregivers)
				this.caregivers = attributes.caregivers;
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

	public get email(): string | null | undefined {
		return this._email;
	}

	public set email(email: string | null | undefined) {
		this._email = email;
	}

	public get birthDate(): Date | undefined {
		return this._birthDate;
	}

	public set birthDate(birthDate: Date | string | undefined) {
		this._birthDate = isString(birthDate) ? strToDate(birthDate) : birthDate;
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
			birthDate: this.birthDate,
			cpf: this.cpf,
			phone: this.phone,
		};
	}
};

export default Patient;
