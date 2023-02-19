export const getTotalItems = (data, name) => {
	let totalItems = 0;
	for (let items of data) {
		console.log(items);
		totalItems = totalItems + items[name].length;
	}
	return totalItems;
};
