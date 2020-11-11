const { searchCity } = require("./logic");

describe("Test Search City Function", () => {
	test("Should return city if it existed", () => {
		const cityName = "LonDon";
		const appData = [
			{ country: "gaza" },
			{ country: "london" },
			{ country: "new york" },
		];
		const acutal = searchCity(cityName, appData);
		const expected = "london";
		expect(acutal).toBe(expected);
	});
	test("Should trim spaces from word start and last", () => {
		const cityName = " L o n D o n    ";
		const appData = [
			{ country: "gaza" },
			{ country: "london" },
			{ country: "new york" },
		];
		const acutal = searchCity(cityName, appData);
		const expected = "city not found";
		expect(acutal).toBe(expected);
	});
	test("Should return invalid when name is empty", () => {
		const cityName = "";
		const appData = [
			{ country: "gaza" },
			{ country: "london" },
			{ country: "new york" },
		];
		const acutal = searchCity(cityName, appData);
		const expected = "city name is invalid";
		expect(acutal).toBe(expected);
	});
	test("Should return invalid when name is invalid", () => {
		const cityName = "new york 25";
		const appData = [
			{ country: "gaza" },
			{ country: "london" },
			{ country: "new york" },
		];
		const acutal = searchCity(cityName, appData);
		const expected = "city name is invalid";
		expect(acutal).toBe(expected);
	});
});
