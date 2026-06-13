import axios from "axios";

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export async function searchPlacesService(query: string) {
    if (!GOOGLE_MAPS_API_KEY) {
        const mocks = ["Bangalore", "Gokarna", "Manali", "Leh", "Spiti", "Goa", "Pune", "Mumbai", "Delhi"];
        const matches = mocks.filter(m => m.toLowerCase().includes(query.toLowerCase()));
        return matches.map(m => ({
            placeId: m,
            text: m,
            structuredFormat: { mainText: { text: m } }
        }));
    }

    try {
        const response = await axios.post(
            "https://places.googleapis.com/v1/places:autocomplete",
            {
                input: query,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
                },
            }
        );

        const suggestions = response.data.suggestions || [];
        return suggestions.map((item: any) => ({
            placeId: item.placePrediction?.placeId,
            text: item.placePrediction?.text?.text,
            structuredFormat: item.placePrediction?.structuredFormat,
        }));
    } catch (e) {
        console.error("Maps API Autocomplete Failed");
        return [];
    }
}

export async function getPlaceDetailsService(placeId: string) {
    if (!GOOGLE_MAPS_API_KEY) {
        return {
            placeId,
            name: placeId,
            address: `${placeId}, India`,
            latitude: 15.3,
            longitude: 74.3,
        };
    }

    try {
        const response = await axios.get(
            `https://places.googleapis.com/v1/places/${placeId}`,
            {
                headers: {
                    "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
                    "X-Goog-FieldMask": [
                        "id",
                        "displayName",
                        "formattedAddress",
                        "location",
                    ].join(","),
                },
            }
        );

        const place = response.data;
        return {
            placeId: place.id,
            name: place.displayName?.text,
            address: place.formattedAddress,
            latitude: place.location?.latitude,
            longitude: place.location?.longitude,
        };
    } catch (e) {
        console.error("Maps API Details Failed");
        return { placeId, name: placeId, address: "Unknown", latitude: 0, longitude: 0 };
    }
}
