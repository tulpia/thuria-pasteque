import "./styles.css";

// Libraries
import { Button } from "@mui/material";

// Components
import NextCircle from "./NextCircle";
import Points from "./Points";

const Header = ({ lastCircle, nextCircle, points, setPoints }) => {
  const reset = () => {
    window.location.reload();
  };

  return (
    <header>
      <Points lastCircle={lastCircle} points={points} setPoints={setPoints} />
      <NextCircle nextCircle={nextCircle} />
      <Button onClick={reset}>Reset</Button>
    </header>
  );
};

export default Header;
