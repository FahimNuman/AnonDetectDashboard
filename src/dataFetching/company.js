import { serverBaseUrl } from "./baseUrl";

export const getAllCompanies = async () => {
  const res = await fetch(`${serverBaseUrl}/company`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch company. Status: ${res.status}`);
  }

  return res.json();
};
