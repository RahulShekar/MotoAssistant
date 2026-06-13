import { useJourney } from "../context/JourneyContext";
import { useState } from "react";
import {
  MapPin,
  Fuel,
  CloudRain,
  Clock,
  ChevronRight,
} from "lucide-react";

interface NavigateScreenProps {
  onStartRide: () => void;
}

type RouteDetailProps = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

function RouteDetail({
  label,
  value,
  icon,
}: RouteDetailProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 0",
        borderBottom:
          "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div>{icon}</div>

      <div
        style={{
          flex: 1,
          color: "#888",
        }}
      >
        {label}
      </div>

      <div
        style={{
          color: "#FFF",
          fontWeight: 600,
        }}
      >
        {value}
      </div>
    </div>
  );
}

export function NavigateScreen({
  onStartRide,
}: NavigateScreenProps) {
  const { journeyData } =
    useJourney();

  const [planGenerated, setPlanGenerated] =
    useState(false);

  if (!journeyData) {
    return (
      <div
        style={{
          padding: 24,
          color: "white",
        }}
      >
        No Journey Data Found.
        Analyze a journey first.
      </div>
    );
  }

  const {
    route,
    fuelPlan,
    weather,
    readinessScore,
    motoRecommendations,
    departureRecommendation,
    journeyRisk,
  } = journeyData;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0B0B0B",
        color: "#FFF",
        overflowY: "auto",
        padding: 20,
      }}
    >
      {/* Header */}

      <h1
        style={{
          fontSize: 28,
          fontWeight: 700,
          marginBottom: 8,
        }}
      >
        ACTIVE EXPEDITION
      </h1>

      <p
        style={{
          color: "#888",
          marginBottom: 20,
        }}
      >
        Moto is tracking your ride.
      </p>

      {/* Route Card */}

      <div
        style={{
          background: "#151515",
          borderRadius: 16,
          padding: 18,
          marginBottom: 20,
        }}
      >
        <h2
          style={{
            marginBottom: 10,
          }}
        >
          {route.origin} → {route.destination}
        </h2>

        <RouteDetail
          label="Distance"
          value={`${route.distanceKm} km`}
          icon={<MapPin size={16} />}
        />

        <RouteDetail
          label="Duration"
          value={`${route.durationHours} hrs`}
          icon={<Clock size={16} />}
        />

        <RouteDetail
          label="Fuel Stops"
          value={`${fuelPlan.fuelStopsNeeded}`}
          icon={<Fuel size={16} />}
        />

        <RouteDetail
          label="Weather"
          value={weather.description}
          icon={<CloudRain size={16} />}
        />

        <RouteDetail
          label="Departure"
          value={
            departureRecommendation ||
            "Not Available"
          }
          icon={<Clock size={16} />}
        />

        <RouteDetail
          label="Journey Risk"
          value={journeyRisk || "LOW"}
          icon={<CloudRain size={16} />}
        />
      </div>

      {/* Ride Readiness */}

      <div
        style={{
          background: "#151515",
          borderRadius: 16,
          padding: 18,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            color: "#888",
            marginBottom: 8,
          }}
        >
          Expedition Readiness
        </div>

        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: "#00C853",
          }}
        >
          {readinessScore ?? 0}%
        </div>
      </div>

      {/* Moto Recommendations */}

      <div
        style={{
          background:
            "rgba(255,107,0,0.08)",
          border:
            "1px solid rgba(255,107,0,0.3)",
          borderRadius: 16,
          padding: 18,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            color: "#FF6B00",
            marginBottom: 12,
            fontWeight: 700,
          }}
        >
          MOTO RECOMMENDATIONS
        </div>

        {motoRecommendations?.map(
          (tip, index) => (
            <div
              key={index}
              style={{
                marginBottom: 8,
              }}
            >
              • {tip}
            </div>
          )
        )}
      </div>

      {/* Generate Plan */}

      {!planGenerated && (
        <button
          onClick={() =>
            setPlanGenerated(true)
          }
          style={{
            width: "100%",
            background: "#FF6B00",
            border: "none",
            borderRadius: 14,
            padding: 16,
            color: "#FFF",
            fontWeight: 700,
            cursor: "pointer",
            marginBottom: 12,
          }}
        >
          GENERATE RIDE PLAN
        </button>
      )}

      {/* Start Ride */}

      {planGenerated && (
        <button
          onClick={onStartRide}
          style={{
            width: "100%",
            background: "#FF6B00",
            border: "none",
            borderRadius: 14,
            padding: 16,
            color: "#FFF",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
          }}
        >
          START NAVIGATION
          <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
}