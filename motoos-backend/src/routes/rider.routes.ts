import { Router } from "express";

import {
  createRiderHandler,
  getRidersHandler,
} from "../controllers/rider.controller";

const router = Router();

router.post("/", createRiderHandler);
router.get("/", getRidersHandler);

export default router;