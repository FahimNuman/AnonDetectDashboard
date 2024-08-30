import { serverBaseUrl } from "./baseUrl";

export const getAllProfit = async () => {
  const res = await fetch(`${serverBaseUrl}/profit-count`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch return. Status: ${res.status}`);
  }

  return res.json();
};
