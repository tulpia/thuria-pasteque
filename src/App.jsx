/* eslint-disable no-unused-vars */
import "./App.css";

// Libraries
import { useEffect, useState, useRef } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore/lite";
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

const firebaseConfig = {
  apiKey: "AIzaSyCjy8nLbwd2_T4fNYK0Z9if5mYjBbN9LCY",
  authDomain: "thuria-pasteque.firebaseapp.com",
  projectId: "thuria-pasteque",
  storageBucket: "thuria-pasteque.appspot.com",
  messagingSenderId: "776143272485",
  appId: "1:776143272485:web:0cdeb446542b46cb345dcc",
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

      suikaEngine.current.onLose = () => {
        setHasLost(true);
      };

      const app = initializeApp(firebaseConfig);
      const firebaseDb = getFirestore(app);   
      
      setDb(firebaseDb);
    }
  }, [boxRef, canvasRef, suikaEngine]);

  useEffect(() => {
    if (hasLost) {
      const addPoints = async () => {
        try {
          await addDoc(collection(db, "scores"), { // passing doc here
            score: points
          });
        }
        catch (e) {
          console.log(e.message);
        }
      };
      addPoints();
    }
  }, [hasLost]);

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
              pointerEvents: hasLost ? "none" : "auto",
              position: "relative",
            }}
            onClick={handleAddCircle}
          >
            {hasLost && (
              <div className="lost">
                <Typography color={"white"} fontSize={28} textAlign={"center"}>
                  YOU LOST
                </Typography>
                <Typography color={"white"} fontSize={14} textAlign={"center"}>
                  Points : <strong>{points}</strong>
                </Typography>
              </div>
            )}
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
