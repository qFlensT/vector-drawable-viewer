import { ImageType } from "./types";
import { CONVERTORS, ConvertorClass, ImageBase } from "./convertors/convertors";

export const isImageConvertable = (imageType: ImageType, to: ImageType) => {
  const convertor = CONVERTORS.get(imageType);
  if (!convertor) return false;
  return !!convertor.supportedConvertations.includes(to);
};

export const convertImage = (imageInfo: ImageBase, to: ImageType) => {
  if (!isImageConvertable(imageInfo.imageType, to)) {
    throw new Error(
      `Conversion from ${imageInfo.imageType} to ${to} is not supported`,
    );
  }

  const convertor = new (CONVERTORS.get(imageInfo.imageType) as ConvertorClass)(
    imageInfo,
  );

  return convertor.convert(to);
};

export const convertToNative = (imageInfo: ImageBase) => {
  const convertor = new (CONVERTORS.get(imageInfo.imageType) as ConvertorClass)(
    imageInfo,
  );

  return convertor.convertToNative();
};
