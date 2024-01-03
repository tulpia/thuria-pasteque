import "./styles.scss";

// Libraries
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore/lite";
import { useEffect } from "react";
import { List, Typography, Divider } from "@mui/material";

// Components
import HighscoreItem from "./HighscoreItem";

const Highscore = ({ scores, setScores, db }) => {
  const getScores = async (db) => {
    const q = query(
      collection(db, "scores"),
      orderBy("score", "desc"),
      limit(10)
    );
    const citySnapshot = await getDocs(q);
    const cityList = citySnapshot.docs.map((doc) => doc.data());

    return cityList;
  };

  useEffect(() => {
    if (db) {
      getScores(db).then((data) => {
        setScores(data);
      });
    }
  }, [db]);

  return (
    <>
      {scores.length ? (
        <>
          <Typography style={{ fontSize: 18 }}>
            <strong>Leaderboard</strong>
          </Typography>
          <List
            style={{
              paddingTop: 30,
              paddingRight: 20,
            }}
          >
            {scores.map((score, index) => (
              <div key={index}>
                <HighscoreItem key={index} index={index} score={score} />

                {index === 2 && scores.length > 3 && (
                  <Divider
                    style={{
                      marginTop: 15,
                      marginBottom: 15,
                    }}
                  />
                )}
              </div>
            ))}
          </List>
        </>
      ) : (
        <Typography>Aucun score</Typography>
      )}
    </>
  );
};

export default Highscore;
