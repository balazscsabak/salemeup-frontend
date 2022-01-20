export function truncateTo40(str = '') {
	return str.length > 39 ? str.substring(0, 39) + '...' : str;
}

export function truncateTo60(str = '') {
	return str.length > 59 ? str.substring(0, 59) + '...' : str;
}
