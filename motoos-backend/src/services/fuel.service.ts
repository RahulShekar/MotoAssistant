export function calculateFuelPlan(
  distanceKm: number,
  tankCapacity: number,
  mileage: number
) {
  const maxRangeKm =
    tankCapacity * mileage;

  const fuelStopsNeeded = Math.max(
    Math.ceil(
      distanceKm / maxRangeKm
    ) - 1,
    0
  );

  const estimatedFuelNeeded =
    Number(
      (
        distanceKm / mileage
      ).toFixed(1)
    );

  const reserveFuel =
    Number(
      (
        tankCapacity * 0.2
      ).toFixed(1)
    );

  return {
    distanceKm,
    mileage,
    tankCapacity,
    maxRangeKm,
    estimatedFuelNeeded,
    reserveFuel,
    fuelStopsNeeded,
  };
}

export function calculateFuelStatus(
  tankCapacity: number,
  mileage: number,
  distanceCoveredKm: number
) {
  const fuelConsumed =
    distanceCoveredKm / mileage;

  const remainingFuel =
    Math.max(
      tankCapacity - fuelConsumed,
      0
    );

  const fuelPercentage =
    Math.round(
      (
        remainingFuel /
        tankCapacity
      ) * 100
    );

  const remainingRangeKm =
    Math.round(
      remainingFuel * mileage
    );

  return {
    fuelConsumed: Number(
      fuelConsumed.toFixed(1)
    ),

    remainingFuel: Number(
      remainingFuel.toFixed(1)
    ),

    fuelPercentage,

    remainingRangeKm,
  };
}

export function generateFuelAdvice(
  fuelStopsNeeded: number,
  distanceKm: number
) {
  const advice: string[] = [];

  advice.push(
    `Estimated fuel stops required: ${fuelStopsNeeded}`
  );

  if (distanceKm > 500) {
    advice.push(
      "Refuel whenever fuel level drops below 50%."
    );
  }

  if (distanceKm > 1000) {
    advice.push(
      "Carry reserve fuel for remote sections."
    );
  }

  if (fuelStopsNeeded >= 5) {
    advice.push(
      "Fuel station scarcity expected on certain stretches."
    );
  }

  return advice;
}

export function calculateFuelRisk(
  fuelStopsNeeded: number
) {
  if (fuelStopsNeeded >= 8) {
    return "High";
  }

  if (fuelStopsNeeded >= 4) {
    return "Moderate";
  }

  return "Low";
}