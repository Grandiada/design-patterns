"use client";

import { useEffect, useState } from "react";
import { generateId } from "./generateId";

export const useClientId = () => {
  const [clientId, setClientId] = useState<string | null>(null);

  useEffect(() => {
    if (clientId) return;
    const newClientId = localStorage?.getItem("clientId") || generateId();

    setClientId(newClientId);
    localStorage.setItem("clientId", newClientId);
  }, []);

  return clientId;
};
