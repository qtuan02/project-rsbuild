import { mockSendLogs, mockTemplates } from "./communications.mock";

const COMMUNICATIONS_MOCK_DELAY_MS = 300;

const wait = async (delayMs: number) =>
  new Promise((resolve) => setTimeout(resolve, delayMs));

export const getCommunicationTemplates = async () => {
  await wait(COMMUNICATIONS_MOCK_DELAY_MS);
  return [...mockTemplates];
};

export const getCommunicationSendLogs = async () => {
  await wait(COMMUNICATIONS_MOCK_DELAY_MS);
  return [...mockSendLogs];
};

export const getCommunicationsDashboardData = async () => {
  const [templates, sendLogs] = await Promise.all([
    getCommunicationTemplates(),
    getCommunicationSendLogs(),
  ]);

  return {
    templates,
    sendLogs,
  };
};
