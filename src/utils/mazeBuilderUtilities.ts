export const shapes = {
  10010: [4, 0], // Dead ends
  10100: [3, 3],
  11000: [0, 1],
  10001: [0, 2],
  11010: [4, 1], // Vertical
  10101: [3, 2], // Horizontal
  10011: [0, 0], // Elbows
  10110: [2, 0],
  11100: [4, 2],
  11001: [2, 3],
  11011: [1, 1], // Junctions
  10111: [1, 0],
  11110: [2, 1],
  11101: [1, 2],
  11111: [2, 2], // Cross
  null0: [4, 3], // Empty
  null1: [3, 0],
  null2: [3, 1],
  null3: [0, 3],
  null4: [1, 3],
};

export const tilesSrc = "/tiles.png";
export const pegmanSrc = "/pegman.png";
export const markerSrc = "/marker.png";

export const dimensions = {
  width: 700,
  height: 600,
};

export const squareSize = 50;

export const levelWidth = Math.floor(dimensions.width / squareSize);
export const levelHeight = Math.floor(dimensions.height / squareSize);

export const imageFileVerification = (fileType: string) => {
  const typeRegex = /^(image)\/[a-zA-Z]+/;
  let isValidFileFormat = typeRegex.test(fileType);

  if (!isValidFileFormat) {
    return false;
  }

  return true;
};

export const dataURLToBlob = (dataUrl: string) => {
  let BASE64_MARKER = ";base64,";
  if (dataUrl.indexOf(BASE64_MARKER) == -1) {
    let parts = dataUrl.split(",");
    let contentType = parts[0].split(":")[1];
    let raw = decodeURIComponent(parts[1]);
    return new Blob([raw], { type: contentType });
  }
  let parts = dataUrl.split(BASE64_MARKER);
  let contentType = parts[0].split(":")[1];
  let raw = window.atob(parts[1]);
  let rawLength = raw.length;
  let uInt8Array = new Uint8Array(rawLength);
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
};

export const levelCheck = (levelsCopy: any[]) => {
  let levelsError: number[] = [];
  let route = 0;
  let start = 0;
  let end = 0;

  for (let i = 0; i < levelsCopy.length; i++) {
    const level = levelsCopy[i];

    route = 0;
    start = 0;
    end = 0;

    for (let x = 0; x < levelWidth; x++) {
      for (let y = 0; y < levelHeight; y++) {
        if (level[y][x] === 1) {
          route++;
        }
        if (level[y][x] === 2) {
          start++;
        }
        if (level[y][x] === 3) {
          end++;
        }
      }
    }

    if (start !== 1 || end !== 1 || route < 1) {
      levelsError.push(i + 1);
    }
  }

  return levelsError;
};

export const levelsBackgroundColor = (
  currentLevel: number,
  index: number,
  saving: boolean,
  levelsError: number[]
) => {
  return currentLevel === index && !saving
    ? "btn btn-black"
    : levelsError.includes(index + 1)
    ? "btn btn-danger"
    : "btn";
};
