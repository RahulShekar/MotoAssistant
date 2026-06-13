import { Request, Response } from "express";
import {
  createRider,
  getRiders,
} from "../services/rider.service";

export async function createRiderHandler(
  req: Request,
  res: Response
) {
  try {
    const rider = await createRider(req.body);

    res.status(201).json(rider);
  } catch (error) {
    res.status(500).json({
      error: "Failed to create rider",
    });
  }
}

export async function getRidersHandler(
  req: Request,
  res: Response
) {
  try {
    const riders = await getRiders();

    res.json(riders);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch riders",
    });
  }
}