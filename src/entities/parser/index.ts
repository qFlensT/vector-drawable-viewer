import { getAllFilesInDirectory } from "../../shared/lib/fs/get-all-files-in-directory";
import { readFileAsBase64 } from "../../shared/lib/fs/read-file";
import { base64Decode } from "../../shared/lib/utils/base64";
import { FileInfo, ImageType } from "./types";

class ParsedImage {
  private __fileInfo: FileInfo;
  private __base64Data: string;

  constructor(fileInfo: FileInfo, base64Data: string) {
    this.__fileInfo = fileInfo;
    this.__base64Data = base64Data;
  }

  public get fileName() {
    return this.__fileInfo.fileName;
  }

  public get fileType() {
    return this.__fileInfo.fileType;
  }

  public get absolutePath() {
    return this.__fileInfo.absolutePath;
  }

  public get bytes() {
    return base64Decode(this.__base64Data);
  }

  public get base64() {
    return this.__base64Data;
  }

  public async dataURI() {
    return `data:image/${this.__fileInfo.fileType};base64,${this.__base64Data}`;
  }
}

export class ImageParser {
  private __imageTypesFilter: string[];
  private __directory: string;

  constructor(
    directory: string,
    imageTypesFilter: ImageType[] = Object.values(ImageType),
  ) {
    this.__imageTypesFilter = Object.values(imageTypesFilter);
    this.__directory = directory;
  }

  private static __getFileInfo(filePath: string): FileInfo {
    const fileNameWithExtension = filePath.split(/[/\\]/).pop() || "";
    const parts = fileNameWithExtension.split(".");

    const fileType = parts.pop() || "";
    const fileName = parts.join(".");

    return {
      fileName,
      fileType: fileType as ImageType,
      absolutePath: filePath,
    };
  }

  private async __parse(amount?: number) {
    let filePaths = await getAllFilesInDirectory(
      this.__directory,
      this.__imageTypesFilter,
    );

    if (amount) filePaths = filePaths.slice(0, amount);

    return Promise.allSettled(
      filePaths.map(async (filePath) => {
        try {
          console.log("File reading");
          return new ParsedImage(
            ImageParser.__getFileInfo(filePath),
            await readFileAsBase64(filePath),
          );
        } catch (e) {
          throw { error: e, filePath };
        }
      }),
    );
  }

  public parse(amount?: number) {
    return this.__parse(amount);
  }
}
