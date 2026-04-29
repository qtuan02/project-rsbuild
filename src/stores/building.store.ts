import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { decryptData, encryptData, hashKey } from "@/utils/crypto";

interface BuildingState {
  selectedBuildingId: string | null;
  setSelectedBuildingId: (id: string | null) => void;
}

export const useBuildingStore = create<BuildingState>()(
  persist(
    (set) => ({
      selectedBuildingId: null,
      setSelectedBuildingId: (id) => set({ selectedBuildingId: id }),
    }),
    {
      name: "building-storage",
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          const hashedKey = hashKey(name);
          const encryptedValue = localStorage.getItem(hashedKey);
          if (!encryptedValue) return null;
          return decryptData(encryptedValue);
        },
        setItem: (name, value) => {
          const hashedKey = hashKey(name);
          const encryptedValue = encryptData(value);
          localStorage.setItem(hashedKey, encryptedValue);
        },
        removeItem: (name) => {
          const hashedKey = hashKey(name);
          localStorage.removeItem(hashedKey);
        },
      })),
    },
  ),
);
