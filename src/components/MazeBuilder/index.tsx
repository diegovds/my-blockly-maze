import * as C from "./styles";

import { ActionsNotification } from "@/types/ActionsNotification";
import { CloseModalFunction } from "@/types/CloseModalFunction";
import {
  dataURLToBlob,
  dimensions,
  imageFileVerification,
  levelCheck,
  levelHeight,
  levelWidth,
  levelsBackgroundColor,
  markerSrc,
  pegmanSrc,
  shapes,
  squareSize,
  tilesSrc,
} from "@/utils/mazeBuilderUtilities";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { AnimatePresence } from "framer-motion";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { FaRegCopy } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import MazeBuilderModal from "../MazeBuilderModal";
import Instructions from "../MazeBuilderModal/Instructions";
import LevelsError from "../MazeBuilderModal/LevelsError";
import RemoveLevel from "../MazeBuilderModal/RemoveLevel";
import Skeleton from "../Skeleton";

type Props = {
  insertMaze: (
    gameName: string,
    imageFile: File,
    thumbnailFile: File,
    levels: any[]
  ) => void;
  actionNotification: (type: ActionsNotification) => void;
  saving: boolean;
  error: boolean;
};

type fileError = "notFound" | "format" | undefined;
type gameNameError = "notFound" | "startSpace" | undefined;
type modalError = {
  status: boolean;
  LevelsError: number[];
};

const MazeBuilder = ({
  insertMaze,
  actionNotification,
  saving,
  error,
}: Props) => {
  const [animationParent] = useAutoAnimate({ duration: 300 });

  const [levels, setLevels] = useState<any[]>([]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [bgImage, setBgImage] = useState({ imageName: "", imageUrl: "" });
  const [gameName, setGameName] = useState<string | undefined>(undefined);
  const [gameNameError, setGameNameError] = useState<gameNameError>(undefined);
  const [bgImageError, setBgImageError] = useState<fileError>(undefined);
  const [openModalInstructions, setOpenModalInstructions] =
    useState<boolean>(false);
  const [openModalRemoveLevel, setOpenModalRemoveLevel] =
    useState<boolean>(false);
  const [openModalLevelsError, setOpenModalLevelsError] = useState<modalError>({
    status: false,
    LevelsError: [],
  });

  const markerImg = useRef<HTMLImageElement>(null);
  const pegmanImg = useRef<HTMLImageElement>(null);
  const tilesImg = useRef<HTMLImageElement>(null);
  const bgCanvas = useRef<HTMLCanvasElement>(null);
  const mainCanvas = useRef<HTMLCanvasElement>(null);

  const bgContext = bgCanvas?.current?.getContext("2d");
  const mainContext = mainCanvas?.current?.getContext("2d");

  const BuilderAnimate = {
    hidden: { opacity: 1, scale: 0.75 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const VisibleItemVariant = {
    visible: {
      x: 0,
      opacity: 1,
    },
  };

  const drawTiles = useCallback(
    (whichCanvas: "main" | "bg") => {
      const normalize = (x: number, y: number) => {
        let matrix = levels[whichCanvas === "main" ? currentLevel : 0];

        if (x < 0 || x >= levelWidth || y < 0 || y >= levelHeight) {
          return "0";
        }
        return matrix[y][x] === 0 ? "0" : "1";
      };

      let canvas = whichCanvas === "main" ? mainContext : bgContext;

      let matrix = levels[whichCanvas === "main" ? currentLevel : 0];

      if (
        canvas &&
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

            canvas.drawImage(
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
              canvas.drawImage(
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
              canvas.drawImage(
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
    },
    [levels, currentLevel, mainContext, bgContext]
  );

  useEffect(() => {
    if (levels.length !== 0) {
      drawTiles("main");
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

    if (error) {
      drawTiles("main");
    }
  }, [error, bgContext, mainContext, bgImage, drawGrid, drawTiles]);

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

  const clickAddLevel = (type: "new" | "copy") => {
    if (levels.length >= 10) {
      actionNotification("maxLevel");
    } else {
      let newLevels = [...levels];

      if (type === "new") {
        let matrix = [];
        let row = [];
        for (let i = 0; i < levelWidth; i++) {
          row.push(0);
        }
        for (let j = 0; j < levelHeight; j++) {
          matrix.push(row.concat());
        }
        newLevels.push(matrix);
      }

      if (type === "copy") {
        newLevels.push(
          JSON.parse(
            JSON.stringify(newLevels[newLevels.length - 1])
          ) /** deep copy */
        );
      }

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
        mainCanvas.current.oncontextmenu = () => {
          return false;
        };

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
    setBgImageError(undefined);
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
        setBgImageError("format");
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
      setOpenModalLevelsError({ status: true, LevelsError: levelsError });
    }

    if (gameName && gameName[0] !== " ") {
      gameNameStatus = true;
    } else if (gameName && gameName[0] === " ") {
      setGameNameError("startSpace");
    } else {
      setGameNameError("notFound");
    }

    if (bgImage.imageUrl.length > 0) {
      bgImageStatus = true;
    } else {
      setBgImageError("notFound");
    }

    if (gameName && levelsErrorStatus && gameNameStatus && bgImageStatus) {
      let imageFile: File | undefined = undefined;
      let thumbnailFile: File | undefined = undefined;

      if (bgCanvas.current) {
        let dataUrl = bgCanvas.current.toDataURL();

        let blob = dataURLToBlob(dataUrl);

        let file = new File([blob], bgImage.imageName);

        imageFile = file;

        setCurrentLevel(0);
        refreshMainCanvas();
        drawTiles("bg");

        dataUrl = bgCanvas.current.toDataURL();

        blob = dataURLToBlob(dataUrl);

        file = new File([blob], bgImage.imageName);

        thumbnailFile = file;
      }

      if (imageFile && thumbnailFile) {
        insertMaze(gameName, imageFile, thumbnailFile, levels);
      } else {
        actionNotification("imageManipulation");
      }
    }
  };

  useEffect(() => {
    setOpenModalLevelsError({
      status: false,
      LevelsError: levelCheck([...levels]),
    });
  }, [levels]);

  const closeModal: CloseModalFunction = (
    status,
    removeLevel,
    goToErrorLevel
  ) => {
    if (openModalInstructions) {
      setOpenModalInstructions(status);
    }
    if (openModalRemoveLevel) {
      setOpenModalRemoveLevel(false);

      if (removeLevel === true) {
        clickRemoveLevel();
      }
    }
    if (openModalLevelsError.status === true) {
      setOpenModalLevelsError({
        status: false,
        LevelsError: [...openModalLevelsError.LevelsError],
      });

      if (goToErrorLevel && goToErrorLevel - 1 !== currentLevel) {
        setCurrentLevel(goToErrorLevel - 1);
        refreshMainCanvas();
      }
    }
  };

  return (
    <>
      <C.Container variants={BuilderAnimate} initial="hidden" animate="visible">
        <C.Toolbar
          variants={{
            hidden: { x: 20, opacity: 0 },
            ...VisibleItemVariant,
          }}
        >
          <C.Levels
            $visibility={mainCanvas.current && levels.length > 0 ? true : false}
            ref={animationParent}
          >
            <label>{levels.length === 1 ? "Nível" : "Níveis"}:</label>
            {levels.map((level, index) => (
              <button
                disabled={saving}
                key={index}
                className={levelsBackgroundColor(
                  currentLevel,
                  index,
                  saving,
                  openModalLevelsError.LevelsError
                )}
                onClick={() => {
                  if (currentLevel !== index) {
                    setCurrentLevel(index);
                    refreshMainCanvas();
                  }
                }}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="btn"
              disabled={saving}
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Adiciona novo nível em branco"
              onClick={() => clickAddLevel("new")}
            >
              +
            </button>
            <button
              className="btn"
              disabled={saving}
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Adiciona novo nível com cópia do último nível"
              onClick={() => clickAddLevel("copy")}
            >
              <FaRegCopy />
            </button>
            <button
              className="btn"
              disabled={saving}
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Remove o último nível"
              onClick={() =>
                levels.length === 1
                  ? actionNotification("firstLevel")
                  : setOpenModalRemoveLevel(true)
              }
            >
              -
            </button>
          </C.Levels>
          <C.Actions>
            <button
              className="btn"
              disabled={saving}
              onClick={() => {
                setOpenModalInstructions(true);
              }}
            >
              Ajuda
            </button>
            <button
              className="btn"
              disabled={saving}
              onClick={() => clickSave()}
            >
              {!saving ? "Salvar" : "Aguarde"}
            </button>
          </C.Actions>
        </C.Toolbar>
        <C.Editor
          variants={{
            hidden: { x: -20, opacity: 0 },
            ...VisibleItemVariant,
          }}
        >
          <C.CanvasWrapper
            $pointer={bgImage.imageUrl.length > 0 ? true : false}
            $saving={saving}
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
                  disabled={saving}
                  type="text"
                  id="nameGame"
                  name="nameGame"
                  maxLength={24}
                  placeholder="Digite o nome do jogo"
                  onChange={(e) => {
                    setGameName(e.target.value);
                    setGameNameError(undefined);
                  }}
                />
              </div>
              <div>
                {gameNameError === "notFound" && (
                  <p className="inputError">Nome do jogo não informado</p>
                )}
                {gameNameError === "startSpace" && (
                  <p className="inputError">
                    O nome do jogo não pode iniciar com espaço
                  </p>
                )}
              </div>
            </C.InputData>
            <C.InputData>
              <div>
                {!saving ? (
                  <label htmlFor="bgFile" className="btn">
                    <BiImageAdd />
                    Adicionar imagem de fundo
                  </label>
                ) : (
                  <button className="btn" disabled>
                    <BiImageAdd />
                    Adicionar imagem de fundo
                  </button>
                )}
                <input
                  disabled={saving}
                  type="file"
                  id="bgFile"
                  name="bgFile"
                  accept="image/*"
                  onChange={initCanvas}
                />
              </div>
              <div>
                {bgImageError === "notFound" && (
                  <p className="inputError">Imagem não adicionada</p>
                )}
                {bgImageError === "format" && (
                  <p className="inputError">Formato de arquivo não aceito</p>
                )}
              </div>
            </C.InputData>
          </C.Toolbox>
        </C.Editor>
      </C.Container>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {(openModalRemoveLevel ||
          openModalInstructions ||
          openModalLevelsError.status) && (
          <MazeBuilderModal closeModal={closeModal}>
            {openModalRemoveLevel ? (
              <RemoveLevel closeModal={closeModal} />
            ) : openModalInstructions ? (
              <Instructions closeModal={closeModal} />
            ) : (
              <LevelsError
                closeModal={closeModal}
                levelsError={openModalLevelsError.LevelsError}
              />
            )}
          </MazeBuilderModal>
        )}
      </AnimatePresence>
      <Tooltip id="my-tooltip" delayShow={1000} />
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
