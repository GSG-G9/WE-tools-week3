//
const searchCity = (cityName, AppData) => {
  if (cityName === "") {
    return "city name is invalid";
  }
  const foundData = AppData.filter((obj) =>
    obj.country.toLowerCase().includes(cityName.toLowerCase().trim())
  );
  if (foundData.length === 0) {
    return "city not found";
  }
  return foundData;
};

module.exports = { searchCity };
