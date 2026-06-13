import { Request, Response } from "express";

import {
    searchPlacesService,
    getPlaceDetailsService,
} from "../services/places.service";

export async function searchPlaces(
    req: Request,
    res: Response
) {
    try {
        const query =
            String(req.query.q || "");

        if (!query) {
            return res.status(400).json({
                error:
                    "Query parameter q is required",
            });
        }

        const results =
            await searchPlacesService(
                query
            );

        return res.json(results);
    } catch (error: any) {
        console.error(
            "Places Search Error:",
            error.message
        );

        return res.status(500).json({
            error:
                "Failed to search places",
        });
    }
}

export async function getPlaceDetails(
    req: Request,
    res: Response
) {
    try {
        const placeId = req.params.placeId as string;

        const details =
            await getPlaceDetailsService(
                placeId
            );

        return res.json(details);
    } catch (error: any) {
        console.error(
            "Place Details Error:",
            error.message
        );

        return res.status(500).json({
            error:
                "Failed to fetch place details",
        });
    }
}