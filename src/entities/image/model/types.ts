export enum ImageNativeType {
  PNG = "png",
  JPG = "jpg",
  JPEG = "jpeg",
  SVG = "svg",
  WEBP = "webp",
  GIF = "gif",
  BMP = "bmp",
  ICO = "ico",
}

export enum ImageType {
  PNG = "png",
  JPG = "jpg",
  JPEG = "jpeg",
  SVG = "svg",
  WEBP = "webp",
  GIF = "gif",
  BMP = "bmp",
  ICO = "ico",
  VectorDrawable = "xml",
}

export type ImageInfo = {
  srcContent: string;
  absolutePath: string;
  name: string;
  imageType: ImageType;
  convertedTo?: ImageType;
};
