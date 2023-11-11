/* eslint-disable no-unused-vars */
// Ressources
import yellow from "./../../../assets/yellow.png";
import green from "./../../../assets/green.png";
import blue from "./../../../assets/blue.png";
import red from "./../../../assets/red.png";
import black from "./../../../assets/black.png";
import orange from "./../../../assets/orange.png";

function NextCircle({ nextCircle }) {
  return <img style={{ width: 40, height: 40 }} src={eval(nextCircle.fill)} />;
}

export default NextCircle;
