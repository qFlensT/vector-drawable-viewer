import { invoke } from "@tauri-apps/api/tauri";

export const readToBase64 = async (path: string): Promise<string> => {
  return await invoke("read_to_base64", { path });
};
