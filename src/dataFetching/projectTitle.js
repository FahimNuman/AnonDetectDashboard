import { serverBaseUrl } from "./baseUrl";

export const getProjectTitle = async () => {
  const res = await fetch(`${serverBaseUrl}/project-title`, {
    next: {
      revalidate: 2,
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch Project Title");
  }

  return res.json();
};
