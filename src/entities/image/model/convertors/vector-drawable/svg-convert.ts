// Функция для извлечения атрибутов
function extractAttributes(
  element: Element,
  attributes: string[],
): Record<string, string | null> {
  return attributes.reduce(
    (attrs, attr) => {
      const value = element.getAttribute(`android:${attr}`);
      if (value !== null) {
        attrs[attr] = value.replace(/dp|sp|in|mm|cm|pt|pc/g, "");
      } else {
        attrs[attr] = value; // Сохраняем null, если атрибут отсутствует
      }
      return attrs;
    },
    {} as Record<string, string | null>,
  );
}

// Функция для обработки элемента path
function processPathElement(element: Element): string {
  const pathAttrs = extractAttributes(element, [
    "name",
    "pathData",
    "fillColor",
    "strokeColor",
    "strokeWidth",
    "strokeLinecap",
    "strokeLinejoin",
    "strokeMiterlimit",
    "fillType",
  ]);
  let pathElement = `<path`;

  Object.entries(pathAttrs).forEach(([key, value]) => {
    if (value) {
      switch (key) {
        case "name":
          pathElement += ` id="${value}"`;
          break;
        case "pathData":
          pathElement += ` d="${value}"`;
          break;
        case "fillColor":
          pathElement += ` fill="${value || "none"}"`;
          break;
        case "strokeColor": // Используйте 'stroke', а не 'strokeColor'
          pathElement += ` stroke="${value}"`;
          break;
        case "strokeWidth":
          pathElement += ` stroke-width="${value}"`;
          break;
        case "strokeLinecap":
          pathElement += ` stroke-linecap="${value}"`;
          break;
        case "strokeLinejoin":
          pathElement += ` stroke-linejoin="${value}"`;
          break;
        case "strokeMiterlimit":
          pathElement += ` stroke-miterlimit="${value}"`;
          break;
        case "fillType":
          pathElement += ` fill-rule="${value}"`;
          break;
        // Убедитесь, что все ключи соответствуют атрибутам SVG.
        // Если какие-то из этих атрибутов не поддерживаются SVG, их нужно обрабатывать по-другому.
      }
    }
  });

  pathElement += ` />`;
  return pathElement;
}

// Функция для обработки элемента group
function processGroupElement(element: Element, depth: number = 0): string {
  const groupAttrs = extractAttributes(element, [
    "name",
    "translateX",
    "translateY",
    "scaleX",
    "scaleY",
    "rotation",
    "pivotX",
    "pivotY",
  ]);
  let groupContent = `<g`;
  const transformParts: string[] = [];

  // Добавляем трансформации, если они присутствуют
  if (groupAttrs.translateX || groupAttrs.translateY) {
    transformParts.push(
      `translate(${groupAttrs.translateX || 0}, ${groupAttrs.translateY || 0})`,
    );
  }
  if (groupAttrs.scaleX || groupAttrs.scaleY) {
    transformParts.push(
      `scale(${groupAttrs.scaleX || 1}, ${groupAttrs.scaleY || 1})`,
    );
  }
  if (groupAttrs.rotation) {
    const pivotX = groupAttrs.pivotX || "0";
    const pivotY = groupAttrs.pivotY || "0";
    transformParts.push(`rotate(${groupAttrs.rotation}, ${pivotX}, ${pivotY})`);
  }

  if (transformParts.length > 0) {
    groupContent += ` transform="${transformParts.join(" ")}"`;
  }

  if (groupAttrs.name) {
    groupContent += ` id="${groupAttrs.name}"`;
  }

  groupContent += ">";

  // Обработка дочерних элементов
  Array.from(element.children).forEach((child) => {
    if (child.tagName.toLowerCase() === "path") {
      groupContent += processPathElement(child as Element);
    } else if (child.tagName.toLowerCase() === "group") {
      groupContent += processGroupElement(child as Element, depth + 1);
    }
    // Можно добавить обработку других типов элементов, если это необходимо
  });

  groupContent += "</g>";
  return groupContent;
}

// Основная функция для конвертации VectorDrawable в SVG
export function convertVectorDrawableToSvg(vectorDrawable: string): string {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(vectorDrawable, "text/xml");

  if (xmlDoc.getElementsByTagName("parsererror").length) {
    throw new Error("Error parsing XML");
  }

  const vectorElement = xmlDoc.documentElement;
  if (vectorElement.tagName !== "vector") {
    throw new Error("Root element is not a vector");
  }

  const vectorAttrs = extractAttributes(vectorElement, [
    "width",
    "height",
    "viewportWidth",
    "viewportHeight",
  ]);
  let svgContent = `<svg width="${vectorAttrs.width}px" height="${vectorAttrs.height}px" viewBox="0 0 ${vectorAttrs.viewportWidth} ${vectorAttrs.viewportHeight}" xmlns="http://www.w3.org/2000/svg">`;

  Array.from(vectorElement.children).forEach((child) => {
    if (child.tagName === "path") {
      svgContent += processPathElement(child);
    } else if (child.tagName === "group") {
      svgContent += processGroupElement(child);
    }
    // Обработка других элементов, если требуется
  });

  svgContent += "</svg>";
  return svgContent;
}
