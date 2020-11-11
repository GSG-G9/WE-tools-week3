const searchCity = (cityName, AppData) => {
	const regex = /[a-zA-Z]||[^0-9]/g;
	if (!regex.test(cityName) || cityName === "") {
		return "city name is invalid";
	}

	const foundData = AppData.filter(
		(obj) => obj.country === cityName.toLowerCase().trim()
	);
	if (foundData.length === 0) {
		return "city not found";
	}
	return foundData[0].country;
};

module.exports = { searchCity };
