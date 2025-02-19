import CryptoJS, { AES, enc } from "crypto-js";
import localforage from "localforage";
import moment from "moment";

const config = { secretKey: "formio" };

// Prevents server-side errors
const StorageService = typeof window !== "undefined" ? localStorage : null;

localforage.config({
  driver: [localforage.WEBSQL, localforage.INDEXEDDB, localforage.LOCALSTORAGE], // Force WebSQL; same as using setDriver()
  name: "myApp",
  version: 1.0,
  size: 4980736, // Size of database, in bytes. WebSQL-only for now.
  storeName: "CB-MI", // Should be alphanumeric, with underscores.
  description: "some description",
});

/**
 * Set value in local storage
 * @method set
 */
export function setItem(key: string, value: any) {
  if (!StorageService) return;
  value = bsEncrypt(value);
  StorageService.setItem(key, value);
}

/**
 * Get value from local storage
 * @method get
 */
export function getItem(key: string) {
  if (!StorageService) return null;
  const data = StorageService.getItem(key);
  const data1 = bsDecrypt(data);

  if (data1 && typeof data1 === "string") {
    return JSON.parse(data1);
  }

  return data1;
}

/**
 * Clear local storage
 * @method flush
 */
export function removeItem(key: string) {
  if (!StorageService) return;
  if (key != null && key !== undefined) {
    StorageService.removeItem(key);
  } else {
    StorageService.clear();
  }
}

/**
 * Clear all storage data
 * @method clear
 */
export function clear() {
  if (!StorageService) return;
  StorageService.clear();
}

/**
 * Encrypt data
 * @method bsEncrypt
 */
export function bsEncrypt(data: any) {
  const newString = JSON.stringify(data);
  return AES.encrypt(newString, config.secretKey).toString();
}

/**
 * Decrypt data
 * @method bsDecrypt
 */
export function bsDecrypt(data: any) {
  if (!data) {
    return data;
  }
  const newString = AES.decrypt(data, config.secretKey);
  return newString.toString(enc.Utf8);
}

// Utility functions
const encryptValue = (param: any, key = config.secretKey) => {
  const encJsonId = CryptoJS.AES.encrypt(
    JSON.stringify(`${param} ${moment().toDate()}`),
    key,
  ).toString();

  const encryptedId = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(encJsonId),
  );
  return encryptedId;
};

const decryptValue = (encryptedParam: string) => {
  const decData = CryptoJS.enc.Base64.parse(encryptedParam).toString(
    CryptoJS.enc.Utf8,
  );
  const bytes = CryptoJS.AES.decrypt(decData, config.secretKey).toString(
    CryptoJS.enc.Utf8,
  );
  return JSON.parse(bytes);
};

/**
 * Encrypt parameter
 * @method encryptParam
 */
export const encryptParam = (param: any, state = true) => {
  if (state) {
    return encryptValue(param);
  }
  return param;
};

/**
 * Decrypt parameter
 * @method decryptParam
 */
export const decryptParam = (encryptedParam: any, state = true) => {
  if (state) {
    if (!encryptedParam) {
      return encryptedParam;
    }
    const [postId, ...data] = decryptValue(encryptedParam).split(" ");
    return postId;
  }
  return encryptedParam;
};
