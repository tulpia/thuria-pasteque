import "./styles.css";

// Libraries
import { Button, styled } from "@mui/material";

// Components
import NextCircle from "./NextCircle";
import Points from "./Points";

const ResetButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: theme.palette.secondary.main,
  padding: "9px 20px",
  fontSize: 10,
  borderRadius: 10,
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

const Header = ({ lastCircle, nextCircle, points, setPoints }) => {
  const reset = () => {
    window.location.reload();
  };

  return (
    <header>
      <Points lastCircle={lastCircle} points={points} setPoints={setPoints} />
      <NextCircle nextCircle={nextCircle} />
      <ResetButton
        onClick={reset}
        style={{
          color: "white",
        }}
        endIcon={
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.5 1.3C4.71344 1.3 3.1363 2.20107 2.19988 3.575H3.9V4.875H0V0.975H1.3V2.59958C2.48548 1.02158 4.37297 0 6.5 0C10.0898 0 13 2.91015 13 6.5H11.7C11.7 3.62812 9.37189 1.3 6.5 1.3ZM1.3 6.5C1.3 9.37189 3.62812 11.7 6.5 11.7C8.28659 11.7 9.86368 10.7989 10.8001 9.425H9.1V8.125H13V12.025H11.7V10.4004C10.5145 11.9784 8.62706 13 6.5 13C2.91015 13 0 10.0898 0 6.5H1.3Z"
              fill="#3E9EC4"
            />
          </svg>
        }
      >
        <strong>Reset</strong>
      </ResetButton>
    </header>
  );
};

export default Header;
