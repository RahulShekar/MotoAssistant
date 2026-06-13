import { calculateRoute } from "./services/maps.service";

async function test() {
  const result =
    await calculateRoute(
      "Bangalore",
      "Leh"
    );

  console.log(result);
}

test();