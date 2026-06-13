import { Router } from "express";
import { searchPlaces, getPlaceDetails } from "../controllers/places.controller";

const router = Router();

/**
 * GET /places/search?q=mys
 */
router.get("/search", searchPlaces);

/**
 * GET /places/details/:placeId
 */
router.get("/details/:placeId", getPlaceDetails);

export default router;