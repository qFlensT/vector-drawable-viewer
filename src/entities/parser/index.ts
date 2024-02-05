import { getAllFilesInDirectory } from "../../shared/lib/fs/get-all-files-in-directory";
import { readFileAsBase64 } from "../../shared/lib/fs/read-file";
import { FileInfo, ImageType } from "./types";

class ParsedImage {
  private __fileInfo: FileInfo;

  constructor(fileInfo: FileInfo) {
    this.__fileInfo = fileInfo;
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

  public base64() {
    console.log("reading base");
    const base = readFileAsBase64(this.__fileInfo.absolutePath);
    console.log("base readed");
    return base;
  }

  public async dataURI() {
    return `data:image/${this.__fileInfo.fileType};base64,${await this.base64()}`;
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

    return filePaths.map(
      (filePath) => new ParsedImage(ImageParser.__getFileInfo(filePath)),
    );
  }

  public parse(amount?: number) {
    return this.__parse(amount);
  }
}
