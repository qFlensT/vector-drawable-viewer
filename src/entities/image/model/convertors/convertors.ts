import { ImageInfo, ImageType } from "../types";
import { VectorDrawableConvertor } from "./vector-drawable/vector-drawable";

export const CONVERTORS = new Map<ImageType, ConvertorClass>([
  [ImageType.VectorDrawable, VectorDrawableConvertor],
]);

export interface Convertor {
  convert(to: ImageType): Promise<ImageInfo>;
  convertToNative(): Promise<ImageInfo>;
}

export interface ConvertorStatic {
  readonly supportedConvertations: ImageType[];
}

export type ConvertorClass = {
  new (imageInfo: ImageBase): Convertor;
} & ConvertorStatic;

export type ImageBase = Omit<ImageInfo, "srcContent">;
