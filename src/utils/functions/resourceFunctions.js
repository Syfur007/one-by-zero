export const getTotalItems = (data, name) => {
	const items = data?.reduce((acc, item) => acc + item[name], 0);
	return items;
};
