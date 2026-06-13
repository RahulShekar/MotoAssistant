import { Request, Response } from "express";
import { getNearbyPlaces } from "../services/navigation.service";
import { getWeather } from "../services/weather.service";

export async function getFuelStations(req: Request, res: Response) {
  try {
    const { lat, lng, radius } = req.query;
    if (!lat || !lng) {
      return res.status(400).json({ error: "Missing lat/lng" });
    }

    const places = await getNearbyPlaces(
      parseFloat(lat as string),
      parseFloat(lng as string),
      parseFloat((radius as string) || "5000"), // 5km default
      ["gas_station"]
    );

    res.json({ places });
  } catch (error) {
    console.error("Error in getFuelStations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getServiceCenters(req: Request, res: Response) {
  try {
    const { lat, lng, radius, brand } = req.query;
    if (!lat || !lng) {
      return res.status(400).json({ error: "Missing lat/lng" });
    }

    const places = await getNearbyPlaces(
      parseFloat(lat as string),
      parseFloat(lng as string),
      parseFloat((radius as string) || "10000"), // 10km default
      ["car_repair", "motorcycle_repair"],
      brand as string
    );

    res.json({ places });
  } catch (error) {
    console.error("Error in getServiceCenters:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getEmergency(req: Request, res: Response) {
  try {
    const { lat, lng, radius } = req.query;
    if (!lat || !lng) {
      return res.status(400).json({ error: "Missing lat/lng" });
    }

    const places = await getNearbyPlaces(
      parseFloat(lat as string),
      parseFloat(lng as string),
      parseFloat((radius as string) || "10000"), // 10km default
      ["hospital", "police", "pharmacy"]
    );

    res.json({ places });
  } catch (error) {
    console.error("Error in getEmergency:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getWeatherRoute(req: Request, res: Response) {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng) {
      return res.status(400).json({ error: "Missing lat/lng" });
    }

    const weatherData = await getWeather("Current Location");

    res.json({ weather: weatherData });
  } catch (error) {
    console.error("Error in getWeatherRoute:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getHazards(req: Request, res: Response) {
  try {
    const { lat, lng, radius } = req.query;
    if (!lat || !lng) {
      return res.status(400).json({ error: "Missing lat/lng" });
    }
    
    // Mocking hazards for the time being
    const hazards = [
      { id: "h1", type: "road_closure", title: "Road Closure", description: "Highway maintenance", lat: parseFloat(lat as string) + 0.05, lng: parseFloat(lng as string) + 0.05 },
      { id: "h2", type: "weather", title: "Heavy Rain", description: "Severe rain warning", lat: parseFloat(lat as string) - 0.03, lng: parseFloat(lng as string) - 0.02 }
    ];

    res.json({ hazards });
  } catch (error) {
    console.error("Error in getHazards:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function askAssistant(req: Request, res: Response) {
  try {
    const { query, context } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Missing query" });
    }

    // A simple mock for Moto AI Assistant response
    let reply = "I'm your Moto AI Co-Pilot. I'm currently analyzing the route.";
    
    if (query.toLowerCase().includes("weather")) {
      reply = "Expect clear skies for the next 2 hours. A slight chance of rain near your destination.";
    } else if (query.toLowerCase().includes("fuel")) {
      reply = "You have enough fuel for 120km. The next recommended stop is in 85km.";
    } else if (query.toLowerCase().includes("service") || query.toLowerCase().includes("mechanic")) {
      reply = "There's an authorized service center 45km ahead on the current route.";
    }

    res.json({ reply, source: "Moto AI Assistant" });
  } catch (error) {
    console.error("Error in askAssistant:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
