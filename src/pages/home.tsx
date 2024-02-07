import { useState, useEffect } from "react";
import { parseImages } from "../entities/image/model/image.parser";
import { ImageInfo } from "../entities/image/model/types";
import UiPageSpinner from "../shared/ui/ui-page-spinner";
import React from "react";

const HomePage = React.memo(() => {
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [state, setState] = useState<"loading" | "ready">("loading");
  const path = "/Users/kon/Desktop";
  console.log("render");

  useEffect(() => {
    setState("loading");
    parseImages(path)
      .then((imgs) => {
        const filtred = imgs.filter((image) => !!image.srcContent.length);
        setImages(filtred), console.log(filtred);
      })
      .finally(() => setState("ready"));
  }, []); // Пустой массив зависимостей означает, что эффект запустится только при монтировании компонента

  return (
    <div className="flex flex-wrap gap-1 overflow-hidden p-2">
      {state === "loading" && <UiPageSpinner />}
      {images.map((image, index) => (
        <img
          className="block aspect-square w-16 cursor-pointer rounded border-2 border-gray-700 bg-gray-800 object-cover p-2 bg-blend-multiply transition-transform hover:scale-150"
          key={index}
          src={image.srcContent}
          alt={image.name}
        />
      ))}
    </div>
  );
});

export default HomePage;
