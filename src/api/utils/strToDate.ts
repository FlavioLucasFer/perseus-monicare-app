export type StrDateT = 'DD/MM/YYYY' | 'YYYY-MM-DD' | 'DD/MM/YYYY HH:mm:ss' | 'YYYY-MM-DD HH:mm:ss';

function strToDate(str: string, format: StrDateT = 'DD/MM/YYYY HH:mm:ss'): Date {
	if (format === 'DD/MM/YYYY HH:mm:ss') {
		const [date, hours] = str.split(' ');

		const [day, mouth, year] = date.split('/');

		return new Date(`${year}-${mouth}-${day}T${hours}`);
	}

	if (format === 'YYYY-MM-DD HH:mm:ss') {
		const [date, hours] = str.split(' ');
		
		return new Date(`${date}T${hours}`);
	} 

	return new Date(`${str}T00:00:00`);
}

export default strToDate;
