"use client";

import { UserProvider } from "./contexts/UserProvider.jsx";

export function Providers({ children }) {
  return <UserProvider>{children}</UserProvider>;
}
