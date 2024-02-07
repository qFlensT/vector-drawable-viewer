import { invoke } from "@tauri-apps/api/tauri";

export const base64Decode = async (bytes: string): Promise<number[]> => {
  return await invoke("base64_decode", { bytes });
};

export const base64Encode = async (bytes: number[]): Promise<string> => {
  return await invoke("base64_encode", { bytes });
};
