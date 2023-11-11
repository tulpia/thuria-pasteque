import yellow from "./../assets/yellow.png";
import green from "./../assets/green.png";
import blue from "./../assets/blue.png";
import red from "./../assets/red.png";
import black from "./../assets/black.png";
import orange from "./../assets/orange.png";

const circles = [
  {
    radius: 10,
    fill: "yellow",
    image: yellow,
    restitution: 0.55,
    points: 2,
  },
  {
    radius: 20,
    fill: "green",
    image: green,
    restitution: 0.5,
    points: 4,
  },
  {
    radius: 30,
    fill: "blue",
    image: blue,
    restitution: 0.45,
    points: 6,
  },
  {
    radius: 40,
    image: red,
    fill: "red",
    restitution: 0.4,
    points: 8,
  },
  {
    radius: 50,
    image: black,
    fill: "black",
    restitution: 0.35,
    points: 10,
  },
  {
    radius: 60,
    image: orange,
    fill: "orange",
    restitution: 0.3,
    points: 12,
  },
];

export default circles;
