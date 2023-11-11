/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import "./App.css";

// Components
import NextCircle from "./components/NextCircle";

// Utils
import circles from "./utils/circles";
import SuikaEngine from "./classes/SuikaEngine";

function App() {
  const [nextCircle, setNextCircle] = useState(circles[0]);

  let suikaEngine = useRef(null);
  const boxRef = useRef(null);
  const canvasRef = useRef(null);

  const config = {
    width: 500,
    height: 600,
  };

  const getMousePos = (canvas, evt) => {
    const rect = canvas.getBoundingClientRect();

    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  };

  const handleAddCircle = (e) => {
    const mousePos = getMousePos(canvasRef.current, e);

    suikaEngine.current.createCircle(mousePos.x, 0, nextCircle, true);
    setNextCircle(suikaEngine.current.getNextCircle());
  };

  useEffect(() => {
    if (boxRef.current && canvasRef.current && !suikaEngine.current) {
      console.log("set");
      suikaEngine.current = new SuikaEngine(
        boxRef.current,
        canvasRef.current,
        config
      );
    }
  }, [boxRef, canvasRef, suikaEngine]);

  return (
    <>
      <NextCircle nextCircle={nextCircle} />

      <div
        ref={boxRef}
        style={{
          width: config.width,
          height: config.height,
        }}
        onClick={handleAddCircle}
      >
        <canvas ref={canvasRef} />
      </div>
    </>
  );
}

export default App;
