function handleWeatherCode(code) {
	const weatherData = {
		0: {
			className: "fa-solid fa-sun",
			desc: "Clear sky",
			background: "url(sunny.jpg)",
		},
		1: {
			className: "fa-solid fa-sun",
			desc: "Clear sky",
			background: "url(sunny.jpg)",
		},
		2: {
			className: "fa-solid fa-cloud",
			desc: "Cloudy",
			background: "url(cloudy.jpg)",
		},
		3: {
			className: "fa-solid fa-cloud",
			desc: "Cloudy",
			background: "url(cloudy.jpg)",
		},
		51: { className: "fa-solid fa-cloud-rain", desc: "Drizzle" },
		53: { className: "fa-solid fa-cloud-rain", desc: "Drizzle" },
		55: { className: "fa-solid fa-cloud-rain", desc: "Drizzle" },
		61: { className: "fa-solid fa-cloud-rain", desc: "Rain" },
		63: { className: "fa-solid fa-cloud-rain", desc: "Rain" },
		65: { className: "fa-solid fa-cloud-rain", desc: "Rain" },
		95: { className: "fa-solid fa-cloud-bolt", desc: "Thunderstorm" },
	};

	return (
		weatherData[code] || {
			className: "bx bx-question-mark",
			desc: "Unknown",
		}
	);
}
const date = new Date();
const btn = document.querySelector(".loc-button");
const weekDay = document.querySelector(".week-day");
const today = document.querySelector(".today-weather");
const todayDate = document.querySelector(".today-date");
const todayTemp = document.querySelector(".weather-temp");
const precipitation = document.querySelector("#precipitation");
const rain = document.querySelector("#rain");
const wind = document.querySelector("#wind");
const nextDays = document.querySelectorAll(".day-name");
const nextDaysTemp = document.querySelectorAll(".day-temp");
const weatherDesc = document.querySelector(".weather-desc");
const leftInfo = document.querySelector(".left-info");

const weekDays = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
const dayOfWeek = date.getDay();
const monthIndex = date.getMonth();
weekDay.innerText = weekDays[dayOfWeek];
todayDate.innerText = `${date.getDate()} ${
	months[monthIndex]
} ${date.getFullYear()}`;

const apiUrl =
	"https://api.open-meteo.com/v1/forecast?latitude=50.0413&longitude=21.999&daily=weathercode,temperature_2m_max,rain_sum,precipitation_probability_mean,windspeed_10m_max&current_weather=true&timezone=auto";

btn.addEventListener("click", () => {
	fetch(apiUrl)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data) => {
			console.log(data);
			if (data.current_weather.is_day === "0") {
				document.getElementById("today-weather").className =
					"bx bx-moon";
				leftInfo.style.background = "url(night.jpg)";
				leftInfo.style.backgroundPosition = "center";
				leftInfo.style.backgroundSize = "cover";

				weatherDesc.innerText = "Night";
			} else {
				localData = handleWeatherCode(data.current_weather.weathercode);
				document.getElementById("today-weather").className =
					localData.className;
				weatherDesc.innerText = localData.desc;
				leftInfo.style.background = localData.background;
				leftInfo.style.backgroundPosition = "center";
				leftInfo.style.backgroundSize = "cover";
			}
			todayTemp.innerText = `${data.current_weather.temperature}${data.daily_units.temperature_2m_max}`;
			precipitation.innerText = `${data.daily.precipitation_probability_mean[0]} %`;
			rain.innerText = `${data.daily.rain_sum[0]} mm`;
			wind.innerText = `${data.current_weather.windspeed} km/h`;
			for (i = 0; i <= 3; i++) {
				nextDays[i].innerText = weekDays[(dayOfWeek + i + 1) % 7].slice(
					0,
					3
				);
				nextDaysTemp[i].innerText = `${
					data.daily.temperature_2m_max[i + 1]
				}${data.daily_units.temperature_2m_max}`;
				localData = handleWeatherCode(data.daily.weathercode[i + 1]);
				document.getElementById(`forecast-${i + 1}`).className =
					localData.className;
			}
		})
		.catch((error) => {
			console.error(error);
		});
});
