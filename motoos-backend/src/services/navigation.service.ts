import axios from "axios";

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export async function getNearbyPlaces(
  lat: number,
  lng: number,
  radius: number,
  includedTypes: string[],
  keyword?: string
) {
  if (!GOOGLE_MAPS_API_KEY) {
    // Return mock data
    return [
      {
        placeId: "mock1",
        name: `Mock ${keyword || includedTypes[0]} 1`,
        latitude: lat + 0.01,
        longitude: lng + 0.01,
        address: "Mock Address 1",
      },
      {
        placeId: "mock2",
        name: `Mock ${keyword || includedTypes[0]} 2`,
        latitude: lat - 0.01,
        longitude: lng - 0.01,
        address: "Mock Address 2",
      },
    ];
  }

  // NOTE: In production, text search with location bias might be better if keyword is used
  try {
    const payload: any = {
      includedTypes,
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: {
            latitude: lat,
            longitude: lng,
          },
          radius,
        },
      },
    };

    const response = await axios.post(
      "https://places.googleapis.com/v1/places:searchNearby",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
          "X-Goog-FieldMask":
            "places.id,places.displayName,places.formattedAddress,places.location,places.types",
        },
      }
    );

    const places = response.data.places || [];
    
    // Filter by keyword if provided (searchNearby doesn't support keyword directly)
    let filteredPlaces = places;
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase();
      filteredPlaces = places.filter((p: any) => 
        (p.displayName?.text || "").toLowerCase().includes(lowerKeyword)
      );
    }

    return filteredPlaces.map((place: any) => ({
      placeId: place.id,
      name: place.displayName?.text || "Unknown",
      address: place.formattedAddress || "Unknown",
      latitude: place.location?.latitude,
      longitude: place.location?.longitude,
      types: place.types || [],
    }));
  } catch (e: any) {
    console.error(
      "Maps API Nearby Search Failed",
      e.response?.data || e.message
    );
    return [];
  }
}
