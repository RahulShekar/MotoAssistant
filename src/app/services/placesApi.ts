const API_URL = "http://localhost:3001";

export interface PlaceSuggestion {
  description: string;
  placeId: string;
}

export interface PlaceDetails {
  name: string;
  placeId: string;
  latitude: number;
  longitude: number;
  address: string;
}

export async function searchPlaces(
  query: string
): Promise<PlaceSuggestion[]> {
  if (query.trim().length < 3) {
    return [];
  }

  const response = await fetch(
    `${API_URL}/places/autocomplete?q=${encodeURIComponent(
      query
    )}`
  );

  if (!response.ok) {
    throw new Error(
      "Unable to fetch place suggestions"
    );
  }

  return response.json();
}

export async function getPlaceDetails(
  placeId: string
): Promise<PlaceDetails> {
  const response = await fetch(
    `${API_URL}/places/details/${placeId}`
  );

  if (!response.ok) {
    throw new Error(
      "Unable to fetch place details"
    );
  }

  return response.json();
}