// Libraries
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore/lite";
import { useEffect } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

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

  const colors = {
    0: "#FEE101",
    1: "#A7A7A7",
    2: "#A77044",
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
          <Typography>Scores</Typography>
          <List
            style={{
              paddingRight: 20,
            }}
          >
            {scores.map((score, index) => (
              <>
                <ListItem
                  style={{
                    paddingLeft: 0,
                    paddingRight: 0,
                  }}
                  key={`${score.username}-${score.score}`}
                >
                  {index < 3 && (
                    <ListItemIcon>
                      <StarIcon
                        style={{
                          fill: colors[index],
                        }}
                      />
                    </ListItemIcon>
                  )}

                  <ListItemText
                    primary={`${score.username} - ${score.score}`}
                  />
                </ListItem>

                {index === 2 && scores.length > 3 && (
                  <Divider
                    style={{
                      marginTop: 15,
                      marginBottom: 15,
                    }}
                  />
                )}
              </>
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
