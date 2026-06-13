import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GOOGLE_MAPS_API_KEY =
  process.env.GOOGLE_MAPS_API_KEY;

export interface RouteAnalysis {
  distanceKm: number;
  durationHours: number;
  eta: string;
  routeName: string;
  primaryHighway: string;
  polyline: string;

  origin: {
    name: string;
  };

  destination: {
    name: string;
  };

  navigation: {
    routeAvailable: boolean;
  };
}

console.log(
  "GOOGLE_MAPS_API_KEY Loaded:",
  !!GOOGLE_MAPS_API_KEY
);

export async function calculateRoute(
  origin: string,
  destination: string
): Promise<RouteAnalysis> {
  if (!GOOGLE_MAPS_API_KEY) {
      return {
          distanceKm: 187,
          durationHours: 4,
          eta: new Date(Date.now() + 4 * 3600 * 1000).toISOString(),
          routeName: `${origin} → ${destination}`,
          primaryHighway: "Route intelligence coming soon",
          polyline: "qjseA~q{zL??_}@mB??_}@mB",
          origin: { name: origin },
          destination: { name: destination },
          navigation: { routeAvailable: true }
      };
  }

  try {
    const response = await axios.post(
      "https://routes.googleapis.com/directions/v2:computeRoutes",
      {
        origin: {
          address: origin,
        },

        destination: {
          address: destination,
        },

        travelMode: "DRIVE",

        routingPreference:
          "TRAFFIC_AWARE",

        polylineQuality:
          "HIGH_QUALITY",
      },
      {
        headers: {
          "Content-Type":
            "application/json",

          "X-Goog-Api-Key":
            GOOGLE_MAPS_API_KEY!,

          "X-Goog-FieldMask": [
            "routes.distanceMeters",
            "routes.duration",
            "routes.polyline.encodedPolyline",
            "routes.legs",
          ].join(","),
        },
      }
    );

    const route =
      response.data.routes?.[0];

    if (!route) {
      throw new Error(
        "No route returned from Google Maps API"
      );
    }

    const distanceKm =
      Math.round(
        route.distanceMeters / 1000
      );

    const durationHours =
      Math.max(
        1,
        Math.round(
          Number(
            route.duration.replace(
              "s",
              ""
            )
          ) / 3600
        )
      );

    const eta = new Date(
      Date.now() +
        durationHours *
          60 *
          60 *
          1000
    );

    return {
      distanceKm,

      durationHours,

      eta:
        eta.toISOString(),

      routeName:
        `${origin} → ${destination}`,

      primaryHighway:
        "Route intelligence coming soon",

      polyline:
        route.polyline
          ?.encodedPolyline || "",

      origin: {
        name: origin,
      },

      destination: {
        name: destination,
      },

      navigation: {
        routeAvailable: true,
      },
    };
  } catch (error: any) {
    console.error(
      "Google Routes API Error:",
      error.response?.data ||
        error.message
    );

    throw error;
  }
}