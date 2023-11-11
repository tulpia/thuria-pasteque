import "./styles.css";

// Libraries
import { Button } from "@mui/material";

// Components
import NextCircle from "./NextCircle";
import Points from "./Points";

const Header = ({ lastCircle, nextCircle }) => {
  const reset = () => {
    window.location.reload();
  };

  return (
    <header>
      <Points lastCircle={lastCircle} />
      <NextCircle nextCircle={nextCircle} />
      <Button onClick={reset}>Reset</Button>
    </header>
  );
};

export default Header;
