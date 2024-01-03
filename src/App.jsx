/* eslint-disable no-unused-vars */

// Libraries
import { useEffect, useState, useRef } from "react";
import { Container, Grid } from "@mui/material";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// Components
import Header from "./components/Header";
import PointsResume from "./components/PointsResume";
import Highscore from "./components/Highscore";

// Utils
import circles from "./utils/circles";
import SuikaEngine from "./classes/SuikaEngine";
import Lost from "./components/Lost";

// Assets
import "./App.scss";
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import logo from "./assets/thuria.png";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

function App() {
  const [db, setDb] = useState(null);
  const [scores, setScores] = useState([]);
  const [nextCircle, setNextCircle] = useState(circles[0]);
  const [lastCircle, setLastCircle] = useState(null);
  const [hasLost, setHasLost] = useState(false);
  const [points, setPoints] = useState(0);

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
    if (!hasLost) {
      const mousePos = getMousePos(canvasRef.current, e);

      suikaEngine.current.createCircle(mousePos.x, 0, nextCircle, true);
      setNextCircle(suikaEngine.current.nextCircle);
    }
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

      suikaEngine.current.onLose = () => {
        setHasLost(true);
      };

      const app = initializeApp(firebaseConfig);
      const firebaseDb = getFirestore(app);

      setDb(firebaseDb);
    }
  }, [boxRef, canvasRef, suikaEngine]);

  return (
    <Container maxWidth={"100%"}>
      <Grid container justifyContent={"center"} maxWidth={"100%"}>
        <Grid item xs={2} style={{ maxWidth: 230 }}>
          <Highscore scores={scores} setScores={setScores} db={db}></Highscore>
        </Grid>
        <Grid
          item
          style={{
            width: config.width,
            marginRight: 60,
            marginLeft: 60,
          }}
        >
          <Header
            lastCircle={lastCircle}
            nextCircle={nextCircle}
            points={points}
            setPoints={setPoints}
          />

          <div
            ref={boxRef}
            style={{
              width: config.width,
              height: config.height,
              position: "relative",
            }}
            className="canvas-container"
            onClick={handleAddCircle}
          >
            {hasLost && <Lost db={db} points={points} />}
            <img
              src={logo}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0.05,
                zIndex: 1,
                pointerEvents: "none",
              }}
            />
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
