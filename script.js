// import fetch from "node-fetch";

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
			if ((data.current_weather.is_day = "0")) {
				document.getElementById("today-weather").className =
					"bx bx-moon";
				weatherDesc.innerText = "Night";
			} else {
				document.getElementById("today-weather").className =
					"bx bx-sun";
				weatherDesc.innerText = "Day";
			}
			todayTemp.innerText = `${data.current_weather.temperature}${data.daily_units.temperature_2m_max}`;
			precipitation.innerText = `${data.daily.precipitation_probability_mean[0]} %`;
			rain.innerText = `${data.daily.rain_sum[0]} mm`;
			wind.innerText = `${data.current_weather.windspeed} km/h`;
			for (i = 0; i <= nextDays.length - 1; i++) {
				nextDays[i].innerText = weekDays[(dayOfWeek + i + 1) % 7].slice(0,3);
			}
			for (i = 0; i <= nextDaysTemp.length - 1; i++) {
				nextDaysTemp[i].innerText = `${
					data.daily.temperature_2m_max[i + 1]
				}${data.daily_units.temperature_2m_max}`;
			}
		})
		.catch((error) => {
			console.error(error);
		});
});
