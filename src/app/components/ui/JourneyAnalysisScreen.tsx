import React from "react";
import { ScreenWrapper } from "./ScreenWrapper";
import { InfoCard } from "./InfoCard";
import { PrimaryButton } from "./PrimaryButton";

import { useJourney } from "../../context/JourneyContext";

interface JourneyAnalysisScreenProps {
  onStartExpedition: () => void;
}

export function JourneyAnalysisScreen({ onStartExpedition }: JourneyAnalysisScreenProps) {
  const { journeyData } = useJourney();

  if (!journeyData) {
    return (
      <ScreenWrapper>
        <h1 className="text-3xl font-bold">Journey Analysis</h1>
        <InfoCard>
          <div className="font-semibold text-red-300">No journey data</div>
          <div className="text-sm text-gray-300 mt-2">Run an analysis from the Journey Setup to view route, fuel and weather intelligence.</div>
        </InfoCard>
      </ScreenWrapper>
    );
  }

  const {
  route,
  fuelPlan,
  fuelAdvice,
  weather,
  weatherRisk,
  weatherAdvice,
  readinessScore,
  journeyRisk,
  departureRecommendation,
  motoRecommendations,
} = journeyData;

  return (
    <ScreenWrapper>
      <h1 className="text-3xl font-bold">Journey Analysis</h1>

      <p className="mt-2 text-gray-400">Moto has analyzed your expedition route and generated insights.</p>

      <InfoCard>
        <div className="font-semibold text-lg">{route.origin} → {route.destination}</div>
        <div className="mt-2 text-sm text-gray-300">Distance: {route.distanceKm ?? '—'} km</div>
        <div className="text-sm text-gray-300">Duration: {route.durationHours ?? '—'} hrs</div>
        <div className="mt-2 text-sm text-gray-400">Start: {route.startDate} · End: {route.endDate}</div>
      </InfoCard>

      <InfoCard>
        <div className="font-semibold text-xl">Fuel Intelligence</div>
        <div className="mt-2 text-gray-300">Estimated Fuel Stops: {fuelPlan?.fuelStopsNeeded ?? '—'}</div>
        {fuelAdvice?.map((a, i) => <div key={i} className="text-orange-500 mt-2">• {a}</div>)}
      </InfoCard>

      <InfoCard>
        <div className="font-semibold text-xl">Weather Forecast</div>
        <div className="mt-2 text-gray-300">City: {weather?.city ?? '—'}</div>
        <div className="text-gray-300">Temperature: {weather?.temperature ?? '—'} °C</div>
        <div className="text-gray-300">Condition: {weather?.description ?? weather?.condition ?? '—'}</div>
        <div className="mt-2 text-yellow-400 font-medium">Risk Level: {weatherRisk ?? 'LOW'}</div>
        {weatherAdvice?.map((a, i) => <div key={i} className="text-yellow-400">• {a}</div>)}
      </InfoCard>

      <InfoCard>
  <div className="font-semibold text-xl">
    Ride Readiness
  </div>

  <div className="mt-4 text-5xl font-bold text-orange-500">
    {readinessScore ?? 0}%
  </div>

  <div className="mt-3 text-gray-300">
    Journey Risk:
    <span className="ml-2 text-orange-400">
      {journeyRisk ?? "Unknown"}
    </span>
  </div>

  <div className="mt-3 text-gray-400">
    {departureRecommendation}
  </div>
</InfoCard>

<InfoCard>
  <div className="font-semibold text-xl">
    Moto Says
  </div>

  <div className="mt-3 space-y-2">
    {motoRecommendations?.map(
      (tip, index) => (
        <div
          key={index}
          className="text-gray-300"
        >
          • {tip}
        </div>
      )
    )}
  </div>
</InfoCard>

      <PrimaryButton onClick={onStartExpedition} className="mt-6 max-w-full">Start Expedition</PrimaryButton>
    </ScreenWrapper>
  );
}