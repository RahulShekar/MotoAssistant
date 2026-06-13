import { Router } from "express";
import {
  getFuelStations,
  getServiceCenters,
  getEmergency,
  getWeatherRoute,
  getHazards,
  askAssistant
} from "../controllers/navigation.controller";
import { calculateRoute } from "../services/maps.service";

const router = Router();

router.get("/route", async (req, res) => {
  try {
    const { origin, destination } = req.query;
    if (!origin || !destination) {
      return res.status(400).json({ error: "Missing origin or destination" });
    }
    const routeData = await calculateRoute(origin as string, destination as string);
    res.json({ route: routeData });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch route" });
  }
});

router.get("/fuel-stations", getFuelStations);
router.get("/service-centers", getServiceCenters);
router.get("/emergency", getEmergency);
router.get("/weather", getWeatherRoute);
router.get("/hazards", getHazards);
router.post("/assistant", askAssistant);

export default router;
