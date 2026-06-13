import { Request, Response } from "express";
import { analyzeJourney } from "../services/journey.service";

export async function analyzeJourneyHandler(
  req: Request,
  res: Response
) {
  try {
    const {
      origin,
      destination,
      startDate,
      endDate,
      tankCapacity,
      mileage,
    } = req.body;

    if (!origin || !destination) {
      return res.status(400).json({
        error:
          "Origin and destination are required",
      });
    }

    const result =
      await analyzeJourney(
        origin,
        destination,
        startDate,
        endDate,
        Number(tankCapacity),
        Number(mileage)
      );

    return res.status(200).json(
      result
    );
  } catch (error: any) {
    console.error(
      "Journey Analysis Error:",
      error
    );

    return res.status(500).json({
      error:
        "Journey analysis failed",
      message:
        error.message ||
        "Unknown error",
    });
  }
}