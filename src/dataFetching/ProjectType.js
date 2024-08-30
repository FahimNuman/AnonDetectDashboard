import { serverBaseUrl } from "./baseUrl";

export const getProjectType = async () => {
  const res = await fetch(`${serverBaseUrl}/category`, {
    next: {
      revalidate: 2,
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch Project Type");
  }

  return res.json();
};
