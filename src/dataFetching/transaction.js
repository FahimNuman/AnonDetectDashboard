import { serverBaseUrl } from "./baseUrl";

export const getAllTransactions = async () => {
  const res = await fetch(`${serverBaseUrl}/transaction`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch transaction. Status: ${res.status}`);
  }

  return res.json();
};
