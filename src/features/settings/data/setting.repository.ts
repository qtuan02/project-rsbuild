import type { Setting } from "@/types/setting";

import { mockSettings } from "./setting.mock";

export const getSettings = (): Setting[] => {
  return [...mockSettings];
};
