import { invoke } from "@tauri-apps/api/tauri";

export const writeFromBase64 = async (
  path: string,
  base64String: string,
): Promise<null> => {
  return await invoke("write_from_base64", { path, base64String });
};
