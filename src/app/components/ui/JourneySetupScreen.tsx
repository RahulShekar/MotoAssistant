import React, { useState } from "react";
import { ScreenWrapper } from "./ScreenWrapper";
import type { AnalyzeJourneyPayload } from "../../services/api";
import { FormInput } from "./FormInput";
import { InfoCard } from "./InfoCard";
import { PrimaryButton } from "./PrimaryButton";
import { PlaceAutocomplete } from "./PlaceAutocomplete";
import { useJourney } from "../../context/JourneyContext";

interface JourneySetupScreenProps {
  onAnalyze: (payload: AnalyzeJourneyPayload) => void;
  isAnalyzing: boolean;
  error?: string;
}

export function JourneySetupScreen({
  onAnalyze,
  isAnalyzing,
  error,
}: JourneySetupScreenProps) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tankCapacity, setTankCapacity] = useState("");
  const [mileage, setMileage] = useState("");

  const { currentRider } = useJourney();

  const canAnalyze =
    origin.trim().length > 0 &&
    destination.trim().length > 0 &&
    startDate !== "" &&
    endDate !== "" &&
    Number(tankCapacity) > 0 &&
    Number(mileage) > 0;

  return (
    <ScreenWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Setup Your Journey</h1>
          <p className="mt-2 text-gray-400">
            Tell Moto where you're riding so we can analyze the route,
            weather, fuel stops and risks.
          </p>
        </div>

          <div className="space-y-6">
            <div className="z-[60] relative">
              <PlaceAutocomplete label="From Location" placeholder="e.g. Bangalore" value={origin} onSelect={(val) => setOrigin(val)} />
            </div>

            <div className="z-[50] relative">
              <PlaceAutocomplete label="Destination" placeholder="e.g. Leh" value={destination} onSelect={(val) => setDestination(val)} />
            </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <FormInput label="Journey Start Date" type="date" value={startDate} onChange={(e) => setStartDate((e.target as HTMLInputElement).value)} />
            </div>
            <div>
              <FormInput label="Journey End Date" type="date" value={endDate} onChange={(e) => setEndDate((e.target as HTMLInputElement).value)} />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <FormInput label="Tank Capacity (L)" type="number" min={1} value={tankCapacity} onChange={(e) => setTankCapacity((e.target as HTMLInputElement).value)} placeholder="10" />
            </div>
            <div>
              <FormInput label="Mileage (km/L)" type="number" min={1} value={mileage} onChange={(e) => setMileage((e.target as HTMLInputElement).value)} placeholder="35" />
            </div>
          </div>

          <div>
            {currentRider ? (
              <InfoCard>
                <div className="font-semibold">Rider</div>
                <div className="text-sm text-gray-300 mt-1">{currentRider.name} · {currentRider.bike}</div>
              </InfoCard>
            ) : (
              <InfoCard>
                <div className="font-semibold text-yellow-300">No rider profile</div>
                <div className="text-sm text-gray-300 mt-1">Create a rider profile first to associate journeys.</div>
              </InfoCard>
            )}
          </div>

          {error ? (
            <div className="rounded-xl border border-red-600 bg-red-950/20 p-4 text-sm text-red-300">
              {error}
            </div>
          ) : null}

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <h3 className="font-semibold text-lg">Moto Will Analyze</h3>
            <ul className="mt-3 space-y-2 text-gray-300">
              <li>• Distance & Route Intelligence</li>
              <li>• Fuel Stop Planning</li>
              <li>• Weather Forecast</li>
              <li>• Network Coverage Risks</li>
              <li>• High Altitude Warnings</li>
              <li>• Safety Recommendations</li>
            </ul>
          </div>

          <PrimaryButton
            onClick={() =>
              onAnalyze({
                origin,
                destination,
                startDate,
                endDate,
                tankCapacity: Number(tankCapacity),
                mileage: Number(mileage),
              })
            }
            disabled={!canAnalyze || isAnalyzing}
            className={!canAnalyze ? "bg-zinc-900 text-gray-500 cursor-not-allowed max-w-full" : "max-w-full"}
          >
            {isAnalyzing ? "Analyzing journey…" : "Analyze Journey"}
          </PrimaryButton>
        </div>
      </div>
    </ScreenWrapper>
  );
}
