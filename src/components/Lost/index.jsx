import "./styles.scss";

// Libraries
import { addDoc, collection } from "firebase/firestore/lite";
import { Paper, Typography, TextField, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";

const Lost = ({ db, points }) => {
  const [username, setUsername] = useState("");
  const [errorUsername, setErrorUsername] = useState({});
  const [isLoading, setIsLoading] = useState({});
  const [feedback, setFeedback] = useState({});
  const [scoreSent, setScoreSent] = useState(false);

  useEffect(() => {
    if (!username.length || username.length > 3) {
      setErrorUsername({ error: true });
    } else {
      setErrorUsername({});
    }
  }, [username]);

  useEffect(() => {
    if (feedback.message) {
      setTimeout(() => {
        setFeedback({});
      }, 5000);
    }
  }, [feedback]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || username.length > 3 || isLoading.loading || scoreSent)
      return;

    setIsLoading({ loading: true });

    try {
      await addDoc(collection(db, "scores"), {
        score: points,
        username: username.toUpperCase(),
      }).then(() => {
        setIsLoading({});
        setFeedback({
          type: "success",
          message: "Résultat envoyé.",
        });
        setScoreSent(true);
      });
    } catch (e) {
      console.log(e.message);
      setIsLoading({});
      setFeedback({
        type: "success",
        message: "Erreur lors de l'envoi.",
      });
    }
  };

  return (
    <div className="lost">
      <Paper
        style={{
          padding: "25px 25px",
        }}
      >
        <Typography fontSize={28} textAlign={"center"}>
          YOU LOST
        </Typography>
        <Typography fontSize={14} textAlign={"center"}>
          Points : <strong>{points}</strong>
        </Typography>

        <form method="POST" onSubmit={handleSubmit}>
          <TextField
            label="Votre pseudo"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="pseudo"
            fullWidth
            style={{ marginTop: 30, marginBottom: 20 }}
            helperText="3 lettres max."
            {...errorUsername}
          ></TextField>

          <LoadingButton
            variant="contained"
            type="submit"
            endIcon={<SendIcon />}
            {...isLoading}
          >
            Envoyer
          </LoadingButton>

          {feedback.type && (
            <Alert style={{ marginTop: 20 }} severity={feedback.type}>
              {feedback.message}
            </Alert>
          )}
        </form>
      </Paper>
    </div>
  );
};

export default Lost;
