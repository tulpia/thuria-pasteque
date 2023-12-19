/* eslint-disable no-unused-vars */
import "./App.scss";

// Libraries
import { useEffect, useState, useRef } from "react";
import { Container, Grid } from "@mui/material";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// Components
import Header from "./components/Header";
import PointsResume from "./components/PointsResume";
import Highscore from "./components/Highscore";

// Utils
import circles from "./utils/circles";
import SuikaEngine from "./classes/SuikaEngine";
import Lost from "./components/Lost";

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
    setHasLost(true);
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
        <Grid item xs={2}>
          <Highscore scores={scores} setScores={setScores} db={db}></Highscore>
        </Grid>
        <Grid
          item
          style={{
            width: config.width,
            marginRight: 40,
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
            onClick={handleAddCircle}
          >
            {hasLost && <Lost db={db} points={points} />}
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
