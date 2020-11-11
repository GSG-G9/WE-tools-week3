//request Xhr function - take callback - url
const requestXhr = (url, callback, errorHandle) => {
	const xhr = new XMLHttpRequest();

	xhr.onreadystatechange = () => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				callback(JSON.parse(xhr.responseText));
				return;
			}
			errorHandle(xhr.status);
			return;
		}
	};

	xhr.onerror = (error) => {
		errorHandle(error.type);
	};

	xhr.open("GET", url);
	xhr.send();
};

const errorHandle = (error) => {
	switch (error) {
		case "error":
			console.log("problem in xhr request");
			break;
		case 400:
			console.log("bad request");
			break;
		case 401:
			console.log("unauthorized");
			break;
		case 402:
			console.log("402");
			break;
		case 403:
			console.log("403");
			break;
		case 404:
			console.log("404");
			break;
		case 500:
			console.log("500");
			break;
		case 501:
			console.log("501");
			break;
		default:
			console.log("problem in  request");
			break;
	}
};

const weatherApiUrl = "http://api.weatherstack.com/current";

// localStorageModule.get("appdata").forEach((obj) => {
// 	requestXhr(
// 		`${weatherApiUrl}?access_key=${config.access_key}&query=${
// 			(obj.location[0], obj.location[0])
// 		}`,
// 		setWeatherDataToLocalStorage,
// 		errorHandle
// 	);
// });

requestXhr(
	`${weatherApiUrl}?access_key=${config.access_key}&query=${(31.5, 34.5)}`,
	console.log,
	errorHandle
);

const setWeatherDataToLocalStorage = (req) => {
	//need more work
	return req.current;
};

//Local Storage Module
const localStorageModule = (() => {
	return {
		set: () => (name, data) => localStorage.setItem(name, JSON.stringify(data)),
		get: () => (name) => JSON.parse(localStorage.getItem(name)),
	};
})();
