export enum ImageType {
  PNG = "png",
  JPEG = "jpeg",
  WEBP = "webp",
  GIF = "gif",
  SVG = "svg",
  BMP = "bmp",
  ICO = "ico",
}

export type FileInfo = {
  fileName: string;
  fileType: ImageType;
  absolutePath: string;
};
