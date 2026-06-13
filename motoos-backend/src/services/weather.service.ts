import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export async function getWeather(
  city: string
) {
  const apiKey =
    process.env.OPENWEATHER_API_KEY;

  try {
    const response =
      await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: city,
            appid: apiKey,
            units: "metric",
          },
        }
      );

    const weather =
      response.data;

    return {
      city,

      temperature:
        weather.main.temp,

      feelsLike:
        weather.main.feels_like,

      humidity:
        weather.main.humidity,

      pressure:
        weather.main.pressure,

      visibility:
        weather.visibility,

      windSpeed:
        weather.wind.speed,

      condition:
        weather.weather[0].main,

      description:
        weather.weather[0].description,
    };
  } catch (error) {
    console.error(
      "Weather lookup failed:",
      city
    );

    return {
      city,

      temperature: 20,
      feelsLike: 20,
      humidity: 50,
      pressure: 1000,
      visibility: 10000,
      windSpeed: 0,

      condition: "Clear",

      description:
        "Weather unavailable",
    };
  }
}

export function calculateWeatherRisk(
  condition: string
) {
  switch (
  condition.toLowerCase()
  ) {
    case "thunderstorm":
      return "HIGH";

    case "snow":
      return "HIGH";

    case "rain":
      return "MEDIUM";

    case "fog":
    case "mist":
      return "MEDIUM";

    default:
      return "LOW";
  }
}

export function calculateWeatherImpact(
  condition: string
) {
  switch (
  condition.toLowerCase()
  ) {
    case "thunderstorm":
      return 90;

    case "snow":
      return 80;

    case "rain":
      return 60;

    case "fog":
      return 50;

    default:
      return 10;
  }
}

export function generateWeatherAdvice(
  condition: string
) {
  const advice: string[] = [];

  switch (
  condition.toLowerCase()
  ) {
    case "rain":
      advice.push(
        "Carry waterproof riding gear."
      );
      advice.push(
        "Reduce speed on wet roads."
      );
      break;

    case "snow":
      advice.push(
        "Carry thermal riding gear."
      );
      advice.push(
        "Monitor road closures."
      );
      break;

    case "thunderstorm":
      advice.push(
        "Avoid exposed mountain roads."
      );
      advice.push(
        "Delay travel if possible."
      );
      break;

    case "fog":
      advice.push(
        "Use auxiliary lights."
      );
      advice.push(
        "Maintain safe distance."
      );
      break;

    default:
      advice.push(
        "Weather conditions are favorable for riding."
      );
  }

  return advice;
}

export function generateMotoWeatherMessage(
  weatherRisk: string,
  temperature: number
) {
  if (
    weatherRisk === "HIGH"
  ) {
    return "Moto Alert: Severe weather expected.";
  }

  if (
    temperature < 5
  ) {
    return "Moto Alert: Carry thermal gear.";
  }

  if (
    temperature > 35
  ) {
    return "Moto Alert: Stay hydrated.";
  }

  return "Moto Alert: Conditions look good for riding.";
}