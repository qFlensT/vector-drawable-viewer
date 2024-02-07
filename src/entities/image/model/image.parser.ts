import { convertFileSrc } from "@tauri-apps/api/tauri";
import {
  FileInfo,
  getAllFilesInDirectory,
} from "../../../shared/lib/fs/get-all-files-in-directory";
import { ImageBase } from "./convertors/convertors";
import { convertToNative } from "./image.converter";

import { ImageInfo, ImageNativeType, ImageType } from "./types";

const getFiles = async (directory: string) => {
  const files = await getAllFilesInDirectory(
    directory,
    Object.values(ImageType),
  );
  return files;
};

const filterImages = (files: FileInfo[]) => {
  console.log(`[*] Filtering images, found ${files.length} images`);

  const nativeTypes: string[] = Object.values(ImageNativeType);
  const imageTypes: string[] = Object.values(ImageType);

  return files.reduce(
    (acc, file) => {
      const imageInfoBase: Omit<ImageInfo, "srcContent"> = {
        absolutePath: file.absolutePath,
        name: file.fileName,
        imageType: file.fileType as ImageType,
      };

      if (nativeTypes.includes(file.fileType))
        acc.nativeImages.push(
          Object.assign(imageInfoBase, {
            srcContent: convertFileSrc(file.absolutePath),
          }),
        );
      else if (imageTypes.includes(file.fileType))
        acc.notNativeImages.push(imageInfoBase);

      return acc;
    },
    { nativeImages: [], notNativeImages: [] } as {
      nativeImages: ImageInfo[];
      notNativeImages: ImageBase[];
    },
  );
};

export const parseImages = async (directory: string, amount?: number) => {
  let files = await getFiles(directory);

  if (amount) files = files.slice(0, amount);

  const { nativeImages, notNativeImages } = filterImages(files);

  return [
    ...nativeImages,
    ...(await Promise.all(
      notNativeImages.map((image) => convertToNative(image)),
    )),
  ];
};
