import { getWeather } from "./services/weather.service";

async function test() {
  const weather =
    await getWeather(
      "Manali"
    );

  console.log(weather);
}

test();