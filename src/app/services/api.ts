const API_URL = "http://localhost:3001";

export type AnalyzeJourneyPayload = {
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  tankCapacity: number;
  mileage: number;
  riderId?: string;
};

export async function analyzeJourney(payload: AnalyzeJourneyPayload) {
  const response = await fetch(`${API_URL}/journey/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(
      errorBody?.error || "Unable to analyze journey"
    );
  }

  return response.json();
}

export async function searchPlaces(query: string) {
  const response = await fetch(`${API_URL}/places/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error("Failed to search places");
  return response.json();
}

export async function getPlaceDetails(placeId: string) {
  const response = await fetch(`${API_URL}/places/details/${encodeURIComponent(placeId)}`);
  if (!response.ok) throw new Error("Failed to get place details");
  return response.json();
}