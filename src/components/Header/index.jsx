import "./styles.css";

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
      <button onClick={reset}>Reset</button>
    </header>
  );
};

export default Header;
