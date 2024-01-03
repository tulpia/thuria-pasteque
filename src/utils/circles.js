// Correct size assets
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

// Thumbs
import paetanThumb from "./../assets/thumbnails/sk01.png";
import poeThumb from "./../assets/thumbnails/sk02.png";
import pophiaThumb from "./../assets/thumbnails/sk03.png";
import poThumb from "./../assets/thumbnails/sk04.png";
import palexisThumb from "./../assets/thumbnails/sk05.png";
import palecThumb from "./../assets/thumbnails/sk06.png";
import pomasThumb from "./../assets/thumbnails/sk07.png";
import jmThumb from "./../assets/thumbnails/sk08.png";
import manuThumb from "./../assets/thumbnails/sk09.png";
import clemThumb from "./../assets/thumbnails/sk10.png";
import vincentThumb from "./../assets/thumbnails/sk11.png";

const circles = [
  {
    radius: 10,
    image: paetan,
    thumb: paetanThumb,
    restitution: 0.55,
    points: 2,
    droppable: true,
  },
  {
    radius: 20,
    image: poe,
    thumb: poeThumb,
    restitution: 0.5,
    points: 4,
    droppable: true,
  },
  {
    radius: 30,
    image: pophia,
    thumb: pophiaThumb,
    restitution: 0.45,
    points: 6,
    droppable: true,
  },
  {
    radius: 40,
    image: po,
    thumb: poThumb,
    restitution: 0.4,
    points: 8,
    droppable: true,
  },
  {
    radius: 50,
    image: palexis,
    thumb: palexisThumb,
    restitution: 0.35,
    points: 10,
    droppable: true,
  },
  {
    radius: 60,
    image: palec,
    thumb: palecThumb,

    restitution: 0.3,
    points: 12,
    droppable: false,
  },
  {
    radius: 70,
    image: pomas,
    thumb: pomasThumb,
    restitution: 0.3,
    points: 14,
    droppable: false,
  },
  {
    radius: 80,
    image: jm,
    thumb: jmThumb,
    restitution: 0.25,
    points: 16,
    droppable: false,
  },
  {
    radius: 90,
    image: manu,
    thumb: manuThumb,
    restitution: 0.25,
    points: 18,
    droppable: false,
  },
  {
    radius: 100,
    image: clem,
    thumb: clemThumb,
    restitution: 0.2,
    points: 20,
    droppable: false,
  },
  {
    radius: 110,
    image: vincent,
    thumb: vincentThumb,
    restitution: 0.15,
    points: 22,
    droppable: false,
  },
];

export default circles;
