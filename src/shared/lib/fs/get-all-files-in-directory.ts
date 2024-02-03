import { invoke } from "@tauri-apps/api/tauri";

export type ExtensionsFilter = string[];

export const getAllFilesInDirectory = async (
  path: string,
  extensionsFilter: ExtensionsFilter | null = null,
): Promise<string[]> => {
  return await invoke("get_all_files_in_directory", { path, extensionsFilter });
};
