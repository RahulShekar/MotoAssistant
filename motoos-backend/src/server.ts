import express from "express";
import cors from "cors";

import riderRoutes from "./routes/rider.routes";
import journeyRoutes from "./routes/journey.routes";
import placesRoutes from "./routes/places.routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "MotoOS Backend Running 🚀",
    version: "1.0.0",
  });
});

// Routes
app.use("/rider", riderRoutes);

app.use("/journey", journeyRoutes);

app.use("/places", placesRoutes);

import navigationRoutes from "./routes/navigation.routes";
app.use("/navigation", navigationRoutes);

// Start Server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(
    `🚀 MotoOS API running on port ${PORT}`
  );

  console.log(
    `📍 Health Check: http://localhost:${PORT}`
  );

  console.log(
    `🗺️ Places API: http://localhost:${PORT}/places/autocomplete?q=ban`
  );
});