const localSearch = term => course => {
	return (
		course?.title?.toLowerCase().includes(term) ||
		course?.description?.toLowerCase().includes(term) ||
		course?.teacher?.email?.toLowerCase().includes(term) ||
		course?.teacher?.phoneNumber?.includes(term)
	);
};

export default localSearch;
