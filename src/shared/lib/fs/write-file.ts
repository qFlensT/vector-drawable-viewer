import { invoke } from "@tauri-apps/api/tauri";

export const writeFile = (path: string, bytes: Uint8Array): Promise<null> => {
  return invoke("write_file", { path, bytes });
};

export const writeFileFromBase64 = async (
  path: string,
  base64: string,
): Promise<null> => {
  return await invoke("write_as_base64", { path, base64 });
};
