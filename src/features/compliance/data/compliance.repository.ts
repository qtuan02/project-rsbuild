import { mockComplianceItems } from "./compliance.mock";

const COMPLIANCE_MOCK_DELAY_MS = 280;

const wait = async (delayMs: number) =>
  new Promise((resolve) => setTimeout(resolve, delayMs));

export const getComplianceItems = async () => {
  await wait(COMPLIANCE_MOCK_DELAY_MS);
  return [...mockComplianceItems];
};
