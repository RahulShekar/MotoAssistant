import {
  calculateFuelPlan,
  generateFuelAdvice,
} from "./services/fuel.service";

const fuelPlan = calculateFuelPlan(
  3068,
  17,
  30
);

const advice = generateFuelAdvice(
  fuelPlan.fuelStopsNeeded
);

console.log(fuelPlan);
console.log(advice);