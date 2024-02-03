import { invoke } from "@tauri-apps/api/tauri";

export const exists = async (path: string): Promise<boolean> => {
  return await invoke("exists", { path });
};
