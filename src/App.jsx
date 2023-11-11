/* eslint-disable no-unused-vars */
import "./App.css";

// Libraries
import { useEffect, useState, useRef } from "react";
import { Container, Grid } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// Components
import Header from "./components/Header";
import PointsResume from "./components/PointsResume";

// Utils
import circles from "./utils/circles";
import SuikaEngine from "./classes/SuikaEngine";

function App() {
  const [nextCircle, setNextCircle] = useState(circles[0]);
  const [lastCircle, setLastCircle] = useState(null);

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
    setNextCircle(suikaEngine.current.nextCircle);
  };

  useEffect(() => {
    if (boxRef.current && canvasRef.current && !suikaEngine.current) {
      suikaEngine.current = new SuikaEngine(
        boxRef.current,
        canvasRef.current,
        config
      );

      suikaEngine.current.onLastCreatedCircle = (lastCreatedCircle) => {
        setLastCircle(lastCreatedCircle);
      };
    }
  }, [boxRef, canvasRef, suikaEngine]);

  return (
    <Container maxWidth={"100%"}>
      <Grid container justifyContent={"center"} maxWidth={"100%"}>
        <Grid
          item
          style={{
            width: config.width,
            marginRight: 40,
          }}
        >
          <Header lastCircle={lastCircle} nextCircle={nextCircle} />

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
        </Grid>
        <Grid item xs={2}>
          <PointsResume></PointsResume>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
