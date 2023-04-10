export const getTotalItems = (data, name) => {
	let totalItems = 0;
	for (let items of data) {
		totalItems = totalItems + items[name].length;
	}
	return totalItems;
};
