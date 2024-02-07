import { createRoutesFromChildren } from "react-router-dom";
import { readFileAsString } from "../../../../shared/lib/fs/read-file";
import { base64Encode } from "../../../../shared/lib/utils/base64";
import { ImageInfo, ImageType } from "../types";
import { Convertor, ConvertorClass, ImageBase } from "./convertors";
import { transform } from "vector-drawable-svg";

export const VectorDrawableConvertor: ConvertorClass = class
  implements Convertor
{
  private __imageInfo: ImageBase;
  private static __supportedConvertations = [ImageType.SVG];

  constructor(imageInfo: ImageBase) {
    this.__imageInfo = imageInfo;
  }

  private async __toDataUri(content: string, type: ImageType) {
    const textEncoder = new TextEncoder();
    return `data:image/${type}+xml;base64,${await base64Encode(Array.from(textEncoder.encode(content)))}`;
  }

  private async __toSvg(): Promise<string> {
    return transform(await readFileAsString(this.__imageInfo.absolutePath));
  }

  public static get supportedConvertations() {
    return this.__supportedConvertations;
  }

  public async convert(to: ImageType): Promise<ImageInfo> {
    throw new Error("Method not implemented.");
    return { ...this.__imageInfo, srcContent: "", convertedTo: to };
  }

  public async convertToNative() {
    try {
      const svgStr = await this.__toSvg();
      return {
        ...this.__imageInfo,
        srcContent: await this.__toDataUri(svgStr, ImageType.SVG),
        convertedTo: ImageType.SVG,
      };
    } catch {
      return {
        ...this.__imageInfo,
        srcContent: "",
        convertedTo: ImageType.SVG,
      };
    }
  }
};
