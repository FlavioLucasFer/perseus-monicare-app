import { isEqual } from "lodash";

function objectsDiff(obj: Object, base: Object) {
	const OBJ = obj as { [key: string]: any };
	const BASE = base as { [key: string]: any };

	for (const [key] of Object.entries(OBJ))
		if (isEqual(OBJ[key], BASE[key]))
			delete OBJ[key];

	return OBJ;
}

export default objectsDiff;
