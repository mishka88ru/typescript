
namespace App {
	export interface Validateable {
		value: string | number;
		required: boolean;
		minLength?: number;
		maxLength?: number;
		minValue?: number;
		maxValue?: number;
	}

	export function validate(v: Validateable) {
		if (v.required && v.value.toString().trim().length === 0)
			return false;
		if (typeof v.value === "string") {
			if (v.minLength != null && (v.value.length < v.minLength))
				return false;
			if (v.maxLength != null && (v.value.length > v.maxLength))
				return false;
		}
		else {
			if (v.minValue != null && (v.value < v.minValue))
				return false;
			if (v.maxValue != null && (v.value > v.maxValue))
				return false;
		}

		return true;
	}
}
