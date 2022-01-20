export function numberPriceFormat(number = 0) {
	const nf = new Intl.NumberFormat();

	return nf.format(number);
}

export function calcDecreasePercentage(price = 0, oldPrice = 0) {
	return Math.ceil(-1 * (((price - oldPrice) / oldPrice) * 100));
}
