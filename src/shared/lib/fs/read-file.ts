import { invoke } from "@tauri-apps/api/tauri";

export const readFile = (path: string): Promise<Uint8Array> => {
  return invoke("read_file", { path });
};

export const readFileAsString = async (path: string): Promise<string> => {
  return await invoke("read_file_as_string", { path });
};

export const readFileAsBase64 = async (path: string): Promise<string> => {
  return await invoke("read_file_as_base64", { path });
};
