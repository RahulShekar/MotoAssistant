import { calculateRoute } from "./maps.service";

import {
  calculateFuelPlan,
  generateFuelAdvice,
} from "./fuel.service";

import {
  getWeather,
  calculateWeatherRisk,
  calculateWeatherImpact,
  generateWeatherAdvice,
  generateMotoWeatherMessage,
} from "./weather.service";

import { db } from "../config/firebase";

function calculateRideReadiness(
  fuelStopsNeeded: number,
  weatherRisk: string
) {
  let score = 100;

  if (fuelStopsNeeded > 8) score -= 15;

  if (weatherRisk === "MEDIUM") score -= 10;

  if (weatherRisk === "HIGH") score -= 25;

  return Math.max(score, 0);
}

function generateDepartureRecommendation(
  weatherRisk: string
) {
  if (weatherRisk === "HIGH") {
    return "Start before 6:00 AM to avoid adverse weather.";
  }

  return "Recommended departure between 5:30 AM and 7:00 AM.";
}

function calculateJourneyRisk(
  fuelStopsNeeded: number,
  weatherRisk: string
) {
  let risk = 0;

  risk += fuelStopsNeeded * 2;

  if (weatherRisk === "MEDIUM") {
    risk += 20;
  }

  if (weatherRisk === "HIGH") {
    risk += 40;
  }

  if (risk >= 60) return "HIGH";

  if (risk >= 30) return "MODERATE";

  return "LOW";
}

function generateMotoRecommendations(
  fuelStopsNeeded: number,
  weatherRisk: string
) {
  const recommendations: string[] = [];

  recommendations.push(
    "Download offline maps before departure."
  );

  recommendations.push(
    "Carry hydration supplies and basic tools."
  );

  if (fuelStopsNeeded >= 5) {
    recommendations.push(
      "Carry reserve fuel for remote sections."
    );
  }

  if (weatherRisk === "MEDIUM") {
    recommendations.push(
      "Carry rain gear and waterproof luggage covers."
    );
  }

  if (weatherRisk === "HIGH") {
    recommendations.push(
      "Expect weather disruptions. Monitor forecasts frequently."
    );
  }

  return recommendations;
}

export async function analyzeJourney(
  origin: string,
  destination: string,
  startDate: string,
  endDate: string,
  tankCapacity: number,
  mileage: number
) {
  // Route Intelligence
  const route = await calculateRoute(
    origin,
    destination
  );

  // Fuel Intelligence
  const fuelPlan = calculateFuelPlan(
    route.distanceKm,
    tankCapacity,
    mileage
  );

  const fuelAdvice = generateFuelAdvice(
  fuelPlan.fuelStopsNeeded,
  route.distanceKm
);

  // Weather Intelligence
  const weather = await getWeather(
    destination
  );

  const weatherRisk =
    calculateWeatherRisk(
      weather.condition
    );

  const weatherAdvice =
    generateWeatherAdvice(
      weather.condition
    );

  const weatherImpact =
    calculateWeatherImpact(
      weather.condition
    );

  const motoWeatherMessage =
    generateMotoWeatherMessage(
      weatherRisk,
      weather.temperature
    );

  // Journey Brain
  const readinessScore =
    calculateRideReadiness(
      fuelPlan.fuelStopsNeeded,
      weatherRisk
    );

  const departureRecommendation =
    generateDepartureRecommendation(
      weatherRisk
    );

  const journeyRisk =
    calculateJourneyRisk(
      fuelPlan.fuelStopsNeeded,
      weatherRisk
    );

  const motoRecommendations =
    generateMotoRecommendations(
      fuelPlan.fuelStopsNeeded,
      weatherRisk
    );

  // Firestore Persistence
  const journeyData = {
    origin,
    destination,
    startDate,
    endDate,

    distanceKm: route.distanceKm,
    durationHours: route.durationHours,

    fuelStopsNeeded:
      fuelPlan.fuelStopsNeeded,

    maxRangeKm:
      fuelPlan.maxRangeKm,

    weatherCondition:
      weather.condition,

    weatherImpact,

    motoWeatherMessage,

    temperature:
      weather.temperature,

    weatherRisk,

    readinessScore,

    journeyRisk,

    departureRecommendation,

    motoRecommendations,

    createdAt: new Date(),
  };

  const docRef = await db
    .collection("journeys")
    .add(journeyData);

  return {
    journeyId: docRef.id,

    route: {
      origin,
      destination,
      distanceKm:
        route.distanceKm,

      durationHours:
        route.durationHours,
        
      polyline:
        route.polyline,

      startDate,
      endDate,
    },

    fuelPlan,
    fuelAdvice,

    weather,
    weatherRisk,
    weatherAdvice,

    weatherImpact,
    motoWeatherMessage,

    readinessScore,

    journeyRisk,

    departureRecommendation,

    motoRecommendations,
  };
}