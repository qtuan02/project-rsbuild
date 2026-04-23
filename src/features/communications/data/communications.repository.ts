import { mockSendLogs, mockTemplates } from "./communications.mock";

export const getCommunicationTemplates = () => [...mockTemplates];

export const getCommunicationSendLogs = () => [...mockSendLogs];
