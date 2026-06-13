const API_URL = "http://localhost:3001";

export type RiderPayload = {
  name: string;
  bike: string;
  tankCapacity: number;
  mileage: number;
  bloodGroup: string;
  experience: string;
  emergencyContact: string;
};

export async function createRider(payload: RiderPayload) {
  const res = await fetch(`${API_URL}/rider`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error || "Failed to create rider");
  }

  return res.json();
}

export async function getRiders() {
  const res = await fetch(`${API_URL}/rider`);
  if (!res.ok) throw new Error("Failed to fetch riders");
  return res.json();
}
