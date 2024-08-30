import { serverBaseUrl } from "./baseUrl";

export const getAllInvests = async () => {
  const res = await fetch(`${serverBaseUrl}/investment`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch investments. Status: ${res.status}`);
  }

  return res.json();
};
