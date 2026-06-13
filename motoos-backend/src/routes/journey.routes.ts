import { Router } from "express";
import { analyzeJourneyHandler }
from "../controllers/journey.controller";

const router = Router();

router.post(
  "/analyze",
  analyzeJourneyHandler
);

export default router;