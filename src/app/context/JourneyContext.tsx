import {
  createContext,
  useContext,
  useState,
  useEffect,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export type JourneyRoute = {
  origin: string;
  destination: string;
  distanceKm: number;
  durationHours: number;
  startDate: string;
  endDate: string;
};

export type JourneyData = {
  journeyId?: string;

  route: {
    origin: string;
    destination: string;
    distanceKm: number;
    durationHours: number;
    startDate: string;
    endDate: string;
    eta?: string;
    routeName?: string;
    polyline?: string;
  };

  fuelPlan: {
    distanceKm: number;
    maxRangeKm: number;
    fuelStopsNeeded: number;
    estimatedFuelNeeded?: number;
    reserveFuel?: number;
  };

  fuelAdvice: string[];

  weather: {
    city: string;
    temperature: number;
    feelsLike?: number;
    humidity: number;
    windSpeed: number;
    condition: string;
    description: string;
  };

  weatherRisk: string;

  weatherAdvice: string[];

  readinessScore?: number;

  journeyRisk?: string;

  departureRecommendation?: string;

  motoRecommendations?: string[];

  weatherImpact?: number;

  motoWeatherMessage?: string;

  // New fields for Expedition Logic
  dailyRideRange?: number;
  subDestinations?: { name: string; distanceKm: number }[];
  networkStatus?: "ONLINE" | "PARTIAL" | "NO_NETWORK";
  totalDistanceCovered?: number;
  totalDistanceRemaining?: number;
};

export type Rider = {
  id?: string;
  name: string;
  bike: string;
  tankCapacity: number;
  mileage: number;
  bloodGroup: string;
  experience: string;
  emergencyContact: string;
  createdAt?: string;
};

type JourneyContextValue = {
  journeyData: JourneyData | null;
  setJourneyData: Dispatch<SetStateAction<JourneyData | null>>;
  currentRider: Rider | null;
  setCurrentRider: Dispatch<SetStateAction<Rider | null>>;
};
const JourneyContext = createContext<JourneyContextValue | null>(null);

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [journeyData, setJourneyData] = useState<JourneyData | null>(null);
  const [currentRider, setCurrentRider] = useState<Rider | null>(null);

  // Load rider from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("motoos_current_rider");
      if (raw) setCurrentRider(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  // Persist rider
  useEffect(() => {
    try {
      if (currentRider) {
        localStorage.setItem("motoos_current_rider", JSON.stringify(currentRider));
      } else {
        localStorage.removeItem("motoos_current_rider");
      }
    } catch (e) {
      // ignore
    }
  }, [currentRider]);

  return (
    <JourneyContext.Provider
      value={{
        journeyData,
        setJourneyData,
        currentRider,
        setCurrentRider,
      }}
    >
      {children}
    </JourneyContext.Provider>
  );
}

export function useJourney() {
  const context = useContext(JourneyContext);
  if (!context) {
    throw new Error("useJourney must be used within JourneyProvider");
  }

  return context;
}