import { serverBaseUrl } from "./baseUrl";

export const getAllReturns = async () => {
  const res = await fetch(`${serverBaseUrl}/return`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch return. Status: ${res.status}`);
  }

  return res.json();
};