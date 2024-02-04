import { invoke } from "@tauri-apps/api/tauri";

export const base64Decode = async (bytes: string): Promise<Uint8Array> => {
  return await invoke("base64_decode", { bytes });
};

export const base64Encode = async (bytes: Uint8Array): Promise<string> => {
  return await invoke("base64_encode", { bytes });
};
