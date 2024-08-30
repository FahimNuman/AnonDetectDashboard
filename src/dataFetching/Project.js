import { serverBaseUrl } from "./baseUrl";

export const getProjects = async () => {
  const res = await fetch(`${serverBaseUrl}/project`, {
    cache: "no-store",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch Project Type");
  }

  return res.json();
};
