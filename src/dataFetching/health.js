import { serverBaseUrl } from "./baseUrl";

export const getHealths = async () => {
  const res = await fetch(`${serverBaseUrl}/health`, {
    cache: "no-store",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch Project Type");
  }

  return res.json();
};
