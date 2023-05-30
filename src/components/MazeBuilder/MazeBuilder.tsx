import * as C from "./styles";

import { action } from "@/types/action";
import {
  dataURLToBlob,
  dimensions,
  imageFileVerification,
  levelCheck,
  levelHeight,
  levelWidth,
  markerSrc,
  pegmanSrc,
  shapes,
  squareSize,
  tilesSrc,
} from "@/utils/mazeBuilderUtilities";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import Skeleton from "../Skeleton";

type Props = {
  insertMaze: (gameName: string, imageFile: File, levels: any[]) => void;
  actionNotification: (type: action, levelsError?: any[]) => void;
};

type fileError = {
  type: "notFound" | "format" | undefined;
};

type gameNameError = {
  type: "notFound" | "startSpace" | undefined;
};

const MazeBuilder = ({ insertMaze, actionNotification }: Props) => {
  const [levels, setLevels] = useState<any[]>([]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [bgImage, setBgImage] = useState({ imageName: "", imageUrl: "" });
  const [gameName, setGameName] = useState<string | undefined>(undefined);
  const [gameNameError, setGameNameError] = useState<gameNameError>({
    type: undefined,
  });
  const [bgImageError, setBgImageError] = useState<fileError>({
    type: undefined,
  });

  const markerImg = useRef<HTMLImageElement>(null);
  const pegmanImg = useRef<HTMLImageElement>(null);
  const tilesImg = useRef<HTMLImageElement>(null);
  const bgCanvas = useRef<HTMLCanvasElement>(null);
  const mainCanvas = useRef<HTMLCanvasElement>(null);

  const bgContext = bgCanvas?.current?.getContext("2d");
  const mainContext = mainCanvas?.current?.getContext("2d");

  const drawTiles = useCallback(() => {
    const normalize = (x: number, y: number) => {
      let matrix = levels[currentLevel];

      if (x < 0 || x >= levelWidth || y < 0 || y >= levelHeight) {
        return "0";
      }
      return matrix[y][x] === 0 ? "0" : "1";
    };

    let matrix = levels[currentLevel];

    if (
      mainContext &&
      tilesImg.current &&
      pegmanImg.current &&
      markerImg.current
    ) {
      for (let x = 0; x < levelWidth; x++) {
        for (let y = 0; y < levelHeight; y++) {
          let tileShape =
            normalize(x, y) +
            normalize(x, y - 1) + // North.
            normalize(x - 1, y) + // West.
            normalize(x, y + 1) + // South.
            normalize(x + 1, y); // East.

          if (tileShape === "10000") tileShape = "11111"; // Draw cross if there's no adjacent path;

          if (!shapes[tileShape as keyof typeof shapes]) {
            if (tileShape === "00000" && Math.random() > 0.3) {
              tileShape = "null0";
            } else {
              tileShape = "null" + Math.floor(1 + Math.random() * 4);
            }
          }

          let left = shapes[tileShape as keyof typeof shapes][0];
          let top = shapes[tileShape as keyof typeof shapes][1];

          mainContext.drawImage(
            tilesImg.current,
            left * squareSize,
            top * squareSize,
            squareSize,
            squareSize,
            x * squareSize,
            y * squareSize,
            squareSize,
            squareSize
          );

          if (matrix[y][x] === 2) {
            mainContext.drawImage(
              pegmanImg.current,
              0,
              0,
              50,
              50,
              x * squareSize + 1.5,
              y * squareSize - 8,
              50,
              50
            );
          }
          if (matrix[y][x] == 3) {
            mainContext.drawImage(
              markerImg.current,
              0,
              0,
              20,
              34,
              x * squareSize + 15,
              y * squareSize - 8,
              20,
              34
            );
          }
        }
      }
    }
  }, [levels, currentLevel, mainContext]);

  useEffect(() => {
    if (levels.length !== 0) {
      drawTiles();
    }
  }, [levels, drawTiles]);

  const drawGrid = useCallback(() => {
    let i = 0;

    if (mainContext) {
      mainContext.translate(0.5, 0.5);
      mainContext.lineWidth = 1;
      mainContext.strokeStyle = "#f00";
      mainContext.beginPath();
      for (i = squareSize; i <= dimensions.width; i += squareSize) {
        mainContext.moveTo(i, 0);
        mainContext.lineTo(i, dimensions.height);
      }
      for (i = squareSize; i <= dimensions.height; i += squareSize) {
        mainContext.moveTo(0, i);
        mainContext.lineTo(dimensions.width, i);
      }
      mainContext.stroke();

      mainContext.translate(-0.5, -0.5);
    }
  }, [mainContext]);

  useEffect(() => {
    const image = new Image();
    image.src = bgImage.imageUrl;
    image.onload = () => {
      bgContext?.drawImage(image, 0, 0, dimensions.width, dimensions.height);
    };
    if (bgContext) {
      bgContext.imageSmoothingEnabled = false;
    }

    if (mainContext) {
      mainContext.imageSmoothingEnabled = false;
    }

    if (bgImage.imageUrl.length > 0) {
      drawGrid();
    }
  }, [bgContext, mainContext, bgImage, drawGrid]);

  const refreshMainCanvas = useCallback(() => {
    if (mainContext) {
      mainContext.clearRect(0, 0, dimensions.width, dimensions.height);
      drawGrid();
    }
  }, [drawGrid, mainContext]);

  const initLevels = () => {
    setCurrentLevel(0);
    let newLevels = [...levels];
    let matrix = [];
    let row = [];
    for (let i = 0; i < levelWidth; i++) {
      row.push(0);
    }
    for (let j = 0; j < levelHeight; j++) {
      matrix.push(row.concat());
    }
    newLevels.push(matrix);
    setLevels(newLevels);
  };

  const resetLevels = () => {
    setCurrentLevel(0);
    let resetLevels = [...levels];
    let matrix = [];
    let row = [];

    for (let i = resetLevels.length - 1; i > 0; i--) {
      resetLevels.pop();
    }

    for (let i = 0; i < levelWidth; i++) {
      row.push(0);
    }
    for (let j = 0; j < levelHeight; j++) {
      matrix.push(row.concat());
    }
    resetLevels.push(matrix);

    resetLevels.splice(0, 1);

    setLevels(resetLevels);
  };

  const clickAddLevel = () => {
    if (levels.length >= 10) {
      actionNotification("maxLevel");
    } else {
      let newLevels = [...levels];
      let matrix = [];
      let row = [];
      for (let i = 0; i < levelWidth; i++) {
        row.push(0);
      }
      for (let j = 0; j < levelHeight; j++) {
        matrix.push(row.concat());
      }
      newLevels.push(matrix);
      setLevels(newLevels);
      setCurrentLevel(newLevels.length - 1);
      refreshMainCanvas();
    }
  };

  const clickRemoveLevel = () => {
    if (levels.length > 1) {
      let removeLevel = [...levels];

      removeLevel.pop();
      setLevels(removeLevel);
      setCurrentLevel(removeLevel.length - 1);
      refreshMainCanvas();
    } else {
      actionNotification("firstLevel");
    }
  };

  useEffect(() => {
    const clickChangeTile = (event: MouseEvent) => {
      if (
        mainCanvas.current &&
        mainCanvas.current === event.target &&
        levels.length > 0
      ) {
        let newLevels = [...levels];
        let matrix = levels[currentLevel];

        let rect = mainCanvas.current.getBoundingClientRect();
        let x = Math.floor((event.clientX - rect.left) / 50);
        let y = Math.floor((event.clientY - rect.top) / 50);

        let right = 2;
        if (event.button === right) {
          matrix[y][x] -= 1;
          if (matrix[y][x] < 0) matrix[y][x] = 3;
        } else {
          matrix[y][x] += 1;
          if (matrix[y][x] > 3) matrix[y][x] = 0;
        }

        newLevels[currentLevel] = matrix;
        setLevels(newLevels);
        refreshMainCanvas();
      }
    };

    window.addEventListener("mouseup", clickChangeTile);
    return () => {
      window.removeEventListener("mouseup", clickChangeTile);
    };
  }, [currentLevel, levels, refreshMainCanvas]);

  const initCanvas = (e: ChangeEvent<HTMLInputElement>) => {
    setBgImageError({ type: undefined });
    if (e.target.files?.length && e.target.files.length > 0) {
      if (imageFileVerification(e.target.files[0].type)) {
        setBgImage({
          imageName: e.target.files[0].name,
          imageUrl: URL.createObjectURL(e.target.files[0]),
        });

        if (levels.length === 0) {
          initLevels();
        } else {
          resetLevels();
          refreshMainCanvas();
        }
      } else {
        setBgImageError({ type: "format" });
      }
    }
  };

  const clickSave = () => {
    let levelsError = levelCheck([...levels]);

    let levelsErrorStatus = false;
    let gameNameStatus = false;
    let bgImageStatus = false;

    if (levelsError.length === 0) {
      levelsErrorStatus = true;
    } else {
      actionNotification("levelsError", levelsError);
    }

    if (gameName && gameName[0] !== " ") {
      gameNameStatus = true;
    } else if (gameName && gameName[0] === " ") {
      setGameNameError({ type: "startSpace" });
    } else {
      setGameNameError({ type: "notFound" });
    }

    if (bgImage.imageUrl.length > 0) {
      bgImageStatus = true;
    } else {
      setBgImageError({ type: "notFound" });
    }

    if (gameName && levelsErrorStatus && gameNameStatus && bgImageStatus) {
      let imageFile: File | undefined = undefined;

      if (bgCanvas.current) {
        let dataUrl = bgCanvas.current.toDataURL();

        let blob = dataURLToBlob(dataUrl);

        let file = new File([blob], bgImage.imageName);

        imageFile = file;
      }

      if (imageFile) {
        insertMaze(gameName, imageFile, levels);
      } else {
        actionNotification("imageManipulation");
      }
    }
  };

  return (
    <>
      <C.Container>
        <C.Toolbar>
          <C.Levels
            $visibility={mainCanvas.current && levels.length > 0 ? true : false}
          >
            {levels.map((level, index) => (
              <button
                key={index}
                className="btn"
                onClick={() => {
                  if (currentLevel !== index) {
                    setCurrentLevel(index);
                    refreshMainCanvas();
                  }
                }}
                style={{
                  backgroundColor: currentLevel === index ? "#000" : undefined,
                }}
              >
                {index + 1}
              </button>
            ))}
            <button className="btn" onClick={() => clickAddLevel()}>
              +
            </button>
            <button className="btn" onClick={() => clickRemoveLevel()}>
              -
            </button>
          </C.Levels>
          <C.Actions>
            <button className="btn">Ajuda</button>
            <button className="btn" onClick={() => clickSave()}>
              Salvar
            </button>
          </C.Actions>
        </C.Toolbar>
        <C.Editor>
          <C.CanvasWrapper
            $pointer={bgImage.imageUrl.length > 0 ? true : false}
          >
            <C.BgCanvas
              ref={bgCanvas}
              width={dimensions.width}
              height={dimensions.height}
              $bgImage={bgImage.imageUrl.length === 0 ? false : true}
            ></C.BgCanvas>
            <C.MainCanvas
              ref={mainCanvas}
              width={dimensions.width}
              height={dimensions.height}
            ></C.MainCanvas>
            {bgImage.imageUrl.length === 0 && (
              <Skeleton skeletonWidth="700px" />
            )}
          </C.CanvasWrapper>
          <C.Toolbox>
            <C.InputData>
              <div>
                <label htmlFor="nameGame">Nome do jogo:</label>
                <input
                  type="text"
                  id="nameGame"
                  name="nameGame"
                  maxLength={24}
                  placeholder="Digite o nome do jogo"
                  onChange={(e) => {
                    setGameName(e.target.value);
                    setGameNameError({ type: undefined });
                  }}
                />
              </div>
              <div>
                {gameNameError.type === "notFound" && (
                  <p className="inputError">Nome do jogo não informado</p>
                )}
                {gameNameError.type === "startSpace" && (
                  <p className="inputError">
                    O nome do jogo não pode iniciar com espaço
                  </p>
                )}
              </div>
            </C.InputData>
            <C.InputData>
              <div>
                <label htmlFor="bgFile" className="btn">
                  Adicionar imagem de fundo
                </label>
                <input
                  type="file"
                  id="bgFile"
                  name="bgFile"
                  accept="image/*"
                  onChange={initCanvas}
                />
              </div>
              <div>
                {bgImageError.type === "notFound" && (
                  <p className="inputError">Imagem não adicionada</p>
                )}
                {bgImageError.type === "format" && (
                  <p className="inputError">Formato de arquivo não aceito</p>
                )}
              </div>
            </C.InputData>
          </C.Toolbox>
        </C.Editor>
      </C.Container>
      {
        // eslint-disable-next-line
        <img ref={tilesImg} src={tilesSrc} alt="" style={{ display: "none" }} />
      }
      {
        // eslint-disable-next-line
        <img
          ref={pegmanImg}
          src={pegmanSrc}
          alt=""
          style={{ display: "none" }}
        />
      }
      {
        // eslint-disable-next-line
        <img
          ref={markerImg}
          src={markerSrc}
          alt=""
          style={{ display: "none" }}
        />
      }
    </>
  );
};

export default MazeBuilder;
