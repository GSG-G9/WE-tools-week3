let searchCity = (cityName, AppData) => {
	if (cityName === "") {
		return "city name is invalid";
	}
	const foundData = AppData.filter((obj) =>
		obj.cityName.toLowerCase().includes(cityName.toLowerCase().trim())
	);
	if (foundData.length === 0) {
		return "city not found";
	}
	return foundData;
};

function editObject(newObj, objectArrays) {
	const originalObject = objectArrays.filter((obj) => obj.id === newObj.id)[0];
	Object.keys(newObj).forEach((key) => (originalObject[key] = newObj[key]));
	return [
		originalObject,
		...objectArrays.filter((obj) => obj.id !== newObj.id),
	];
}

//module.exports = { searchCity, editObject };
