import CryptoJS from "crypto-js";

import { env } from "@/config/env";

export const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, env.storageSecretKey).toString();
};

export const decryptData = (encryptedData: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, env.storageSecretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Error decrypting data:", error);
    return "";
  }
};

export const hashKey = (key: string): string => {
  return CryptoJS.SHA256(key + env.storageSecretKey).toString();
};
