import paetan from "./../assets/paetan.png";
import poe from "./../assets/poe.png";
import pophia from "./../assets/pophia.png";
import po from "./../assets/po.png";
import palexis from "./../assets/palexis.png";
import palec from "./../assets/palec.png";
import pomas from "./../assets/pomas.png";
import jm from "./../assets/jm.png";
import manu from "./../assets/manu.png";
import clem from "./../assets/clem.png";
import vincent from "./../assets/2000.png";

const circles = [
  {
    radius: 10,
    image: paetan,
    restitution: 0.55,
    points: 2,
    droppable: true,
  },
  {
    radius: 20,
    image: poe,
    restitution: 0.5,
    points: 4,
    droppable: true,
  },
  {
    radius: 30,
    image: pophia,
    restitution: 0.45,
    points: 6,
    droppable: true,
  },
  {
    radius: 40,
    image: po,
    restitution: 0.4,
    points: 8,
    droppable: true,
  },
  {
    radius: 50,
    image: palexis,
    restitution: 0.35,
    points: 10,
    droppable: true,
  },
  {
    radius: 60,
    image: palec,
    restitution: 0.3,
    points: 12,
    droppable: false,
  },
  {
    radius: 70,
    image: pomas,
    restitution: 0.3,
    points: 14,
    droppable: false,
  },
  {
    radius: 80,
    image: jm,
    restitution: 0.25,
    points: 16,
    droppable: false,
  },
  {
    radius: 90,
    image: manu,
    restitution: 0.25,
    points: 18,
    droppable: false,
  },
  {
    radius: 100,
    image: clem,
    restitution: 0.2,
    points: 20,
    droppable: false,
  },
  {
    radius: 110,
    image: vincent,
    restitution: 0.15,
    points: 22,
    droppable: false,
  },
];

export default circles;
