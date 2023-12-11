// Libraries
import { collection, getDocs } from "firebase/firestore/lite";
import { useEffect } from "react";
import { List, ListItem, Typography } from "@mui/material";

const Highscore = ({ scores, setScores, db }) => {
  const getScores = async (db) => {
    const citiesCol = collection(db, "scores");
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map((doc) => doc.data());

    return cityList;
  };

  useEffect(() => {
    if (db) {
      // TODO : Récupérer uniquement les plus hauts scores
      getScores(db).then((data) => {
        const tempData = [];
        let scoreCount = 0;

        data.forEach((score) => {
          scoreCount++;

          tempData.push(score.score);

          if (scoreCount > 9) {
            return;
          }
        });

        setScores(tempData.sort((a, b) => a - b).reverse());
      });
    }
  }, [db]);

  return (
    <>
      {scores.length ? (
        <>
          <Typography>Scores</Typography>
          <List>
            {scores.map((score) => (
              <ListItem>{score}</ListItem>
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
