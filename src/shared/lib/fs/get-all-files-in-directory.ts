import { invoke } from "@tauri-apps/api/tauri";

export type FileInfo = {
  fileName: string;
  fileType: string;
  absolutePath: string;
};

const getFileInfo = (filePath: string): FileInfo => {
  const fileNameWithExtension = filePath.split(/[/\\]/).pop() || "";
  const parts = fileNameWithExtension.split(".");

  const fileType = parts.pop() || "";
  const fileName = parts.join(".");

  return {
    fileName,
    fileType,
    absolutePath: filePath,
  };
};

export const getAllFilesInDirectory = async (
  path: string,
  extensionsFilter: string[] = [],
): Promise<FileInfo[]> => {
  const res: string[] = await invoke("get_all_files_in_directory", {
    path,
    extensionsFilter,
  });
  return res.map(getFileInfo);
};
